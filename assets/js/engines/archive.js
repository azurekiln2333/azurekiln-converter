/* =====================================================================
 * ZIP 引擎：基于 JSZip（纯 JS，无需 wasm）
 * ===================================================================*/

const AKArchive = (() => {
  /** 打包：files(File[]) → {blob, name}，onProgress 0..1 */
  async function pack(files, onProgress) {
    const zip = new JSZip();
    const used = {};
    for (const f of files) {
      let name = f.name;
      if (used[name]) name = name.replace(/(\.[^.]*)$/, `(${used[f.name]})$1`);
      used[f.name] = (used[f.name] || 0) + 1;
      zip.file(name, f);
    }
    const blob = await zip.generateAsync(
      { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
      (meta) => onProgress && onProgress(meta.percent / 100)
    );
    const name = files.length === 1
      ? AK_SITE.stripExt(files[0].name) + '.zip'
      : `archive-${files.length}files.zip`;
    return { blob, name };
  }

  /** 解压：File(zip) → [{name, blob}]，onProgress 0..1 */
  async function unpack(file, onProgress) {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const entries = Object.values(zip.files).filter(e => !e.dir);
    const out = [];
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      const blob = await e.async('blob');
      out.push({ name: e.name.split('/').pop() || e.name, path: e.name, blob });
      onProgress && onProgress((i + 1) / entries.length);
    }
    if (!out.length) throw new Error('ZIP 中没有可解压的文件');
    return out;
  }

  return { pack, unpack };
})();
