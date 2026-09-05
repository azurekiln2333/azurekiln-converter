/* =====================================================================
 * convert.html 页面逻辑：工具切换 / 表单渲染 / 转换编排 / 结果下载
 * ===================================================================*/

(() => {
  const $ = (s, el) => (el || document).querySelector(s);

  const state = {
    tool: null,        // 当前工具 key
    files: [],         // 待转换 File 列表
    results: [],       // {name, blob, size, ms, status}
    running: false,
  };

  /* ── 工具页签 ─────────────────────────────────────────── */
  function renderTabs(activeKey) {
    const tabs = $('#tool-tabs');
    tabs.innerHTML = Object.entries(AK_TOOLS).filter(([k]) => k !== 'pairsFor').map(([key, t]) => {
      const active = key === activeKey;
      return `
      <button data-tool="${key}" class="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300
        ${active ? 'bg-[#005ab7] text-white shadow-lg shadow-primary/20' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-primary/40 hover:text-[#005ab7]'}">
        <span class="material-symbols-outlined text-[18px]">${t.icon}</span>${t.label}
      </button>`;
    }).join('');
    tabs.querySelectorAll('[data-tool]').forEach(btn =>
      btn.addEventListener('click', () => switchTool(btn.dataset.tool)));
  }

  function switchTool(key) {
    if (state.running) { AK_SITE.toast('转换进行中，请等待完成后再切换', 'err'); return; }
    state.tool = key;
    state.files = [];
    state.results = [];
    renderTabs(key);
    renderForm();
    renderFileList();
    renderResults();
    const url = new URL(location.href);
    url.searchParams.set('type', key);
    history.replaceState(null, '', url);
  }

  /* ── 表单渲染 ─────────────────────────────────────────── */
  function fieldHTML(f) {
    if (f.type === 'checkbox') {
      return `<label class="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer">
        <input type="checkbox" id="opt-${f.id}" class="w-4 h-4 accent-[#005ab7]"> ${f.label}</label>`;
    }
    if (f.type === 'select') {
      const opts = (f.choices || []).map(c => {
        const [v, label] = Array.isArray(c) ? c : [c, c];
        return `<option value="${v}">${label}</option>`;
      }).join('');
      return `<div>
        <label class="block text-xs font-bold text-secondary mb-1.5">${f.label}</label>
        <select id="opt-${f.id}" class="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-3 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
          ${f.placeholder ? `<option value="">${f.placeholder}</option>` : ''}${opts}
        </select></div>`;
    }
    if (f.type === 'range') {
      return `<div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="block text-xs font-bold text-secondary">${f.label}</label>
          <span id="opt-${f.id}-val" class="text-xs font-bold text-[#005ab7]">${f.value}${f.suffix || ''}</span>
        </div>
        <input type="range" id="opt-${f.id}" min="${f.min}" max="${f.max}" value="${f.value}" class="w-full">
        ${f.tip ? `<p class="text-[11px] text-secondary mt-1">${f.tip}</p>` : ''}
      </div>`;
    }
    return `<div>
      <label class="block text-xs font-bold text-secondary mb-1.5">${f.label}</label>
      <input type="${f.type || 'text'}" id="opt-${f.id}" ${f.min ? `min="${f.min}"` : ''} ${f.max ? `max="${f.max}"` : ''}
        placeholder="${f.placeholder || ''}"
        class="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-3 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
    </div>`;
  }

  function renderForm() {
    const tool = AK_TOOLS[state.tool];
    $('#tool-title').textContent = tool.label;
    $('#tool-desc').textContent = tool.desc;

    // 目标格式
    const targetWrap = $('#target-wrap');
    if (tool.hideTarget || !tool.targets.length) {
      targetWrap.classList.add('hidden');
    } else {
      targetWrap.classList.remove('hidden');
      $('#targetformat').innerHTML = tool.targets.map(t => {
        const meta = AK_FORMATS.find(f => f.ext === t);
        return `<option value="${t}" ${t === tool.defaultTarget ? 'selected' : ''}>${(meta && meta.name) || t.toUpperCase()}</option>`;
      }).join('');
    }

    // 可选项
    $('#options-wrap').innerHTML = (tool.options || []).map(g => `
      <div>
        <p class="text-[0.7rem] font-bold tracking-[0.15em] text-outline uppercase mb-3">${g.group}</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">${g.fields.map(fieldHTML).join('')}</div>
      </div>`).join('');

    // range 联动显示
    (tool.options || []).forEach(g => g.fields.forEach(f => {
      if (f.type === 'range') {
        const el = $('#opt-' + f.id);
        el.addEventListener('input', () => {
          $('#opt-' + f.id + '-val').textContent = el.value + (f.suffix || '');
        });
      }
    }));

    // 引擎提示与预取
    const needFFmpeg = ['video', 'audio', 'compress-video', 'compress-audio'].includes(state.tool);
    const hint = $('#engine-hint');
    hint.classList.toggle('hidden', !needFFmpeg);
    if (needFFmpeg) startEnginePrefetch();

    // 文档工具的分页提示
    $('#tool-tip').textContent = tool.tip || '';
    $('#tool-tip').classList.toggle('hidden', !tool.tip);

    // 文件选择框
    $('#localfiles').accept = tool.accept;
  }

  /* ── FFmpeg 引擎预取（后台下载 + 缓存 + 进度条）────────── */
  let prefetchBound = false;

  function hintHTML(text, percent) {
    const bar = percent === undefined ? '' : `
      <span class="inline-block align-middle w-40 h-1.5 rounded-full bg-surface-container-high overflow-hidden mx-1">
        <span class="ak-progress block h-full rounded-full bg-[#005ab7]" style="width:${Math.round(percent * 100)}%"></span>
      </span><span class="text-[#005ab7] font-bold">${Math.round(percent * 100)}%</span>`;
    return `<span class="material-symbols-outlined text-[16px] align-[-3px]">downloading</span> ${text}${bar}`;
  }

  function startEnginePrefetch() {
    const hint = $('#engine-hint');
    if (AKMedia.isLoaded()) {
      hint.innerHTML = hintHTML('FFmpeg 引擎已就绪（本地缓存）');
      return;
    }
    if (!prefetchBound) {
      prefetchBound = true;
      AKMedia.onEngineProgress(info => {
        if (info.stage === 'start') hint.innerHTML = hintHTML('正在准备 FFmpeg 引擎…', 0);
        else if (info.stage === 'core-done') hint.innerHTML = hintHTML('正在下载引擎主文件（约 32MB，仅此一次）…', 0.02);
        else if (info.stage === 'download') hint.innerHTML = hintHTML('正在下载引擎主文件（约 32MB，仅此一次）…', info.percent);
        else if (info.stage === 'ready') hint.innerHTML = hintHTML('引擎已下载，可随时开始转换');
      });
    }
    if (!state.prefetchStarted) {
      state.prefetchStarted = true;
      AKMedia.prefetch().then(() => {
        if (state.tool && ['video', 'audio', 'compress-video', 'compress-audio'].includes(state.tool))
          $('#engine-hint').innerHTML = hintHTML('引擎已缓存，转换时将直接从本地读取');
      }).catch(() => {
        if (state.tool && ['video', 'audio', 'compress-video', 'compress-audio'].includes(state.tool))
          $('#engine-hint').innerHTML = hintHTML('引擎将在开始转换时加载');
      });
    }
  }

  /* ── 文件列表 ─────────────────────────────────────────── */
  function addFiles(list) {
    for (const f of list) state.files.push(f);
    renderFileList();
  }

  function renderFileList() {
    const tool = AK_TOOLS[state.tool];
    $('#dropzone-hint').textContent = tool.dropText ||
      `点击选择或拖入 ${tool.label.replace('转换', '').replace('压缩', '')}文件（可多选，上限 2GB / 文件）`;
    const wrap = $('#file-chips');
    wrap.innerHTML = state.files.map((f, i) => `
      <span class="inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-xs font-bold text-on-surface">
        <span class="material-symbols-outlined text-[15px] text-[#005ab7]">draft</span>
        <span class="max-w-[12rem] truncate">${f.name}</span>
        <span class="text-secondary font-medium">${AK_SITE.fmtSize(f.size)}</span>
        <button data-rm="${i}" class="w-5 h-5 rounded-full flex items-center justify-center hover:bg-error/10 text-secondary hover:text-error transition-colors">
          <span class="material-symbols-outlined text-[14px]">close</span>
        </button>
      </span>`).join('');
    wrap.querySelectorAll('[data-rm]').forEach(btn =>
      btn.addEventListener('click', () => {
        state.files.splice(Number(btn.dataset.rm), 1);
        renderFileList();
      }));
    $('#convert-btn').disabled = state.files.length === 0 || state.running;
    $('#convert-btn').classList.toggle('opacity-40', state.files.length === 0 || state.running);
  }

  /* ── 转换编排 ─────────────────────────────────────────── */
  function collectOpts() {
    const tool = AK_TOOLS[state.tool];
    const opts = { target: $('#targetformat').value };
    (tool.options || []).forEach(g => g.fields.forEach(f => {
      const el = $('#opt-' + f.id);
      if (!el) return;
      if (f.type === 'checkbox') opts[f.id] = el.checked;
      else opts[f.id] = el.value || null;
    }));
    return opts;
  }

  function statusRow(i) {
    const r = state.results[i];
    let right;
    if (r.status === 'pending') right = '<span class="text-xs text-secondary">等待中…</span>';
    else if (r.status === 'running') right = `<div class="flex items-center gap-2"><div class="w-28 h-1.5 rounded-full bg-surface-container-high overflow-hidden"><div class="ak-progress h-full rounded-full bg-[#005ab7]" style="width:${Math.round((r.progress || 0) * 100)}%"></div></div><span class="text-xs text-secondary">${Math.round((r.progress || 0) * 100)}%</span></div>`;
    else if (r.status === 'done') right = `<span class="text-xs text-secondary mr-2">${r.ms ? r.ms / 1000 + 's · ' : ''}${AK_SITE.fmtSize(r.size)}</span><button data-dl="${i}" class="px-3 py-1.5 rounded-lg bg-primary/5 text-[#005ab7] text-xs font-bold hover:bg-primary/10 transition-colors flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">download</span>下载</button>`;
    else right = `<span class="text-xs text-error max-w-[22rem] truncate" title="${r.error}">${r.error}</span>`;
    return `<tr>
      <td class="text-secondary">${i + 1}</td>
      <td class="font-bold max-w-[14rem]"><div class="truncate">${r.inName}</div></td>
      <td>${r.outName ? `<span class="text-on-surface-variant">${r.outName}</span>` : '<span class="text-secondary">-</span>'}</td>
      <td class="text-right whitespace-nowrap">${right}</td>
    </tr>`;
  }

  function renderResults() {
    const tbody = $('#results-body');
    tbody.innerHTML = state.results.map((_, i) => statusRow(i)).join('');
    tbody.querySelectorAll('[data-dl]').forEach(btn =>
      btn.addEventListener('click', () => {
        const r = state.results[Number(btn.dataset.dl)];
        AK_SITE.download(r.blob, r.outName);
      }));
    const done = state.results.filter(r => r.status === 'done');
    $('#zip-btn').classList.toggle('hidden', done.length < 2);
    $('#results-count').textContent = state.results.length
      ? `共 ${state.results.length} 项 · 完成 ${done.length} · 失败 ${state.results.filter(r => r.status === 'error').length}`
      : '';
  }

  async function ensureEngines() {
    if (['video', 'audio', 'compress-video', 'compress-audio'].includes(state.tool)) {
      const hint = $('#engine-hint');
      if (!AKMedia.isLoaded()) {
        const off = AKMedia.onEngineProgress(info => {
          if (info.stage === 'download') hint.innerHTML = hintHTML('正在下载引擎主文件（约 32MB，仅此一次）…', info.percent);
        });
        AK_SITE.toast('正在加载 FFmpeg 引擎，首次约需 30 秒…', 'info');
        try { await AKMedia.load(); } finally { off(); }
        hint.innerHTML = hintHTML('FFmpeg 引擎已就绪（已存入本地缓存，下次秒开）');
      }
    }
  }

  async function run() {
    if (state.running || !state.files.length) return;
    state.running = true;
    $('#convert-btn').disabled = true;
    $('#convert-btn').classList.add('opacity-40');
    $('#convert-btn').innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin inline-block align-[-3px]">progress_activity</span> 转换中…';
    renderFileList();

    const opts = collectOpts();
    state.results = state.files.map(f => ({ inName: f.name, outName: '', status: 'pending', blob: null }));
    renderResults();

    try { await ensureEngines(); } catch (e) {
      AK_SITE.toast('FFmpeg 引擎加载失败：' + e.message, 'err');
      state.results.forEach(r => { if (r.status === 'pending') { r.status = 'error'; r.error = '引擎加载失败'; } });
      finishRun();
      return;
    }

    /* ZIP 打包：全部文件 → 单个压缩包 */
    if (state.tool === 'zip') {
      const r = state.results[0];
      r.inName = `${state.files.length} 个文件`;
      r.status = 'running';
      r.progress = 0;
      renderResults();
      try {
        const { blob, name } = await AKArchive.pack(state.files, p => { r.progress = p; renderResults(); });
        r.outName = name;
        r.blob = blob;
        r.size = blob.size;
        r.status = 'done';
        r.progress = 1;
      } catch (e) {
        console.error(e);
        r.status = 'error';
        r.error = (e && e.message) || '打包失败';
      }
      finishRun();
      return;
    }

    for (let i = 0; i < state.files.length; i++) {
      const file = state.files[i];
      const r = state.results[i];
      r.status = 'running';
      r.progress = 0;
      renderResults();
      const onProgress = (p) => { r.progress = p; renderResults(); };
      const onStatus = (s) => { r.outName = typeof s === 'string' && !/canvas|imagemagick|开始/.test(s) ? s : r.outName; };
      try {
        let outs;
        if (state.tool === 'image') {
          const res = await AKImage.convert(file, opts, null);
          outs = [{ name: AK_SITE.stripExt(file.name) + '.' + opts.target, blob: res.blob }];
          r.ms = res.ms;
        } else if (state.tool === 'video') {
          outs = [await AKMedia.convertVideo(file, opts, onProgress)];
        } else if (state.tool === 'audio') {
          outs = [await AKMedia.convertAudio(file, opts)];
        } else if (state.tool === 'document') {
          if (opts.target === 'txt') {
            outs = await AKDocument.extractText(file, (pi, total) => onProgress(pi / total));
          } else {
            outs = await AKDocument.convert(file, opts,
              (pi, total) => onProgress(pi / total));
          }
        } else if (state.tool === 'compress-video') {
          outs = [await AKMedia.compressVideo(file, opts, s => onStatus(s), onProgress)];
        } else if (state.tool === 'compress-audio') {
          outs = [await AKMedia.compressAudio(file, opts)];
        } else if (state.tool === 'zip') {
          // 所有文件合并打包为一个 ZIP：在循环外处理，这里跳过
          outs = [];
        } else if (state.tool === 'unzip') {
          const entries = await AKArchive.unpack(file, p => onProgress(p));
          outs = entries;
        }
        // 文档工具多页输出 → 多行结果
        outs.forEach((o, k) => {
          const row = k === 0 ? r : { inName: file.name, outName: '', status: 'pending', blob: null };
          row.outName = o.name; row.blob = o.blob; row.size = o.blob.size;
          row.status = 'done'; row.progress = 1;
          if (o.info) row.info = o.info;
          if (k > 0) state.results.push(row);
        });
      } catch (e) {
        console.error(e);
        r.status = 'error';
        let msg = (e && e.message) || '转换失败';
        if (/NoDecodeDelegate|is not decodable|Unsupported/i.test(msg))
          msg = '无法解码该文件：不是有效的图片，或该格式不受支持';
        r.error = msg;
      }
      renderResults();
    }
    finishRun();
  }

  function finishRun() {
    state.running = false;
    state.files = [];           // 已处理完，清空待转换列表
    $('#convert-btn').innerHTML = '<span class="material-symbols-outlined text-[18px] align-[-3px]">bolt</span> 开始转换';
    renderFileList();
    renderResults();
    const ok = state.results.filter(r => r.status === 'done').length;
    const bad = state.results.filter(r => r.status === 'error').length;
    if (bad === 0 && ok > 0) AK_SITE.toast(`全部完成，成功 ${ok} 个文件`, 'ok');
    else if (bad > 0 && ok === 0) AK_SITE.toast('转换失败，请查看错误信息', 'err');
    else if (ok > 0) AK_SITE.toast(`完成 ${ok} 个，失败 ${bad} 个`, 'info');
  }

  async function zipAll() {
    const done = state.results.filter(r => r.status === 'done');
    if (!done.length) return;
    AK_SITE.toast('正在打包…', 'info');
    const zip = new JSZip();
    const used = {};
    done.forEach(r => {
      let name = r.outName;
      if (used[name]) name = name.replace(/(\.[^.]*)$/, `(${used[name]})$1`);
      used[r.outName] = (used[r.outName] || 0) + 1;
      zip.file(name, r.blob);
    });
    const blob = await zip.generateAsync({ type: 'blob' }, null);
    AK_SITE.download(blob, `azurekiln-converter-${Date.now()}.zip`);
  }

  /* ── 事件绑定 & 初始化 ────────────────────────────────── */
  function bindEvents() {
    const input = $('#localfiles');
    $('#dropzone').addEventListener('click', () => input.click());
    input.addEventListener('change', () => { addFiles(input.files); input.value = ''; });

    const dz = $('#dropzone');
    ['dragenter', 'dragover'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.add('dragover');
    }));
    ['dragleave', 'drop'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.remove('dragover');
    }));
    dz.addEventListener('drop', e => { if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });

    $('#convert-btn').addEventListener('click', run);
    $('#zip-btn').addEventListener('click', zipAll);
  }

  document.addEventListener('DOMContentLoaded', () => {
    AK_SITE.renderHeader('convert');
    AK_SITE.renderFooter();
    const qType = new URLSearchParams(location.search).get('type');
    const qTarget = new URLSearchParams(location.search).get('to');
    const initTool = AK_TOOLS[qType] && qType !== 'pairsFor' ? qType : 'image';
    state.tool = initTool;
    renderTabs(initTool);
    renderForm();
    renderResults();
    if (qTarget) {
      const sel = $('#targetformat');
      if ([...sel.options].some(o => o.value === qTarget)) sel.value = qTarget;
    }
    bindEvents();
  });
})();
