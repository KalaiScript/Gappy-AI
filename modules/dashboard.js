// Module 1: Dashboard & Daily Standup
window.DashboardModule = {
  render: function(container) {
    const state = window.FounderOS.state;
    
    // Calculate today's priority list from tasks that are done
    const doneTasks = state.tasks.filter(t => t.status === "done").slice(0, 4);
    const todoTasks = state.tasks.filter(t => t.status !== "done").slice(0, 3);
    
    container.innerHTML = `
      <div class="dashboard-grid">
        <div class="dashboard-left">
          <!-- Mission Status Panel -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">⚡ CURRENT MISSION</div>
              <span class="topbar-chip risk-low" style="border: 1px solid rgba(16, 185, 129, 0.3)">
                <span class="pulse-dot"></span><span>${state.riskLevel} RISK</span>
              </span>
            </div>
            
            <h2 style="font-family: var(--font-heading); font-size: 16px; margin-bottom: 20px; color:#fff; text-shadow:0 0 5px rgba(34, 211, 238, 0.3)">
              ${state.mission}
            </h2>
            
            <div style="margin-bottom: 20px;">
              <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary)">
                <span>COMPLETION STATUS</span>
                <span style="color:var(--accent-cyan)">${state.progress}%</span>
              </div>
              <div class="mission-progress-bar" style="height: 16px; border-radius: 8px;">
                <div class="mission-progress-fill" style="width: ${state.progress}%"></div>
              </div>
            </div>
            
            <div class="grid-3" style="margin-top: 10px;">
              <div style="background:rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); text-align:center">
                <div style="font-size: 10px; font-family: var(--font-mono); color: var(--text-secondary); margin-bottom: 4px;">DEADLINE</div>
                <div style="font-size: 16px; font-weight:700; color:var(--accent-cyan); font-family: var(--font-mono)">${state.daysLeft} Days Left</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); text-align:center">
                <div style="font-size: 10px; font-family: var(--font-mono); color: var(--text-secondary); margin-bottom: 4px;">TEAM BURNDOWN</div>
                <div style="font-size: 16px; font-weight:700; color:var(--accent-green); font-family: var(--font-mono)">72% Velocity</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); text-align:center">
                <div style="font-size: 10px; font-family: var(--font-mono); color: var(--text-secondary); margin-bottom: 4px;">ACTIVE BLOCKS</div>
                <div style="font-size: 16px; font-weight:700; color:var(--accent-red); font-family: var(--font-mono)">1 Blocker</div>
              </div>
            </div>
          </div>
          
          <!-- Daily Standup -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">⌂ DAILY STANDUP REPORT</div>
              <span style="font-size: 11px; font-family:var(--font-mono); color:var(--text-secondary)">Morning Update</span>
            </div>
            
            <div style="display:flex; flex-direction:column; gap: 14px;">
              <div>
                <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-green); margin-bottom: 6px;">✔ YESTERDAY COMPLETED</div>
                <ul style="padding-left: 20px; font-size: 13px; color:var(--text-secondary); line-height: 1.6;">
                  ${doneTasks.map(t => `<li>${t.title} (${t.owner})</li>`).join('')}
                </ul>
              </div>
              
              <div>
                <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-cyan); margin-bottom: 6px;">▶ TODAY'S TASKS</div>
                <ul style="padding-left: 20px; font-size: 13px; color:var(--text-secondary); line-height: 1.6;">
                  <li>Implement Frontend Login (Alex)</li>
                  <li>Draft User Dashboard layouts (Alex)</li>
                  <li>Build API Mock tests (Sarah)</li>
                </ul>
              </div>
              
              <div style="background:rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); padding: 12px; border-radius: 6px;">
                <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-red); margin-bottom: 4px;">⚠ SYSTEM RISK DETECTED</div>
                <div style="font-size: 12px; color:var(--text-secondary)">
                  API parser integration is lagging behind schedule by 2 days due to OAuth delays.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="dashboard-right">
          <!-- AI Recommendation Terminal -->
          <div class="terminal-window" style="margin-bottom: 24px;">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="t-dot red"></span>
                <span class="t-dot yellow"></span>
                <span class="t-dot green"></span>
              </div>
              <div class="terminal-title">CHIEF OF STAFF AI</div>
            </div>
            <div class="terminal-body" id="dashboardAiText" style="min-height: 130px; font-size: 12px;">
              Analyzing telemetry...
            </div>
          </div>
          
          <!-- Upcoming Milestones -->
          <div class="panel" style="margin-bottom: 24px;">
            <div class="panel-header">
              <div class="panel-title">⊞ UPCOMING MILESTONES</div>
            </div>
            <div style="display:flex; flex-direction:column; gap: 12px;">
              ${todoTasks.map(t => `
                <div style="border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 10px;">
                  <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                    <span style="font-weight:600">${t.title}</span>
                    <span style="font-family:var(--font-mono); color:var(--accent-yellow)">${t.priority}</span>
                  </div>
                  <div style="font-size:11px; color:var(--text-secondary)">Owner: ${t.owner} &nbsp;|&nbsp; Est: ${t.time}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">◈ QUICK LAUNCH</div>
            </div>
            <div style="display:flex; flex-direction:column; gap: 10px;">
              <a href="#goal" class="btn btn-primary" style="font-size: 9px;">[Create Goal]</a>
              <a href="#documents" class="btn" style="font-size: 9px;">[Generate PRD]</a>
              <a href="#marketing" class="btn" style="font-size: 9px;">[Launch Campaign]</a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Typewrite the recommendation
    const aiTextEl = document.getElementById("dashboardAiText");
    if (aiTextEl) {
      const rec = `"Founder, our current development velocity is high (72%), but frontend developers are currently blocked on Sarah's Authentication setup.\n\nRecommendation: Prioritize Task-5 (Google OAuth login) today so Alex can build resume templates tomorrow."`;
      window.FounderOS.typewrite(aiTextEl, rec, 15);
    }
  }
};
