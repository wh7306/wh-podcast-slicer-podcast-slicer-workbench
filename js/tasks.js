/* === 任务看板模块 === */
const TaskModule = {
  getDefaults() {
    return [
      { id: 't1', title: '听播客标记金句', desc: '选1期播客，标记3-5个金句时间戳', status: 'todo', category: '选题', priority: 'high', createdAt: new Date().toISOString() },
      { id: 't2', title: '转文字提取金句', desc: '用通义听悟/飞书妙记转文字，提取3条可用的金句', status: 'todo', category: '选题', priority: 'high', createdAt: new Date().toISOString() },
      { id: 't3', title: '剪辑视频（1-2条）', desc: '选最好的金句片段，剪映制作15-45秒视频', status: 'todo', category: '剪辑', priority: 'high', createdAt: new Date().toISOString() },
      { id: 't4', title: '发布视频+文案', desc: '抖音发布，配上文案和话题标签', status: 'todo', category: '发布', priority: 'medium', createdAt: new Date().toISOString() },
      { id: 't5', title: '数据复盘', desc: '查看昨日视频数据，记录到复盘表', status: 'todo', category: '复盘', priority: 'medium', createdAt: new Date().toISOString() },
      { id: 't6', title: '刷同赛道账号', desc: '看10个同类播客切片号，记录选题灵感', status: 'todo', category: '选题', priority: 'low', createdAt: new Date().toISOString() },
      { id: 't7', title: '更新素材库', desc: '新增播客片段/背景图/BGM到素材库', status: 'todo', category: '素材', priority: 'low', createdAt: new Date().toISOString() },
    ];
  },

  render() {
    const tasks = App.data.tasks;
    const todo = tasks.filter(t => t.status === 'todo');
    const doing = tasks.filter(t => t.status === 'doing');
    const done = tasks.filter(t => t.status === 'done');
    const total = tasks.length;
    const donePercent = total > 0 ? Math.round(done.length / total * 100) : 0;

    const container = document.getElementById('page-tasks');
    container.innerHTML = `
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value" style="color:var(--accent)">${todo.length}</div>
          <div class="stat-label">待完成任务</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--blue)">${doing.length}</div>
          <div class="stat-label">进行中</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--green)">${done.length}</div>
          <div class="stat-label">已完成</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--purple)">${donePercent}%</div>
          <div class="stat-label">完成率</div>
          <div class="progress-bar" style="margin-top:8px">
            <div class="progress-fill" style="width:${donePercent}%"></div>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="font-size:16px">📋 任务列表</h3>
        <button class="btn btn-primary btn-sm" onclick="TaskModule.showAddModal()">+ 添加任务</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
        ${this.renderColumn('todo', '📌 待做', tasks.filter(t=>t.status==='todo'))}
        ${this.renderColumn('doing', '⚡ 进行中', tasks.filter(t=>t.status==='doing'))}
        ${this.renderColumn('done', '✅ 已完成', tasks.filter(t=>t.status==='done'))}
      </div>
    `;
  },

  renderColumn(status, title, tasks) {
    const colorMap = { todo: 'var(--accent)', doing: 'var(--blue)', done: 'var(--green)' };
    const bgMap = { todo: 'var(--accent-bg)', doing: 'var(--blue-bg)', done: 'var(--green-bg)' };
    return `
      <div class="card" style="min-height:300px">
        <div class="card-header">
          <span class="card-title" style="color:${colorMap[status]}">${title}</span>
          <span style="background:${bgMap[status]};color:${colorMap[status]};padding:2px 10px;border-radius:10px;font-size:12px;font-weight:600">${tasks.length}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${tasks.length === 0 ? '<div class="empty-state" style="padding:24px"><div class="empty-text">暂无任务</div></div>' : tasks.map(t => this.renderTaskCard(t)).join('')}
        </div>
      </div>
    `;
  },

  renderTaskCard(task) {
    const priorityColors = { high: 'tag-red', medium: 'tag-warm', low: 'tag-blue' };
    const priorityLabels = { high: '高优先', medium: '中优先', low: '低优先' };
    const nextStatus = { todo: 'doing', doing: 'done', done: 'todo' };
    const nextLabel = { todo: '▶ 开始', doing: '✓ 完成', done: '↩ 重做' };

    return `
      <div style="background:var(--bg-hover);border-radius:var(--radius-sm);padding:12px;cursor:pointer;border:1px solid var(--border);transition:all 0.2s"
           draggable="true" data-task-id="${task.id}"
           ondragstart="TaskModule.handleDragStart(event,'${task.id}')"
           ondragover="event.preventDefault()"
           ondrop="TaskModule.handleDrop(event,'${task.id}')">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:6px">
          <span style="font-weight:600;font-size:14px">${task.title}</span>
          <span class="tag ${priorityColors[task.priority]}">${priorityLabels[task.priority]}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">${task.desc}</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="tag tag-purple" style="font-size:10px">${task.category}</span>
          <div style="display:flex;gap:4px">
            <button class="btn btn-sm btn-secondary" onclick="TaskModule.moveTask('${task.id}','${nextStatus[task.status]}')">${nextLabel[task.status]}</button>
            <button class="btn btn-sm btn-secondary" onclick="TaskModule.deleteTask('${task.id}')" style="color:var(--red)">✕</button>
          </div>
        </div>
      </div>
    `;
  },

  moveTask(taskId, newStatus) {
    const task = App.data.tasks.find(t => t.id === taskId);
    if (task) task.status = newStatus;
    App.saveData('tasks');
    this.render();
  },

  deleteTask(taskId) {
    if (!confirm('确定删除这个任务吗？')) return;
    App.data.tasks = App.data.tasks.filter(t => t.id !== taskId);
    App.saveData('tasks');
    this.render();
  },

  showAddModal() {
    const modal = document.getElementById('global-modal');
    modal.querySelector('.modal-content').innerHTML = `
      <h3>➕ 添加新任务</h3>
      <div class="form-group"><label>任务标题</label><input class="input" id="new-task-title" placeholder="输入任务名称"></div>
      <div class="form-group"><label>任务描述</label><input class="input" id="new-task-desc" placeholder="简要描述"></div>
      <div class="form-group"><label>分类</label><select class="select" id="new-task-cat"><option>选题</option><option>剪辑</option><option>发布</option><option>复盘</option><option>素材</option></select></div>
      <div class="form-group"><label>优先级</label><select class="select" id="new-task-pri"><option value="high">高</option><option value="medium" selected>中</option><option value="low">低</option></select></div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="document.getElementById('global-modal').classList.remove('active')">取消</button>
        <button class="btn btn-primary" onclick="TaskModule.addTask()">添加</button>
      </div>
    `;
    modal.classList.add('active');
  },

  addTask() {
    const title = document.getElementById('new-task-title').value.trim();
    if (!title) return alert('请输入任务标题');
    App.data.tasks.push({
      id: 't' + Date.now(),
      title,
      desc: document.getElementById('new-task-desc').value.trim(),
      status: 'todo',
      category: document.getElementById('new-task-cat').value,
      priority: document.getElementById('new-task-pri').value,
      createdAt: new Date().toISOString()
    });
    App.saveData('tasks');
    document.getElementById('global-modal').classList.remove('active');
    this.render();
  },

  handleDragStart(e, taskId) {
    e.dataTransfer.setData('text/plain', taskId);
  },

  handleDrop(e, targetId) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const dragged = App.data.tasks.find(t => t.id === draggedId);
    const target = App.data.tasks.find(t => t.id === targetId);
    if (dragged && target && dragged.status !== target.status) {
      dragged.status = target.status;
      App.saveData('tasks');
      this.render();
    }
  }
};
