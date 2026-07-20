// Module 12: OKR Tracker
window.OKRModule = {

  // OKR State
  okrs: [
    {
      id: 'okr-1',
      quarter: 'Q3 2026',
      objective: 'Launch AI Resume Builder to first 500 users',
      owner: 'Alex',
      status: 'on-track',
      keyResults: [
        { id: 'kr-1-1', title: 'Ship core AI parsing feature', progress: 90, unit: '%', target: 100 },
        { id: 'kr-1-2', title: 'Onboard 500 beta signups',      progress: 320, unit: 'users', target: 500 },
        { id: 'kr-1-3', title: 'Achieve < 10s resume generation time', progress: 12, unit: 'sec', target: 10, inverse: true }
      ]
    },
    {
      id: 'okr-2',
      quarter: 'Q3 2026',
      objective: 'Achieve $5K Monthly Recurring Revenue',
      owner: 'Sarah',
      status: 'at-risk',
      keyResults: [
        { id: 'kr-2-1', title: 'Convert 50 paying customers', progress: 18, unit: 'customers', target: 50 },
        { id: 'kr-2-2', title: 'Launch Stripe billing backend', progress: 40, unit: '%', target: 100 },
        { id: 'kr-2-3', title: 'Reduce churn to below 5%',   progress: 9,  unit: '%', target: 5, inverse: true }
      ]
    },
    {
      id: 'okr-3',
      quarter: 'Q3 2026',
      objective: 'Build a recognisable brand presence online',
      owner: 'John',
      status: 'behind',
      keyResults: [
        { id: 'kr-3-1', title: 'Reach 2K Twitter followers', progress: 640,  unit: 'followers', target: 2000 },
        { id: 'kr-3-2', title: 'Publish 8 blog posts',       progress: 2,    unit: 'posts', target: 8 },
        { id: 'kr-3-3', title: 'Get featured on 3 newsletters', progress: 0, unit: 'features', target: 3 }
      ]
    }
  ],

  getStatusColor: function(status) {
    return { 'on-track': 'var(--accent-green)', 'at-risk': 'var(--accent-yellow)', 'behind': 'var(--accent-red)' }[status] || 'var(--text-secondary)';
  },

  getStatusGlow: function(status) {
    return { 'on-track': 'var(--glow-green)', 'at-risk': 'var(--glow-yellow)', 'behind': 'var(--glow-red)' }[status] || 'none';
  },

  getStatusLabel: function(status) {
    return { 'on-track': '● ON TRACK', 'at-risk': '▲ AT RISK', 'behind': '✖ BEHIND' }[status] || status;
  },

  // Compute overall OKR progress (average of KR progress %)
  getObjProgress: function(okr) {
    const pcts = okr.keyResults.map(kr => {
      const raw = Math.min((kr.progress / kr.target) * 100, 100);
      return kr.inverse ? (kr.progress <= kr.target ? 100 : Math.max(0, 100 - ((kr.progress - kr.target) / kr.target) * 100)) : raw;
    });
    return Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length);
  },

  // Auto-compute status from progress
  computeStatus: function(pct) {
    if (pct >= 70) return 'on-track';
    if (pct >= 40) return 'at-risk';
    return 'behind';
  },

  render: function(container) {
    const self = this;
    // Recalculate statuses dynamically
    self.okrs.forEach(okr => { okr.status = self.computeStatus(self.getObjProgress(okr)); });

    const totalOKRs   = self.okrs.length;
    const onTrack     = self.okrs.filter(o => o.status === 'on-track').length;
    const atRisk      = self.okrs.filter(o => o.status === 'at-risk').length;
    const behind      = self.okrs.filter(o => o.status === 'behind').length;
    const overallPct  = Math.round(self.okrs.reduce((sum, o) => sum + self.getObjProgress(o), 0) / totalOKRs);
    const quarterName = self.okrs[0].quarter;

    container.innerHTML = `
      <!-- Header Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-family:var(--font-heading); font-size:18px; font-weight:800; color:#fff; letter-spacing:0.05em; margin-bottom:4px;">🏆 OKR TRACKER</h2>
          <div style="font-family:var(--font-mono); font-size:12px; color:var(--text-secondary);">Quarter: <span style="color:var(--accent-cyan);">${quarterName}</span> &nbsp;|&nbsp; ${totalOKRs} Objectives &nbsp;|&nbsp; ${self.okrs.reduce((s,o)=>s+o.keyResults.length,0)} Key Results</div>
        </div>
        <button id="addOKRBtn" class="btn btn-primary" style="font-size:13px; padding:10px 20px;">
          ＋ Add Objective
        </button>
      </div>

      <!-- Summary Stats -->
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px;">
        ${[
          { label:'OVERALL SCORE', value: overallPct + '%', color:'var(--accent-cyan)', glow:'var(--glow-cyan)' },
          { label:'ON TRACK',      value: onTrack,           color:'var(--accent-green)', glow:'var(--glow-green)' },
          { label:'AT RISK',       value: atRisk,            color:'var(--accent-yellow)', glow:'var(--glow-yellow)' },
          { label:'BEHIND',        value: behind,            color:'var(--accent-red)', glow:'var(--glow-red)' }
        ].map(s => `
          <div class="panel" style="text-align:center; padding:20px 12px; margin-bottom:0;">
            <div style="font-family:var(--font-mono); font-size:10px; color:var(--text-secondary); letter-spacing:0.1em; margin-bottom:10px;">${s.label}</div>
            <div style="font-family:var(--font-heading); font-size:28px; font-weight:800; color:${s.color}; text-shadow:${s.glow};">${s.value}</div>
          </div>
        `).join('')}
      </div>

      <!-- Overall Quarter Progress Bar -->
      <div class="panel" style="padding:20px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="font-family:var(--font-heading); font-size:12px; font-weight:700; color:var(--accent-cyan); letter-spacing:0.05em;">QUARTER PROGRESS — ${quarterName}</div>
          <div style="font-family:var(--font-mono); font-size:13px; color:#fff; font-weight:700;">${overallPct}% Complete</div>
        </div>
        <div style="height:12px; background:rgba(255,255,255,0.05); border-radius:6px; overflow:hidden; position:relative;">
          <div style="width:${overallPct}%; height:100%; border-radius:6px;
            background:linear-gradient(90deg, var(--accent-blue), var(--accent-cyan));
            box-shadow:var(--glow-cyan);
            transition:width 1s ease-out;">
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:8px; font-family:var(--font-mono); font-size:10px; color:var(--text-secondary);">
          <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
        </div>
      </div>

      <!-- OKR Cards -->
      <div id="okrList" style="display:flex; flex-direction:column; gap:20px;">
        ${self.okrs.map((okr, oi) => self.renderOKRCard(okr, oi)).join('')}
      </div>

      <!-- AI Suggestion Panel -->
      <div class="panel" style="margin-top:24px; border-color:rgba(59,130,246,0.3);">
        <div class="panel-header">
          <div class="panel-title">🤖 AI OKR ADVISOR</div>
          <button id="refreshOkrAI" class="btn" style="font-size:11px; padding:6px 14px;">↻ Refresh</button>
        </div>
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="t-dot red"></span>
              <span class="t-dot yellow"></span>
              <span class="t-dot green"></span>
            </div>
            <div class="terminal-title">OKR STRATEGY AGENT</div>
          </div>
          <div class="terminal-body" id="okrAIText" style="min-height:100px; font-size:13px; line-height:1.7;">
            Analyzing current quarter performance...
          </div>
        </div>
      </div>

      <!-- Add OKR Modal -->
      <div id="okrModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:500; align-items:center; justify-content:center; backdrop-filter:blur(4px);">
        <div style="background:var(--bg-card); border:1px solid rgba(34,211,238,0.3); border-radius:12px; padding:32px; width:90%; max-width:520px; box-shadow:0 20px 60px rgba(0,0,0,0.6);">
          <div style="font-family:var(--font-heading); font-size:14px; font-weight:700; color:var(--accent-cyan); margin-bottom:24px; letter-spacing:0.05em;">＋ NEW OBJECTIVE</div>
          <div class="form-group">
            <label class="form-label">OBJECTIVE STATEMENT</label>
            <input type="text" id="newObjTitle" class="form-input" placeholder="e.g. Reach 1000 paying customers">
          </div>
          <div class="form-group">
            <label class="form-label">OWNER</label>
            <select id="newObjOwner" class="form-select">
              <option value="Alex">Alex (Frontend)</option>
              <option value="Sarah">Sarah (Backend)</option>
              <option value="John">John (Marketing)</option>
              <option value="Team">Whole Team</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">KEY RESULT 1</label>
            <input type="text" id="newKR1" class="form-input" placeholder="e.g. Acquire 200 new signups">
          </div>
          <div class="form-group">
            <label class="form-label">KEY RESULT 2</label>
            <input type="text" id="newKR2" class="form-input" placeholder="e.g. Launch referral program">
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:8px;">
            <button id="cancelOKRBtn" class="btn">Cancel</button>
            <button id="saveOKRBtn" class="btn btn-primary">Save Objective</button>
          </div>
        </div>
      </div>
    `;

    self.bindEvents(container);
    self.runAIAdvisor();
  },

  renderOKRCard: function(okr, oi) {
    const self   = this;
    const pct    = self.getObjProgress(okr);
    const color  = self.getStatusColor(okr.status);
    const glow   = self.getStatusGlow(okr.status);
    const label  = self.getStatusLabel(okr.status);
    const ring   = 2 * Math.PI * 36; // circumference for r=36
    const dash   = ring - (ring * pct) / 100;

    return `
      <div class="panel" style="margin-bottom:0; padding:24px;" id="okr-card-${okr.id}">
        <div style="display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap;">

          <!-- Progress Ring -->
          <div style="flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="36" stroke="rgba(255,255,255,0.06)" stroke-width="7" fill="none"/>
              <circle cx="44" cy="44" r="36" stroke="${color}" stroke-width="7" fill="none"
                stroke-dasharray="${ring.toFixed(1)}" stroke-dashoffset="${dash.toFixed(1)}"
                stroke-linecap="round"
                style="transform:rotate(-90deg); transform-origin:50% 50%; filter:drop-shadow(0 0 6px ${color}); transition:stroke-dashoffset 1s ease-out;"/>
            </svg>
            <div style="position:relative; margin-top:-60px; margin-bottom:12px; text-align:center;">
              <div style="font-family:var(--font-heading); font-size:14px; font-weight:800; color:#fff;">${pct}%</div>
            </div>
            <div style="font-family:var(--font-mono); font-size:10px; color:${color}; font-weight:600; letter-spacing:0.06em; text-shadow:${glow}; white-space:nowrap;">${label}</div>
          </div>

          <!-- Content -->
          <div style="flex:1; min-width:260px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:4px;">
              <div style="font-family:var(--font-heading); font-size:14px; font-weight:700; color:#fff; line-height:1.4;">${okr.objective}</div>
              <button class="btn deleteOKRBtn" data-id="${okr.id}" style="font-size:10px; padding:4px 10px; flex-shrink:0; border-color:rgba(239,68,68,0.3); color:var(--accent-red);">✕</button>
            </div>
            <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-secondary); margin-bottom:18px;">
              Owner: <span style="color:var(--accent-cyan);">${okr.owner}</span> &nbsp;·&nbsp; ${okr.quarter}
            </div>

            <!-- Key Results -->
            <div style="display:flex; flex-direction:column; gap:14px;">
              ${okr.keyResults.map((kr, ki) => {
                const rawPct  = Math.min(Math.round((kr.progress / kr.target) * 100), 100);
                const krPct   = kr.inverse ? (kr.progress <= kr.target ? 100 : Math.max(0, 100 - Math.round(((kr.progress - kr.target) / kr.target) * 100))) : rawPct;
                const krColor = krPct >= 70 ? 'var(--accent-green)' : krPct >= 40 ? 'var(--accent-yellow)' : 'var(--accent-red)';
                return `
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; gap:8px;">
                      <div style="font-size:13px; color:var(--text-primary); flex:1;">${kr.title}</div>
                      <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                        <input type="number"
                          class="kr-input"
                          data-okr="${okr.id}" data-kr="${kr.id}"
                          value="${kr.progress}"
                          min="0" max="${kr.inverse ? kr.target * 3 : kr.target}"
                          style="width:72px; background:var(--bg-primary); border:1px solid rgba(34,211,238,0.2);
                            border-radius:4px; color:var(--accent-cyan); font-family:var(--font-mono);
                            font-size:12px; padding:3px 6px; text-align:right; outline:none;">
                        <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-secondary); min-width:32px;">/ ${kr.target} ${kr.unit}</span>
                        <span style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:${krColor}; min-width:36px;">${krPct}%</span>
                      </div>
                    </div>
                    <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                      <div style="width:${krPct}%; height:100%; border-radius:3px;
                        background:${krColor};
                        box-shadow:0 0 8px ${krColor};
                        transition:width 0.8s ease-out;">
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents: function(container) {
    const self = this;

    // Add OKR modal open
    document.getElementById('addOKRBtn').addEventListener('click', () => {
      document.getElementById('okrModal').style.display = 'flex';
    });

    // Cancel modal
    document.getElementById('cancelOKRBtn').addEventListener('click', () => {
      document.getElementById('okrModal').style.display = 'none';
    });

    // Close modal on backdrop click
    document.getElementById('okrModal').addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });

    // Save new OKR
    document.getElementById('saveOKRBtn').addEventListener('click', () => {
      const title  = document.getElementById('newObjTitle').value.trim();
      const owner  = document.getElementById('newObjOwner').value;
      const kr1    = document.getElementById('newKR1').value.trim();
      const kr2    = document.getElementById('newKR2').value.trim();
      if (!title) { window.FounderOS.showToast('Please enter an objective statement.', 'warning'); return; }
      const newId = 'okr-' + Date.now();
      const krs = [];
      if (kr1) krs.push({ id: newId+'-kr1', title: kr1, progress: 0, unit: '%', target: 100 });
      if (kr2) krs.push({ id: newId+'-kr2', title: kr2, progress: 0, unit: '%', target: 100 });
      if (!krs.length) krs.push({ id: newId+'-kr1', title: 'Define first milestone', progress: 0, unit: '%', target: 100 });

      self.okrs.push({ id: newId, quarter: 'Q3 2026', objective: title, owner: owner, status: 'behind', keyResults: krs });
      document.getElementById('okrModal').style.display = 'none';
      window.FounderOS.showToast('New Objective added!', 'success');
      window.FounderOS.sfx.playSuccess();
      self.render(container);
    });

    // KR input live updates
    container.addEventListener('change', function(e) {
      if (!e.target.classList.contains('kr-input')) return;
      const okrId = e.target.dataset.okr;
      const krId  = e.target.dataset.kr;
      const val   = parseInt(e.target.value) || 0;
      const okr   = self.okrs.find(o => o.id === okrId);
      if (!okr) return;
      const kr = okr.keyResults.find(k => k.id === krId);
      if (!kr) return;
      kr.progress = val;
      window.FounderOS.sfx.playKeystroke();
      self.render(container);
    });

    // Delete OKR
    container.addEventListener('click', function(e) {
      const btn = e.target.closest('.deleteOKRBtn');
      if (!btn) return;
      const id = btn.dataset.id;
      self.okrs = self.okrs.filter(o => o.id !== id);
      window.FounderOS.showToast('Objective removed.', 'info');
      self.render(container);
    });

    // Refresh AI
    const refreshBtn = document.getElementById('refreshOkrAI');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => self.runAIAdvisor());
    }
  },

  runAIAdvisor: function() {
    const self   = this;
    const el     = document.getElementById('okrAIText');
    if (!el) return;

    const onTrack = self.okrs.filter(o => o.status === 'on-track').map(o => o.objective);
    const atRisk  = self.okrs.filter(o => o.status === 'at-risk').map(o => o.objective);
    const behind  = self.okrs.filter(o => o.status === 'behind').map(o => o.objective);

    const lines = [];
    if (onTrack.length) lines.push(`[OK]   On Track: "${onTrack[0]}" — Momentum is strong. Keep sprint velocity high.`);
    if (atRisk.length)  lines.push(`[WARN] At Risk:  "${atRisk[0]}" — Revenue targets need attention. Prioritize billing backend.`);
    if (behind.length)  lines.push(`[CRIT] Behind:   "${behind[0]}" — Brand presence is lagging. Schedule 2 blog posts this week.`);
    lines.push(`[AI]   Recommendation: Focus this sprint on "${atRisk[0] || onTrack[0]}" — resolving it unlocks the most downstream value.`);
    lines.push(`[AI]   Projected quarter completion at current pace: ${Math.min(Math.round(self.okrs.reduce((s,o)=>s+self.getObjProgress(o),0)/self.okrs.length * 1.05), 100)}%`);

    window.FounderOS.typewrite(el, lines.join('\n'), 12);
  }
};
