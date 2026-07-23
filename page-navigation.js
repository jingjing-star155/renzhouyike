(function () {
  'use strict';

  const routes = {
    '我的学习': 'my-learning.html',
    '课程': 'courses-v2.html',
    '后台管理': 'admin-video-course.html'
  };

  function navigate(url) {
    window.location.href = url;
  }

  function makeInteractive(element, url, label) {
    if (!element || element.dataset.pageNavigationReady === 'true') return;

    element.dataset.pageNavigationReady = 'true';
    element.setAttribute('role', 'link');
    element.setAttribute('tabindex', '0');
    if (label && !element.getAttribute('aria-label')) {
      element.setAttribute('aria-label', label);
    }
    element.style.cursor = 'pointer';
    element.addEventListener('click', function () {
      navigate(url);
    });
    element.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigate(url);
      }
    });
  }

  function bindPrimaryNavigation() {
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const route = routes[link.textContent.trim()];
      if (route) link.href = route;
    });

    const logo = document.querySelector('.nav-logo');
    makeInteractive(logo, 'courses-v2.html', '返回课程首页');
  }

  function bindSearch() {
    document.querySelectorAll('.search-btn').forEach(function (button) {
      const container = button.closest('.search-content, .search-section') || document;
      const input = container.querySelector('input[type="text"]');
      if (!input || button.dataset.searchNavigationReady === 'true') return;

      button.dataset.searchNavigationReady = 'true';
      const submit = function () {
        const keyword = input.value.trim();
        const query = keyword ? '?q=' + encodeURIComponent(keyword) : '';
        navigate('courses-search.html' + query);
      };
      button.addEventListener('click', submit);
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') submit();
      });
    });
  }

  function restoreSearchKeyword() {
    if (!/courses-search\.html$/i.test(window.location.pathname)) return;
    const keyword = new URLSearchParams(window.location.search).get('q');
    if (!keyword) return;

    const input = document.querySelector('.search-box input[type="text"]');
    const keywordLabel = document.querySelector('.search-result-header span');
    if (input) input.value = keyword;
    if (keywordLabel) keywordLabel.textContent = keyword;
  }

  function bindCourseEntries() {
    document.querySelectorAll('.search-card, .right-course-item, .banner-course-item').forEach(function (card) {
      makeInteractive(card, 'video-course-detail.html', '查看视频课程详情');
    });

    document.querySelectorAll('.detail-link').forEach(function (link) {
      makeInteractive(link, 'video-course-detail.html', '查看视频课程详情');
    });

    document.querySelectorAll('.learning-title-text').forEach(function (title) {
      const isSeries = /世界建筑|日语从零开始/.test(title.textContent);
      makeInteractive(title, isSeries ? 'series-courses.html' : 'video-course-detail.html', '继续学习');
    });
  }

  function bindSupportingLinks() {
    document.querySelectorAll('.modal-link').forEach(function (link) {
      link.href = 'my-learning.html';
    });

  }

  document.addEventListener('DOMContentLoaded', function () {
    bindPrimaryNavigation();
    bindSearch();
    restoreSearchKeyword();
    bindCourseEntries();
    bindSupportingLinks();
  });
})();
