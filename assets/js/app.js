/* =====================================================================
 * AzureKiln 离线转换器 — 公共脚本（页头 / 页脚 / 通用工具）
 * ===================================================================*/

const AK_SITE = {
  name: 'AzureKiln 转换器',
  mainSite: 'https://azurekiln.cn/',
  pages: [
    { href: 'index.html',   id: 'index',   label: '首页' },
    { href: 'convert.html', id: 'convert', label: '在线转换' },
    { href: 'formats.html', id: 'formats', label: '支持格式' },
    { href: 'faq.html',     id: 'faq',     label: '常见问题' },
  ],
};

/** 渲染页头（与主站 main.php 同一套视觉规范）——页面需有 <div id="ak-header"></div> */
AK_SITE.renderHeader = function (activeId) {
  const tabs = this.pages.map(p => {
    const isActive = p.id === activeId;
    const activeCls = isActive
      ? 'text-[#005ab7] dark:text-[#0072e5] border-b-2 border-[#005ab7] pb-1'
      : 'text-slate-500 dark:text-slate-400 hover:text-[#005ab7]';
    return `<a href="${p.href}" class="ak-tab ${activeCls} font-['Manrope'] tracking-tight font-bold transition-all duration-300">${p.label}</a>`;
  }).join('');

  const host = document.getElementById('ak-header');
  if (!host) return;
  host.innerHTML = `
  <header class="w-full sticky top-0 z-50 bg-[#f7f9fb] dark:bg-slate-950 backdrop-blur-xl bg-opacity-80">
    <nav class="flex justify-between items-center px-8 md:px-12 py-6 max-w-7xl mx-auto">
      <a href="index.html" class="text-2xl font-black tracking-tighter text-[#005ab7] dark:text-[#0072e5] font-['Manrope']">AzureKiln<span class="text-[#515f74] dark:text-slate-400">Converter</span></a>
      <div class="hidden md:flex items-center gap-8">${tabs}</div>
      <a href="${this.mainSite}" class="flex items-center gap-2 text-[#515f74] dark:text-slate-400 hover:text-[#005ab7] transition-all duration-200 text-sm font-bold">
        <span class="material-symbols-outlined text-[22px]">home</span>
        <span class="hidden sm:inline">返回主站</span>
      </a>
    </nav>
    <div class="bg-[#f1f3f5] dark:bg-slate-900 h-[1px] w-full"></div>
  </header>`;
};

/** 渲染页脚（与主站 main.php 同一套视觉规范）——页面需有 <div id="ak-footer"></div> */
AK_SITE.renderFooter = function () {
  const host = document.getElementById('ak-footer');
  if (!host) return;
  host.innerHTML = `
  <footer class="w-full py-16 border-t border-opacity-10 border-[#515f74] bg-[#f7f9fb] dark:bg-slate-950 mt-20">
    <div class="max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex flex-col items-center md:items-start gap-2">
        <span class="text-[#515f74] dark:text-slate-400 font-['Inter'] text-[0.75rem] uppercase tracking-widest leading-relaxed">AzureKiln Converter - 文件全程留在你的浏览器</span>
        <p class="text-[#515f74] dark:text-slate-500 font-['Inter'] text-[0.75rem] uppercase tracking-widest">© 2026 AzureKilnSite. Built on The Digital Atheneum philosophy.</p>
      </div>
      <div class="flex gap-8 flex-wrap justify-center">
        <a class="text-[#515f74] dark:text-slate-500 hover:text-[#005ab7] transition-colors duration-200 hover:underline font-['Inter'] text-[0.75rem] uppercase tracking-widest" href="convert.html">在线转换</a>
        <a class="text-[#515f74] dark:text-slate-500 hover:text-[#005ab7] transition-colors duration-200 hover:underline font-['Inter'] text-[0.75rem] uppercase tracking-widest" href="formats.html">支持格式</a>
        <a class="text-[#515f74] dark:text-slate-500 hover:text-[#005ab7] transition-colors duration-200 hover:underline font-['Inter'] text-[0.75rem] uppercase tracking-widest" href="faq.html">常见问题</a>
        <a class="text-[#515f74] dark:text-slate-500 hover:text-[#005ab7] transition-colors duration-200 hover:underline font-['Inter'] text-[0.75rem] uppercase tracking-widest" href="${this.mainSite}">主站</a>
      </div>
    </div>
  </footer>`;
};

/* ── 通用工具 ─────────────────────────────────────────────── */

/** 轻量 toast 提示 */
AK_SITE.toast = function (msg, type) {
  let host = document.getElementById('ak-toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'ak-toast-host';
    host.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2';
    document.body.appendChild(host);
  }
  const colors = {
    info: 'bg-[#191c1e] text-white',
    ok: 'bg-[#005ab7] text-white',
    err: 'bg-[#ba1a1a] text-white',
  };
  const el = document.createElement('div');
  el.className = `px-5 py-3 rounded-xl shadow-lg text-sm font-bold max-w-[80vw] ${colors[type] || colors.info}`;
  el.style.cssText += 'opacity:0;transform:translateY(8px);transition:all .25s ease';
  el.textContent = msg;
  host.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  }, 3600);
};

/** 字节数 → 可读文本 */
AK_SITE.fmtSize = function (bytes) {
  if (bytes === undefined || bytes === null || isNaN(bytes)) return '-';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1048576).toFixed(2) + ' MB';
  return (bytes / 1073741824).toFixed(2) + ' GB';
};

/** 触发浏览器下载 */
AK_SITE.download = function (blobOrUrl, filename) {
  const a = document.createElement('a');
  a.href = typeof blobOrUrl === 'string' ? blobOrUrl : URL.createObjectURL(blobOrUrl);
  a.download = filename || '';
  document.body.appendChild(a);
  a.click();
  a.remove();
  if (typeof blobOrUrl !== 'string') setTimeout(() => URL.revokeObjectURL(a.href), 10000);
};

/** 去掉扩展名的文件名 */
AK_SITE.stripExt = function (name) {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.slice(0, i) : name;
};
