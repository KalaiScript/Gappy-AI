// Module 10: AI Agents Console
window.AgentsModule = {
  render: function(container) {
    this.renderLayout(container);
  },

  renderLayout: function(container) {
    const state = window.FounderOS.state;

    container.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">🤖 ACTIVE AI AGENT ORCHESTRATION</div>
          <span style="font-size:11px; font-family:var(--font-mono); color:var(--accent-green)">6 Agents Configured</span>
        </div>

        <div style="margin-bottom: 24px; font-size:13px; color:var(--text-secondary); line-height: 1.5;">
          FounderOS integrates specialized agents via Lemma SDK. Each agent operates autonomously, editing tasks, updating specs, generating launch campaigns, and calculating project velocity.
        </div>

        <div class="agent-grid">
          ${state.agents.map(agent => `
            <div class="agent-card">
              <div class="agent-header">
                <span class="agent-badge-status agent-status-${agent.status}">${agent.status.toUpperCase()}</span>
                <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; overflow: hidden;"><lottie-player src="https://assets8.lottiefiles.com/packages/lf20_myejio3g.json" background="transparent" speed="1" style="width: 36px; height: 36px;" loop autoplay></lottie-player></div>
              </div>
              <div class="agent-title">${agent.name.toUpperCase()}</div>
              <div style="font-size: 11px; color:var(--accent-cyan); font-family:var(--font-mono); margin-bottom: 8px;">Role: ${agent.role}</div>
              <div class="agent-desc">${agent.desc}</div>
              <button class="btn" style="width:100%; font-size:9px; padding:6px;" onclick="window.AgentsModule.queryAgent('${agent.name}')">
                [Deploy agent]
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Agent Activity Console -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">⚡ REALTIME AGENTS ORCHESTRATION FEED</div>
        </div>
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="t-dot red"></span>
              <span class="t-dot yellow"></span>
              <span class="t-dot green"></span>
            </div>
            <div class="terminal-title">AGENT RUNTIME LOGS</div>
          </div>
          <div class="terminal-body" id="agentConsoleBody" style="min-height: 120px; font-size: 12px;">
            Awaiting instructions...
          </div>
        </div>
      </div>
    `;
  },

  queryAgent: function(name) {
    const consoleBody = document.getElementById("agentConsoleBody");
    if (!consoleBody) return;

    consoleBody.innerHTML = "";
    
    // Set agent status to thinking
    const state = window.FounderOS.state;
    const agent = state.agents.find(a => a.name === name);
    const oldStatus = agent ? agent.status : "idle";
    if (agent) {
      agent.status = "thinking";
      this.renderLayout(document.getElementById("contentArea"));
    }

    const lines = [
      "founder.ai@os:~$ deploy-agent --name='" + name + "'",
      "Spinning up docker execution box for agent: " + name + "...",
      "Injecting Lemma SDK session credentials...",
      "Connecting local datastore vectors...",
      "Agent: " + name + " successfully executed sub-routine tasks.",
      "Sync complete. Logging output."
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
        consoleBody.appendChild(div);
        consoleBody.scrollTop = consoleBody.scrollHeight;
        i++;
        setTimeout(stream, 600);
      } else {
        if (agent) {
          agent.status = "active";
          this.renderLayout(document.getElementById("contentArea"));
        }
        window.FounderOS.showToast(`${name} query finished.`, "success");
        window.FounderOS.sfx.playSuccess();
      }
    };
    stream();
  }
};
