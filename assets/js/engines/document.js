/* =====================================================================
 * 文档引擎：pdf.js 3.11 — PDF 每页渲染为图片，多页输出
 * ===================================================================*/

const AKDocument = (() => {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    new URL('assets/vendor/pdfjs/pdf.worker.min.js', document.baseURI).href;

  const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

  /* rAF 垫片：后台/隐藏标签页中 requestAnimationFrame 会被暂停，而 pdf.js
   * 的渲染循环依赖它调度下一帧，会因此永远挂起。16ms 的 setTimeout 行为与
   * rAF 等价（60fps 节奏），对其他代码无副作用。 */
  if (typeof window !== 'undefined' && !window.__akRafPatched) {
    window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
    window.__akRafPatched = true;
  }

  /**
   * 图片目标：每页一张图，返回数组
   * @returns {Promise<Array<{name:string, blob:Blob}>>}
   */
  async function convert(file, opts, onPage) {
    const target = opts.target in MIME ? opts.target : 'png';
    const dpi = Math.max(36, Math.min(600, Number(opts.dpi) || 144));
    const quality = Math.min(1, Math.max(0.3, (Number(opts.quality) || 90) / 100));
    const scale = dpi / 72;

    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const base = AK_SITE.stripExt(file.name);
    const out = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
      const blob = await new Promise(res => canvas.toBlob(res, MIME[target], quality));
      out.push({ name: `${base}-page${i}.${target}`, blob });
      page.cleanup();
      onPage && onPage(i, pdf.numPages);
      canvas.width = canvas.height = 0;
    }
    return out;
  }

  /** TXT 目标：提取 PDF 全文为单个文本文件 */
  async function extractText(file, onPage) {
    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      // 按 transform Y 坐标分行、X 排序，尽量还原阅读顺序
      const lines = new Map();
      for (const item of content.items) {
        if (!item.str) continue;
        const y = Math.round(item.transform[5]);
        if (!lines.has(y)) lines.set(y, []);
        lines.get(y).push({ x: item.transform[4], str: item.str });
      }
      const sorted = [...lines.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([, parts]) => parts.sort((a, b) => a.x - b.x).map(p => p.str).join(' '));
      pages.push(`第 ${i} 页\n${'─'.repeat(24)}\n${sorted.join('\n')}`);
      page.cleanup();
      onPage && onPage(i, pdf.numPages);
    }
    const text = pages.join('\n\n');
    return [{
      name: AK_SITE.stripExt(file.name) + '.txt',
      blob: new Blob([text], { type: 'text/plain;charset=utf-8' }),
    }];
  }

  return { convert, extractText };
})();
