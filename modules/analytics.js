// Module 8: Analytics Dashboard
window.AnalyticsModule = {
  render: function(container) {
    const state = window.FounderOS.state;
    const completedTasks = state.tasks.filter(t => t.status === "done").length;
    const remainingTasks = state.tasks.filter(t => t.status !== "done").length;
    const blockedCount = state.team.filter(m => m.status === "Blocked").length;
    
    container.innerHTML = `
      <div class="grid-2">
        <!-- Progress Metrics -->
        <div class="panel" style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height: 320px;">
          <div class="panel-header" style="width:100%">
            <div class="panel-title">▦ MISSION COMPLETION</div>
          </div>
          
          <!-- Circular Progress Ring Mock -->
          <div style="position:relative; width: 160px; height: 160px; display:flex; align-items:center; justify-content:center; margin: 20px 0;">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" stroke-width="8" fill="transparent"/>
              <circle cx="80" cy="80" r="70" stroke="var(--accent-cyan)" stroke-width="8" fill="transparent"
                stroke-dasharray="440" stroke-dashoffset="${440 - (440 * state.progress) / 100}"
                stroke-linecap="round" style="transform: rotate(-90deg); transform-origin: 50% 50%; filter: drop-shadow(0 0 8px rgba(34,211,238,0.5)); transition: stroke-dashoffset 1s ease-out;"/>
            </svg>
            <div style="position:absolute; text-align:center;">
              <span style="font-family: var(--font-heading); font-size: 18px; color:#fff; text-shadow:0 0 8px rgba(34,211,238,0.5);">${state.progress}%</span>
              <div style="font-size: 10px; font-family: var(--font-mono); color: var(--text-secondary); margin-top: 4px;">DONE</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-around; width:100%; font-family:var(--font-mono); font-size:11px; text-align:center;">
            <div>
              <div style="color:var(--text-secondary)">Completed</div>
              <div style="color:var(--accent-green); font-size:14px; font-weight:700; margin-top:4px;">${completedTasks}</div>
            </div>
            <div>
              <div style="color:var(--text-secondary)">Remaining</div>
              <div style="color:var(--accent-cyan); font-size:14px; font-weight:700; margin-top:4px;">${remainingTasks}</div>
            </div>
            <div>
              <div style="color:var(--text-secondary)">Blocked</div>
              <div style="color:var(--accent-red); font-size:14px; font-weight:700; margin-top:4px;">${blockedCount}</div>
            </div>
          </div>
        </div>

        <!-- System Velocity & Confidence -->
        <div class="panel" style="display:flex; flex-direction:column; min-height: 320px;">
          <div class="panel-header">
            <div class="panel-title">📊 PERFORMANCE FORECASTS</div>
          </div>

          <div style="flex-grow:1; display:flex; flex-direction:column; gap: 20px; justify-content:center;">
            <div>
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:11px; margin-bottom:8px;">
                <span>SPRINT VELOCITY</span>
                <span style="color:var(--accent-green);">HIGH (72 pts/wk)</span>
              </div>
              <div style="height:10px; background:rgba(255,255,255,0.05); border-radius:5px; overflow:hidden;">
                <div style="width:72%; height:100%; background:var(--accent-green); box-shadow:var(--glow-green);"></div>
              </div>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:11px; margin-bottom:8px;">
                <span>DEADLINE CONFIDENCE</span>
                <span style="color:var(--accent-yellow);">89% SUCCESS RATIO</span>
              </div>
              <div style="height:10px; background:rgba(255,255,255,0.05); border-radius:5px; overflow:hidden;">
                <div style="width:89%; height:100%; background:var(--accent-yellow); box-shadow:var(--glow-yellow);"></div>
              </div>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:11px; margin-bottom:8px;">
                <span>AI AGENTS ACCURACY</span>
                <span style="color:var(--accent-cyan);">94% FIDELITY</span>
              </div>
              <div style="height:10px; background:rgba(255,255,255,0.05); border-radius:5px; overflow:hidden;">
                <div style="width:94%; height:100%; background:var(--accent-cyan); box-shadow:var(--glow-cyan);"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Performance Log -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">⚡ REALTIME METRICS ENGINE</div>
        </div>
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="t-dot red"></span>
              <span class="t-dot yellow"></span>
              <span class="t-dot green"></span>
            </div>
            <div class="terminal-title">ANALYTICS AGENT TELEMETRY</div>
          </div>
          <div class="terminal-body" id="analyticsTeleText" style="min-height: 120px; font-size:12px;">
            Retrieving server telemetry charts...
          </div>
        </div>
      </div>
    `;

    const teleText = document.getElementById("analyticsTeleText");
    if (teleText) {
      const logs = `[METRIC] - Reading workflow checkpoints...\n[METRIC] - Total active elements: ${state.tasks.length} tasks registered.\n[METRIC] - Current velocity suggests completed delivery in ${state.daysLeft + 2} days if blockers are cleared.\n[FORECAST] - PM Agent predicts launch risk remains LOW. Target release timing looks EXCELLENT.`;
      window.FounderOS.typewrite(teleText, logs, 10);
    }
  }
};
