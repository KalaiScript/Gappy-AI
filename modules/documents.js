// Module 5: AI Document Center
window.DocumentsModule = {
  activeDoc: "prd",

  render: function(container) {
    this.renderLayout(container);
  },

  renderLayout: function(container) {
    const state = window.FounderOS.state;
    const docs = state.documents;

    container.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">≡ AI DOCUMENT CENTER</div>
          <button class="btn btn-primary" onclick="window.DocumentsModule.triggerGeneration()">
            📝 Generate Custom Document
          </button>
        </div>
        
        <div class="docs-layout">
          <div class="docs-sidebar">
            <button class="doc-link ${this.activeDoc === 'prd' ? 'active' : ''}" onclick="window.DocumentsModule.switchDoc('prd')">
              📄 Product Req. (PRD)
            </button>
            <button class="doc-link ${this.activeDoc === 'pitch' ? 'active' : ''}" onclick="window.DocumentsModule.switchDoc('pitch')">
              📄 Pitch Deck Outlines
            </button>
            <button class="doc-link ${this.activeDoc === 'checklist' ? 'active' : ''}" onclick="window.DocumentsModule.switchDoc('checklist')">
              📄 Launch Checklist
            </button>
            ${docs.custom ? `
              <button class="doc-link ${this.activeDoc === 'custom' ? 'active' : ''}" onclick="window.DocumentsModule.switchDoc('custom')">
                📄 ${docs.customTitle || 'Custom Doc'}
              </button>
            ` : ''}
          </div>

          <div>
            <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px;">
              <span style="font-family: var(--font-mono); font-size:11px; color: var(--accent-cyan);">VIEWER: ${this.activeDoc.toUpperCase()}.md</span>
              <button class="btn" style="padding: 4px 10px; font-size:10px;" onclick="window.DocumentsModule.copyToClipboard()">
                [Copy Contents]
              </button>
            </div>
            <div class="doc-viewer" id="docViewerContent">Loading document content...</div>
          </div>
        </div>
      </div>

      <div class="terminal-window" id="docTerminal" style="display:none; margin-top: 24px;">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot red"></span>
            <span class="t-dot yellow"></span>
            <span class="t-dot green"></span>
          </div>
          <div class="terminal-title">DOCUMENTATION AGENT</div>
        </div>
        <div class="terminal-body" id="docTerminalBody">
          Spinning up doc-synthesis engine...
        </div>
      </div>
    `;

    this.showActiveDoc();
  },

  switchDoc: function(docKey) {
    this.activeDoc = docKey;
    this.showActiveDoc();
    
    // update buttons active state
    document.querySelectorAll(".doc-link").forEach(btn => {
      btn.classList.remove("active");
    });
    // Find active button
    const links = document.querySelectorAll(".doc-link");
    if (this.activeDoc === "prd" && links[0]) links[0].classList.add("active");
    if (this.activeDoc === "pitch" && links[1]) links[1].classList.add("active");
    if (this.activeDoc === "checklist" && links[2]) links[2].classList.add("active");
    if (this.activeDoc === "custom" && links[3]) links[3].classList.add("active");
  },

  showActiveDoc: function() {
    const state = window.FounderOS.state;
    const contentEl = document.getElementById("docViewerContent");
    if (!contentEl) return;

    const content = state.documents[this.activeDoc] || "No document loaded.";
    contentEl.textContent = content;
  },

  copyToClipboard: function() {
    const content = window.FounderOS.state.documents[this.activeDoc];
    navigator.clipboard.writeText(content).then(() => {
      window.FounderOS.showToast("Document copied to clipboard!", "success");
    }).catch(err => {
      window.FounderOS.showToast("Failed to copy document content.", "danger");
    });
  },

  triggerGeneration: function() {
    const term = document.getElementById("docTerminal");
    const termBody = document.getElementById("docTerminalBody");
    if (!term) return;

    term.style.display = "block";
    termBody.innerHTML = "";

    const lines = [
      "founder.ai@os:~$ generate-doc --type='marketing_strategy'",
      "Reading goals detail from active mission store...",
      "Analyzing market channels for target: " + window.FounderOS.state.goalDetails.targetUsers + "...",
      "Structuring content with marketing persona analysis...",
      "Writing Marketing Strategy Document...",
      "Complete. Loaded strategy into Document Center."
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
        if (lines[i].includes("Complete")) {
          div.style.color = "var(--accent-green)";
        }
        termBody.appendChild(div);
        termBody.scrollTop = termBody.scrollHeight;
        i++;
        setTimeout(stream, 750);
      } else {
        // Update documents list
        const state = window.FounderOS.state;
        state.documents.custom = `# Marketing & Launch Strategy

## 1. Product Market Fit
Our mission '${state.mission}' directly resolves target pain points by delivering high value speed templates.

## 2. Acquisition Channels
- Hacker News: Launch with raw technical specs detail.
- Twitter Thread: Focus on the retro terminal style and builder templates.
- Newsletter: Blast all 10k pre-launch subscribers.`;
        state.documents.customTitle = "Marketing Strategy";
        
        this.activeDoc = "custom";
        this.renderLayout(document.getElementById("contentArea"));
        window.FounderOS.showToast("Marketing Strategy Document generated!", "success");
      }
    };
    stream();
  }
};
