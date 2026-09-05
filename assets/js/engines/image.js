/* =====================================================================
 * 图片转换引擎：canvas 快速通道 + ImageMagick WASM（module worker）
 * ===================================================================*/

const AKImage = (() => {
  const CANVAS_MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
  const MIME = Object.assign({
    avif: 'image/avif', gif: 'image/gif', bmp: 'image/bmp', tiff: 'image/tiff',
    ico: 'image/x-icon', psd: 'image/vnd.adobe.photoshop', dds: 'image/vnd-ms.dds',
    jp2: 'image/jp2', ps: 'application/postscript', eps: 'application/postscript',
    pdf: 'application/pdf', qoi: 'image/qoi', tga: 'image/x-tga', pcx: 'image/x-pcx',
    sgi: 'image/sgi', hdr: 'image/vnd.radiance', exr: 'image/x-exr', mng: 'video/x-mng',
  }, CANVAS_MIME);

  let worker = null;
  let seq = 0;

  /** 惰性创建 ImageMagick module worker */
  function getWorker() {
    if (!worker) {
      worker = new Worker(
        new URL('assets/vendor/imagemagick/im-worker.js', document.baseURI).href,
        { type: 'module' }
      );
    }
    return worker;
  }

  function callWorker(payload, transfer) {
    return new Promise((resolve, reject) => {
      const id = ++seq;
      const w = getWorker();
      const onmsg = (e) => {
        if (e.data.id !== id) return;
        w.removeEventListener('message', onmsg);
        e.data.ok ? resolve(e.data) : reject(new Error(e.data.error || '转换失败'));
      };
      w.addEventListener('message', onmsg);
      w.postMessage({ id, payload }, transfer);
    });
  }

  /** canvas 快速通道：jpg/jpeg/png/webp 输出且浏览器可解码输入 */
  async function tryCanvas(file, opts) {
    if (!(opts.target in CANVAS_MIME)) return null;
    // gif/svg 等交给 ImageMagick，避免丢动画或解码失败
    if (/\.(gif|svg)$/i.test(file.name)) return null;
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch { return null; }
    try {
      const w = opts.width ? Number(opts.width) : (opts.height ? null : bitmap.width);
      const h = opts.height ? Number(opts.height) : (w ? Math.round(w * bitmap.height / bitmap.width) : bitmap.height);
      const cw = w || Math.round(h * bitmap.width / bitmap.height);
      const canvas = document.createElement('canvas');
      canvas.width = cw; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0, cw, h);
      const q = opts.quality ? Math.min(1, Number(opts.quality) / 100) : undefined;
      const blob = await new Promise(res => canvas.toBlob(res, CANVAS_MIME[opts.target], q));
      return blob;
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  /**
   * 转换单个图片文件
   * @returns {Promise<{blob: Blob, via: string, ms: number}>}
   */
  async function convert(file, opts, onStatus) {
    onStatus && onStatus('开始转换…');
    const t0 = performance.now();

    // 1) 常规格式优先走 canvas（毫秒级）
    try {
      const blob = await tryCanvas(file, opts);
      if (blob && blob.size > 0) {
        onStatus && onStatus('canvas');
        return { blob, via: 'canvas', ms: Math.round(performance.now() - t0) };
      }
    } catch { /* 落入 ImageMagick */ }

    // 2) ImageMagick WASM（支持 40+ 输入输出格式）
    onStatus && onStatus('加载 ImageMagick 引擎…');
    const bytes = await file.arrayBuffer();
    const { data, ms } = await callWorker({
      bytes, target: opts.target,
      width: opts.width, height: opts.height, quality: opts.quality,
    }, [bytes]);
    onStatus && onStatus('imagemagick');
    return {
      blob: new Blob([data], { type: MIME[opts.target] || 'application/octet-stream' }),
      via: 'imagemagick', ms,
    };
  }

  return { convert, mimeFor: (t) => MIME[t] || 'application/octet-stream' };
})();
