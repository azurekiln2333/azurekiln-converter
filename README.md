# AzureKiln Converter — 浏览器本地离线转换器

在浏览器本地完成图片 / 视频 / 音频 / 文档转换与音视频压缩，文件全程不上传服务器。
UI 与主站 [azurekiln-main-site](https://azurekiln.cn/) 的 `main.php` 保持同一套视觉规范
（Tailwind + MD3 色板、Material Symbols、`#005ab7` 主色）。

## 目录结构

```
azurekiln-converter/
├── index.html              门户首页（工具入口、离线 vs 在线对比、格式一览）
├── convert.html            转换器页（六个工具共用一页，?type= 切换）
├── formats.html            支持格式大全（65 种格式 + 转换关系）
├── faq.html                常见问题
├── assets/
│   ├── tailwind.js         Tailwind 运行时（与主站同一份）
│   ├── tailwind.config.js  MD3 色板 / 字体 token（与主站同一份）
│   ├── css/site.css        附加样式（表格、拖放区、toast 等）
│   ├── js/
│   │   ├── app.js          公共页头页脚 / toast / 下载工具
│   │   ├── data.js         格式注册表 + 工具配置 + FAQ 数据
│   │   ├── index.js / formats.js / convert.js   各页面逻辑
│   │   └── engines/        转换引擎
│   │       ├── image.js     图片：canvas 快速通道 + ImageMagick worker
│   │       ├── media.js     音视频：FFmpeg.wasm（转码 / 压缩 / 提取音轨）
│   │       └── document.js  文档：pdf.js（PDF → JPG/PNG/WEBP，多页输出）
│   └── vendor/             本地化依赖（无任何 CDN 运行时依赖）
│       ├── ffmpeg/          @ffmpeg/ffmpeg 0.12.10 + core 0.12.6 (ESM, 32MB)
│       ├── imagemagick/     image-esm.js（wasm 内嵌）+ im-worker.js
│       ├── pdfjs/           pdf.js 3.11.174
│       └── jszip.min.js     ZIP 打包
├── tests/                  自测样例文件（sample.png / sample.mp4 / sample.pdf / sample.wav / real.pdf）
├── dev-server.js           本地预览静态服务器（node dev-server.js [端口]）
└── _legacy/                旧版 89 个 HTML / PHP / 旧引擎（已归档，可整体删除）
```

## 本地预览

```
node dev-server.js 8077
# 打开 http://127.0.0.1:8077/
```

不要用 file:// 直接打开 —— Worker / wasm 需要走 HTTP。

## 部署

整站为纯静态文件，把项目目录（不含 `_legacy/`、`tests/`、`dev-server.js`）
放到任意 Web 服务器目录即可，例如主站下 `/converter/`：

- nginx：`location /converter/ { alias /path/to/azurekiln-converter/; }`
- 或直接拷贝到站点子目录。

所有资源均为相对路径引用，部署在任意子路径都能正常工作。
无需 PHP / 数据库。

## 功能与引擎

| 工具 | 引擎 | 说明 |
|------|------|------|
| 图片转换 | canvas + ImageMagick.wasm | 常规格式毫秒级（canvas），HEIC/PSD/RAW 等 40+ 格式走 ImageMagick worker |
| 视频转换 | FFmpeg.wasm 0.12 | MP4/MKV/MOV/WEBM/AVI/FLV/WMV/MPG/M2TS/VOB/ASF/OGV/GIF，支持分辨率/码率/帧率/音轨参数 |
| 音频转换 | FFmpeg.wasm 0.12 | MP3/WAV/OGG/AAC/M4A/FLAC/OPUS/WMA/AIFF/AU/MKA，可从视频提取音轨 |
| 文档转换 | pdf.js | PDF 每页 → JPG/PNG/WEBP，多页自动编号 |
| 视频压缩 | FFmpeg.wasm | 按源码率百分比压缩，解析失败时回退 CRF 质量模式 |
| 音频压缩 | FFmpeg.wasm | 目标码率重编码为 MP3 |

- 多文件批量转换，结果可逐个下载或打包 ZIP。
- 首次使用视频/音频工具需加载约 32MB FFmpeg 引擎，之后走浏览器缓存。
- 所有转换在浏览器内完成，无任何上传逻辑。

## 已知边界

- RealAudio（RA）、SWF 无开源编码器，不提供输出；HEIC/DNG/CR2/ARW 仅支持读取。
- 视频压缩的码率百分比基于 ffmpeg 探测的容器/视频流码率估算。
- 需要支持 WebAssembly 的现代浏览器（Chrome/Edge 90+、Firefox 90+、Safari 15+）。

## 运维备忘（踩过的坑）

1. **ffmpeg.wasm 0.12 的 `exec()` 失败时 resolve 而非 reject**（返回退出码），
   必须检查返回码，否则会去读不存在的输出文件报 "FS error"（见 `media.js` 的 `checkExit`）。
2. **module worker 场景必须用 ESM 版 ffmpeg-core**（`dist/esm/`），UMD 版没有
   default 导出，动态 import 后 `createFFmpegCore` 为空（见 vendor/ffmpeg/）。
3. **ImageMagick wasm 返回的 Uint8Array 指向 wasm 堆内存**，`postMessage` 转移前必须
   `slice()` 拷贝（见 `im-worker.js`）。
4. **后台/隐藏标签页中 rAF 会被暂停，pdf.js 渲染循环会永远挂起**，
   `document.js` 中用 16ms setTimeout 垫片替换 rAF。

以上问题均已在代码内就地注释说明。
