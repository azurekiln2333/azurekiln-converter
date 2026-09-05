/* =====================================================================
 * 音视频引擎：FFmpeg.wasm 0.12（本地 vendor）
 *
 * 加载策略（解决"首次要下载 32MB 很慢"的问题）：
 *  1. 选中视频/音频工具时立即在后台预取，不阻塞页面操作；
 *  2. 引擎文件通过 Cache Storage 永久缓存——首次下载后，之后打开页面
 *     直接从缓存读取（毫秒级），不再依赖易被驱逐的 HTTP 缓存；
 *  3. 下载过程实时汇报进度（wasm 占 32MB），UI 显示进度条；
 *  4. blob URL 加载失败时自动回退直连 URL，保证可用性。
 * ===================================================================*/

const AKMedia = (() => {
  const V_MIME = {
    mp4: 'video/mp4', m4v: 'video/x-m4v', mkv: 'video/x-matroska', mov: 'video/quicktime',
    webm: 'video/webm', avi: 'video/x-msvideo', flv: 'video/x-flv', f4v: 'video/x-f4v',
    wmv: 'video/x-ms-wmv', mpg: 'video/mpeg', vob: 'video/mpeg', ts: 'video/mp2t',
    m2ts: 'video/mp2t', asf: 'video/x-ms-asf', ogv: 'video/ogg', mxf: 'application/mxf',
    '3gp': 'video/3gpp', '3g2': 'video/3gpp2', gif: 'image/gif', prores: 'video/quicktime',
  };
  const A_MIME = {
    mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', aac: 'audio/aac',
    m4a: 'audio/mp4', m4b: 'audio/mp4', flac: 'audio/flac', opus: 'audio/opus',
    wma: 'audio/x-ms-wma', aiff: 'audio/aiff', au: 'audio/basic', mka: 'audio/x-matroska',
    ac3: 'audio/ac3', eac3: 'audio/eac3', dts: 'audio/vnd.dts', caf: 'audio/x-caf',
    tta: 'audio/x-tta', wv: 'audio/x-wavpack',
  };
  const VIDEO_EXT = new Set(['mp4', 'mov', 'mkv', 'webm', 'avi', 'flv', 'f4v', 'wmv', 'mpg', 'mpeg',
    'm4v', 'vob', 'ts', 'm2ts', 'mts', 'asf', 'ogv', 'mxf', '3gp', '3g2', 'rm', 'rmvb', 'swf', 'gif']);

  const VIDEO_ARGS = {
    mp4:  ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart'],
    m4v:  ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k'],
    mkv:  ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k'],
    mov:  ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k'],
    f4v:  ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k'],
    ts:   ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-f', 'mpegts'],
    m2ts: ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-f', 'mpegts'],
    webm: ['-c:v', 'libvpx', '-deadline', 'realtime', '-cpu-used', '5', '-c:a', 'libvorbis'],
    ogv:  ['-c:v', 'libtheora', '-qscale:v', '7', '-c:a', 'libvorbis'],
    avi:  ['-c:v', 'mpeg4', '-qscale:v', '6', '-c:a', 'libmp3lame'],
    flv:  ['-c:v', 'flv', '-qscale:v', '6', '-c:a', 'libmp3lame'],
    wmv:  ['-c:v', 'wmv2', '-qscale:v', '6', '-c:a', 'wmav2'],
    asf:  ['-c:v', 'wmv2', '-qscale:v', '6', '-c:a', 'wmav2'],
    mpg:  ['-c:v', 'mpeg2video', '-qscale:v', '5', '-c:a', 'mp2'],
    vob:  ['-c:v', 'mpeg2video', '-qscale:v', '5', '-c:a', 'mp2', '-f', 'vob'],
    mxf:  ['-c:v', 'mpeg2video', '-qscale:v', '5', '-c:a', 'mp2', '-f', 'mxf'],
    prores: ['-c:v', 'prores', '-profile:v', '3', '-c:a', 'pcm_s16le', '-f', 'mov'],
    /* h263 要求宽高为 4 的倍数，无自定义分辨率时用表达式兜底 */
    '3gp':  ['-c:v', 'h263', '-qscale:v', '5', '-c:a', 'aac'],
    '3g2':  ['-c:v', 'h263', '-qscale:v', '5', '-c:a', 'aac'],
  };

  const AUDIO_ARGS = {
    mp3:  ['-c:a', 'libmp3lame'],
    wav:  ['-c:a', 'pcm_s16le'],
    ogg:  ['-c:a', 'libvorbis'],
    aac:  ['-c:a', 'aac'],
    m4a:  ['-c:a', 'aac'],
    m4b:  ['-c:a', 'aac'],
    flac: ['-c:a', 'flac'],
    opus: ['-c:a', 'libopus'],
    wma:  ['-c:a', 'wmav2'],
    aiff: ['-c:a', 'pcm_s16be'],
    au:   ['-c:a', 'pcm_s16be'],
    mka:  ['-c:a', 'aac'],
    ac3:  ['-c:a', 'ac3'],
    eac3: ['-c:a', 'eac3'],
    dts:  ['-c:a', 'dca'],
    caf:  ['-c:a', 'alac'],
    tta:  ['-c:a', 'tta'],
    wv:   ['-c:a', 'wavpack'],
  };

  /* 输出扩展名与工具 target 不同名的情形 */
  const OUT_EXT = { prores: 'mov' };

  /* H.263（3GP/3G2）只接受这些标准尺寸，其他尺寸编码器会初始化失败 */
  const H263_SIZES = [[128, 96], [176, 144], [352, 288], [704, 576], [1408, 1152]];

  function h263Size(vsize) {
    if (vsize) {
      const [w, h] = vsize.split('x').map(Number);
      let best = H263_SIZES[0], diff = Infinity;
      for (const s of H263_SIZES) {
        const d = Math.abs(s[0] * s[1] - w * h);
        if (d < diff) { diff = d; best = s; }
      }
      return best.join('x');
    }
    return '176x144';
  }

  /* ── 引擎加载状态 ────────────────────────────────────── */
  const CORE_VER = '0.12.6';
  const CACHE_NAME = 'ak-ffmpeg-' + CORE_VER;
  let ffmpeg = null;
  let loadPromise = null;
  let prefetchPromise = null;
  let progressListeners = [];   // (info {stage, percent, loaded, total}) => void
  let logSink = null;
  let progressSink = null;
  const recentLogs = [];

  function pushLog(line) {
    recentLogs.push(line);
    if (recentLogs.length > 300) recentLogs.splice(0, recentLogs.length - 300);
    logSink && logSink(line);
  }

  function emitProgress(info) {
    progressListeners.forEach(fn => { try { fn(info); } catch {} });
  }

  /** 带进度（与可选缓存）的资源获取，返回 Blob */
  async function fetchAsset(url, cache, onProg) {
    if (cache) {
      const hit = await cache.match(url);
      if (hit) {
        onProg && onProg({ stage: 'cache', percent: 1 });
        return hit.blob();
      }
    }
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`引擎文件下载失败（${resp.status}）`);
    const total = Number(resp.headers.get('Content-Length')) || 0;
    if (!resp.body || !total) {
      const blob = await resp.blob();
      if (cache) await cache.put(url, new Response(blob.slice(0)));
      onProg && onProg({ stage: 'download', percent: 1 });
      return blob;
    }
    const reader = resp.body.getReader();
    const chunks = [];
    let loaded = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.length;
      onProg && onProg({ stage: 'download', percent: loaded / total, loaded, total });
    }
    const blob = new Blob(chunks, { type: resp.headers.get('Content-Type') || 'application/octet-stream' });
    if (cache) {
      try { await cache.put(url, new Response(blob.slice(0))); } catch {} // 隐私模式下可能失败，忽略
    }
    return blob;
  }

  /** 后台预取引擎：下载并缓存 core.js + core.wasm，返回 {coreURL, wasmURL}（blob: 或直连） */
  function prefetch() {
    if (prefetchPromise) return prefetchPromise;
    prefetchPromise = (async () => {
      const base = new URL('assets/vendor/ffmpeg/', document.baseURI).href;
      const coreURL0 = base + 'ffmpeg-core.js';
      const wasmURL0 = base + 'ffmpeg-core.wasm';
      const cache = ('caches' in window) ? await caches.open(CACHE_NAME).catch(() => null) : null;
      emitProgress({ stage: 'start', percent: 0 });
      const coreBlob = await fetchAsset(coreURL0, cache, p => emitProgress({ ...p, asset: 'core' }));
      emitProgress({ stage: 'core-done', percent: 0.02 });
      const wasmBlob = await fetchAsset(wasmURL0, cache, p => emitProgress({
        ...p, asset: 'wasm',
        // wasm 占总量的 98%
        percent: p.stage === 'cache' ? 1 : 0.02 + p.percent * 0.98,
        loaded: p.loaded, total: p.total,
      }));
      emitProgress({ stage: 'ready', percent: 1 });
      return {
        coreURL: URL.createObjectURL(coreBlob),
        wasmURL: URL.createObjectURL(wasmBlob),
      };
    })();
    prefetchPromise.catch(() => { prefetchPromise = null; });
    return prefetchPromise;
  }

  /** 加载引擎（幂等）。优先使用预取的缓存，失败回退直连 URL。 */
  function load() {
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      let urls;
      try {
        urls = await prefetch();
      } catch {
        const base = new URL('assets/vendor/ffmpeg/', document.baseURI).href;
        urls = { coreURL: base + 'ffmpeg-core.js', wasmURL: base + 'ffmpeg-core.wasm' };
      }
      const { FFmpeg } = FFmpegWASM;
      ffmpeg = new FFmpeg();
      ffmpeg.on('log', ({ message }) => pushLog(message));
      ffmpeg.on('progress', ({ progress }) => {
        progressSink && progressSink(Math.max(0, Math.min(1, progress || 0)));
      });
      const classWorkerURL = new URL('assets/vendor/ffmpeg/worker.js', document.baseURI).href;
      try {
        await ffmpeg.load({ ...urls, classWorkerURL });
      } catch (e) {
        // blob URL 在个别内核的 module worker 里不可动态 import，回退直连
        const base = new URL('assets/vendor/ffmpeg/', document.baseURI).href;
        await ffmpeg.load({
          coreURL: base + 'ffmpeg-core.js',
          wasmURL: base + 'ffmpeg-core.wasm',
          classWorkerURL,
        });
      }
      urls.coreURL && urls.coreURL.startsWith('blob:') && URL.revokeObjectURL(urls.coreURL);
      urls.wasmURL && urls.wasmURL.startsWith('blob:') && URL.revokeObjectURL(urls.wasmURL);
      return ffmpeg;
    })();
    loadPromise.catch(() => { loadPromise = null; });
    return loadPromise;
  }

  const isLoaded = () => !!loadPromise;
  const onEngineProgress = (fn) => { progressListeners.push(fn); return () => {
    progressListeners = progressListeners.filter(f => f !== fn);
  }; };

  function extOf(name) {
    const i = name.lastIndexOf('.');
    return i > 0 ? name.slice(i + 1).toLowerCase() : '';
  }

  /** 从 ffmpeg 探测日志里解析视频流码率 (kb/s) */
  function parseVideoBitrate(lines) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/: Video:/.test(lines[i])) {
        const m = lines[i].match(/(\d+)\s*kb\/s/);
        if (m) return Number(m[1]);
      }
    }
    const t = lines.join('\n').match(/bitrate:\s*(\d+)\s*kb\/s/);
    return t ? Number(t[1]) : null;
  }

  /** ffmpeg.wasm 0.12 的 exec 失败时也会正常 resolve（返回退出码），
   *  必须检查返回码，否则会去读不存在的输出文件。 */
  function checkExit(ret, stage) {
    if (ret === 0) return;
    const errLine = [...recentLogs].reverse().find(l =>
      /error|invalid|no such|unable|failed|not found|cannot|doesn't|denied/i.test(l));
    throw new Error(errLine ? errLine.slice(0, 200) : `FFmpeg 处理失败（${stage}，exit ${ret}）`);
  }

  /** exec 失败可能污染 wasm 实例（典型症状：后续报 memory access out of
   *  bounds），因此失败后终止并重建引擎，保证下一次转换正常。 */
  async function resetEngine() {
    try { ffmpeg && ffmpeg.terminate(); } catch {}
    ffmpeg = null;
    loadPromise = null;
  }

  /** 公共执行流程：写输入 → exec → 读输出 → 清理 */
  async function runFFmpeg(file, args, outName, mime, onProgress) {
    const ff = await load();
    const inName = 'in_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + '.' + (extOf(file.name) || 'bin');
    await ff.writeFile(inName, await FFmpegUtil.fetchFile(file));
    try {
      progressSink = onProgress || null;
      const ret = await ff.exec(['-i', inName, ...args, outName]);
      checkExit(ret, '转码');
      const data = await ff.readFile(outName);
      if (!data || !data.length) throw new Error('FFmpeg 输出为空');
      return new Blob([data.buffer || data], { type: mime });
    } catch (e) {
      await resetEngine();
      throw e;
    } finally {
      progressSink = null;
      ff.deleteFile(inName).catch(() => {});
      ff.deleteFile(outName).catch(() => {});
    }
  }

  /** 视频转换（video 工具） */
  async function convertVideo(file, opts, onProgress) {
    const target = opts.target;
    let outName = AK_SITE.stripExt(file.name) + '.' + (OUT_EXT[target] || target);
    let args = ['-y'];

    if (target === 'gif') {
      const fps = opts.fps || 12;
      const w = opts.vsize ? opts.vsize.split('x')[0] : 480;
      args.push(
        '-filter_complex',
        `fps=${fps},scale=${w}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        '-loop', '0'
      );
    } else {
      args.push(...(VIDEO_ARGS[target] || VIDEO_ARGS.mp4));
      if (target === '3gp' || target === '3g2') {
        // h263 只接受标准尺寸，按所选分辨率就近取档
        args.push('-vf', 'scale=' + h263Size(opts.vsize));
      } else if (opts.vsize) {
        args.push('-vf', 'scale=' + opts.vsize);
      }
      if (opts.vbitrate) args.push('-b:v', opts.vbitrate);
      if (opts.fps) args.push('-r', opts.fps);
      if (opts.abitrate && !opts.noaudio) args.push('-b:a', opts.abitrate);
      if (opts.noaudio) args.push('-an');
    }
    const blob = await runFFmpeg(file, args, outName, V_MIME[target] || 'application/octet-stream', onProgress);
    return { blob, name: outName };
  }

  /** 音频转换（audio 工具，也可从视频提取音轨） */
  async function convertAudio(file, opts) {
    const target = opts.target;
    const outName = AK_SITE.stripExt(file.name) + '.' + target;
    const args = ['-y', ...(VIDEO_EXT.has(extOf(file.name)) ? ['-vn'] : []), ...(AUDIO_ARGS[target] || AUDIO_ARGS.mp3)];
    if (opts.abitrate) args.push('-b:a', opts.abitrate);
    if (opts.sampling) args.push('-ar', opts.sampling);
    if (opts.channels) args.push('-ac', opts.channels);
    const blob = await runFFmpeg(file, args, outName, A_MIME[target] || 'application/octet-stream');
    return { blob, name: outName };
  }

  /** 视频压缩（compress-video 工具）→ mp4 */
  async function compressVideo(file, opts, onStatus, onProgress) {
    onStatus && onStatus('读取媒体信息…');
    const logLines = [];
    logSink = (l) => logLines.push(l);
    try {
      const ff = await load();
      const probeName = 'probe_' + file.name.replace(/[^\w.-]/g, '_');
      await ff.writeFile(probeName, await FFmpegUtil.fetchFile(file));
      try {
        await ff.exec(['-i', probeName]);
      } catch { /* 无输出文件的 -i 一定会退出非零，日志已拿到 */ }
      ff.deleteFile(probeName).catch(() => {});
    } finally {
      logSink = null;
    }

    let srcBitrate = parseVideoBitrate(logLines);
    const percent = Math.max(5, Math.min(100, Number(opts.percent) || 60));
    const targetV = srcBitrate ? Math.max(50, Math.round(srcBitrate * percent / 100)) + 'k' : null;

    onStatus && onStatus(srcBitrate
      ? `源码率约 ${srcBitrate} kb/s，目标 ${targetV}`
      : '未能解析源码率，改用质量模式压缩');

    const args = ['-y', '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p'];
    if (targetV) args.push('-b:v', targetV); else args.push('-crf', '28');
    const audio = opts.audiomode || 'keep';
    if (audio === 'remove') args.push('-an');
    else if (audio === 'compress') args.push('-c:a', 'aac', '-b:a', targetV || '128k');
    else args.push('-c:a', 'aac', '-b:a', '128k');
    args.push('-movflags', '+faststart');

    const outName = AK_SITE.stripExt(file.name) + '_compressed.mp4';
    const blob = await runFFmpeg(file, args, outName, 'video/mp4', onProgress);
    return { blob, name: outName, info: srcBitrate ? `源 ${srcBitrate}kb/s → 目标 ${targetV}` : '质量模式 CRF28' };
  }

  /** 音频压缩（compress-audio 工具）→ mp3 */
  async function compressAudio(file, opts) {
    const abitrate = opts.abitrate || '96k';
    const outName = AK_SITE.stripExt(file.name) + '_compressed.mp3';
    const args = ['-y', ...(VIDEO_EXT.has(extOf(file.name)) ? ['-vn'] : []),
      '-c:a', 'libmp3lame', '-b:a', abitrate];
    if (opts.sampling) args.push('-ar', opts.sampling);
    const blob = await runFFmpeg(file, args, outName, 'audio/mpeg');
    return { blob, name: outName, info: `目标码率 ${abitrate}` };
  }

  return {
    load, prefetch, isLoaded, onEngineProgress,
    convertVideo, convertAudio, compressVideo, compressAudio,
  };
})();
