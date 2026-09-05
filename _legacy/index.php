<?php
// 数据库连接配置
require_once '../config.php';

?>

<!DOCTYPE html>
<html lang="zh-Hans" class="mdui-theme-auto">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="在您的网络浏览器中离线转换图片、视频、音频和文档文件，无需下载软件和上传文件！">
  <title>离线转换文件，无需下载软件和上传文件！</title>
  <link rel="stylesheet" href="/mdui/mdui.css">
  <script src="/mdui/mdui.global.js"></script>
  <link href="../app/static/css/main.style.css" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<body>

  <div id="my-app">
    <mdui-layout class="layout">

      <mdui-top-app-bar class="appbar" variant="small" scroll-behavior="elevate" scroll-target=".app-layout-main">
        <mdui-button-icon icon="menu" class="menu-button"></mdui-button-icon>
        <mdui-top-app-bar-title>离线转换器</mdui-top-app-bar-title>
        <div style="flex-grow: 1"></div>
      </mdui-top-app-bar>

      <mdui-navigation-drawer class="drawer" close-on-esc close-on-overlay-click>
        <mdui-list class="drawer-list">
          <mdui-collapse value="components">
            <!-- ROM页面入口 -->
            <mdui-collapse-item value="main">
              <mdui-list-item slot="header" rounded>
                主页
                <mdui-icon slot="end-icon" name="expand_more" class="arrow-active arrow"></mdui-icon>
              </mdui-list-item>
              <div class="drawer-sublist">
                <mdui-list-item class="drawer-item" rounded active="true" data-page="main-page" data-path="/"> 主页
                  <mdui-icon slot="icon" name="home"></mdui-icon>
                </mdui-list-item>
                <mdui-list-item class="drawer-item" rounded active="false" data-page="format-page" data-path="/format">
                  格式 <mdui-icon slot="icon" name="format_list_bulleted"></mdui-icon>
                </mdui-list-item>
              </div>
            </mdui-collapse-item>
            <!-- 转换器页面入口 -->
            <mdui-collapse-item value="rom">
              <mdui-list-item slot="header" rounded>
                离线转换器
                <mdui-icon slot="end-icon" name="expand_more" class="arrow-active arrow"></mdui-icon>
              </mdui-list-item>
              <div class="drawer-sublist">
                <mdui-list-item class="drawer-item" rounded active="false" data-page="image-page" data-path="/image">
                  图片 <mdui-icon slot="icon" name="image"></mdui-icon>
                </mdui-list-item>
                <mdui-list-item class="drawer-item" rounded active="false" data-page="video-page" data-path="/video">
                  视频 <mdui-icon slot="icon" name="movie"></mdui-icon>
                </mdui-list-item>
                <mdui-list-item class="drawer-item" rounded active="false" data-page="audio-page" data-path="/video">
                  音频 <mdui-icon slot="icon" name="audio_file"></mdui-icon>
                </mdui-list-item>
                <mdui-list-item class="drawer-item" rounded active="false" data-page="document-page" data-path="/video">
                  文档 <mdui-icon slot="icon" name="description"></mdui-icon>
                </mdui-list-item>
              </div>
            </mdui-collapse-item>

          </mdui-collapse>

      </mdui-navigation-drawer>

      <mdui-layout-main class="app-layout-main">
        <div id="main-page" class="page active">
          <div class="mdui-prose" style="display: flex; justify-content: center; align-items: center;">
            <mdui-card class="app-card" variant="outlined" style="max-width: 950px; width: 90vw;">
              <h5>转换器对比</h5>
              <p>对比离线转换器和在线转换器：</p>
              <div class="mdui-table" style="max-width: 900px; width: 80vw;">
                <table>
                  <thead>
                    <tr>
                      <th scope="col"><strong>对比</strong></th>
                      <th scope="col">离线转换器</th>
                      <th scope="col">在线转换器 (<a href="https://www.aconvert.com">aconvert.com</a>)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><strong>文件隐私</strong></th>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 最大程度保护您的隐私，因为所有文件都在本地转换</span>
                      </td>
                      <td>文件将上传到在线服务器进行转换</td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>文件大小</strong></th>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 最大 2 GB</span></td>
                      <td>最大 200 MB</td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>转换时间</strong></th>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 不限时</span></td>
                      <td>最长 10 分钟</td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>转换速度</strong></th>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 转换速度快</span></td>
                      <td>转换速度慢</td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>资源占用</strong></th>
                      <td>占用您电脑的CPU和内存资源，有时可能会导致您的浏览器没有响应</td>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 不占用您电脑的CPU或内存资源</span></td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>文件格式</strong></th>
                      <td>110 多种文件格式</td>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 260 多种文件格式</span></td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>JAVASCRIPT</strong></th>
                      <td>最大 32 mb</td>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 不到 0.1 mb</span></td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>浏览器兼容</strong></th>
                      <td>仅适用支持 ES Modules, WebAssembly, Shared Array Buffer 和 Site Isolation 等新技术的网络浏览器</td>
                      <td><span class="text-danger"><i data-feather="thumbs-up"></i> 支持各种网络浏览器</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </mdui-card>

          </div>
        </div>
        <div id="format-page" class="page">
          <h5 class="card-title">离线转换器支持的文件格式</h5>
          <p>该列表显示了我们的离线转换器支持的所有文档、图像、视频和音频文件格式。单击下面的链接以查看特定格式。</p>

          <div class="mdui-table" style="max-width: 900px; width: 80vw;">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>全称</th>
                  <th>类型</th>
                  <th>可读</th>
                  <th>可写</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><a href="/cn/format/pdf/"><strong>PDF</strong></a></td>
                  <td>Portable Document Format</td>
                  <td><i data-feather="file-text"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><a href="/cn/format/jpg/"><strong>JPG</strong></a></td>
                  <td>Joint Photographic Experts Group</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><a href="/cn/format/png/"><strong>PNG</strong></a></td>
                  <td>Portable Network Graphics</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td><a href="/cn/format/webp/"><strong>WEBP</strong></a></td>
                  <td>Weppy Image Format</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td><a href="/cn/format/gif/"><strong>GIF</strong></a></td>
                  <td>CompuServe Graphics Interchange Format</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td><a href="/cn/format/svg/"><strong>SVG</strong></a></td>
                  <td>Scalable Vector Graphics</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td><a href="/cn/format/avif/"><strong>AVIF</strong></a></td>
                  <td>AV1 Image File Format</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td><a href="/cn/format/heic/"><strong>HEIC</strong></a></td>
                  <td>High Efficiency Image File Format</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td><a href="/cn/format/dds/"><strong>DDS</strong></a></td>
                  <td>Microsoft Direct Draw Surface</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td><a href="/cn/format/psd/"><strong>PSD</strong></a></td>
                  <td>Adobe Photoshop Bitmap File</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>11</td>
                  <td><a href="/cn/format/dng/"><strong>DNG</strong></a></td>
                  <td>Digital Negative</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td><a href="/cn/format/cr2/"><strong>CR2</strong></a></td>
                  <td>Canon Digital Camera Raw Image Format</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td><a href="/cn/format/bmp/"><strong>BMP</strong></a></td>
                  <td>Microsoft Windows Bitmap</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>14</td>
                  <td><a href="/cn/format/tiff/"><strong>TIFF</strong></a></td>
                  <td>Tagged Image File Format</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>15</td>
                  <td><a href="/cn/format/ps/"><strong>PS</strong></a></td>
                  <td>Adobe PostScript File</td>
                  <td><i data-feather="image"></i></td>
                  <td>&nbsp;</td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>16</td>
                  <td><a href="/cn/format/eps/"><strong>EPS</strong></a></td>
                  <td>Adobe Encapsulated PostScript</td>
                  <td><i data-feather="image"></i></td>
                  <td>&nbsp;</td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>17</td>
                  <td><a href="/cn/format/jpeg/"><strong>JPEG</strong></a></td>
                  <td>Joint Photographic Experts Group</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>18</td>
                  <td><a href="/cn/format/jfif/"><strong>JFIF</strong></a></td>
                  <td>JPEG File Interchange Format</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>19</td>
                  <td><a href="/cn/format/jp2/"><strong>JP2</strong></a></td>
                  <td>JPEG 2000</td>
                  <td><i data-feather="image"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>20</td>
                  <td><a href="/cn/format/ico/"><strong>ICO</strong></a></td>
                  <td>Microsoft Icon</td>
                  <td><i data-feather="image"></i></td>
                  <td>&nbsp;</td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>21</td>
                  <td><a href="/cn/format/mp4/"><strong>MP4</strong></a></td>
                  <td>MPEG-4 Part 14</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>22</td>
                  <td><a href="/cn/format/mov/"><strong>MOV</strong></a></td>
                  <td>QuickTime File Format</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>23</td>
                  <td><a href="/cn/format/webm/"><strong>WEBM</strong></a></td>
                  <td>HTML5 Video</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>24</td>
                  <td><a href="/cn/format/mkv/"><strong>MKV</strong></a></td>
                  <td>Matroska Video</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>25</td>
                  <td><a href="/cn/format/wmv/"><strong>WMV</strong></a></td>
                  <td>Windows Media Video</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>26</td>
                  <td><a href="/cn/format/flv/"><strong>FLV</strong></a></td>
                  <td>Flash Video</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>27</td>
                  <td><a href="/cn/format/avi/"><strong>AVI</strong></a></td>
                  <td>Microsoft Audio/Visual Interleaved</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>28</td>
                  <td><a href="/cn/format/vob/"><strong>VOB</strong></a></td>
                  <td>Video Object</td>
                  <td><i data-feather="film"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>29</td>
                  <td><a href="/cn/format/mp3/"><strong>MP3</strong></a></td>
                  <td>MPEG-1 or MPEG-2 Audio Layer III</td>
                  <td><i data-feather="volume-2"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>30</td>
                  <td><a href="/cn/format/m4a/"><strong>M4A</strong></a></td>
                  <td>Audio-only MPEG-4</td>
                  <td><i data-feather="volume-2"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>31</td>
                  <td><a href="/cn/format/aac/"><strong>AAC</strong></a></td>
                  <td>Advanced Audio Coding</td>
                  <td><i data-feather="volume-2"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>32</td>
                  <td><a href="/cn/format/ogg/"><strong>OGG</strong></a></td>
                  <td>Ogg Vorbis</td>
                  <td><i data-feather="volume-2"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>33</td>
                  <td><a href="/cn/format/wav/"><strong>WAV</strong></a></td>
                  <td>Waveform Audio File Format</td>
                  <td><i data-feather="volume-2"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>34</td>
                  <td><a href="/cn/format/wma/"><strong>WMA</strong></a></td>
                  <td>Windows Media Audio</td>
                  <td><i data-feather="volume-2"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
                <tr>
                  <td>35</td>
                  <td><a href="/cn/format/opus/"><strong>OPUS</strong></a></td>
                  <td>Opus Audio Format</td>
                  <td><i data-feather="volume-2"></i></td>
                  <td><span class="label label-success">可读</span></td>
                  <td><span class="label label-info">可写</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="image-page" class="page">
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">离线图片转换器</h5>
                  <p class="card-description">离线转换图片，无需下载软件和上传文件！ </p>
                  <form>
                    <br>
                    <div class="row mb-3">
                      <label for="localfiles" class="col-sm-2 col-form-label">本地文件：</label>
                      <div class="col-sm-10">
                        <input class="form-control" type="file" id="localfiles" multiple="">
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="targetformat" class="col-sm-2 col-form-label">目标格式：</label>
                      <div class="col-sm-10">
                        <select class="form-select" name="targetformat" id="targetformat">
                          <option value="jpg" selected="">JPG</option>
                          <option value="png">PNG</option>
                          <option value="webp">WEBP</option>
                          <option value="svg">SVG</option>
                          <option value="gif">GIF</option>
                          <option value="dds">DDS</option>
                          <option value="tiff">TIFF</option>
                          <option value="bmp">BMP</option>
                          <option value="eps">EPS</option>
                          <option value="pcl">PCL</option>
                          <option value="tga">TGA</option>
                          <option value="ico">ICO</option>
                          <option value="pnm">PNM</option>
                          <option value="psd">PSD</option>
                          <option value="jp2">JP2</option>
                          <option value="pdf">PDF</option>
                          <option value="ps">PS</option>
                          <option value="ps2">PS2</option>
                          <option value="ps3">PS3</option>
                          <option value="qoi">QOI</option>
                          <option value="ppm">PPM</option>
                          <option value="ptif">PTIF</option>
                          <option value="pict">PICT</option>
                          <option value="pam">PAM</option>
                          <option value="pbm">PBM</option>
                          <option value="pcx">PCX</option>
                          <option value="pdb">PDB</option>
                          <option value="pcd">PCD</option>
                          <option value="pfm">PFM</option>
                          <option value="pgm">PGM</option>
                          <option value="vicar">VICAR</option>
                          <option value="viff">VIFF</option>
                          <option value="wbmp">WBMP</option>
                          <option value="xbm">XBM</option>
                          <option value="xpm">XPM</option>
                          <option value="uyvy">UYVY</option>
                          <option value="uil">UIL</option>
                          <option value="sgi">SGI</option>
                          <option value="sun">SUN</option>
                          <option value="aai">AAI</option>
                          <option value="dcx">DCX</option>
                          <option value="dib">DIB</option>
                          <option value="dpx">DPX</option>
                          <option value="epdf">EPDF</option>
                          <option value="epi">EPI</option>
                          <option value="eps2">EPS2</option>
                          <option value="eps3">EPS3</option>
                          <option value="epsi">EPSI</option>
                          <option value="avs">AVS</option>
                          <option value="cin">CIN</option>
                          <option value="cmyk">CMYK</option>
                          <option value="cmyka">CMYKA</option>
                          <option value="epsf">EPSF</option>
                          <option value="ept">EPT</option>
                          <option value="exr">EXR</option>
                          <option value="fax">FAX</option>
                          <option value="j2c">J2C</option>
                          <option value="j2k">J2K</option>
                          <option value="jpeg">JPEG</option>
                          <option value="miff">MIFF</option>
                          <option value="mono">MONO</option>
                          <option value="mng">MNG</option>
                          <option value="mpc">MPC</option>
                          <option value="mtv">MTV</option>
                          <option value="otb">OTB</option>
                          <option value="gray">GRAY</option>
                          <option value="hdr">HDR</option>
                          <option value="jng">JNG</option>
                          <option value="hrz">HRZ</option>
                        </select>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="imagewidth" class="col-sm-2 col-form-label">图片尺寸：</label>
                      <div class="col-sm-10">
                        <div class="row">
                          <div class="col">
                            <input type="number" class="form-control" placeholder="宽度" id="imagewidth">
                          </div>
                          <div class="col">
                            <input type="number" class="form-control" placeholder="高度" id="imageheight">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="imagequality" class="col-sm-2 col-form-label">图片质量：</label>
                      <div class="col-sm-10">
                        <input type="number" class="form-control" id="imagequality" min="1" max="100">
                      </div>
                    </div>
                    <br>
                    <div class="d-grid gap-2">
                      <button type="button" class="btn btn-danger btn-block" onclick="batchconversion()"
                        id="convertbutton"> 离线转换 </button>
                    </div>
                  </form>
                  <br>
                  <hr><br>
                  <div class="mb-5">
                    <div class="section-left">输出文件：</div>
                    <div class="section-right">
                      <button type="button" class="btn btn-sm btn-secondary" onclick="addtoZip()">压缩文件</button>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">文件名</th>
                          <th scope="col">文件大小</th>
                          <th scope="col">操作</th>
                        </tr>
                      </thead>
                      <tbody id="outputfiles">
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">使用说明</h5>
                  <p class="card-description">选择本地图片文件，选择要转换的目标图片格式，然后点击“离线转换”按钮开始批量离线转换。 每个文件最大可达 2GB。
                    这个离线转换器将首先尝试使用网络浏览器中的画布来转换图像。 图像格式取决于您当前的网络浏览器是否支持。 例如：最新的 Chrome 浏览器支持 AVIF 图像，而旧版本不支持。
                    如果您当前的网络浏览器不支持该图像格式，那么离线转换器将尝试使用 JavaScript 来转换图像。 如果此离线转换器在您的网络浏览器中转换失败，请改用<a
                      href="https://www.aconvert.com/cn/image/">在线转换器</a>。</p>
                  <p>以下是支持的主要图像格式：</p>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">格式</th>
                          <th scope="col">格式名称</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td><a href="/cn/format/jpg/"><strong>JPG</strong></a></td>
                          <td>Joint Photographic Experts Group</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td><a href="/cn/format/png/"><strong>PNG</strong></a></td>
                          <td>Portable Network Graphics</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td><a href="/cn/format/webp/"><strong>WEBP</strong></a></td>
                          <td>Weppy Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td><a href="/cn/format/gif/"><strong>GIF</strong></a></td>
                          <td>CompuServe Graphics Interchange Format</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td><a href="/cn/format/svg/"><strong>SVG</strong></a></td>
                          <td>Scalable Vector Graphics</td>
                        </tr>
                        <tr>
                          <th scope="row">6</th>
                          <td><a href="/cn/format/avif/"><strong>AVIF</strong></a></td>
                          <td>AV1 Image File Format</td>
                        </tr>
                        <tr>
                          <th scope="row">7</th>
                          <td><a href="/cn/format/heic/"><strong>HEIC</strong></a></td>
                          <td>High Efficiency Image File Format</td>
                        </tr>
                        <tr>
                          <th scope="row">8</th>
                          <td><a href="/cn/format/dds/"><strong>DDS</strong></a></td>
                          <td>Microsoft Direct Draw Surface</td>
                        </tr>
                        <tr>
                          <th scope="row">9</th>
                          <td><a href="/cn/format/psd/"><strong>PSD</strong></a></td>
                          <td>Adobe Photoshop Bitmap File</td>
                        </tr>
                        <tr>
                          <th scope="row">10</th>
                          <td><a href="/cn/format/dng/"><strong>DNG</strong></a></td>
                          <td>Digital Negative</td>
                        </tr>
                        <tr>
                          <th scope="row">11</th>
                          <td><a href="/cn/format/cr2/"><strong>CR2</strong></a></td>
                          <td>Canon Digital Camera Raw Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">12</th>
                          <td><a href="/cn/format/bmp/"><strong>BMP</strong></a></td>
                          <td>Microsoft Windows Bitmap</td>
                        </tr>
                        <tr>
                          <th scope="row">13</th>
                          <td><a href="/cn/format/tiff/"><strong>TIFF</strong></a></td>
                          <td>Tagged Image File Format</td>
                        </tr>
                        <tr>
                          <th scope="row">14</th>
                          <td><a href="/cn/format/ps/"><strong>PS</strong></a></td>
                          <td>Adobe PostScript File</td>
                        </tr>
                        <tr>
                          <th scope="row">15</th>
                          <td><a href="/cn/format/eps/"><strong>EPS</strong></a></td>
                          <td>Adobe Encapsulated PostScript</td>
                        </tr>
                        <tr>
                          <th scope="row">16</th>
                          <td><a href="/cn/format/jpeg/"><strong>JPEG</strong></a></td>
                          <td>Joint Photographic Experts Group</td>
                        </tr>
                        <tr>
                          <th scope="row">17</th>
                          <td><a href="/cn/format/jfif/"><strong>JFIF</strong></a></td>
                          <td>JPEG File Interchange Format</td>
                        </tr>
                        <tr>
                          <th scope="row">18</th>
                          <td><a href="/cn/format/jp2/"><strong>JP2</strong></a></td>
                          <td>JPEG 2000</td>
                        </tr>
                        <tr>
                          <th scope="row">19</th>
                          <td><a href="/cn/format/ico/"><strong>ICO</strong></a></td>
                          <td>Microsoft Icon</td>
                        </tr>
                        <th scope="row">20</th>
                        <td><a href="/cn/format/pdf/"><strong>PDF</strong></a></td>
                        <td>Portable Document Format</td>

                        <tr>
                          <th scope="row">21</th>
                          <td><strong>AAI</strong></td>
                          <td>AAI Dune image</td>
                        </tr>
                        <tr>
                          <th scope="row">22</th>
                          <td><strong>RAW</strong></td>
                          <td>Camera Raw Image</td>
                        </tr>
                        <tr>
                          <th scope="row">23</th>
                          <td><strong>AVS</strong></td>
                          <td>AVS X image</td>
                        </tr>
                        <tr>
                          <th scope="row">24</th>
                          <td><strong>CIN</strong></td>
                          <td>Kodak Cineon Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">25</th>
                          <td><strong>CMYK</strong></td>
                          <td>Raw Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">26</th>
                          <td><strong>CMYKA</strong></td>
                          <td>Raw Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">27</th>
                          <td><strong>CRW</strong></td>
                          <td>Canon Digital Camera Raw Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">28</th>
                          <td><strong>DCX</strong></td>
                          <td>ZSoft IBM PC Multi-page Paintbrush Image</td>
                        </tr>
                        <tr>
                          <th scope="row">29</th>
                          <td><strong>DIB</strong></td>
                          <td>Microsoft Windows Device Independent Bitmap</td>
                        </tr>
                        <tr>
                          <th scope="row">30</th>
                          <td><strong>DOT</strong></td>
                          <td>Graph Visualization</td>
                        </tr>
                        <tr>
                          <th scope="row">31</th>
                          <td><strong>DPX</strong></td>
                          <td>SMPTE Digital Moving Picture Exchange</td>
                        </tr>
                        <tr>
                          <th scope="row">32</th>
                          <td><strong>EPDF</strong></td>
                          <td>Encapsulated Portable Document Format</td>
                        </tr>
                        <tr>
                          <th scope="row">33</th>
                          <td><strong>EPI</strong></td>
                          <td>Adobe Encapsulated PostScript Interchange Format</td>
                        </tr>
                        <tr>
                          <th scope="row">34</th>
                          <td><strong>EPS2</strong></td>
                          <td>Adobe Level II Encapsulated PostScript</td>
                        </tr>
                        <tr>
                          <th scope="row">35</th>
                          <td><strong>EPS3</strong></td>
                          <td>Adobe Level III Encapsulated PostScript</td>
                        </tr>
                        <tr>
                          <th scope="row">36</th>
                          <td><strong>EPSF</strong></td>
                          <td>Adobe Encapsulated PostScript</td>
                        </tr>
                        <tr>
                          <th scope="row">37</th>
                          <td><strong>EPSI</strong></td>
                          <td>Adobe Encapsulated PostScript Interchange Format</td>
                        </tr>
                        <tr>
                          <th scope="row">38</th>
                          <td><strong>EPT</strong></td>
                          <td>Adobe Encapsulated PostScript Interchange Format with TIFF Preview</td>
                        </tr>
                        <tr>
                          <th scope="row">39</th>
                          <td><strong>EXR</strong></td>
                          <td>High Dynamic-range File Format</td>
                        </tr>
                        <tr>
                          <th scope="row">40</th>
                          <td><strong>FAX</strong></td>
                          <td>Group 3 TIFF</td>
                        </tr>
                        <tr>
                          <th scope="row">41</th>
                          <td><strong>GRAY</strong></td>
                          <td>Raw Gray Samples</td>
                        </tr>
                        <tr>
                          <th scope="row">42</th>
                          <td><strong>HDR</strong></td>
                          <td>Radiance RGBE Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">43</th>
                          <td><strong>HRZ</strong></td>
                          <td>Slow Scane TeleVision</td>
                        </tr>
                        <tr>
                          <th scope="row">44</th>
                          <td><strong>JNG</strong></td>
                          <td>Multiple-image Network Graphics</td>
                        </tr>
                        <tr>
                          <th scope="row">45</th>
                          <td><strong>J2C</strong></td>
                          <td>JPEG-2000 Code Stream Syntax</td>
                        </tr>
                        <tr>
                          <th scope="row">46</th>
                          <td><strong>J2K</strong></td>
                          <td>JPEG-2000 Code Stream Syntax</td>
                        </tr>
                        <tr>
                          <th scope="row">47</th>
                          <td><strong>MIFF</strong></td>
                          <td>Magick Image File Format</td>
                        </tr>
                        <tr>
                          <th scope="row">48</th>
                          <td><strong>MONO</strong></td>
                          <td>Bi-level Bitmap in Least-significant-byte First Order</td>
                        </tr>
                        <tr>
                          <th scope="row">49</th>
                          <td><strong>MNG</strong></td>
                          <td>Multiple-image Network Graphics</td>
                        </tr>
                        <tr>
                          <th scope="row">50</th>
                          <td><strong>MPC</strong></td>
                          <td>Magick Persistent Cache Image File Format</td>
                        </tr>
                        <tr>
                          <th scope="row">51</th>
                          <td><strong>MTV</strong></td>
                          <td>MTV Raytracing Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">52</th>
                          <td><strong>OTB</strong></td>
                          <td>On-the-air Bitmap</td>
                        </tr>
                        <tr>
                          <th scope="row">53</th>
                          <td><strong>PAM</strong></td>
                          <td>Common 2-dimensional Bitmap Format</td>
                        </tr>
                        <tr>
                          <th scope="row">54</th>
                          <td><strong>PBM</strong></td>
                          <td>Portable Bitmap Format</td>
                        </tr>
                        <tr>
                          <th scope="row">55</th>
                          <td><strong>PCD</strong></td>
                          <td>Photo CD</td>
                        </tr>
                        <tr>
                          <th scope="row">56</th>
                          <td><strong>PCL</strong></td>
                          <td>HP Page Control Language</td>
                        </tr>
                        <tr>
                          <th scope="row">57</th>
                          <td><strong>PCX</strong></td>
                          <td>ZSoft IBM PC Paintbrush File</td>
                        </tr>
                        <tr>
                          <th scope="row">58</th>
                          <td><strong>PFM</strong></td>
                          <td>Portable Float Map Format</td>
                        </tr>
                        <tr>
                          <th scope="row">59</th>
                          <td><strong>PGM</strong></td>
                          <td>Portable Graymap Format</td>
                        </tr>
                        <tr>
                          <th scope="row">60</th>
                          <td><strong>PICT</strong></td>
                          <td>Apple Macintosh QuickDraw/PICT File</td>
                        </tr>
                        <tr>
                          <th scope="row">61</th>
                          <td><strong>PNM</strong></td>
                          <td>Portable Anymap</td>
                        </tr>
                        <tr>
                          <th scope="row">62</th>
                          <td><strong>PPM</strong></td>
                          <td>Portable Pixmap Format</td>
                        </tr>
                        <tr>
                          <th scope="row">63</th>
                          <td><strong>PS2</strong></td>
                          <td>Adobe Level II PostScript File</td>
                        </tr>
                        <tr>
                          <th scope="row">64</th>
                          <td><strong>PS3</strong></td>
                          <td>Adobe Level III PostScript File</td>
                        </tr>
                        <tr>
                          <th scope="row">65</th>
                          <td><strong>PTIF</strong></td>
                          <td>Pyramid Encoded TIFF</td>
                        </tr>
                        <tr>
                          <th scope="row">66</th>
                          <td><strong>SGI</strong></td>
                          <td>Irix RGB Image</td>
                        </tr>
                        <tr>
                          <th scope="row">67</th>
                          <td><strong>SUN</strong></td>
                          <td>SUN Rasterfile</td>
                        </tr>
                        <tr>
                          <th scope="row">68</th>
                          <td><strong>TGA</strong></td>
                          <td>Truevision Targa Image</td>
                        </tr>
                        <tr>
                          <th scope="row">69</th>
                          <td><strong>TTF</strong></td>
                          <td>TrueType Font File</td>
                        </tr>
                        <tr>
                          <th scope="row">70</th>
                          <td><strong>UIL</strong></td>
                          <td>X-Motif UIL Table</td>
                        </tr>
                        <tr>
                          <th scope="row">71</th>
                          <td><strong>UYVY</strong></td>
                          <td>Interleaved YUV Raw Image</td>
                        </tr>
                        <tr>
                          <th scope="row">72</th>
                          <td><strong>VICAR</strong></td>
                          <td>VICAR Rasterfile Format</td>
                        </tr>
                        <tr>
                          <th scope="row">73</th>
                          <td><strong>VIFF</strong></td>
                          <td>Khoros Visualization Image File Format</td>
                        </tr>
                        <tr>
                          <th scope="row">74</th>
                          <td><strong>WBMP</strong></td>
                          <td>Wireless Bitmap</td>
                        </tr>
                        <tr>
                          <th scope="row">75</th>
                          <td><strong>WPG</strong></td>
                          <td>Word Perfect Graphics File</td>
                        </tr>
                        <tr>
                          <th scope="row">76</th>
                          <td><strong>XBM</strong></td>
                          <td>X Windows System Bitmap</td>
                        </tr>
                        <tr>
                          <th scope="row">77</th>
                          <td><strong>XPM</strong></td>
                          <td>X Windows System Pixmap</td>
                        </tr>
                        <tr>
                          <th scope="row">78</th>
                          <td><strong>ARW</strong></td>
                          <td>Sony Digital Camera Alpha Raw Image Format</td>
                        </tr>
                        <tr>
                          <th scope="row">79</th>
                          <td><strong>APNG</strong></td>
                          <td>Animated Portable Network Graphics</td>
                        </tr>
                        <tr>
                          <th scope="row">80</th>
                          <td><strong>QOI</strong></td>
                          <td>Quite OK Image Format</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div id="video-page" class="page">
        </div>
        <div id="audio-page" class="page">
        </div>
        <div id="document-page" class="page">
        </div>
      </mdui-layout-main>

    </mdui-layout>
  </div>
  <script src="../app/static/js/jquery.min.js"></script>
  <script src="../app/static/js/bootstrap.bundle.min.js"></script>
  <script src="../app/static/js/main.min.js"></script>
  <script src="../app/static/js/image.min.js"></script>
</body>


<script>
  function loadSurface(id) {
  }

  const topAppBar = document.querySelector(".appbar");
  const navigationDrawer = document.querySelector(".drawer");
  const menuButton = topAppBar.querySelector(".menu-button");
  // 确保页面加载完成后自动打开侧边栏
  window.onload = function () {
    if (window.innerWidth > 768) {
      navigationDrawer.open = true;
    }
  };

  menuButton.addEventListener("click", () => navigationDrawer.open = !navigationDrawer.open);
  // 页面路由管理
  class Router {
    constructor() {
      this.baseUrl = '/converter'; // 添加基础路径
      this.routes = new Map();
      this.init();
    }

    addRoute(path, pageId) {
      this.routes.set(path, pageId);
    }

    init() {
      this.addRoute('/', 'main-page');
      this.addRoute('/main', 'main-page');
      this.addRoute('/format', 'format-page');
      this.addRoute('/image', 'image-page');
      this.addRoute('/video', 'video-page');
      this.addRoute('/audio', 'audio-page');
      this.addRoute('/document', 'document-page');
      // 处理浏览器前进后退
      window.addEventListener('popstate', (event) => {
        const path = window.location.pathname;
        this.navigate(path, false);
      });

      // 初始化时导航到当前URL
      const currentPath = window.location.pathname.replace(this.baseUrl, '');
      console.log('currentPath:', currentPath);
      this.navigate(currentPath, false);
    }

    navigate(path, addToHistory = true) {
      // 默认路由
      if (path === '/') {
        path = '/main';
      }
      console.log('Current Path:', path);

      const pageId = this.routes.get(path);
      console.log(pageId)
      if (pageId) {
        this.showPage(pageId);
        if (addToHistory) {
          history.pushState({}, '', this.baseUrl + path);
        }
      } else {
        // 404处理
        console.error('Page not found:', path);
        this.redirect(path)
        // this.navigate('/', addToHistory);
      }
    }

    showPage(pageId) {
      // 隐藏所有页面
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });

      // 显示目标页面
      const targetPage = document.getElementById(pageId);
      if (targetPage) {
        targetPage.classList.add('active');
        // 更新页面标题
        document.title = targetPage.dataset.title || 'MySite';
      }

      loadSurface(pageId);
    }

    redirect(path) {
      // 移除路径开头的斜杠
      path = path.replace(/^\/+/, '');
      if (path.includes('/')) {
        toggleDisplay(document.getElementById('redirect-card'));
        document.getElementById('redirect-url').textContent = 'Page not found:'.path;
        var targetUrl = "/error/404.php?link=" + encodeURIComponent(path);
        window.location.href = targetUrl;
      } else {
        // 构建目标URL
        var targetUrl = "/sl/link.php?id=" + encodeURIComponent(path);
        toggleDisplay(document.getElementById('redirect-card'));
        document.getElementById('redirect-url').textContent = targetUrl;
        // 执行重定向
        window.location.href = targetUrl;
      }
    }

  }

  // 初始化路由
  const router = new Router();
  // 页面切换功能
  document.querySelectorAll('[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      // 绑定导航事件
      const path = item.dataset.path;
      router.navigate(path);

      // 首先移除所有已有的 active 状态
      document.querySelectorAll('.drawer-item').forEach(listItem => {
        listItem.setAttribute('active', 'false');
      });

      // 设置当前点击的 list item 为 active
      item.setAttribute('active', 'true');

      // 在移动设备上自动关闭侧边栏
      if (window.innerWidth <= 768) {
        navigationDrawer.open = false;
      }
    });
  });

  // 页面切换功能
  document.querySelectorAll('[data-path]').forEach(item => {
    item.addEventListener('click', () => {
      // 绑定导航事件
      const path = item.dataset.path;
      router.navigate(path);

      // 在移动设备上自动关闭侧边栏
      if (window.innerWidth <= 768) {
        navigationDrawer.open = false;
      }
    });
  });
</script>

</html>