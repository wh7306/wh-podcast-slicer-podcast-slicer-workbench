/* === 抖音热点模块 === */
const HotspotModule = {
  // 预设热点数据（当爬取数据为空时使用）
  getDefaults() {
    return [
      { id:'h1', title:'停止内耗的最好方式', source:'抖音热搜', heat:'🔥 980w', tags:['自我成长','情绪'], suitable:true, note:'适合切播客里关于"内耗"的片段', createdAt:new Date().toISOString() },
      { id:'h2', title:'东亚父母的道歉方式', source:'抖音话题榜', heat:'🔥 750w', tags:['家庭关系','亲情'], suitable:true, note:'可切《岩中花述》或《思文败类》里聊原生家庭的片段', createdAt:new Date().toISOString() },
      { id:'h3', title:'打工而已别太上头', source:'抖音热搜', heat:'🔥 620w', tags:['职场','心态'], suitable:true, note:'切播客里关于"工作和自我价值"的讨论', createdAt:new Date().toISOString() },
      { id:'h4', title:'INFJ的内心世界', source:'抖音话题榜', heat:'🔥 510w', tags:['自我认知','MBTI'], suitable:true, note:'标签自带流量，找播客里聊MBTI/性格的片段', createdAt:new Date().toISOString() },
      { id:'h5', title:'高敏感人群自救指南', source:'抖音热搜', heat:'🔥 480w', tags:['情绪','自愈'], suitable:true, note:'《Steve说》《自我进化论》都有相关讨论', createdAt:new Date().toISOString() },
      { id:'h6', title:'什么是真正的爱自己', source:'抖音话题榜', heat:'🔥 440w', tags:['自我成长','女性成长'], suitable:true, note:'知愈小馆爆款方向，反复切这个选题', createdAt:new Date().toISOString() },
    ];
  },

  getFiltered() {
    const hotspots = App.data.hotspots.length > 0 ? App.data.hotspots : this.getDefaults();
    const filter = document.getElementById('hotspot-filter')?.value || 'all';
    if (filter === 'all') return hotspots;
    return hotspots.filter(h => h.tags && h.tags.includes(filter));
  },

  render() {
    const hotspots = this.getFiltered();
    const suitableCount = hotspots.filter(h => h.suitable).length;

    const container = document.getElementById('page-hotspot');
    container.innerHTML = `
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--red)">${hotspots.length}</div>
          <div class="stat-label">今日热点</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--green)">${suitableCount}</div>
          <div class="stat-label">适合改编</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--accent)">${Math.round(suitableCount/hotspots.length*100)}%</div>
          <div class="stat-label">适配率</div>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:16px">🔥 抖音热点 · 播客切片改编灵感</h3>
        <div style="display:flex;gap:8px;align-items:center">
          <select class="select" id="hotspot-filter" onchange="HotspotModule.render()" style="width:auto">
            <option value="all">全部分类</option>
            <option value="自我成长">自我成长</option>
            <option value="情绪">情绪共鸣</option>
            <option value="家庭关系">家庭关系</option>
            <option value="职场">职场成长</option>
            <option value="自我认知">自我认知</option>
            <option value="女性成长">女性成长</option>
          </select>
          <button class="btn btn-primary btn-sm" onclick="HotspotModule.crawlNow()">🔄 刷新热点</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px">
        ${hotspots.map(h => this.renderHotspotCard(h)).join('')}
      </div>

      <div style="margin-top:20px;padding:16px;background:var(--accent-bg);border-radius:var(--radius);border:1px solid var(--accent)">
        <strong style="color:var(--accent)">💡 今日二创建议：</strong>
        <p style="margin-top:8px;color:var(--text-secondary);font-size:13px">
          今天「${hotspots[0]?.title || '停止内耗'}」热度最高，建议优先切这个方向的播客片段。配合 #停止内耗 #自我成长 #播客 三个核心标签发布，预计曝光量会更高。
        </p>
      </div>
    `;
  },

  renderHotspotCard(h) {
    const tagColors = {
      '自我成长': 'tag-green', '情绪': 'tag-blue', '家庭关系': 'tag-warm',
      '职场': 'tag-purple', '自我认知': 'tag-pink', '女性成长': 'tag-red'
    };
    return `
      <div class="card" style="border-left:3px solid ${h.suitable ? 'var(--green)' : 'var(--border)'}">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
          <span style="font-weight:600;font-size:15px">${h.title}</span>
          <span style="color:var(--red);font-weight:700;font-size:13px">${h.heat}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">来源：${h.source}</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px">
          ${(h.tags||[]).map(t => `<span class="tag ${tagColors[t]||'tag-blue'}">#${t}</span>`).join('')}
          <span class="tag ${h.suitable ? 'tag-green' : 'tag-red'}">${h.suitable ? '✅ 适合改编' : '❌ 不适合'}</span>
        </div>
        ${h.note ? `<div style="font-size:12px;color:var(--text-secondary);background:var(--bg-hover);padding:8px;border-radius:4px;margin-bottom:8px">💡 ${h.note}</div>` : ''}
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-primary" onclick="HotspotModule.generateIdea('${h.id}')">🎬 生成二创灵感</button>
          <button class="btn btn-sm btn-secondary" onclick="HotspotModule.addToInspiration('${h.id}')">💾 收藏灵感</button>
        </div>
      </div>
    `;
  },

  generateIdea(id) {
    const hotspots = this.getFiltered();
    const h = hotspots.find(x => x.id === id);
    if (!h) return;
    const ideas = [
      '截取播客中关于这个话题最犀利的30秒，配"说的太对了"开头字幕',
      '把这个观点反着说一遍，制造认知冲突（比如"其实你不需要停止内耗"）',
      '找两个播客对同一话题的不同观点，做对比切片',
      '用提问式开头："你有没有发现...？"然后接播客金句',
      '开头大字"这句话治好了我的内耗"，然后放播客片段'
    ];
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    alert(`💡 二创灵感：\n\n针对「${h.title}」\n\n${randomIdea}\n\n标签建议：#${(h.tags||[]).join(' #')} #播客`);
  },

  addToInspiration(id) {
    const hotspots = this.getFiltered();
    const h = hotspots.find(x => x.id === id);
    if (!h) return;
    if (!App.data.inspiration) App.data.inspiration = [];
    App.data.inspiration.unshift({
      id: 'i' + Date.now(),
      content: h.title,
      source: '抖音热点',
      tags: h.tags || [],
      note: h.note || '',
      createdAt: new Date().toISOString()
    });
    App.saveData('inspiration');
    alert('✅ 已收藏到灵感库！');
  },

  crawlNow() {
    alert('🔄 热点爬取中...\n\n提示：在实际部署环境中，会运行 Python 爬虫脚本获取最新抖音热点。\n当前显示的是预设数据，已包含最新趋势方向。\n\n你可以手动添加热点：点击下方按钮。');
    document.getElementById('hotspot-filter')?.dispatchEvent(new Event('change'));
  }
};
