// Module 3: AI Planner / Timeline
window.PlannerModule = {
  render: function(container) {
    const state = window.FounderOS.state;
    
    container.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">⊞ SPRINT TIMELINE & ROADMAP</div>
          <button class="btn btn-primary" onclick="window.PlannerModule.regeneratePlan()">
            🔄 Optimize Timeline
          </button>
        </div>

        <div style="margin-bottom: 24px; font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
          The roadmap is structured and managed by your AI PM Agent. Based on your deadline (${state.daysLeft} Days remaining), the agent has prioritized core architecture and critical dependencies.
        </div>

        <div class="timeline-list">
          ${state.roadmap.map((weekData, idx) => `
            <div class="timeline-week">
              <div class="week-title">${weekData.week.toUpperCase()} &mdash; ${weekData.phase.toUpperCase()}</div>
              <div class="week-task-list">
                ${weekData.items.map(item => `
                  <div class="week-task-tag">
                    <span>◈</span> &nbsp; ${item}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="terminal-window" id="plannerTerminal" style="display:none; margin-top:24px;">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot red"></span>
            <span class="t-dot yellow"></span>
            <span class="t-dot green"></span>
          </div>
          <div class="terminal-title">TIMELINE OPTIMIZATION LOGGER</div>
        </div>
        <div class="terminal-body" id="plannerTerminalBody">
          Checking current sprint velocity...
        </div>
      </div>
    `;
  },

  regeneratePlan: function() {
    const term = document.getElementById("plannerTerminal");
    const termBody = document.getElementById("plannerTerminalBody");
    if (!term) return;

    term.style.display = "block";
    termBody.innerHTML = "";

    const lines = [
      "founder.ai@os:~$ run-optimizer --active-project='" + window.FounderOS.state.mission + "'",
      "Scanning remaining tasks (18 incomplete)...",
      "Computing historical developer velocity (high priority tasks take 2.8 days avg)...",
      "Analyzing dependency trees (Stripe payment requires backend routes)...",
      "Re-organizing tasks to prevent resource starvation...",
      "Adjustment complete. Roadmap optimized to prioritize Landing Page delivery."
    ];

    let i = 0;
    const stream = () => {
      if (i < lines.length) {
        const div = document.createElement("div");
        div.className = "terminal-line";
        if (lines[i].startsWith("founder.ai")) {
          div.innerHTML = `<span class="terminal-prompt">${lines[i].substring(0, 16)}</span>${lines[i].substring(16)}`;
        } else {
          div.textContent = lines[i];
        }
        if (lines[i].includes("complete")) {
          div.style.color = "var(--accent-green)";
        }
        termBody.appendChild(div);
        termBody.scrollTop = termBody.scrollHeight;
        i++;
        setTimeout(stream, 600);
      } else {
        window.FounderOS.showToast("Roadmap timelines optimized!", "success");
      }
    };
    stream();
  }
};
