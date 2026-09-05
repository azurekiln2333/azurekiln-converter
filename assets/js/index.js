/* =====================================================================
 * index.html 页面渲染：工具卡片 / 隐私要点
 * ===================================================================*/

document.addEventListener('DOMContentLoaded', () => {
  AK_SITE.renderHeader('index');
  AK_SITE.renderFooter();

  /* ── 工具卡片 ── */
  const toolsHost = document.querySelector('#tools-grid .grid');
  const descShort = {
    image: 'JPG / PNG / WEBP / HEIC / PSD 等四十余种图片格式互转。',
    video: 'MP4 / MKV / WEBM / MOV 等主流视频格式本地转码。',
    audio: 'MP3 / WAV / FLAC / M4A 等音频格式转换与音轨提取。',
    document: '将 PDF 逐页渲染为 JPG / PNG / WEBP 图片。',
    'compress-video': '降低视频码率，显著缩小文件体积。',
    'compress-audio': '降低音频码率，快速压缩音乐与录音。',
  };
  toolsHost.innerHTML = Object.entries(AK_TOOLS).filter(([k]) => k !== 'pairsFor').map(([key, t]) => `
    <a href="convert.html?type=${key}"
      class="group bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div class="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-[#005ab7] group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <span class="material-symbols-outlined text-[26px]">${t.icon}</span>
        </div>
        <span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
      </div>
      <div>
        <h3 class="font-headline text-lg font-bold text-on-surface mb-1.5">${t.label}</h3>
        <p class="text-sm text-secondary leading-relaxed">${descShort[key] || t.desc}</p>
      </div>
    </a>`).join('');

  /* ── 隐私要点 ── */
  const trust = [
    { icon: 'lock', title: '文件零上传', desc: '所有转换由浏览器内的 WebAssembly 引擎完成，文件从未离开你的设备，无隐私泄露风险。' },
    { icon: 'speed', title: '本地高速处理', desc: '转换速度只取决于你的 CPU，不受服务器排队与上传下载带宽限制，大文件也从容应对。' },
    { icon: 'all_inclusive', title: '免费且无限制', desc: '不限转换次数与时长，无需注册登录，打开页面即可使用全部功能。' },
  ];
  document.querySelector('#trust-grid').innerHTML = trust.map(t => `
    <div class="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-7 text-center">
      <div class="w-12 h-12 mx-auto rounded-2xl bg-primary/5 flex items-center justify-center text-[#005ab7] mb-4">
        <span class="material-symbols-outlined text-[26px]">${t.icon}</span>
      </div>
      <h3 class="font-headline text-base font-bold text-on-surface mb-2">${t.title}</h3>
      <p class="text-sm text-secondary leading-relaxed">${t.desc}</p>
    </div>`).join('');
});
