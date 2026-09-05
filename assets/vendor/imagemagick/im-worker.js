/* ImageMagick WASM 转换 Worker（module worker）
 * image-esm.js 内嵌了 base64 编码的 wasm，无需额外二进制文件。
 * 注意：此构建的 MagickImage.write 签名为 write(callback, format)。
 */
import { initializeImageMagick, ImageMagick, MagickFormat } from './image-esm.js';

const ready = initializeImageMagick();

/** ext（小写）→ MagickFormat 枚举值，如 'jpg' → 'JPG' */
function toFormat(ext) {
  const key = ext[0].toUpperCase() + ext.slice(1).toLowerCase();
  if (!MagickFormat[key]) throw new Error(`ImageMagick 不支持输出格式 ${ext.toUpperCase()}`);
  return MagickFormat[key];
}

self.onmessage = async (e) => {
  const { id, payload } = e.data;
  const t0 = performance.now();
  try {
    await ready;
    const { bytes, target, width, height, quality } = payload;
    const out = await new Promise((resolve, reject) => {
      ImageMagick.read(new Uint8Array(bytes), (img) => {
        try {
          // 尺寸：宽高都填则强制缩放；只填其一时保持纵横比
          if (width || height) {
            let w = width ? Number(width) : null;
            let h = height ? Number(height) : null;
            if (!w) w = Math.round(h * img.width / img.height);
            if (!h) h = Math.round(w * img.height / img.width);
            img.resize(w, h);
          }
          if (quality) img.quality = Math.min(100, Math.max(1, Number(quality)));
          img.write(
            (data) => (data && data.length ? resolve(data) : reject(new Error('输出为空'))),
            toFormat(target)
          );
        } catch (err) { reject(err); }
      });
    });
    // ImageMagick 返回的视图可能直接指向 wasm 堆内存，不可转移，需先拷贝
    const copy = out.slice();
    self.postMessage({ id, ok: true, data: copy.buffer, ms: Math.round(performance.now() - t0) }, [copy.buffer]);
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err && err.message) || err), ms: Math.round(performance.now() - t0) });
  }
};
