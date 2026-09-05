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
  <link href="app/css/main.style.css" rel="stylesheet">
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
                主页 <mdui-icon slot="icon" name="home"></mdui-icon>
                <mdui-icon slot="end-icon" name="expand_more" class="arrow-active arrow"></mdui-icon>
              </mdui-list-item>
              <div class="drawer-sublist">
                <mdui-list-item class="drawer-item" rounded active="true" data-page="main-page" data-path="/"> 主页
                </mdui-list-item>
                <mdui-list-item class="drawer-item" rounded active="true" data-page="format-page" data-path="/format"> 格式
                </mdui-list-item>
              </div>
            </mdui-collapse-item>
            <!-- ROM页面入口 -->
            <mdui-collapse-item value="rom">
              <mdui-list-item slot="header" rounded>
                ROM <mdui-icon slot="icon" name="system_update"></mdui-icon>
                <mdui-icon slot="end-icon" name="expand_more" class="arrow-active arrow"></mdui-icon>
              </mdui-list-item>
              <div class="drawer-sublist">
                <mdui-list-item class="drawer-item" rounded active="false" data-page="flyme-page" data-path="/flyme">
                  Flyme
                </mdui-list-item>
                <mdui-list-item class="drawer-item" rounded active="false" data-page="miui-page" data-path="/miui"> MIUI
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

      </mdui-layout-main>

    </mdui-layout>
  </div>

</body>


<script>
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
      // 处理浏览器前进后退
      window.addEventListener('popstate', (event) => {
        const path = window.location.pathname;
        this.navigate(path, false);
      });

      // 初始化时导航到当前URL
      const currentPath = window.location.pathname.replace(this.baseUrl, '');
      console.error('currentPath:', currentPath);
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
          history.pushState({}, '', path);
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