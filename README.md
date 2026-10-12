# AzureKiln Converter — 浏览器本地离线转换器

在浏览器本地完成图片 / 视频 / 音频 / 文档转换、音视频压缩与 ZIP 打包解压，文件全程不上传服务器。
UI 与主站 [azurekiln-main-site](https://azurekiln.cn/) 的 `main.php` 保持同一套视觉规范
（Tailwind + MD3 色板、Material Symbols、`#005ab7` 主色）。

## 目录结构

```
azurekiln-converter/
├── index.html              门户首页（工具入口、离线 vs 在线对比、格式一览）
├── convert.html            转换器页（八个工具共用一页，?type= 切换）
├── formats.html            支持格式大全（133 项格式 + 转换关系）
├── faq.html                常见问题
├── assets/
│   ├── tailwind.js         Tailwind 运行时（与主站同一份）
│   ├── tailwind.config.js  MD3 色板 / 字体 token（与主站同一份）
│   ├── css/site.css        附加样式（表格、拖放区、toast 等）
│   ├── js/
│   │   ├── app.js          公共页头页脚 / toast / 下载工具
│   │   ├── data.js         格式注册表 + 工具配置 + FAQ 数据（能力均经引擎实测）
│   │   ├── index.js / formats.js / convert.js   各页面逻辑
│   │   └── engines/        转换引擎
│   │       ├── image.js     图片：canvas 快速通道 + ImageMagick worker
│   │       ├── media.js     音视频：FFmpeg.wasm（缓存/预取/进度 + 转码/压缩）
│   │       ├── document.js  文档：pdf.js（PDF → JPG/PNG/WEBP/TXT）
│   │       └── archive.js   ZIP：JSZip 打包 / 解压
│   └── vendor/             本地化依赖（无任何 CDN 运行时依赖）
│       ├── ffmpeg/          @ffmpeg/ffmpeg 0.12.10 + core 0.12.6 (ESM, 32MB)
│       ├── imagemagick/     image-esm.js（wasm 内嵌）+ im-worker.js
│       ├── pdfjs/           pdf.js 3.11.174
│       └── jszip.min.js     ZIP 打包解压
├── tests/                  自测样例文件（png / mp4 / pdf / wav / 真实 pdf）
├── dev-server.js           本地预览静态服务器（node dev-server.js [端口]）
```

## 本地预览

```
node dev-server.js 8077
# 打开 http://127.0.0.1:8077/
```

不要用 file:// 直接打开 —— Worker / wasm 需要走 HTTP。
Cache Storage（引擎持久缓存）在 localhost 与 https 下可用。

## 部署

整站为纯静态文件，把项目目录（不含 `tests/`、`dev-server.js`）
放到任意 Web 服务器目录即可，例如主站下 `/converter/`：

- nginx：`location /converter/ { alias /path/to/azurekiln-converter/; }`
- 或直接拷贝到站点子目录。

所有资源均为相对路径引用，部署在任意子路径都能正常工作。
无需 PHP / 数据库。注意：若通过非 localhost 的 http 访问，FFmpeg 引擎无法持久缓存
（浏览器限制），但功能不受影响，只是每次会话需重新下载。

## 功能与引擎

| 工具 | 引擎 | 说明 |
|------|------|------|
| 图片转换 | canvas + ImageMagick.wasm | 常规格式毫秒级（canvas），HEIC/相机 RAW/PSD/XCF/DICOM 等 85 种格式走 ImageMagick worker |
| 视频转换 | FFmpeg.wasm 0.12 | MP4/MKV/MOV/WEBM/AVI/FLV/F4V/WMV/MPG/3GP/3G2/TS/M2TS/VOB/ASF/OGV/MXF/ProRes(.mov)/GIF |
| 音频转换 | FFmpeg.wasm 0.12 | MP3/WAV/OGG/AAC/M4A/M4B/FLAC/OPUS/WMA/AIFF/AU/MKA/AC3/EAC3/DTS/CAF(ALAC)/TTA/WV，可从视频提取音轨 |
| 文档转换 | pdf.js | PDF 每页 → JPG/PNG/WEBP（多页自动编号）；PDF → TXT 全文提取 |
| 视频压缩 | FFmpeg.wasm | 按源码率百分比压缩，解析失败时回退 CRF 质量模式 |
| 音频压缩 | FFmpeg.wasm | 目标码率重编码为 MP3 |
| ZIP 打包 | JSZip | 任意文件 → 单个 ZIP，带进度 |
| ZIP 解压 | JSZip | ZIP → 文件列表，可逐个下载或重新打包 |

### 格式能力说明

注册表里的每一项能力都经过引擎实测，不是抄来的清单：

- 图片读写在 Node 里枚举 ImageMagick 的 `MagickFormatInfo.all`（260 项）得出；
- 音视频编解码能力来自在 Node 里运行 FFmpeg core 的 `-encoders` / `-decoders` / `-formats`。

由此得到的一些边界（均可在 formats.html 页面查看）：

- 相机 RAW（CR3/NEF/RAF/ORF/RW2/PEF 等 20 种）**仅支持读取**（解码复杂、编码无人用）；
- RM/RMVB/SWF **仅支持读取**（RealVideo/Cook/FlashSV 解码器在，但无开源编码器）；
- APE/MPC/RA/SPX/VOC/W64/GSM **仅支持读取**；
- AMR 完全不支持（该构建连解码器都没有）；
- 3GP/3G2 用 H.263 编码，只接受 5 档标准尺寸（176x144 等），分辨率选项会自动就近取档。

### 与市面在线转换器的对比

- 覆盖了主流站点（aconvert / cloudconvert / freeconvert）的图片、视频、音频、PDF、压缩包类别；
- 电子书（EPUB/MOBI）、Office 文档（DOCX/XLSX）、字体（TTF/WOFF2）、CAD 属服务端大引擎
  （Calibre / LibreOffice / fontkit，数百 MB）领域，纯浏览器本地方案不覆盖，页内 FAQ 已注明。

## FFmpeg 引擎加载策略（为什么/如何）

视频与音频转换在浏览器内用 WebAssembly 完成，引擎本体（32MB wasm）必须下载一次——
这是"本地转换、文件不上传"的代价，没有绕开它的办法（绕开=把文件传给服务器）。
本项目把这次下载做得尽量无感：

1. 进入视频/音频工具页时**立即后台预取**，下载与页面操作并行；
2. 下载过程显示**实时进度条**（百分比）；
3. 下载完成后写入 **Cache Storage 永久缓存**——下次打开直接从缓存读，秒级就绪；
4. 加载失败自动回退直连 URL；图片、文档、ZIP 工具完全不依赖该引擎。

## 运维备忘（踩过的坑）

1. **ffmpeg.wasm 0.12 的 `exec()` 失败时 resolve 而非 reject**（返回退出码），
   必须检查返回码，否则会去读不存在的输出文件报 "FS error"（见 `media.js` 的 `checkExit`）。
2. **失败的 exec 会污染 wasm 实例**（后续转换报 memory access out of bounds），
   捕获到异常后必须 terminate 并重建引擎（见 `media.js` 的 `resetEngine`）。
3. **module worker 场景必须用 ESM 版 ffmpeg-core**（`dist/esm/`），UMD 版没有
   default 导出，动态 import 后 `createFFmpegCore` 为空（见 vendor/ffmpeg/）。
4. **ImageMagick wasm 返回的 Uint8Array 指向 wasm 堆内存**，`postMessage` 转移前必须
   `slice()` 拷贝（见 `im-worker.js`）。
5. **后台/隐藏标签页中 rAF 会被暂停，pdf.js 渲染循环会永远挂起**，
   `document.js` 中用 16ms setTimeout 垫片替换 rAF。
6. **H.263（3GP/3G2）只接受标准尺寸**，任意尺寸会报 "Error while opening encoder"。

以上问题均已在代码内就地注释说明。

## 开发约定

- 每次改动前先 `git commit` 留档，改动按功能逐个提交，方便回滚。
