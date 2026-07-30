/* === 素材库模块（多媒体版） === */
const LibraryModule = {
  currentTab: 'podcast',

  getDefaults() {
    return {
      podcast: [
        { id:'p1', name:'思文败类', episode:'EP.68 爱自己到底是什么', timestamp:'12:30-13:15', quote:'执行力差其实是太惯着自己了，真正的爱自己是尊重内心想变好的渴望', emotion:'醍醐灌顶', tags:['执行力','自我成长'], used:true, mediaData:null },
        { id:'p2', name:'岩中花述', episode:'EP.45 母女之间那堵墙', timestamp:'22:00-23:00', quote:'那个给他过生日，不就是你一直期待的妈妈爱你的方式吗', emotion:'扎心', tags:['东亚家庭','母女关系'], used:true, mediaData:null },
        { id:'p3', name:'天真不天真', episode:'EP.112 别把努力当回事', timestamp:'08:45-09:30', quote:'努力是最不值钱的东西，努力做出贡献才值钱', emotion:'醍醐灌顶', tags:['职场','认知'], used:false, mediaData:null },
        { id:'p4', name:'自我进化论', episode:'EP.37 停止内耗的唯一方法', timestamp:'15:00-16:00', quote:'你大部分的痛苦，不是因为做得不好，而是因为想得太多', emotion:'治愈', tags:['内耗','情绪'], used:false, mediaData:null },
        { id:'p5', name:'Steve说', episode:'EP.203 原生家庭不是你的错', timestamp:'28:00-29:00', quote:'你可以理解父母，但不必承接他们的情绪', emotion:'释怀', tags:['原生家庭','边界感'], used:false, mediaData:null },
        { id:'p6', name:'来都来了', episode:'EP.89 打工而已别上头', timestamp:'10:00-10:45', quote:'一份工作而已，别让它定义你的人生价值', emotion:'通透', tags:['职场','心态'], used:false, mediaData:null },
        { id:'p7', name:'陈鲁豫·慢谈', episode:'EP17 对话刘晓庆：从百花影后到龙套配角', timestamp:'约1:20:00', quote:'我们都是这些珠宝的保管者，不是拥有者。被拿走了？那就由他去。因为我还要往前跑。', emotion:'通透', tags:['向前奔跑','女性成长','顶级自爱'], used:false, mediaData:null },
      ],
      images: [
        { id:'img1', name:'黄昏城市剪影', style:'氛围感/孤独', scene:'情绪共鸣类', source:'unsplash', mediaData:null },
        { id:'img2', name:'安静的书桌', style:'治愈/温暖', scene:'自我成长类', source:'unsplash', mediaData:null },
        { id:'img3', name:'窗边剪影', style:'思考/安静', scene:'认知升级类', source:'pinterest', mediaData:null },
        { id:'img4', name:'极简几何', style:'现代/理性', scene:'职场类', source:'canva', mediaData:null },
      ],
      music: [
        { id:'m1', name:'Gymnopédie No.1', artist:'Erik Satie', style:'钢琴/忧伤', emotion:'治愈', source:'网易云', link:'搜索 Gymnopédie No.1', mediaData:null },
        { id:'m2', name:'Saman', artist:'Ólafur Arnalds', style:'极简/钢琴弦乐', emotion:'思考', source:'网易云', link:'搜索 Ólafur Arnalds Saman', mediaData:null },
        { id:'m3', name:'River Flows in You', artist:'Yiruma', style:'钢琴/温暖', emotion:'治愈', source:'QQ音乐', link:'搜索 River Flows in You', mediaData:null },
        { id:'m4', name:'Comptine', artist:'Yann Tiersen', style:'钢琴/叙事', emotion:'怀旧', source:'网易云', link:'搜索 Comptine', mediaData:null },
        { id:'m5', name:'剪映-安静的夜', artist:'剪映音乐库', style:'轻音乐/安静', emotion:'安静', source:'剪映', link:'剪映音乐库搜索「安静的夜」', mediaData:null },
      ],
      topics: [
        { id:'tp1', name:'停止内耗', heat:'🔥 持续高热', trend:'稳定上升', suitable:'自我成长类播客', note:'长期有效话题，每周可切1-2条' },
        { id:'tp2', name:'东亚家庭关系', heat:'🔥🔥 近期爆发', trend:'急速上升', suitable:'岩中花述/思文败类', note:'原生家庭+母女关系双标签叠加' },
        { id:'tp3', name:'INFJ/INFP人格', heat:'🔥 长期热门', trend:'稳定', suitable:'MBTI相关播客', note:'自带流量标签，评论区互动高' },
        { id:'tp4', name:'打工而已别上头', heat:'🔥🔥 近期爆发', trend:'上升', suitable:'职场类播客', note:'配合#打工人 #职场 双标签' },
        { id:'tp5', name:'真正的爱自己', heat:'🔥 长期热门', trend:'稳定', suitable:'任何播客', note:'知愈小馆核心选题方向' },
      ]
    };
  },

  render() {
    const library = App.data.library || this.getDefaults();

    const container = document.getElementById('page-library');
    container.innerHTML = `
      <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
        <button class="btn ${this.currentTab==='podcast'?'btn-primary':'btn-secondary'} btn-sm" onclick="LibraryModule.switchTab('podcast')">🎙️ 播客片段 (${(library.podcast||[]).length})</button>
        <button class="btn ${this.currentTab==='images'?'btn-primary':'btn-secondary'} btn-sm" onclick="LibraryModule.switchTab('images')">🖼️ 背景图片 (${(library.images||[]).length})</button>
        <button class="btn ${this.currentTab==='music'?'btn-primary':'btn-secondary'} btn-sm" onclick="LibraryModule.switchTab('music')">🎵 背景音乐 (${(library.music||[]).length})</button>
        <button class="btn ${this.currentTab==='topics'?'btn-primary':'btn-secondary'} btn-sm" onclick="LibraryModule.switchTab('topics')">🔥 热度话题 (${(library.topics||[]).length})</button>
        <button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="LibraryModule.showAddModal()">+ 添加素材</button>
      </div>
      <div id="library-content"></div>
    `;
    this.renderCurrentTab();
  },

  switchTab(tab) {
    this.currentTab = tab;
    this.render();
  },

  renderCurrentTab() {
    const library = App.data.library || this.getDefaults();
    const content = document.getElementById('library-content');
    const items = library[this.currentTab] || [];

    if (this.currentTab === 'podcast') {
      content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:14px">
          ${items.length === 0 ? '<div class="empty-state"><div class="empty-icon">🎙️</div><div class="empty-text">暂无播客片段，点击右上角添加</div></div>' :
          items.map(p => `
            <div class="card" style="border-left:3px solid ${p.used ? 'var(--green)' : 'var(--accent)'}">
              <div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:8px">
                <div>
                  <span style="font-weight:700">🎙️ ${p.name}</span>
                  <span style="color:var(--text-muted);font-size:12px;margin-left:8px">${p.episode}</span>
                </div>
                <div style="display:flex;gap:4px">
                  <span class="tag tag-warm">⏱ ${p.timestamp}</span>
                  <span class="tag ${p.used?'tag-green':'tag-blue'}">${p.used?'已使用':'待使用'}</span>
                  <span class="tag tag-purple">${p.emotion}</span>
                </div>
              </div>
              <div style="margin:8px 0;font-size:14px;font-style:italic;color:var(--text-primary)">"${p.quote}"</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
                ${(p.tags||[]).map(t=>`<span class="tag tag-blue" style="font-size:10px">#${t}</span>`).join('')}
              </div>
              ${p.mediaData ? `
                <div style="margin-top:10px;border-radius:8px;overflow:hidden;background:#000">
                  <video controls style="width:100%;max-height:400px;display:block" src="${p.mediaData}"></video>
                </div>
              ` : `
                <div style="margin-top:8px">
                  <button class="btn btn-sm btn-secondary" onclick="LibraryModule.uploadMedia('${p.id}','podcast')">📁 上传视频片段</button>
                </div>
              `}
              ${p.mediaData ? `<div style="margin-top:6px"><button class="btn btn-sm btn-secondary" onclick="LibraryModule.uploadMedia('${p.id}','podcast')">🔄 更换视频</button></div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else if (this.currentTab === 'images') {
      content.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px">
          ${items.length === 0 ? '<div class="empty-state"><div class="empty-icon">🖼️</div><div class="empty-text">暂无图片，点击右上角添加</div></div>' :
          items.map(img => `
            <div class="card" style="text-align:center;padding:12px">
              ${img.mediaData ? `
                <div style="border-radius:8px;overflow:hidden;margin-bottom:8px;background:var(--bg-hover);aspect-ratio:9/16;display:flex;align-items:center;justify-content:center">
                  <img src="${img.mediaData}" style="width:100%;height:100%;object-fit:cover" onclick="LibraryModule.previewImage('${img.id}')" />
                </div>
              ` : `
                <div style="border-radius:8px;overflow:hidden;margin-bottom:8px;background:var(--bg-hover);aspect-ratio:9/16;display:flex;align-items:center;justify-content:center;cursor:pointer" onclick="LibraryModule.uploadMedia('${img.id}','images')">
                  <div style="color:var(--text-muted)">
                    <div style="font-size:36px;margin-bottom:6px">🖼️</div>
                    <div style="font-size:12px">点击上传图片</div>
                  </div>
                </div>
              `}
              <div style="font-weight:600;margin-bottom:4px">${img.name}</div>
              <div style="font-size:12px;color:var(--text-muted)">${img.style} · ${img.scene}</div>
              ${img.mediaData ? `<button class="btn btn-sm btn-secondary" style="margin-top:6px" onclick="LibraryModule.uploadMedia('${img.id}','images')">🔄 更换图片</button>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else if (this.currentTab === 'music') {
      content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:14px">
          ${items.length === 0 ? '<div class="empty-state"><div class="empty-icon">🎵</div><div class="empty-text">暂无音乐，点击右上角添加</div></div>' :
          items.map(m => `
            <div class="card">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div>
                  <span style="font-weight:700">🎵 ${m.name}</span>
                  <span style="color:var(--text-muted);font-size:12px;margin-left:8px">${m.artist}</span>
                </div>
                <div style="display:flex;gap:4px">
                  <span class="tag tag-purple">${m.style}</span>
                  <span class="tag tag-warm">${m.emotion}</span>
                </div>
              </div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:6px">🔗 ${m.link||''}（${m.source||''}）</div>
              ${m.mediaData ? `
                <div style="margin-top:10px">
                  <audio controls style="width:100%" src="${m.mediaData}"></audio>
                  <div style="margin-top:6px"><button class="btn btn-sm btn-secondary" onclick="LibraryModule.uploadMedia('${m.id}','music')">🔄 更换音乐</button></div>
                </div>
              ` : `
                <div style="margin-top:8px">
                  <button class="btn btn-sm btn-secondary" onclick="LibraryModule.uploadMedia('${m.id}','music')">📁 上传音乐文件</button>
                </div>
              `}
            </div>
          `).join('')}
        </div>
      `;
    } else if (this.currentTab === 'topics') {
      content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:10px">
          ${items.map(t => `
            <div class="card">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div>
                  <span style="font-weight:700">#${t.name}</span>
                  <span style="font-size:12px;color:var(--text-muted);margin-left:8px">${t.heat}</span>
                </div>
                <div style="display:flex;gap:4px">
                  <span class="tag tag-green">趋势: ${t.trend}</span>
                  <span class="tag tag-blue">适合: ${t.suitable}</span>
                </div>
              </div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:6px">💡 ${t.note}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  // === 文件上传逻辑 ===
  uploadMedia(itemId, tab) {
    const input = document.createElement('input');
    input.type = 'file';

    if (tab === 'podcast') {
      input.accept = 'video/*';
    } else if (tab === 'images') {
      input.accept = 'image/*';
    } else if (tab === 'music') {
      input.accept = 'audio/*';
    }

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // 检查文件大小（限制 50MB，防止 localStorage 溢出）
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`文件太大（${(file.size/1024/1024).toFixed(1)}MB），请选择小于50MB的文件。\n\n提示：大文件建议先用格式转换工具压缩后再上传。`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const library = App.data.library || this.getDefaults();
        const items = library[tab] || [];
        const item = items.find(i => i.id === itemId);
        if (item) {
          item.mediaData = ev.target.result;
          item.mediaName = file.name;
          item.mediaSize = (file.size / 1024 / 1024).toFixed(1) + 'MB';
          App.saveData('library');
          this.render();
        }
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },

  // === 图片预览 ===
  previewImage(itemId) {
    const library = App.data.library || this.getDefaults();
    const item = (library.images || []).find(i => i.id === itemId);
    if (!item || !item.mediaData) return;

    const modal = document.getElementById('global-modal');
    modal.querySelector('.modal-content').innerHTML = `
      <h3>${item.name}</h3>
      <div style="text-align:center">
        <img src="${item.mediaData}" style="max-width:100%;max-height:60vh;border-radius:8px" />
      </div>
      <div style="margin-top:10px;font-size:12px;color:var(--text-muted);text-align:center">${item.style} · ${item.scene}</div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="document.getElementById('global-modal').classList.remove('active')">关闭</button>
      </div>
    `;
    modal.classList.add('active');
  },

  showAddModal() {
    const tab = this.currentTab;
    let fields = '';
    if (tab === 'podcast') {
      fields = `
        <div class="form-group"><label>播客名称</label><input class="input" id="lib-name" placeholder="如：思文败类"></div>
        <div class="form-group"><label>集数</label><input class="input" id="lib-episode" placeholder="如：EP.68 爱自己到底是什么"></div>
        <div class="form-group"><label>时间戳</label><input class="input" id="lib-ts" placeholder="如：12:30-13:15"></div>
        <div class="form-group"><label>金句内容</label><textarea class="textarea" id="lib-quote" placeholder="播客中的原话"></textarea></div>
        <div class="form-group"><label>情绪标签</label><input class="input" id="lib-emotion" placeholder="如：醍醐灌顶/扎心/治愈"></div>
        <div class="form-group"><label>话题标签（逗号分隔）</label><input class="input" id="lib-tags" placeholder="如：执行力,自我成长"></div>
        <div class="form-group"><label>上传视频片段（可选）</label>
          <div style="background:var(--bg-input);border:1px dashed var(--border);border-radius:6px;padding:20px;text-align:center;cursor:pointer" onclick="LibraryModule.handleAddFile('podcast')">
            <div id="add-file-info" style="color:var(--text-muted)">
              <div style="font-size:28px;margin-bottom:6px">📹</div>
              <div style="font-size:12px">点击选择视频文件（mp4/mov 等）</div>
            </div>
          </div>
        </div>
      `;
    } else if (tab === 'images') {
      fields = `
        <div class="form-group"><label>图片名称</label><input class="input" id="lib-name" placeholder="如：黄昏城市剪影"></div>
        <div class="form-group"><label>风格</label><input class="input" id="lib-style" placeholder="如：氛围感/孤独"></div>
        <div class="form-group"><label>适用场景</label><input class="input" id="lib-scene" placeholder="如：情绪共鸣类"></div>
        <div class="form-group"><label>上传图片</label>
          <div style="background:var(--bg-input);border:1px dashed var(--border);border-radius:6px;padding:20px;text-align:center;cursor:pointer" onclick="LibraryModule.handleAddFile('images')">
            <div id="add-file-info" style="color:var(--text-muted)">
              <div style="font-size:28px;margin-bottom:6px">🖼️</div>
              <div style="font-size:12px">点击选择图片（jpg/png 等）</div>
            </div>
          </div>
        </div>
      `;
    } else if (tab === 'music') {
      fields = `
        <div class="form-group"><label>音乐名</label><input class="input" id="lib-name" placeholder="如：Gymnopédie No.1"></div>
        <div class="form-group"><label>艺术家</label><input class="input" id="lib-artist" placeholder="如：Erik Satie"></div>
        <div class="form-group"><label>风格</label><input class="input" id="lib-style" placeholder="如：钢琴/忧伤"></div>
        <div class="form-group"><label>情绪</label><input class="input" id="lib-emotion" placeholder="如：治愈"></div>
        <div class="form-group"><label>上传音乐文件</label>
          <div style="background:var(--bg-input);border:1px dashed var(--border);border-radius:6px;padding:20px;text-align:center;cursor:pointer" onclick="LibraryModule.handleAddFile('music')">
            <div id="add-file-info" style="color:var(--text-muted)">
              <div style="font-size:28px;margin-bottom:6px">🎵</div>
              <div style="font-size:12px">点击选择音频文件（mp3/wav 等）</div>
            </div>
          </div>
        </div>
      `;
    } else if (tab === 'topics') {
      fields = `
        <div class="form-group"><label>话题名</label><input class="input" id="lib-name" placeholder="如：停止内耗"></div>
        <div class="form-group"><label>热度</label><input class="input" id="lib-heat" placeholder="如：🔥 持续高热"></div>
        <div class="form-group"><label>趋势</label><input class="input" id="lib-trend" placeholder="如：稳定上升"></div>
        <div class="form-group"><label>适合播客</label><input class="input" id="lib-suitable" placeholder="如：自我成长类播客"></div>
        <div class="form-group"><label>备注</label><input class="input" id="lib-note" placeholder="如：长期有效话题"></div>
      `;
    }

    const modal = document.getElementById('global-modal');
    modal.querySelector('.modal-content').innerHTML = `
      <h3>➕ 添加素材到「${this.currentTab}」</h3>
      ${fields}
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="document.getElementById('global-modal').classList.remove('active')">取消</button>
        <button class="btn btn-primary" onclick="LibraryModule.addItem()">保存</button>
      </div>
    `;
    modal.classList.add('active');
    // 重置待上传文件
    this._pendingFile = null;
  },

  // 处理新增时的文件上传
  _pendingFile: null,

  handleAddFile(tab) {
    const input = document.createElement('input');
    input.type = 'file';
    if (tab === 'podcast') input.accept = 'video/*';
    else if (tab === 'images') input.accept = 'image/*';
    else if (tab === 'music') input.accept = 'audio/*';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`文件太大（${(file.size/1024/1024).toFixed(1)}MB），请选择小于50MB的文件。`);
        return;
      }

      this._pendingFile = file;
      const info = document.getElementById('add-file-info');
      if (info) {
        info.innerHTML = `
          <div style="color:var(--green)">
            <div style="font-size:28px;margin-bottom:6px">✅</div>
            <div style="font-size:12px;font-weight:600">${file.name}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${(file.size/1024/1024).toFixed(1)}MB</div>
          </div>
        `;
      }
    };

    input.click();
  },

  addItem() {
    if (!App.data.library) App.data.library = this.getDefaults();
    const tab = this.currentTab;
    const getName = () => document.getElementById('lib-name')?.value.trim() || '';

    // 如果有待上传文件，先读取
    const saveItem = (mediaData) => {
      if (tab === 'podcast') {
        App.data.library.podcast = App.data.library.podcast || [];
        App.data.library.podcast.push({
          id: 'p'+Date.now(), name: getName(), episode: document.getElementById('lib-episode')?.value.trim()||'',
          timestamp: document.getElementById('lib-ts')?.value.trim()||'', quote: document.getElementById('lib-quote')?.value.trim()||'',
          emotion: document.getElementById('lib-emotion')?.value.trim()||'', tags: (document.getElementById('lib-tags')?.value||'').split(',').map(t=>t.trim()).filter(t=>t),
          used: false, mediaData: mediaData
        });
      } else if (tab === 'images') {
        App.data.library.images = App.data.library.images || [];
        App.data.library.images.push({ id:'img'+Date.now(), name:getName(), style:document.getElementById('lib-style')?.value.trim()||'', scene:document.getElementById('lib-scene')?.value.trim()||'', source:'本地上传', mediaData: mediaData });
      } else if (tab === 'music') {
        App.data.library.music = App.data.library.music || [];
        App.data.library.music.push({ id:'m'+Date.now(), name:getName(), artist:document.getElementById('lib-artist')?.value.trim()||'', style:document.getElementById('lib-style')?.value.trim()||'', emotion:document.getElementById('lib-emotion')?.value.trim()||'', source:'本地上传', link:'', mediaData: mediaData });
      } else if (tab === 'topics') {
        App.data.library.topics = App.data.library.topics || [];
        App.data.library.topics.push({ id:'tp'+Date.now(), name:getName(), heat:document.getElementById('lib-heat')?.value.trim()||'', trend:document.getElementById('lib-trend')?.value.trim()||'', suitable:document.getElementById('lib-suitable')?.value.trim()||'', note:document.getElementById('lib-note')?.value.trim()||'' });
      }

      App.saveData('library');
      document.getElementById('global-modal').classList.remove('active');
      this._pendingFile = null;
      this.render();
    };

    if (this._pendingFile) {
      const reader = new FileReader();
      reader.onload = (ev) => saveItem(ev.target.result);
      reader.readAsDataURL(this._pendingFile);
    } else {
      saveItem(null);
    }
  }
};
