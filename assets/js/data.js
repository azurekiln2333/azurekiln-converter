/* =====================================================================
 * AzureKiln 离线转换器 — 共享数据
 * 格式注册表 / 工具配置 / FAQ 内容（供 convert.html 与 formats.html 使用）
 *
 * 格式能力依据引擎实测得出：
 *  - 图片：ImageMagick wasm 构建的 MagickFormatInfo 全量矩阵（260 项）
 *  - 音视频：FFmpeg core 0.12.6 的 -encoders/-decoders/-formats 实测清单
 * 只注册引擎真实支持的读写能力，避免选中即失败。
 * ===================================================================*/

/** 全部支持的格式注册表
 *  read  : 能作为转换输入
 *  write : 能作为转换输出
 *  type  : image | video | audio | document
 */
const AK_FORMATS = [
  /* ── 图片（ImageMagick 引擎）──────────────────────────── */
  { ext: 'jpg',    name: 'JPG',    full: 'Joint Photographic Experts Group',        type: 'image', read: true,  write: true  },
  { ext: 'jpeg',   name: 'JPEG',   full: 'Joint Photographic Experts Group',        type: 'image', read: true,  write: true  },
  { ext: 'jpe',    name: 'JPE',    full: 'Joint Photographic Experts Group',        type: 'image', read: true,  write: true  },
  { ext: 'png',    name: 'PNG',    full: 'Portable Network Graphics',               type: 'image', read: true,  write: true  },
  { ext: 'apng',   name: 'APNG',   full: 'Animated Portable Network Graphics',      type: 'image', read: true,  write: true  },
  { ext: 'webp',   name: 'WEBP',   full: 'Weppy Image Format',                      type: 'image', read: true,  write: true  },
  { ext: 'gif',    name: 'GIF',    full: 'CompuServe Graphics Interchange Format',  type: 'image', read: true,  write: true  },
  { ext: 'svg',    name: 'SVG',    full: 'Scalable Vector Graphics',                type: 'image', read: true,  write: true  },
  { ext: 'avif',   name: 'AVIF',   full: 'AV1 Image File Format',                   type: 'image', read: true,  write: true  },
  { ext: 'heic',   name: 'HEIC',   full: 'High Efficiency Image File Format',       type: 'image', read: true,  write: false },
  { ext: 'heif',   name: 'HEIF',   full: 'High Efficiency Image Format',            type: 'image', read: true,  write: false },
  { ext: 'bmp',    name: 'BMP',    full: 'Microsoft Windows Bitmap',                type: 'image', read: true,  write: true  },
  { ext: 'tiff',   name: 'TIFF',   full: 'Tagged Image File Format',                type: 'image', read: true,  write: true  },
  { ext: 'tif',    name: 'TIF',    full: 'Tagged Image File Format',                type: 'image', read: true,  write: true  },
  { ext: 'tiff64', name: 'TIFF64', full: 'Tagged Image File Format (64-bit)',       type: 'image', read: true,  write: true  },
  { ext: 'psd',    name: 'PSD',    full: 'Adobe Photoshop Bitmap File',             type: 'image', read: true,  write: true  },
  { ext: 'psb',    name: 'PSB',    full: 'Adobe Photoshop Large Document',          type: 'image', read: true,  write: true  },
  { ext: 'dds',    name: 'DDS',    full: 'Microsoft Direct Draw Surface',           type: 'image', read: true,  write: true  },
  { ext: 'ico',    name: 'ICO',    full: 'Microsoft Icon',                          type: 'image', read: true,  write: true  },
  { ext: 'cur',    name: 'CUR',    full: 'Microsoft Cursor Icon',                   type: 'image', read: true,  write: true  },
  { ext: 'jp2',    name: 'JP2',    full: 'JPEG 2000',                               type: 'image', read: true,  write: true  },
  { ext: 'j2k',    name: 'J2K',    full: 'JPEG 2000 Code Stream Syntax',            type: 'image', read: true,  write: true  },
  { ext: 'jpc',    name: 'JPC',    full: 'JPEG 2000 Code Stream',                   type: 'image', read: true,  write: true  },
  { ext: 'jfif',   name: 'JFIF',   full: 'JPEG File Interchange Format',            type: 'image', read: true,  write: false },
  /* RAW 相机格式（仅读取） */
  { ext: 'dng',    name: 'DNG',    full: 'Digital Negative',                        type: 'image', read: true,  write: false },
  { ext: 'cr2',    name: 'CR2',    full: 'Canon RAW 2',                             type: 'image', read: true,  write: false },
  { ext: 'cr3',    name: 'CR3',    full: 'Canon RAW 3',                             type: 'image', read: true,  write: false },
  { ext: 'crw',    name: 'CRW',    full: 'Canon Raw Image Format',                  type: 'image', read: true,  write: false },
  { ext: 'nef',    name: 'NEF',    full: 'Nikon Digital SLR RAW',                   type: 'image', read: true,  write: false },
  { ext: 'nrw',    name: 'NRW',    full: 'Nikon Digital SLR RAW',                   type: 'image', read: true,  write: false },
  { ext: 'arw',    name: 'ARW',    full: 'Sony Digital Camera RAW',                 type: 'image', read: true,  write: false },
  { ext: 'raf',    name: 'RAF',    full: 'Fuji CCD-RAW',                            type: 'image', read: true,  write: false },
  { ext: 'orf',    name: 'ORF',    full: 'Olympus Digital Camera RAW',              type: 'image', read: true,  write: false },
  { ext: 'rw2',    name: 'RW2',    full: 'Panasonic Lumix RAW',                     type: 'image', read: true,  write: false },
  { ext: 'pef',    name: 'PEF',    full: 'Pentax Electronic File',                  type: 'image', read: true,  write: false },
  { ext: 'erf',    name: 'ERF',    full: 'Epson RAW Format',                        type: 'image', read: true,  write: false },
  { ext: 'mrw',    name: 'MRW',    full: 'Minolta Raw Image File',                  type: 'image', read: true,  write: false },
  { ext: 'sr2',    name: 'SR2',    full: 'Sony Raw Format 2',                       type: 'image', read: true,  write: false },
  { ext: 'srf',    name: 'SRF',    full: 'Sony Raw Format',                         type: 'image', read: true,  write: false },
  { ext: 'x3f',    name: 'X3F',    full: 'Sigma Camera RAW',                        type: 'image', read: true,  write: false },
  { ext: '3fr',    name: '3FR',    full: 'Hasselblad RAW',                          type: 'image', read: true,  write: false },
  { ext: 'dcr',    name: 'DCR',    full: 'Kodak Digital Camera RAW',                type: 'image', read: true,  write: false },
  { ext: 'kdc',    name: 'KDC',    full: 'Kodak Digital Camera RAW',                type: 'image', read: true,  write: false },
  { ext: 'mef',    name: 'MEF',    full: 'Mamiya Raw Image File',                   type: 'image', read: true,  write: false },
  { ext: 'raw',    name: 'RAW',    full: 'Raw Image Format',                        type: 'image', read: true,  write: false },
  /* 其他专业图像（仅读取） */
  { ext: 'xcf',    name: 'XCF',    full: 'GIMP Image',                              type: 'image', read: true,  write: false },
  { ext: 'dcm',    name: 'DCM',    full: 'DICOM Medical Image',                     type: 'image', read: true,  write: false },
  { ext: 'wpg',    name: 'WPG',    full: 'Word Perfect Graphics',                   type: 'image', read: true,  write: false },
  { ext: 'cut',    name: 'CUT',    full: 'DR Halo Image',                           type: 'image', read: true,  write: false },
  { ext: 'mac',    name: 'MAC',    full: 'MacPaint Image',                          type: 'image', read: true,  write: false },
  { ext: 'rle',    name: 'RLE',    full: 'Utah Run Length Encoded Image',           type: 'image', read: true,  write: false },
  { ext: 'sct',    name: 'SCT',    full: 'Scitex HandShake Image',                  type: 'image', read: true,  write: false },
  /* 其他可写格式 */
  { ext: 'ps',     name: 'PS',     full: 'Adobe PostScript File',                   type: 'image', read: true,  write: true  },
  { ext: 'eps',    name: 'EPS',    full: 'Adobe Encapsulated PostScript',           type: 'image', read: true,  write: true  },
  { ext: 'epdf',   name: 'EPDF',   full: 'Encapsulated Portable Document Format',   type: 'image', read: true,  write: true  },
  { ext: 'ept',    name: 'EPT',    full: 'Encapsulated PostScript with TIFF Preview', type: 'image', read: true, write: true },
  { ext: 'qoi',    name: 'QOI',    full: 'Quite OK Image Format',                   type: 'image', read: true,  write: true  },
  { ext: 'tga',    name: 'TGA',    full: 'Truevision Targa Image',                  type: 'image', read: true,  write: true  },
  { ext: 'pcx',    name: 'PCX',    full: 'ZSoft IBM PC Paintbrush File',            type: 'image', read: true,  write: true  },
  { ext: 'dcx',    name: 'DCX',    full: 'ZSoft Multi-page Paintbrush',             type: 'image', read: true,  write: true  },
  { ext: 'pnm',    name: 'PNM',    full: 'Portable Anymap',                         type: 'image', read: true,  write: true  },
  { ext: 'ppm',    name: 'PPM',    full: 'Portable Pixmap Format',                  type: 'image', read: true,  write: true  },
  { ext: 'pbm',    name: 'PBM',    full: 'Portable Bitmap Format',                  type: 'image', read: true,  write: true  },
  { ext: 'pgm',    name: 'PGM',    full: 'Portable Graymap Format',                 type: 'image', read: true,  write: true  },
  { ext: 'pfm',    name: 'PFM',    full: 'Portable Float Map Format',               type: 'image', read: true,  write: true  },
  { ext: 'pam',    name: 'PAM',    full: 'Common 2-dimensional Bitmap Format',      type: 'image', read: true,  write: true  },
  { ext: 'wbmp',   name: 'WBMP',   full: 'Wireless Bitmap',                         type: 'image', read: true,  write: true  },
  { ext: 'xbm',    name: 'XBM',    full: 'X Windows System Bitmap',                 type: 'image', read: true,  write: true  },
  { ext: 'xpm',    name: 'XPM',    full: 'X Windows System Pixmap',                 type: 'image', read: true,  write: true  },
  { ext: 'sgi',    name: 'SGI',    full: 'Irix RGB Image',                          type: 'image', read: true,  write: true  },
  { ext: 'ras',    name: 'RAS',    full: 'SUN Rasterfile',                          type: 'image', read: true,  write: true  },
  { ext: 'sun',    name: 'SUN',    full: 'SUN Rasterfile',                          type: 'image', read: true,  write: true  },
  { ext: 'hdr',    name: 'HDR',    full: 'Radiance RGBE Image Format',              type: 'image', read: true,  write: true  },
  { ext: 'exr',    name: 'EXR',    full: 'High Dynamic-range File Format',          type: 'image', read: true,  write: true  },
  { ext: 'fits',   name: 'FITS',   full: 'Flexible Image Transport System',         type: 'image', read: true,  write: true  },
  { ext: 'dpx',    name: 'DPX',    full: 'SMPTE Digital Moving Picture Exchange',   type: 'image', read: true,  write: true  },
  { ext: 'cin',    name: 'CIN',    full: 'Kodak Cineon Image Format',               type: 'image', read: true,  write: true  },
  { ext: 'mng',    name: 'MNG',    full: 'Multiple-image Network Graphics',         type: 'image', read: true,  write: true  },
  { ext: 'jng',    name: 'JNG',    full: 'JPEG Network Graphics',                   type: 'image', read: true,  write: true  },
  { ext: 'pcd',    name: 'PCD',    full: 'Photo CD',                                type: 'image', read: true,  write: true  },
  { ext: 'pgx',    name: 'PGX',    full: 'JPEG 2000 Uncompressed Format',           type: 'image', read: true,  write: true  },
  { ext: 'xv',     name: 'XV',     full: 'Khoros Visualization Image',              type: 'image', read: true,  write: true  },
  { ext: 'sixel',  name: 'SIXEL',  full: 'DEC SIXEL Graphics Format',               type: 'image', read: true,  write: true  },
  { ext: 'fax',    name: 'FAX',    full: 'Group 3 FAX',                             type: 'image', read: true,  write: true  },
  { ext: 'g3',     name: 'G3',     full: 'Group 3 FAX',                             type: 'image', read: true,  write: true  },

  /* ── 视频（FFmpeg 引擎）──────────────────────────────── */
  { ext: 'mp4',    name: 'MP4',    full: 'MPEG-4 Part 14',                          type: 'video', read: true,  write: true  },
  { ext: 'mov',    name: 'MOV',    full: 'QuickTime File Format',                   type: 'video', read: true,  write: true  },
  { ext: 'webm',   name: 'WEBM',   full: 'HTML5 Video',                             type: 'video', read: true,  write: true  },
  { ext: 'mkv',    name: 'MKV',    full: 'Matroska Video',                          type: 'video', read: true,  write: true  },
  { ext: 'avi',    name: 'AVI',    full: 'Microsoft Audio/Visual Interleaved',      type: 'video', read: true,  write: true  },
  { ext: 'flv',    name: 'FLV',    full: 'Flash Video',                             type: 'video', read: true,  write: true  },
  { ext: 'f4v',    name: 'F4V',    full: 'Flash Video (H.264)',                     type: 'video', read: true,  write: true  },
  { ext: 'wmv',    name: 'WMV',    full: 'Windows Media Video',                     type: 'video', read: true,  write: true  },
  { ext: 'mpg',    name: 'MPG',    full: 'MPEG Video Stream',                       type: 'video', read: true,  write: true  },
  { ext: 'm4v',    name: 'M4V',    full: 'iTunes Video File',                       type: 'video', read: true,  write: true  },
  { ext: '3gp',    name: '3GP',    full: '3GPP Multimedia File',                    type: 'video', read: true,  write: true  },
  { ext: '3g2',    name: '3G2',    full: '3GPP2 Multimedia File',                   type: 'video', read: true,  write: true  },
  { ext: 'ts',     name: 'TS',     full: 'MPEG Transport Stream',                   type: 'video', read: true,  write: true  },
  { ext: 'm2ts',   name: 'M2TS',   full: 'MPEG-2 Transport Stream',                 type: 'video', read: true,  write: true  },
  { ext: 'vob',    name: 'VOB',    full: 'Video Object',                            type: 'video', read: true,  write: true  },
  { ext: 'asf',    name: 'ASF',    full: 'Advanced Systems Format',                 type: 'video', read: true,  write: true  },
  { ext: 'ogv',    name: 'OGV',    full: 'Ogg Video',                               type: 'video', read: true,  write: true  },
  { ext: 'mxf',    name: 'MXF',    full: 'Material Exchange Format',                type: 'video', read: true,  write: true  },
  { ext: 'rm',     name: 'RM',     full: 'RealMedia',                               type: 'video', read: true,  write: false },
  { ext: 'rmvb',   name: 'RMVB',   full: 'RealMedia Variable Bitrate',              type: 'video', read: true,  write: false },
  { ext: 'swf',    name: 'SWF',    full: 'ShockWave Flash',                         type: 'video', read: true,  write: false },

  /* ── 音频（FFmpeg 引擎）──────────────────────────────── */
  { ext: 'mp3',    name: 'MP3',    full: 'MPEG-1/2 Audio Layer III',                type: 'audio', read: true,  write: true  },
  { ext: 'm4a',    name: 'M4A',    full: 'Audio-only MPEG-4',                       type: 'audio', read: true,  write: true  },
  { ext: 'm4b',    name: 'M4B',    full: 'MPEG-4 Audio Book',                       type: 'audio', read: true,  write: true  },
  { ext: 'aac',    name: 'AAC',    full: 'Advanced Audio Coding',                   type: 'audio', read: true,  write: true  },
  { ext: 'ogg',    name: 'OGG',    full: 'Ogg Vorbis',                              type: 'audio', read: true,  write: true  },
  { ext: 'wav',    name: 'WAV',    full: 'Waveform Audio File Format',              type: 'audio', read: true,  write: true  },
  { ext: 'wma',    name: 'WMA',    full: 'Windows Media Audio',                     type: 'audio', read: true,  write: true  },
  { ext: 'opus',   name: 'OPUS',   full: 'Opus Audio Format',                       type: 'audio', read: true,  write: true  },
  { ext: 'flac',   name: 'FLAC',   full: 'Free Lossless Audio Codec',               type: 'audio', read: true,  write: true  },
  { ext: 'aiff',   name: 'AIFF',   full: 'Audio Interchange File Format',           type: 'audio', read: true,  write: true  },
  { ext: 'au',     name: 'AU',     full: 'Sun / NeXT Audio',                        type: 'audio', read: true,  write: true  },
  { ext: 'mka',    name: 'MKA',    full: 'Matroska Audio',                          type: 'audio', read: true,  write: true  },
  { ext: 'ac3',    name: 'AC3',    full: 'ATSC A/52 Audio Codec',                   type: 'audio', read: true,  write: true  },
  { ext: 'eac3',   name: 'EAC3',   full: 'Enhanced AC-3',                           type: 'audio', read: true,  write: true  },
  { ext: 'dts',    name: 'DTS',    full: 'DTS Coherent Acoustics',                  type: 'audio', read: true,  write: true  },
  { ext: 'caf',    name: 'CAF',    full: 'Core Audio Format (ALAC)',                type: 'audio', read: true,  write: true  },
  { ext: 'tta',    name: 'TTA',    full: 'True Audio',                              type: 'audio', read: true,  write: true  },
  { ext: 'wv',     name: 'WV',     full: 'WavPack Audio',                           type: 'audio', read: true,  write: true  },
  /* 仅读取的音频 */
  { ext: 'ape',    name: 'APE',    full: "Monkey's Audio",                          type: 'audio', read: true,  write: false },
  { ext: 'mpc',    name: 'MPC',    full: 'Musepack Audio',                          type: 'audio', read: true,  write: false },
  { ext: 'ra',     name: 'RA',     full: 'RealAudio',                               type: 'audio', read: true,  write: false },
  { ext: 'spx',    name: 'SPX',    full: 'Ogg Speex Audio',                         type: 'audio', read: true,  write: false },
  { ext: 'voc',    name: 'VOC',    full: 'Creative Voice File',                     type: 'audio', read: true,  write: false },
  { ext: 'w64',    name: 'W64',    full: 'Sony Wave64 Audio',                       type: 'audio', read: true,  write: false },
  { ext: 'gsm',    name: 'GSM',    full: 'GSM Full Rate Audio',                     type: 'audio', read: true,  write: false },

  /* ── 文档（pdf.js）───────────────────────────────────── */
  { ext: 'pdf',    name: 'PDF',    full: 'Portable Document Format',                type: 'document', read: true, write: true },
  { ext: 'txt',    name: 'TXT',    full: 'Plain Text (提取自 PDF)',                 type: 'document', read: false, write: true },
];

/** 文件选择框 accept 属性 */
AK_FORMATS.acceptFor = function (type, extra) {
  const exts = this.filter(f => f.type === type && f.read).map(f => '.' + f.ext);
  return extra ? exts.concat(extra).join(',') : exts.join(',');
};

/** 转换器工具配置 */
const AK_TOOLS = {
  image: {
    label: '图片转换', icon: 'image',
    desc: '在浏览器本地转换图片：常见的 JPG/PNG/WEBP 毫秒级完成，HEIC、相机 RAW、PSD 等 60+ 格式由 ImageMagick 引擎处理。',
    accept: AK_FORMATS.acceptFor('image'),
    targets: ['jpg', 'png', 'webp', 'gif', 'avif', 'bmp', 'tiff', 'psd', 'dds', 'ico', 'cur', 'jp2', 'j2k', 'jpc', 'qoi', 'apng', 'tga', 'pcx', 'dcx', 'pnm', 'ppm', 'pbm', 'pgm', 'pfm', 'pam', 'wbmp', 'xbm', 'xpm', 'sgi', 'ras', 'sun', 'hdr', 'exr', 'fits', 'dpx', 'cin', 'pcd', 'pgx', 'xv', 'sixel', 'fax', 'g3', 'mng', 'jng', 'tiff64', 'ps', 'eps', 'epdf', 'ept', 'pdf'],
    defaultTarget: 'png',
    options: [
      { group: '尺寸与质量', fields: [
        { id: 'width',  label: '宽度 (px)',  type: 'number', placeholder: '保持原始' },
        { id: 'height', label: '高度 (px)',  type: 'number', placeholder: '保持原始' },
        { id: 'quality', label: '质量 (1-100)', type: 'number', placeholder: '默认 90' },
      ]},
    ],
  },
  video: {
    label: '视频转换', icon: 'movie',
    desc: '基于 FFmpeg.wasm 在本地转码视频，支持 21 种容器格式。首次加载引擎约需 30 秒（之后有本地缓存，秒开）。',
    accept: AK_FORMATS.acceptFor('video'),
    targets: ['mp4', 'mkv', 'mov', 'webm', 'avi', 'gif', 'flv', 'f4v', 'wmv', 'mpg', 'm4v', '3gp', '3g2', 'ts', 'm2ts', 'vob', 'asf', 'ogv', 'mxf'],
    defaultTarget: 'mp4',
    options: [
      { group: '视频参数', fields: [
        { id: 'vsize',  label: '分辨率', type: 'select', placeholder: '保持原始',
          choices: ['160x112','176x144','320x240','480x272','640x480','640x360','854x480','1280x720','1920x1080','2560x1440','3840x2160'] },
        { id: 'vbitrate', label: '视频码率', type: 'select', placeholder: '保持原始',
          choices: ['192k','320k','640k','768k','1M','1.5M','2M','3M','4M','6M','8M','12M','20M'] },
        { id: 'fps', label: '帧率', type: 'select', placeholder: '保持原始',
          choices: ['10','12','15','20','24','25','30','50','60'] },
      ]},
      { group: '音频参数', fields: [
        { id: 'abitrate', label: '音频码率', type: 'select', placeholder: '保持原始',
          choices: ['32k','64k','96k','128k','160k','192k','256k','320k'] },
        { id: 'noaudio', label: '移除音轨', type: 'checkbox' },
      ]},
    ],
  },
  audio: {
    label: '音频转换', icon: 'volume_up',
    desc: '基于 FFmpeg.wasm 在本地转换音频格式，也可以从视频中提取音轨。支持 MP3/FLAC/APE/MPC 等 27 种格式。',
    accept: AK_FORMATS.acceptFor('audio', ['.mp4','.mkv','.mov','.webm','.avi','.flv','.wmv','.rm','.rmvb']),
    targets: ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'm4b', 'flac', 'opus', 'wma', 'aiff', 'au', 'mka', 'ac3', 'eac3', 'dts', 'caf', 'tta', 'wv'],
    defaultTarget: 'mp3',
    options: [
      { group: '音频参数', fields: [
        { id: 'abitrate', label: '码率', type: 'select', placeholder: '保持原始',
          choices: ['32k','64k','96k','128k','160k','192k','224k','256k','320k'] },
        { id: 'sampling', label: '采样率 (Hz)', type: 'select', placeholder: '保持原始',
          choices: ['11025','22050','32000','44100','48000','96000'] },
        { id: 'channels', label: '声道', type: 'select', placeholder: '保持原始',
          choices: [['1','单声道'],['2','立体声']] },
      ]},
    ],
  },
  document: {
    label: '文档转换', icon: 'description',
    desc: '把 PDF 每一页渲染为图片，或直接提取全文文本，全程本地处理，多页输出自动打包 ZIP。',
    accept: '.pdf',
    targets: ['jpg', 'png', 'webp', 'txt'],
    defaultTarget: 'png',
    options: [
      { group: '渲染参数', fields: [
        { id: 'dpi', label: 'DPI', type: 'number', placeholder: '默认 144' },
        { id: 'quality', label: '质量 (1-100)', type: 'number', placeholder: '默认 90' },
      ]},
    ],
    tip: '图片目标：每页 PDF 输出为一张图片（第 N 页命名）；TXT 目标：提取 PDF 全文为单个文本文件。',
  },
  'compress-video': {
    label: '视频压缩', icon: 'compress',
    desc: '降低视频码率以缩小体积，输出 MP4。',
    accept: AK_FORMATS.acceptFor('video'),
    targets: ['mp4'],
    defaultTarget: 'mp4',
    hideTarget: true,
    options: [
      { group: '压缩设置', fields: [
        { id: 'percent', label: '视频码率百分比', type: 'range', min: 10, max: 95, value: 60, suffix: '%',
          tip: '越高画质越好、体积越大。100% 约等于原画质。' },
        { id: 'audiomode', label: '音频处理', type: 'select',
          choices: [['keep','保留原音轨'],['compress','按相同比例压缩音轨'],['remove','移除全部音轨']] },
      ]},
    ],
    tip: '工具会从文件信息中估算源视频码率，再按百分比重新编码。',
  },
  'compress-audio': {
    label: '音频压缩', icon: 'graphic_eq',
    desc: '降低音频码率以缩小体积。',
    accept: AK_FORMATS.acceptFor('audio'),
    targets: ['mp3'],
    defaultTarget: 'mp3',
    hideTarget: true,
    options: [
      { group: '压缩设置', fields: [
        { id: 'abitrate', label: '目标码率', type: 'select', choices: ['32k','48k','64k','96k','128k','160k','192k'] },
        { id: 'sampling', label: '采样率 (Hz)', type: 'select', placeholder: '保持原始',
          choices: ['11025','22050','44100','48000'] },
      ]},
    ],
  },
  'zip': {
    label: 'ZIP 打包', icon: 'archive',
    desc: '把任意多个文件打包成一个 ZIP 压缩包，纯本地完成。',
    accept: '',
    dropText: '点击选择或拖入任意文件（可多选），打包为一个 ZIP',
    targets: ['zip'],
    defaultTarget: 'zip',
    hideTarget: true,
    noEngineHint: true,
    options: [],
    tip: '支持任意类型文件，打包后可在下方逐个或一次性下载。',
  },
  'unzip': {
    label: 'ZIP 解压', icon: 'file_open',
    desc: '在浏览器本地解压 ZIP 文件，无需下载软件。',
    accept: '.zip',
    dropText: '点击选择或拖入 ZIP 压缩包（可多选）',
    targets: [],
    hideTarget: true,
    noEngineHint: true,
    options: [],
    tip: '解压出的所有文件会列在右侧，可逐个下载或打包重新下载。',
  },
};

/** 某类型下可作为输入 / 输出的格式（供 formats.html 生成转换关系） */
AK_TOOLS.pairsFor = function (ext) {
  const f = AK_FORMATS.find(x => x.ext === ext);
  if (!f) return { from: [], to: [] };
  const sameType = AK_FORMATS.filter(x => x.type === f.type);
  return {
    from: sameType.filter(x => x.ext !== ext && x.read && f.write).map(x => x.ext),
    to:   sameType.filter(x => x.ext !== ext && x.write && f.read).map(x => x.ext),
  };
};

const AK_FAQ = [
  ['文件会被上传到服务器吗？',
   '不会。所有转换均通过 WebAssembly 在你的浏览器内完成，文件全程留在本机，转换器不含任何上传逻辑。'],
  ['为什么首次使用视频/音频转换要等待较久？',
   '浏览器需要先加载约 32 MB 的 FFmpeg 引擎。加载一次后会永久存入浏览器本地缓存（Cache Storage），之后打开秒加载，无需重复下载。图片与 ZIP 工具不依赖该引擎，完全无需等待。'],
  ['支持多大的文件？',
   '没有人为限制，实际取决于你设备的内存。浏览器标签页一般可处理 1-2 GB 的文件，但超大视频转码时请耐心等待并保持页面在前台。'],
  ['转换速度慢正常吗？',
   '正常。转换在本地 CPU 上完成，视频转码速度约为原视频时长的 1-3 倍（取决于分辨率和设备性能），建议先用小文件测试参数。'],
  ['哪些浏览器可以使用？',
   '需要支持 WebAssembly 的现代浏览器：Chrome / Edge 90+、Firefox 90+、Safari 15+。手机浏览器同样可用。'],
  ['为什么有些格式只能转换出来、有些只能作为输入？',
   '格式能力由内置引擎的真实编译选项决定：例如相机 RAW（CR3/NEF/RAF 等）解码复杂但编码几乎无人使用，因此仅支持读取；RealAudio（RA）、AMR 缺少开源编码器，同样无法输出。列表只展示真实可用的能力。'],
  ['Word、Excel、电子书能转吗？',
   '这类转换需要 LibreOffice / Calibre 等大型服务端引擎（数百 MB），无法放进网页在本地运行，属于本站明确不覆盖的范围。建议使用系统自带的"另存为"功能，或在线服务完成。'],
  ['转换后的文件保存在哪里？',
   '默认通过浏览器下载到你的"下载"目录；多文件结果可点击"打包下载 ZIP"一次性保存。'],
];
