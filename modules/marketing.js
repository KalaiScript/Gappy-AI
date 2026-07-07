// Module 6: AI Marketing Assistant
window.MarketingModule = {
  activeTab: "twitter",

  render: function(container) {
    this.renderLayout(container);
  },

  renderLayout: function(container) {
    const state = window.FounderOS.state;
    const campaign = state.marketingCampaign;

    container.innerHTML = `
      <div class="marketing-grid">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">◈ CAMPAIGN BUILDER</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">CHOOSE TARGET CHANNEL</label>
            <select class="form-select" id="mktgChannel">
              <option value="all">Generate Full Omnichannel campaign</option>
              <option value="social">Social Media Only</option>
              <option value="email">Email Campaign Only</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">ADDITIONAL LAUNCH DETAILS</label>
            <textarea class="form-textarea" id="mktgDetails" rows="4" placeholder="Enter key angles, e.g., 'Free trial', 'Built on Lemma SDK', 'Offers customizable retro terminal themes'"></textarea>
          </div>

          <button class="btn btn-primary" style="width:100%" onclick="window.MarketingModule.generateCampaign()">
            📣 [Generate Launch Campaign]
          </button>
        </div>

        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">◉ GENERATED CAMPAIGN ASSETS</div>
            <button class="btn" style="padding:4px 10px; font-size:10px;" onclick="window.MarketingModule.copyActiveAsset()">
              [Copy Asset]
            </button>
          </div>

          <div class="marketing-tabs">
            <button class="marketing-tab-btn ${this.activeTab === 'twitter' ? 'active' : ''}" onclick="window.MarketingModule.switchTab('twitter')">Twitter/X</button>
            <button class="marketing-tab-btn ${this.activeTab === 'linkedin' ? 'active' : ''}" onclick="window.MarketingModule.switchTab('linkedin')">LinkedIn</button>
            <button class="marketing-tab-btn ${this.activeTab === 'reddit' ? 'active' : ''}" onclick="window.MarketingModule.switchTab('reddit')">Reddit</button>
            <button class="marketing-tab-btn ${this.activeTab === 'email' ? 'active' : ''}" onclick="window.MarketingModule.switchTab('email')">Email</button>
          </div>

          <div class="marketing-output" id="mktgOutput">Select a tab to view copy templates.</div>
        </div>
      </div>

      <div class="terminal-window" id="mktgTerminal" style="display:none; margin-top:24px;">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot red"></span>
            <span class="t-dot yellow"></span>
            <span class="t-dot green"></span>
          </div>
          <div class="terminal-title">MARKETING AGENT CAMPAIGN GENERATOR</div>
        </div>
        <div class="terminal-body" id="mktgTerminalBody">
          Accessing active marketing framework...
        </div>
      </div>
    `;

    this.showActiveCopy();
  },

  switchTab: function(tabKey) {
    this.activeTab = tabKey;
    this.showActiveCopy();
    
    // update buttons active state
    document.querySelectorAll(".marketing-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.textContent.toLowerCase().includes(tabKey));
    });
  },

  showActiveCopy: function() {
    const state = window.FounderOS.state;
    const outputEl = document.getElementById("mktgOutput");
    if (!outputEl) return;

    outputEl.textContent = state.marketingCampaign[this.activeTab] || "No content generated yet.";
  },

  copyActiveAsset: function() {
    const copyText = window.FounderOS.state.marketingCampaign[this.activeTab];
    navigator.clipboard.writeText(copyText).then(() => {
      window.FounderOS.showToast(`${this.activeTab.toUpperCase()} copy copied!`, "success");
    });
  },

  generateCampaign: function() {
    const mktgDetails = document.getElementById("mktgDetails")?.value || "";
    const term = document.getElementById("mktgTerminal");
    const termBody = document.getElementById("mktgTerminalBody");
    if (!term) return;

    term.style.display = "block";
    termBody.innerHTML = "";

    const lines = [
      "founder.ai@os:~$ compose-campaign --details='" + mktgDetails + "'",
      "Deploying copywriting agent matrix...",
      "Analyzing tone filters (retro, startup, launch urgency)...",
      "Writing Twitter thread hooks...",
      "Synthesizing LinkedIn personal narrative launch post...",
      "Generating Reddit Developer showcase copy...",
      "Crafting Email Launch newsletter with CTA buttons...",
      "Writing database marketing datastores... Done."
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
        if (lines[i].includes("Done")) {
          div.style.color = "var(--accent-green)";
        }
        termBody.appendChild(div);
        termBody.scrollTop = termBody.scrollHeight;
        i++;
        setTimeout(stream, 600);
      } else {
        const customDetails = mktgDetails ? `\n\nHighlights: ${mktgDetails}` : "";
        // Update marketing state
        const state = window.FounderOS.state;
        state.marketingCampaign = {
          twitter: `🚨 LAUNCH DAY IS HERE! 🚨

Say hello to ${state.mission}!

The fast, modern solution built directly using Lemma SDK.${customDetails}

Try it now: resumeai.app`,
          linkedin: `I'm proud to present ${state.mission}.

In just 2 weeks, we built this retro terminal styled app to help streamline resume generation.${customDetails}

Try it out here: resumeai.app`,
          reddit: `Hey Reddit!

We built an open source AI Resume Builder themed around retro command layouts.${customDetails}

Give us your honest feedback.`,
          email: `Subject: Introducing ${state.mission} 🚀

Hey Founder,

We've launched ${state.mission}.

${customDetails || "Create professional, parsed resume pdf files in minutes using AI templates."}

Best,
FounderOS`
        };

        this.showActiveCopy();
        window.FounderOS.showToast("Campaign assets generated for all channels!", "success");
        window.FounderOS.sfx.playSuccess();
      }
    };
    stream();
  }
};
