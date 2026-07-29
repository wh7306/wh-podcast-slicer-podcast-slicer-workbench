/* === 内容复盘模块 === */
const ReviewModule = {
  getDefaults() {
    return [
      { id:'r1', date:'2026-07-28', title:'执行力差其实是太惯着自己了', podcast:'未知播客', copy:'执行力差其实是太惯着自己了，真正的爱自己是尊重内心想变好的渴望', tags:'#执行力 #自我成长 #播客 #停止内耗', views:183000, likes:8100, comments:2518, saves:3900, completionRate:48, notes:'完播率不错，标题钩子力度够。下次可以试试在评论区先发一条引导互动。' },
      { id:'r2', date:'2026-07-27', title:'不要自相情愿地爱一个人', podcast:'未知播客', copy:'不要自相情愿地用你想让他爱你的方式去爱他', tags:'#亲密关系 #情感共鸣 #人间清醒', views:56000, likes:2300, comments:1200, saves:1900, completionRate:35, notes:'完播率偏低，开头3秒不够抓人。下次把金句放开头大字。标签可以加#播客。' },
    ];
  },

  render() {
    const reviews = App.data.reviews.length > 0 ? App.data.reviews : this.getDefaults();
    const totalViews = reviews.reduce((s,r) => s + r.views, 0);
    const avgCompletion = Math.round(reviews.reduce((s,r) => s + r.completionRate, 0) / reviews.length);
    const totalLikes = reviews.reduce((s,r) => s + r.likes, 0);
    const avgEngagement = reviews.length > 0 ? Math.round(totalLikes / reviews.reduce((s,r) => s + r.views, 0) * 1000) / 10 : 0;

    const container = document.getElementById('page-review');
    container.innerHTML = `
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--blue)">${this.formatNum(totalViews)}</div>
          <div class="stat-label">总播放量</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--accent)">${avgCompletion}%</div>
          <div class="stat-label">平均完播率</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--green)">${avgEngagement}%</div>
          <div class="stat-label">平均互动率</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--purple)">${reviews.length}</div>
          <div class="stat-label">已发布视频</div>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="font-size:16px">📊 发布记录</h3>
        <button class="btn btn-primary btn-sm" onclick="ReviewModule.showAddModal()">+ 添加复盘</button>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px">
        ${reviews.slice().reverse().map(r => this.renderReviewCard(r)).join('')}
      </div>

      ${reviews.length >= 2 ? this.renderInsights(reviews) : ''}
    `;
  },

  renderReviewCard(r) {
    const engagementRate = r.views > 0 ? ((r.likes + r.comments + r.saves) / r.views * 100).toFixed(1) : 0;
    const completionColor = r.completionRate >= 45 ? 'var(--green)' : r.completionRate >= 30 ? 'var(--accent)' : 'var(--red)';

    return `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <span style="font-weight:700;font-size:15px">${r.title}</span>
            <span style="color:var(--text-muted);font-size:12px;margin-left:8px">${r.date}</span>
          </div>
          <div style="display:flex;gap:6px">
            <span class="tag tag-blue">播放 ${this.formatNum(r.views)}</span>
            <span class="tag tag-warm">赞 ${this.formatNum(r.likes)}</span>
            <span class="tag tag-green">互动率 ${engagementRate}%</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:12px;font-size:12px">
          <div><span style="color:var(--text-muted)">完播率</span><br><span style="color:${completionColor};font-weight:700;font-size:18px">${r.completionRate}%</span></div>
          <div><span style="color:var(--text-muted)">点赞</span><br><span style="font-weight:600">${this.formatNum(r.likes)}</span></div>
          <div><span style="color:var(--text-muted)">评论</span><br><span style="font-weight:600">${this.formatNum(r.comments)}</span></div>
          <div><span style="color:var(--text-muted)">收藏</span><br><span style="font-weight:600">${this.formatNum(r.saves)}</span></div>
          <div><span style="color:var(--text-muted)">播客来源</span><br><span style="font-weight:600;font-size:11px">${r.podcast}</span></div>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px">
          <span style="color:var(--text-muted)">文案：</span>${r.copy}
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">${r.tags}</div>
        ${r.notes ? `<div style="background:var(--accent-bg);padding:10px;border-radius:4px;font-size:12px;color:var(--accent)">📝 ${r.notes}</div>` : ''}
      </div>
    `;
  },

  renderInsights(reviews) {
    const best = reviews.reduce((a,b) => a.completionRate > b.completionRate ? a : b);
    const worst = reviews.reduce((a,b) => a.completionRate < b.completionRate ? a : b);
    const topTags = [...new Set(reviews.flatMap(r => r.tags.split('#')))]
      .filter(t => t).slice(0, 5).join(' #');

    return `
      <div class="card" style="margin-top:20px;border:1px solid var(--accent)">
        <div class="card-title" style="color:var(--accent);margin-bottom:12px">📈 优化建议</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:13px">
          <div style="background:var(--green-bg);padding:12px;border-radius:6px">
            <strong style="color:var(--green)">✅ 做得好的：</strong>
            <ul style="margin:8px 0 0 16px;color:var(--text-secondary)">
              <li>「${best.title}」完播率最高（${best.completionRate}%），说明这类选题钩子力度够</li>
              <li>高频标签：${topTags ? '#' + topTags : '暂无数据'}，继续使用</li>
            </ul>
          </div>
          <div style="background:var(--red-bg);padding:12px;border-radius:6px">
            <strong style="color:var(--red)">⚠️ 需要优化：</strong>
            <ul style="margin:8px 0 0 16px;color:var(--text-secondary)">
              <li>「${worst.title}」完播率偏低（${worst.completionRate}%），开头3秒需要更抓人</li>
              <li>建议把核心金句放大字放在视频前3秒</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  showAddModal() {
    const modal = document.getElementById('global-modal');
    modal.querySelector('.modal-content').innerHTML = `
      <h3>📊 添加复盘记录</h3>
      <div class="form-group"><label>发布日期</label><input class="input" id="rev-date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
      <div class="form-group"><label>视频标题</label><input class="input" id="rev-title" placeholder="视频标题/主题"></div>
      <div class="form-group"><label>播客来源</label><input class="input" id="rev-podcast" placeholder="如：思文败类 / 岩中花述"></div>
      <div class="form-group"><label>文案</label><textarea class="textarea" id="rev-copy" placeholder="视频文案内容"></textarea></div>
      <div class="form-group"><label>话题标签</label><input class="input" id="rev-tags" placeholder="#标签1 #标签2"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="form-group"><label>播放量</label><input class="input" id="rev-views" type="number" value="0"></div>
        <div class="form-group"><label>点赞</label><input class="input" id="rev-likes" type="number" value="0"></div>
        <div class="form-group"><label>评论</label><input class="input" id="rev-comments" type="number" value="0"></div>
        <div class="form-group"><label>收藏</label><input class="input" id="rev-saves" type="number" value="0"></div>
        <div class="form-group"><label>完播率(%)</label><input class="input" id="rev-cr" type="number" value="0" min="0" max="100"></div>
      </div>
      <div class="form-group"><label>复盘笔记</label><textarea class="textarea" id="rev-notes" placeholder="哪里做得好？哪里需要改进？"></textarea></div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="document.getElementById('global-modal').classList.remove('active')">取消</button>
        <button class="btn btn-primary" onclick="ReviewModule.addReview()">保存</button>
      </div>
    `;
    modal.classList.add('active');
  },

  addReview() {
    if (!App.data.reviews) App.data.reviews = [];
    App.data.reviews.push({
      id: 'r' + Date.now(),
      date: document.getElementById('rev-date').value,
      title: document.getElementById('rev-title').value.trim(),
      podcast: document.getElementById('rev-podcast').value.trim(),
      copy: document.getElementById('rev-copy').value.trim(),
      tags: document.getElementById('rev-tags').value.trim(),
      views: parseInt(document.getElementById('rev-views').value) || 0,
      likes: parseInt(document.getElementById('rev-likes').value) || 0,
      comments: parseInt(document.getElementById('rev-comments').value) || 0,
      saves: parseInt(document.getElementById('rev-saves').value) || 0,
      completionRate: parseInt(document.getElementById('rev-cr').value) || 0,
      notes: document.getElementById('rev-notes').value.trim()
    });
    App.saveData('reviews');
    document.getElementById('global-modal').classList.remove('active');
    this.render();
  },

  formatNum(n) {
    if (n >= 10000) return (n/10000).toFixed(1) + '万';
    if (n >= 1000) return (n/1000).toFixed(1) + 'k';
    return n.toString();
  }
};
