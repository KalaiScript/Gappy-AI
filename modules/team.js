// Module 7: Team Management & Blocker Resolver
window.TeamModule = {
  render: function(container) {
    this.renderLayout(container);
  },

  renderLayout: function(container) {
    const state = window.FounderOS.state;

    container.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">👥 TEAM OPERATIONS & BLOCKERS</div>
          <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-secondary)">3 Active Operators</span>
        </div>

        <div style="margin-bottom: 24px; font-size:13px; color:var(--text-secondary); line-height: 1.5;">
          FounderOS constantly scans dev activity logs and detects blockers or resource delays. You can trigger an AI Sync agent to ping blocked members or help negotiate dependencies.
        </div>

        <div class="team-grid">
          ${state.team.map(member => {
            let statusClass = "";
            if (member.status === "Blocked") statusClass = "blocked";
            else if (member.status === "Needs Attention") statusClass = "needs-attention";

            return `
              <div class="team-card ${statusClass}">
                <div class="team-card-header">
                  <div class="avatar-large">${member.avatar}</div>
                  <div class="team-info">
                    <span class="team-name">${member.name}</span>
                    <span class="team-role">${member.role}</span>
                  </div>
                </div>
                
                <div class="team-stat-row">
                  <span>Sprint Velocity</span>
                  <span>${member.progress}%</span>
                </div>
                <div class="team-progress-bar">
                  <div class="team-progress-fill" style="width: ${member.progress}%; background-color: ${member.status === 'Blocked' ? 'var(--accent-red)' : member.status === 'Needs Attention' ? 'var(--accent-yellow)' : 'var(--accent-green)'}"></div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:11px; margin-top:10px;">
                  <span>Status:</span>
                  <span style="color: ${member.status === 'Blocked' ? 'var(--accent-red)' : member.status === 'Needs Attention' ? 'var(--accent-yellow)' : 'var(--accent-green)'}">${member.status.toUpperCase()}</span>
                </div>

                ${member.blocker ? `
                  <div class="blocker-banner">
                    ⚠️ Blocker: ${member.blocker}
                  </div>
                  <button class="btn btn-danger" style="width:100%; margin-top:12px; font-size:9px; padding:6px;" onclick="window.TeamModule.resolveBlocker('${member.name}')">
                    🤖 [Deploy Resolver Agent]
                  </button>
                ` : `
                  <div style="margin-top: 14px; text-align:center;">
                    <button class="btn" style="width:100%; font-size:9px; padding:6px;" onclick="window.TeamModule.pesterMember('${member.name}')">
                      💬 Ping Updates
                    </button>
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="terminal-window" id="teamTerminal" style="display:none; margin-top:24px;">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot red"></span>
            <span class="t-dot yellow"></span>
            <span class="t-dot green"></span>
          </div>
          <div class="terminal-title">OPERATIONS AGENT - RESOLVER</div>
        </div>
        <div class="terminal-body" id="teamTerminalBody">
          Accessing API endpoints...
        </div>
      </div>
    `;
  },

  resolveBlocker: function(name) {
    const term = document.getElementById("teamTerminal");
    const termBody = document.getElementById("teamTerminalBody");
    if (!term) return;

    term.style.display = "block";
    termBody.innerHTML = "";

    const lines = [
      "founder.ai@os:~$ resolve-blocker --member='" + name + "'",
      "Deploying Blocker Resolver Agent...",
      "Analyzing block description: Member " + name + " requires OAuth settings.",
      "Syncing with Sarah (Backend Dev)...",
      "Drafting mock client IDs for staging server...",
      "Sending API keys payload directly to " + name + "'s Slack channel...",
      "Sarah approved mock staging variables. Blocker cleared!"
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
        if (lines[i].includes("cleared")) {
          div.style.color = "var(--accent-green)";
        }
        termBody.appendChild(div);
        termBody.scrollTop = termBody.scrollHeight;
        i++;
        setTimeout(stream, 700);
      } else {
        // Clear blocker in state
        const state = window.FounderOS.state;
        const member = state.team.find(m => m.name === name);
        if (member) {
          member.status = "On Track";
          member.blocker = null;
        }

        // Also if Alex is unblocked, we resolve the first risk (r-1)
        state.risks = state.risks.filter(r => r.id !== "r-1");
        // Update risk count badge in sidebar
        const riskBadge = document.getElementById("riskBadge");
        if (riskBadge) {
          riskBadge.textContent = state.risks.length;
        }

        setTimeout(() => {
          this.renderLayout(document.getElementById("contentArea"));
          window.FounderOS.showToast(`${name}'s blocker has been resolved by Operations Agent.`, "success");
        }, 1000);
      }
    };
    stream();
  },

  pesterMember: function(name) {
    const term = document.getElementById("teamTerminal");
    const termBody = document.getElementById("teamTerminalBody");
    if (!term) return;

    term.style.display = "block";
    termBody.innerHTML = "";

    const lines = [
      "founder.ai@os:~$ ping-operator --name='" + name + "'",
      "Opening communication channel to Slack...",
      "Sending automated sync questionnaire to " + name + "...",
      "Received reply: 'Working on core dashboard screens, 85% complete. Will commit in 2 hours.'",
      "Sync logs saved to daily standing datastore."
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
        termBody.appendChild(div);
        termBody.scrollTop = termBody.scrollHeight;
        i++;
        setTimeout(stream, 600);
      } else {
        window.FounderOS.showToast(`Pinged ${name} successfully!`, "info");
      }
    };
    stream();
  }
};
