// Module 11: Budget Tracker & Burn Rate Monitor
window.BudgetModule = {

  // Budget state (can be edited live)
  budgetState: {
    totalFunding: 120000,
    spent: 47200,
    monthlyBurn: 9400,
    categories: [
      { id: 'cat-1', name: 'Engineering',  icon: '⚙', budgeted: 40000, spent: 22000, color: '#22d3ee' },
      { id: 'cat-2', name: 'Marketing',    icon: '◉', budgeted: 18000, spent: 8500,  color: '#f59e0b' },
      { id: 'cat-3', name: 'Infrastructure', icon: '▦', budgeted: 12000, spent: 7200, color: '#10b981' },
      { id: 'cat-4', name: 'Design',       icon: '◈', budgeted: 8000,  spent: 5100,  color: '#a78bfa' },
      { id: 'cat-5', name: 'Operations',   icon: '⊞', budgeted: 7000,  spent: 3100,  color: '#fb923c' },
      { id: 'cat-6', name: 'Legal & Admin', icon: '≡', budgeted: 5000,  spent: 1300,  color: '#f472b6' }
    ],
    transactions: [
      { id: 'tx-1', date: '2026-07-14', desc: 'AWS EC2 & S3 bill', category: 'Infrastructure', amount: 1200, type: 'expense' },
      { id: 'tx-2', date: '2026-07-12', desc: 'Product Hunt Pro subscription', category: 'Marketing', amount: 599, type: 'expense' },
      { id: 'tx-3', date: '2026-07-10', desc: 'Freelance UI contractor (Alex)', category: 'Engineering', amount: 3200, type: 'expense' },
      { id: 'tx-4', date: '2026-07-08', desc: 'Figma Business license', category: 'Design', amount: 240, type: 'expense' },
      { id: 'tx-5', date: '2026-07-05', desc: 'Google Workspace', category: 'Operations', amount: 180, type: 'expense' },
      { id: 'tx-6', date: '2026-07-01', desc: 'Seed funding tranche received', category: 'Operations', amount: 30000, type: 'income' },
      { id: 'tx-7', date: '2026-06-28', desc: 'LLM API usage (OpenAI)', category: 'Engineering', amount: 870, type: 'expense' },
      { id: 'tx-8', date: '2026-06-25', desc: 'Twitter/X Ads campaign', category: 'Marketing', amount: 1500, type: 'expense' },
    ]
  },

  render: function(container) {
    this.renderLayout(container);
  },

  renderLayout: function(container) {
    const bs = this.budgetState;
    const remaining = bs.totalFunding - bs.spent;
    const burnPct = Math.round((bs.spent / bs.totalFunding) * 100);
    const runwayMonths = bs.monthlyBurn > 0 ? (remaining / bs.monthlyBurn).toFixed(1) : '∞';
    const runwayStatusColor = runwayMonths < 3 ? 'var(--accent-red)' : runwayMonths < 6 ? 'var(--accent-yellow)' : 'var(--accent-green)';
    const runwayLabel = runwayMonths < 3 ? 'CRITICAL' : runwayMonths < 6 ? 'MONITOR' : 'HEALTHY';

    const totalBudgeted = bs.categories.reduce((s, c) => s + c.budgeted, 0);
    const totalCatSpent = bs.categories.reduce((s, c) => s + c.spent, 0);

    container.innerHTML = `
      <div class="budget-layout">

        <!-- ── TOP STATS ROW ── -->
        <div class="budget-stats-row">

          <div class="budget-stat-card">
            <div class="bsc-label">💰 TOTAL FUNDING</div>
            <div class="bsc-value" style="color:var(--accent-cyan)">$${this._fmt(bs.totalFunding)}</div>
            <div class="bsc-sub">Seed Round</div>
          </div>

          <div class="budget-stat-card">
            <div class="bsc-label">🔥 TOTAL BURNED</div>
            <div class="bsc-value" style="color:var(--accent-red)">$${this._fmt(bs.spent)}</div>
            <div class="bsc-sub">${burnPct}% of budget</div>
          </div>

          <div class="budget-stat-card">
            <div class="bsc-label">📊 MONTHLY BURN</div>
            <div class="bsc-value" style="color:var(--accent-yellow)">$${this._fmt(bs.monthlyBurn)}</div>
            <div class="bsc-sub">Current Rate</div>
          </div>

          <div class="budget-stat-card">
            <div class="bsc-label">⏳ RUNWAY</div>
            <div class="bsc-value" style="color:${runwayStatusColor}">${runwayMonths} mo.</div>
            <div class="bsc-sub" style="color:${runwayStatusColor}">${runwayLabel}</div>
          </div>

          <div class="budget-stat-card">
            <div class="bsc-label">✅ REMAINING</div>
            <div class="bsc-value" style="color:var(--accent-green)">$${this._fmt(remaining)}</div>
            <div class="bsc-sub">${100 - burnPct}% available</div>
          </div>

        </div>

        <!-- ── BURN GAUGE + CATEGORIES ── -->
        <div class="budget-main-row">

          <!-- Burn Rate Gauge -->
          <div class="panel budget-gauge-panel">
            <div class="panel-header">
              <div class="panel-title">🔥 BURN RATE MONITOR</div>
              <span style="font-size:11px; font-family:var(--font-mono); color:var(--accent-yellow)">${burnPct}% Deployed</span>
            </div>

            <div class="burn-gauge-wrap">
              <svg class="burn-gauge-svg" viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg">
                <!-- Background arc -->
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="14" stroke-linecap="round"/>
                <!-- Filled arc (animated) -->
                <path class="gauge-fill-path" id="gaugeFill"
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  stroke-width="14"
                  stroke-linecap="round"
                  stroke-dasharray="251"
                  stroke-dashoffset="${251 - (251 * burnPct / 100)}"
                />
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#10b981"/>
                    <stop offset="60%" style="stop-color:#f59e0b"/>
                    <stop offset="100%" style="stop-color:#ef4444"/>
                  </linearGradient>
                </defs>
                <!-- Labels -->
                <text x="20"  y="118" fill="rgba(148,163,184,0.6)" font-size="8" font-family="monospace">0%</text>
                <text x="168" y="118" fill="rgba(148,163,184,0.6)" font-size="8" font-family="monospace">100%</text>
                <text x="100" y="82" text-anchor="middle" fill="#fff" font-size="22" font-weight="bold" font-family="monospace">${burnPct}%</text>
                <text x="100" y="96" text-anchor="middle" fill="rgba(148,163,184,0.7)" font-size="8" font-family="monospace">CAPITAL UTILIZED</text>
              </svg>
            </div>

            <div class="burn-summary-grid">
              <div class="burn-sum-item">
                <span class="burn-sum-label">Spent This Month</span>
                <span class="burn-sum-val" style="color:var(--accent-red)">$${this._fmt(bs.monthlyBurn)}</span>
              </div>
              <div class="burn-sum-item">
                <span class="burn-sum-label">Projected Next Month</span>
                <span class="burn-sum-val" style="color:var(--accent-yellow)">$${this._fmt(Math.round(bs.monthlyBurn * 1.08))}</span>
              </div>
              <div class="burn-sum-item">
                <span class="burn-sum-label">Break-Even Target</span>
                <span class="burn-sum-val" style="color:var(--accent-cyan)">$${this._fmt(Math.round(bs.monthlyBurn * 2.2))}</span>
              </div>
            </div>

            <!-- Quick Add Expense -->
            <div style="margin-top:20px;">
              <div style="font-family:var(--font-mono); font-size:10px; color:var(--accent-cyan); margin-bottom:10px;">+ LOG EXPENSE</div>
              <div class="quick-expense-row">
                <input type="text" id="expDesc" class="form-input" placeholder="Description" style="flex:2">
                <input type="number" id="expAmt" class="form-input" placeholder="$Amount" style="flex:1">
                <select id="expCat" class="form-input" style="flex:1.5">
                  ${bs.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
                <button class="btn btn-primary" onclick="window.BudgetModule.logExpense()" style="font-size:9px; white-space:nowrap;">[Log It]</button>
              </div>
            </div>
          </div>

          <!-- Category Breakdown -->
          <div class="panel budget-cats-panel">
            <div class="panel-header">
              <div class="panel-title">📊 CATEGORY BREAKDOWN</div>
              <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-secondary)">
                $${this._fmt(totalCatSpent)} / $${this._fmt(totalBudgeted)}
              </span>
            </div>
            <div class="budget-cat-list" id="catList">
              ${bs.categories.map(cat => {
                const pct = Math.min(Math.round((cat.spent / cat.budgeted) * 100), 100);
                const overBudget = cat.spent > cat.budgeted;
                return `
                <div class="budget-cat-item">
                  <div class="bci-meta">
                    <span class="bci-icon">${cat.icon}</span>
                    <span class="bci-name">${cat.name}</span>
                    ${overBudget ? '<span class="bci-over-badge">OVER</span>' : ''}
                    <span class="bci-amounts">$${this._fmt(cat.spent)} / $${this._fmt(cat.budgeted)}</span>
                    <span class="bci-pct" style="color:${cat.color}">${pct}%</span>
                  </div>
                  <div class="bci-bar-track">
                    <div class="bci-bar-fill" style="width:${pct}%; background:${overBudget ? 'var(--accent-red)' : cat.color}; box-shadow: 0 0 8px ${cat.color}40;"></div>
                  </div>
                </div>
              `}).join('')}
            </div>

            <!-- Donut chart (CSS-only) -->
            <div style="margin-top: 24px; text-align: center;">
              <div class="donut-wrap">
                <div class="donut-chart" id="donutChart">
                  <div class="donut-hole">
                    <div style="font-family:var(--font-mono); font-size:9px; color:var(--text-secondary);">ALLOCATED</div>
                    <div style="font-size:16px; font-weight:700; color:var(--accent-cyan);">$${this._fmt(totalBudgeted)}</div>
                  </div>
                </div>
                <div class="donut-legend">
                  ${bs.categories.map(c => `
                    <div class="donut-legend-item">
                      <span class="donut-legend-dot" style="background:${c.color}"></span>
                      <span>${c.name}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── TRANSACTION LOG + AI ANALYSIS ── -->
        <div class="budget-bottom-row">

          <!-- Transaction Log -->
          <div class="panel" style="flex:1.4">
            <div class="panel-header">
              <div class="panel-title">≡ TRANSACTION LOG</div>
              <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-secondary)">${bs.transactions.length} entries</span>
            </div>
            <div id="txList" class="tx-list">
              ${bs.transactions.map(tx => `
                <div class="tx-item">
                  <div class="tx-left">
                    <div class="tx-dot ${tx.type === 'income' ? 'income' : 'expense'}"></div>
                    <div>
                      <div class="tx-desc">${tx.desc}</div>
                      <div class="tx-meta">${tx.date} · ${tx.category}</div>
                    </div>
                  </div>
                  <div class="tx-amount ${tx.type === 'income' ? 'income' : 'expense'}">
                    ${tx.type === 'income' ? '+' : '-'}$${this._fmt(tx.amount)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- AI Budget Analysis Terminal -->
          <div class="panel" style="flex:1">
            <div class="panel-header">
              <div class="panel-title">🤖 AI BUDGET ANALYST</div>
              <button class="btn" style="font-size:9px; padding:4px 10px;" onclick="window.BudgetModule.runAnalysis()">[Analyze]</button>
            </div>
            <div class="terminal-window">
              <div class="terminal-header">
                <div class="terminal-dots">
                  <span class="t-dot red"></span>
                  <span class="t-dot yellow"></span>
                  <span class="t-dot green"></span>
                </div>
                <div class="terminal-title">BUDGET ANALYTICS ENGINE</div>
              </div>
              <div class="terminal-body" id="budgetAiText" style="min-height:240px; font-size:12px;">
                Ready. Click [Analyze] to run AI budget assessment...
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    // Run initial AI analysis after DOM renders
    setTimeout(() => this.runAnalysis(), 400);
    // Animate the gauge fill
    this._animateGauge(burnPct);
    // Build donut chart segments
    this._buildDonut();
  },

  logExpense: function() {
    const desc = document.getElementById('expDesc');
    const amt  = document.getElementById('expAmt');
    const cat  = document.getElementById('expCat');
    if (!desc || !amt || !cat) return;

    const amount = parseFloat(amt.value);
    if (!desc.value.trim() || isNaN(amount) || amount <= 0) {
      window.FounderOS.showToast('Please enter a valid description and amount.', 'warning');
      window.FounderOS.sfx.playAlert();
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newTx = {
      id: 'tx-' + Date.now(),
      date: today,
      desc: desc.value.trim(),
      category: cat.value,
      amount: amount,
      type: 'expense'
    };

    this.budgetState.transactions.unshift(newTx);
    this.budgetState.spent += amount;
    this.budgetState.monthlyBurn = Math.round(this.budgetState.monthlyBurn + amount * 0.15);

    // Update category spend
    const catEntry = this.budgetState.categories.find(c => c.name === cat.value);
    if (catEntry) catEntry.spent += amount;

    // Clear inputs
    desc.value = '';
    amt.value  = '';

    window.FounderOS.showToast(`Expense logged: $${this._fmt(amount)} — ${newTx.desc}`, 'success');
    window.FounderOS.sfx.playSuccess();
    this.renderLayout(document.getElementById('contentArea'));
  },

  runAnalysis: function() {
    const aiText = document.getElementById('budgetAiText');
    if (!aiText) return;

    const bs = this.budgetState;
    const runway = (bs.monthlyBurn > 0) ? ((bs.totalFunding - bs.spent) / bs.monthlyBurn).toFixed(1) : 99;
    const overCats = bs.categories.filter(c => c.spent > c.budgeted).map(c => c.name).join(', ') || 'None';
    const topCat = [...bs.categories].sort((a, b) => b.spent - a.spent)[0];
    const burnPct = Math.round((bs.spent / bs.totalFunding) * 100);

    const analysis = [
      `founder.ai@os:~$ run budget-analyst --mode=deep`,
      `> Connecting to financial datastore...`,
      `> Loading ${bs.transactions.length} transactions...`,
      `> Calculating burn velocity...`,
      ``,
      `━━━ ANALYSIS REPORT ━━━`,
      ``,
      `Burn Rate:    $${this._fmt(bs.monthlyBurn)}/mo  (${burnPct}% of funding used)`,
      `Runway:       ${runway} months remaining`,
      `Top Spend:    ${topCat.name}  ($${this._fmt(topCat.spent)})`,
      `Over Budget:  ${overCats}`,
      ``,
      `━━━ AI RECOMMENDATIONS ━━━`,
      ``,
      runway < 4
        ? `⚠ CRITICAL: Runway below 4 months. Initiate fundraising immediately or cut Engineering spend by 20%.`
        : runway < 7
          ? `🟡 CAUTION: Runway is tight. Consider reducing Marketing spend until product hits PMF.`
          : `✅ STABLE: Runway is healthy. On track to reach Product Hunt launch milestone.`,
      ``,
      `◈ Infrastructure costs trending +12% MoM — review cloud usage with Sarah.`,
      `◈ Marketing ROI: $${this._fmt(Math.round(bs.budgetState ? 0 : 8500 * 2.3))} estimated pipeline per $1 spent.`,
      `◈ Next critical checkpoint: $${this._fmt(Math.round(bs.monthlyBurn * 2))} required for next milestone.`,
    ];

    window.FounderOS.typewrite(aiText, analysis.join('\n'), 12);
  },

  _animateGauge: function(pct) {
    const path = document.getElementById('gaugeFill');
    if (!path) return;
    const total = 251;
    path.style.strokeDashoffset = total;
    setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      path.style.strokeDashoffset = total - (total * pct / 100);
    }, 200);
  },

  _buildDonut: function() {
    const bs = this.budgetState;
    const chart = document.getElementById('donutChart');
    if (!chart) return;

    const total = bs.categories.reduce((s, c) => s + c.budgeted, 0);
    let cumulativePct = 0;

    const segments = bs.categories.map(cat => {
      const pct = (cat.budgeted / total) * 100;
      const segment = { pct, color: cat.color, start: cumulativePct };
      cumulativePct += pct;
      return segment;
    });

    // Build CSS conic-gradient
    let gradient = 'conic-gradient(';
    gradient += segments.map(s => `${s.color} ${s.start.toFixed(1)}% ${(s.start + s.pct).toFixed(1)}%`).join(', ');
    gradient += ')';

    chart.style.background = gradient;
  },

  _fmt: function(n) {
    return Number(n).toLocaleString('en-US');
  }
};
