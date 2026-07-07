// Module 9: AI Risk Detector
window.RiskModule = {
  render: function(container) {
    this.renderLayout(container);
  },

  renderLayout: function(container) {
    const state = window.FounderOS.state;

    container.innerHTML = `
      <div class="risk-detector-layout">
        <!-- Radar Scan Panel -->
        <div class="panel" style="display:flex; flex-direction:column; align-items:center;">
          <div class="panel-header" style="width:100%">
            <div class="panel-title">📡 REALTIME RISK SCANNER</div>
            <button class="btn btn-primary" onclick="window.RiskModule.scanRisks()">
              [Scan System]
            </button>
          </div>
          
          <div class="scanner-radar-wrap" style="margin-top: 10px;">
            <div class="radar-crosshair-x"></div>
            <div class="radar-crosshair-y"></div>
            <div class="radar-grid"></div>
            <div class="radar-grid-inner-1"></div>
            <div class="radar-grid-inner-2"></div>
            <div class="radar-sweep" id="radarSweep"></div>
            
            ${state.risks.some(r => r.id === 'r-1') ? `<div class="radar-blip" style="top: 30%; left: 40%;"></div>` : ''}
            ${state.risks.some(r => r.id === 'r-2') ? `<div class="radar-blip" style="top: 60%; left: 70%;"></div>` : ''}
          </div>
          <div style="font-family:var(--font-mono); font-size:10px; margin-top: 14px; color:var(--text-secondary)" id="radarStatusText">
            ${state.risks.length > 0 ? `⚠️ ${state.risks.length} CRITICAL BLIPS DETECTED` : '✅ SCAN CLEAN. NO OUTSTANDING RISKS'}
          </div>
        </div>

        <!-- Risks Details -->
        <div>
          <div class="panel-header" style="display:flex; justify-content:space-between; align-items:center; padding-top: 0; padding-bottom: 0;">
            <span style="font-family:var(--font-heading); font-size:10px; color:var(--accent-cyan)">DETAILED RISKS LOG</span>
            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_vt7g9c.json" background="transparent" speed="0.5" style="width: 32px; height: 32px;" loop autoplay></lottie-player>
          </div>

          <div class="risk-list" id="riskListContent">
            ${state.risks.length === 0 ? `
              <div style="text-align:center; padding: 40px; color:var(--accent-green); border:1px dashed var(--accent-green); border-radius:6px;">
                🎉 All project risks have been successfully mitigated. Staging and production branches are stable.
              </div>
            ` : state.risks.map(r => `
              <div class="risk-item ${r.severity}">
                <span class="risk-badge ${r.severity}">${r.severity.toUpperCase()} RISK</span>
                <div class="risk-title">${r.title}</div>
                <div class="risk-desc">${r.desc}</div>
                <div class="risk-solution">
                  <strong>💡 Suggested Solution:</strong> ${r.solution}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  scanRisks: function() {
    const statusText = document.getElementById("radarStatusText");
    const sweep = document.getElementById("radarSweep");
    if (!statusText || !sweep) return;

    statusText.textContent = "🔄 RE-SCANNING RUNTIME TELEMETRY...";
    sweep.style.animationDuration = "1.5s"; // speed up sweep for scan action

    setTimeout(() => {
      sweep.style.animationDuration = "4s";
      const state = window.FounderOS.state;
      this.renderLayout(document.getElementById("contentArea"));
      window.FounderOS.showToast("Risk scan complete. Data sync updated.", "info");
    }, 3000);
  }
};
