/* === 王鹤工作台 - 主应用 === */
const App = {
  currentModule: 'tasks',
  data: {},

  async init() {
    this.updateDate();
    this.setupNavigation();
    await this.loadAllData();
    this.navigateTo('tasks');
  },

  updateDate() {
    const now = new Date();
    const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
    document.getElementById('date-display').textContent =
      `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${weekdays[now.getDay()]}`;
  },

  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const module = item.dataset.module;
        this.navigateTo(module);
      });
    });
  },

  navigateTo(module) {
    this.currentModule = module;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-module="${module}"]`).classList.add('active');
    document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${module}`).classList.add('active');

    const titles = { tasks:'每日任务看板', hotspot:'抖音热点追踪', review:'内容复盘', inspiration:'灵感来源', library:'素材库' };
    document.getElementById('page-title').textContent = titles[module] || module;

    // 渲染对应模块
    if (module === 'tasks') TaskModule.render();
    if (module === 'hotspot') HotspotModule.render();
    if (module === 'review') ReviewModule.render();
    if (module === 'inspiration') InspirationModule.render();
    if (module === 'library') LibraryModule.render();
  },

  async loadAllData() {
    try {
      const responses = await Promise.all([
        fetch('data/tasks.json').then(r => r.json()).catch(() => TaskModule.getDefaults()),
        fetch('data/hotspots.json').then(r => r.json()).catch(() => []),
        fetch('data/reviews.json').then(r => r.json()).catch(() => []),
        fetch('data/inspiration.json').then(r => r.json()).catch(() => []),
        fetch('data/library.json').then(r => r.json()).catch(() => LibraryModule.getDefaults()),
      ]);
      App.data.tasks = responses[0];
      App.data.hotspots = responses[1];
      App.data.reviews = responses[2];
      App.data.inspiration = responses[3];
      App.data.library = responses[4];
    } catch(e) {
      console.error('数据加载失败:', e);
      App.data.tasks = TaskModule.getDefaults();
      App.data.hotspots = [];
      App.data.reviews = [];
      App.data.inspiration = [];
      App.data.library = LibraryModule.getDefaults();
    }
  },

  saveData(key) {
    // 在本地环境中通过 localStorage 持久化
    localStorage.setItem(`dashboard_${key}`, JSON.stringify(App.data[key]));
  },

  loadFromLocal(key) {
    const raw = localStorage.getItem(`dashboard_${key}`);
    return raw ? JSON.parse(raw) : null;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
