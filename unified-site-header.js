(function () {
  'use strict';

  const currentPage = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isAdmin = currentPage.indexOf('admin-') === 0;

  const topItems = [
    ['我的学习', 'my-learning.html', currentPage === 'my-learning.html'],
    ['课程', 'courses-v2.html', /^(index|courses-|video-course-detail|series-courses)/.test(currentPage)],
    ['开课', '#', false],
    ['课外学习', '#', false],
    ['心愿墙', '#', false],
    ['团队学习', '#', false],
    ['后台管理', 'admin-video-course.html', isAdmin],
    ['◉ 完美加速器', '#', false, 'accelerator']
  ];

  const adminItems = [
    ['公司课程管理', '#', false],
    ['自助开课管理', '#', false],
    ['视频课程管理', 'admin-video-course.html', currentPage === 'admin-video-course.html'],
    ['系列课程管理', 'admin-series.html', currentPage === 'admin-series.html'],
    ['课堂学习记录', '#', false],
    ['课外学习记录', '#', false],
    ['课程评价管理', '#', false],
    ['心愿管理', '#', false],
    ['运营管理', 'admin-course-recommendation.html', currentPage === 'admin-course-recommendation.html'],
    ['系统设置', '#', false],
    ['课后回顾记录', '#', false],
    ['课程评论管理', 'admin-course-comments.html', currentPage === 'admin-course-comments.html']
  ];

  function links(items) {
    return items.map(function (item) {
      const label = item[0];
      const href = item[1];
      const active = item[2] ? ' active' : '';
      const extra = item[3] ? ' ' + item[3] : '';
      return '<a class="' + active + extra + '" href="' + href + '">' + label + '</a>';
    }).join('');
  }

  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .unified-site-header { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif; }
      .unified-topbar { height: 54px; background: #303545; color: #fff; }
      .unified-topbar-inner { position: relative; display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; padding: 0 14px; }
      .unified-brand { color: #fff; text-decoration: none; font-size: 27px; font-weight: 900; letter-spacing: 1px; line-height: 1; white-space: nowrap; }
      .unified-brand i { color: #ffbd13; display: inline-block; font-style: normal; transform: skew(-16deg); }
      .unified-main-nav { position: absolute; left: max(164px, calc((100vw - 1200px) / 2)); display: flex; height: 100%; align-items: stretch; }
      .unified-main-nav a { display: flex; align-items: center; padding: 0 18px; color: #fff; font-size: 13px; text-decoration: none; white-space: nowrap; border-bottom: 3px solid transparent; }
      .unified-main-nav a:hover, .unified-main-nav a.active { color: #fff; border-bottom-color: #ff6266; }
      .unified-main-nav a.accelerator { padding-right: 0; }
      .unified-admin-nav { background: #eaedf1; }
      .unified-admin-nav-inner { display: flex; align-items: stretch; justify-content: space-between; width: 100%; max-width: 1480px; margin: 0 auto; padding: 0 20px; overflow: hidden; }
      .unified-admin-nav a { padding: 20px 12px 16px; color: #8a94a4; font-size: 14px; text-decoration: none; white-space: nowrap; border-top: 3px solid transparent; }
      .unified-admin-nav a:hover { color: #596477; }
      .unified-admin-nav a.active { color: #7f8998; background: #fff; }
      @media (max-width: 920px) {
        .unified-topbar { height: auto; }
        .unified-topbar-inner { min-height: 54px; flex-wrap: wrap; gap: 0; padding: 0 16px; }
        .unified-main-nav { position: static; order: 3; width: 100%; height: 46px; overflow-x: auto; }
        .unified-main-nav a { padding: 0 13px; }
        .unified-main-nav a.accelerator { display: none; }
        .unified-admin-nav-inner { justify-content: flex-start; padding: 0 12px; overflow-x: auto; scrollbar-width: none; }
        .unified-admin-nav-inner::-webkit-scrollbar { display: none; }
        .unified-admin-nav a { padding: 16px 13px 13px; }
      }
    `;
    document.head.appendChild(style);
  }

  function hideLegacyNavigation() {
    const oldTopbar = document.querySelector('.nav-bar');
    if (oldTopbar) {
      oldTopbar.style.display = 'none';
      oldTopbar.setAttribute('aria-hidden', 'true');
    }
    const oldAdminNav = document.querySelector('.sub-nav-bar');
    if (oldAdminNav) {
      oldAdminNav.style.display = 'none';
      oldAdminNav.setAttribute('aria-hidden', 'true');
    }
  }

  function buildHeader() {
    if (currentPage === 'index.html') return;
    const root = document.createElement('header');
    root.className = 'unified-site-header';
    root.innerHTML = '<div class="unified-topbar"><div class="unified-topbar-inner">' +
      '<a class="unified-brand" href="courses-v2.html">人周<i>一</i>课</a>' +
      '<nav class="unified-main-nav" aria-label="主导航">' + links(topItems) + '</nav>' +
      '</div></div>' +
      (isAdmin ? '<nav class="unified-admin-nav" aria-label="后台管理导航"><div class="unified-admin-nav-inner">' + links(adminItems) + '</div></nav>' : '');
    document.body.prepend(root);
  }

  addStyles();
  hideLegacyNavigation();
  buildHeader();
})();
