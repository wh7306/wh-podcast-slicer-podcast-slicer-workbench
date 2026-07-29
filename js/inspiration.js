/* === 灵感来源模块 === */
const InspirationModule = {
  getDefaults() {
    return [
      { id:'i1', content:'执行力差其实是太惯着自己了，真正的爱自己是尊重内心想变好的渴望', source:'播客金句', tags:['执行力','自我成长'], createdAt:'2026-07-28' },
      { id:'i2', content:'不要自相情愿地用你想让他爱你的方式去爱他', source:'播客金句', tags:['亲密关系','情感'], createdAt:'2026-07-27' },
      { id:'i3', content:'那个给他过生日，不就是你一直期待的妈妈爱你的方式吗', source:'播客金句', tags:['东亚家庭','原生家庭'], createdAt:'2026-07-27' },
      { id:'i4', content:'努力是最不值钱的东西，努力做出贡献才值钱', source:'播客金句', tags:['职场','认知'], createdAt:'2026-07-26' },
      { id:'i5', content:'评论区有人说"这段话直接给我听哭了"——情绪共鸣类选题永远有市场', source:'评论区高赞', tags:['运营技巧','情绪共鸣'], createdAt:'2026-07-26' },
      { id:'i6', content:'知愈小馆合集模式：同一播客切5集发合集，完播率和关注转化都比单条高', source:'竞品分析', tags:['运营技巧','合集'], createdAt:'2026-07-25' },
      { id:'i7', content:'抖音近期流量倾斜"播客"标签，搜索#播客 话题播放量突破50亿', source:'平台趋势', tags:['流量趋势','播客'], createdAt:'2026-07-25' },
      { id:'i8', content:'原生家庭+东亚父母——这个选题方向近期爆款频出，建议重点切', source:'竞品分析', tags:['选题方向','原生家庭'], createdAt:'2026-07-24' },
    ];
  },

  render() {
    const inspirations = App.data.inspiration.length > 0 ? App.data.inspiration : this.getDefaults();
    const searchTerm = document.getElementById('inspiration-search')?.value || '';
    const filtered = searchTerm ? inspirations.filter(i => i.content.includes(searchTerm) || (i.tags||[]).some(t => t.includes(searchTerm))) : inspirations;

    const container = document.getElementById('page-inspiration');
    container.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:16px">💡 灵感池（${inspirations.length}条）</h3>
        <div style="display:flex;gap:8px">
          <input class="input" id="inspiration-search" placeholder="搜索灵感..." style="width:200px" oninput="InspirationModule.render()">
          <button class="btn btn-primary btn-sm" onclick="InspirationModule.showAddModal()">+ 添加灵感</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px">
        ${filtered.length === 0 ? '<div class="empty-state"><div class="empty-icon">💭</div><div class="empty-text">暂无灵感，快去听播客吧！</div></div>' : filtered.map(i => this.renderCard(i)).join('')}
      </div>
    `;
  },

  renderCard(i) {
    const tagColors = {
      '执行力': 'tag-green', '自我成长': 'tag-green', '亲密关系': 'tag-pink', '情感': 'tag-pink',
      '东亚家庭': 'tag-warm', '原生家庭': 'tag-warm', '职场': 'tag-purple', '认知': 'tag-purple',
      '运营技巧': 'tag-blue', '流量趋势': 'tag-blue', '选题方向': 'tag-red', '情绪共鸣': 'tag-red'
    };
    return `
      <div class="card">
        <div style="font-size:14px;line-height:1.8;margin-bottom:10px;font-style:italic;color:var(--text-primary)">
          "${i.content}"
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            ${(i.tags||[]).map(t => `<span class="tag ${tagColors[t]||'tag-blue'}">#${t}</span>`).join('')}
          </div>
          <span style="font-size:11px;color:var(--text-muted)">${i.source} · ${i.createdAt?.slice(5) || ''}</span>
        </div>
        <div style="display:flex;gap:6px;margin-top:10px">
          <button class="btn btn-sm btn-secondary" onclick="InspirationModule.useAsCopy('${i.id}')">📋 用作文案</button>
          <button class="btn btn-sm btn-secondary" onclick="InspirationModule.deleteItem('${i.id}')">✕</button>
        </div>
      </div>
    `;
  },

  useAsCopy(id) {
    const inspirations = App.data.inspiration.length > 0 ? App.data.inspiration : this.getDefaults();
    const item = inspirations.find(x => x.id === id);
    if (!item) return;
    const modal = document.getElementById('global-modal');
    modal.querySelector('.modal-content').innerHTML = `
      <h3>📋 生成文案</h3>
      <div style="background:var(--bg-hover);padding:14px;border-radius:6px;margin-bottom:12px;font-size:14px;line-height:1.8">
        ${item.content}
      </div>
      <div class="form-group"><label>推荐标签</label><input class="input" value="${(item.tags||[]).map(t=>'#'+t).join(' ')}" readonly></div>
      <p style="font-size:12px;color:var(--text-muted);margin-top:8px">复制以上内容，粘贴到抖音发布页即可。</p>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="document.getElementById('global-modal').classList.remove('active')">关闭</button>
        <button class="btn btn-primary" onclick="navigator.clipboard.writeText(document.querySelector('.modal-content .form-group input').value);alert('✅ 标签已复制！')">复制标签</button>
      </div>
    `;
    modal.classList.add('active');
  },

  showAddModal() {
    const modal = document.getElementById('global-modal');
    modal.querySelector('.modal-content').innerHTML = `
      <h3>💡 添加灵感</h3>
      <div class="form-group"><label>灵感内容</label><textarea class="textarea" id="insp-content" placeholder="记录金句、选题方向、运营技巧..."></textarea></div>
      <div class="form-group"><label>来源</label><select class="select" id="insp-source"><option>播客金句</option><option>评论区高赞</option><option>竞品分析</option><option>平台趋势</option><option>运营技巧</option><option>选题方向</option></select></div>
      <div class="form-group"><label>标签（逗号分隔）</label><input class="input" id="insp-tags" placeholder="如：自我成长,原生家庭"></div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="document.getElementById('global-modal').classList.remove('active')">取消</button>
        <button class="btn btn-primary" onclick="InspirationModule.addItem()">保存</button>
      </div>
    `;
    modal.classList.add('active');
  },

  addItem() {
    if (!App.data.inspiration) App.data.inspiration = [];
    App.data.inspiration.unshift({
      id: 'i' + Date.now(),
      content: document.getElementById('insp-content').value.trim(),
      source: document.getElementById('insp-source').value,
      tags: document.getElementById('insp-tags').value.split(',').map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString().split('T')[0]
    });
    App.saveData('inspiration');
    document.getElementById('global-modal').classList.remove('active');
    this.render();
  },

  deleteItem(id) {
    if (!confirm('确定删除这条灵感吗？')) return;
    App.data.inspiration = App.data.inspiration.filter(i => i.id !== id);
    App.saveData('inspiration');
    this.render();
  }
};
