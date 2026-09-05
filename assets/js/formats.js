/* =====================================================================
 * formats.html 页面渲染：按类别分组的格式表 + 展开详情
 * ===================================================================*/

document.addEventListener('DOMContentLoaded', () => {
  AK_SITE.renderHeader('formats');
  AK_SITE.renderFooter();

  const groups = [
    { type: 'image', label: '图片格式', icon: 'image' },
    { type: 'video', label: '视频格式', icon: 'movie' },
    { type: 'audio', label: '音频格式', icon: 'volume_up' },
    { type: 'document', label: '文档格式', icon: 'description' },
  ];

  const badge = (on, okText) => on
    ? `<span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-[#005ab7]">${okText}</span>`
    : `<span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-surface-container-high text-outline">—</span>`;

  const host = document.getElementById('format-groups');

  host.innerHTML = groups.map(g => {
    const list = AK_FORMATS.filter(f => f.type === g.type);
    return `
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-[#005ab7]">
          <span class="material-symbols-outlined">${g.icon}</span>
        </div>
        <h2 class="font-headline text-xl font-bold text-on-surface">${g.label}</h2>
        <span class="text-xs text-secondary font-medium ml-1">${list.length} 种</span>
      </div>
      <div class="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 overflow-hidden">
        <table class="ak-table">
          <thead>
            <tr><th style="width:3rem">#</th><th>格式</th><th>全称</th><th>可读取</th><th>可输出</th><th></th></tr>
          </thead>
          <tbody>
            ${list.map((f, i) => `
            <tr data-fmt="${f.ext}" class="cursor-pointer" onclick="AKtoggleFormat('${f.ext}')">
              <td class="text-secondary">${i + 1}</td>
              <td class="font-bold text-[#005ab7]">${f.name}</td>
              <td class="text-on-surface-variant">${f.full}</td>
              <td>${badge(f.read, '可读取')}</td>
              <td>${badge(f.write, '可输出')}</td>
              <td class="text-right">
                <span class="material-symbols-outlined text-[18px] text-outline ak-faq-chevron">expand_more</span>
              </td>
            </tr>
            <tr data-detail="${f.ext}" style="display:none">
              <td colspan="6" class="bg-surface-container-low/50" id="detail-${f.ext}"></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }).join('');
});

/** 展开 / 收起格式详情（内联 onclick 使用） */
function AKtoggleFormat(ext) {
  const row = document.querySelector(`tr[data-detail="${ext}"]`);
  if (!row) return;
  const open = row.style.display !== 'none';
  row.style.display = open ? 'none' : '';
  if (open) return;

  const f = AK_FORMATS.find(x => x.ext === ext);
  const pairs = AK_TOOLS.pairsFor(ext);
  const toolKey = f.type;
  const chip = e => `
    <a href="convert.html?type=${toolKey}&to=${e}"
      class="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/5 text-[#005ab7] text-xs font-bold hover:bg-primary/15 transition-colors">
      ${(AK_FORMATS.find(x => x.ext === e) || {}).name || e.toUpperCase()}
    </a>`;
  const section = (title, items, emptyText) => `
    <div class="min-w-[14rem]">
      <p class="text-[0.7rem] font-bold tracking-[0.15em] text-outline uppercase mb-3">${title}</p>
      <div class="flex flex-wrap gap-2">${items.length ? items.map(chip).join('') : `<span class="text-xs text-secondary">${emptyText}</span>`}</div>
    </div>`;

  document.getElementById('detail-' + ext).innerHTML = `
    <div class="py-3 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${section('可从这些格式转换而来（源 → ' + f.name + '）', pairs.from, '暂无')}
        ${section('可转换到这些格式（' + f.name + ' → 目标）', pairs.to, '该格式仅支持读取')}
      </div>
      <a href="convert.html?type=${toolKey}&to=${ext}"
        class="inline-flex items-center gap-1 text-sm font-bold text-[#005ab7] hover:gap-2 transition-all">
        打开${(AK_TOOLS[toolKey] || {}).label || '转换器'}
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </a>
    </div>`;
}
