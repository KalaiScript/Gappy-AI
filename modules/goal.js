// Module 2: Goal Creator Wizard
window.GoalModule = {
  currentStep: 0,
  answers: {
    title: "",
    deadline: "14 Days",
    targetUsers: "Job Seekers",
    revenueModel: "SaaS Subscription",
    teamSize: "3",
    currentStage: "MVP Development"
  },

  render: function(container) {
    this.currentStep = 0;
    this.renderWizard(container);
  },

  renderWizard: function(container) {
    container.innerHTML = `
      <div class="panel goal-wizard">
        <div class="panel-header">
          <div class="panel-title">◈ NEW STARTUP MISSION CONSOLE</div>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan)">Step <span id="currentStepNum">1</span> of 6</span>
        </div>

        <div class="wizard-progress">
          <div class="wizard-dot active" id="dot-0"></div>
          <div class="wizard-dot" id="dot-1"></div>
          <div class="wizard-dot" id="dot-2"></div>
          <div class="wizard-dot" id="dot-3"></div>
          <div class="wizard-dot" id="dot-4"></div>
          <div class="wizard-dot" id="dot-5"></div>
        </div>

        <div id="wizardStepContent">
          <!-- Steps will render here dynamically -->
        </div>
      </div>

      <div class="terminal-window" id="wizardTerminal" style="display:none; max-width:700px; margin: 24px auto 0;">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot red"></span>
            <span class="t-dot yellow"></span>
            <span class="t-dot green"></span>
          </div>
          <div class="terminal-title">PRODUCT MANAGER AGENT</div>
        </div>
        <div class="terminal-body" id="wizardTerminalBody">
          Initializing project planner...
        </div>
      </div>
    `;

    this.showStep();
  },

  showStep: function() {
    const content = document.getElementById("wizardStepContent");
    const stepNum = document.getElementById("currentStepNum");
    if (!content) return;

    stepNum.textContent = this.currentStep + 1;
    
    // Update progress dots
    for (let i = 0; i < 6; i++) {
      const dot = document.getElementById(`dot-${i}`);
      if (dot) {
        dot.className = "wizard-dot";
        if (i < this.currentStep) dot.classList.add("completed");
        if (i === this.currentStep) dot.classList.add("active");
      }
    }

    if (this.currentStep === 0) {
      content.innerHTML = `
        <div class="form-group">
          <label class="form-label">WHAT STARTUP GOAL DO YOU WANT TO LAUNCH?</label>
          <input type="text" class="form-input" id="goalTitle" placeholder="e.g., Launch an AI Interview Platform" value="${this.answers.title}">
        </div>
        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button class="btn btn-primary" onclick="window.GoalModule.nextStep()">Next Question ➔</button>
        </div>
      `;
      document.getElementById("goalTitle").focus();
    } else if (this.currentStep === 1) {
      content.innerHTML = `
        <div class="form-group">
          <label class="form-label">TARGET TIMELINE DEADLINE?</label>
          <select class="form-select" id="goalDeadline">
            <option value="7 Days" ${this.answers.deadline === '7 Days' ? 'selected' : ''}>7 Days (Extreme Hack)</option>
            <option value="14 Days" ${this.answers.deadline === '14 Days' ? 'selected' : ''}>14 Days (Recommended)</option>
            <option value="30 Days" ${this.answers.deadline === '30 Days' ? 'selected' : ''}>30 Days (Standard MVP)</option>
          </select>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <button class="btn" onclick="window.GoalModule.prevStep()">⇦ Back</button>
          <button class="btn btn-primary" onclick="window.GoalModule.nextStep()">Next Question ➔</button>
        </div>
      `;
    } else if (this.currentStep === 2) {
      content.innerHTML = `
        <div class="form-group">
          <label class="form-label">WHO ARE YOUR TARGET USERS?</label>
          <input type="text" class="form-input" id="goalUsers" placeholder="e.g., Tech Job Seekers, Fresh Graduates" value="${this.answers.targetUsers}">
        </div>
        <div style="display:flex; justify-content:space-between;">
          <button class="btn" onclick="window.GoalModule.prevStep()">⇦ Back</button>
          <button class="btn btn-primary" onclick="window.GoalModule.nextStep()">Next Question ➔</button>
        </div>
      `;
      document.getElementById("goalUsers").focus();
    } else if (this.currentStep === 3) {
      content.innerHTML = `
        <div class="form-group">
          <label class="form-label">REVENUE MODEL?</label>
          <select class="form-select" id="goalRevenue">
            <option value="SaaS Subscription" ${this.answers.revenueModel === 'SaaS Subscription' ? 'selected' : ''}>SaaS Subscription</option>
            <option value="Usage-based APIs" ${this.answers.revenueModel === 'Usage-based APIs' ? 'selected' : ''}>Usage-based APIs</option>
            <option value="Transactional Fee" ${this.answers.revenueModel === 'Transactional Fee' ? 'selected' : ''}>Transactional Fee</option>
          </select>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <button class="btn" onclick="window.GoalModule.prevStep()">⇦ Back</button>
          <button class="btn btn-primary" onclick="window.GoalModule.nextStep()">Next Question ➔</button>
        </div>
      `;
    } else if (this.currentStep === 4) {
      content.innerHTML = `
        <div class="form-group">
          <label class="form-label">TEAM SIZE?</label>
          <input type="number" class="form-input" id="goalTeam" value="${this.answers.teamSize}">
        </div>
        <div style="display:flex; justify-content:space-between;">
          <button class="btn" onclick="window.GoalModule.prevStep()">⇦ Back</button>
          <button class="btn btn-primary" onclick="window.GoalModule.nextStep()">Next Question ➔</button>
        </div>
      `;
      document.getElementById("goalTeam").focus();
    } else if (this.currentStep === 5) {
      content.innerHTML = `
        <div class="form-group">
          <label class="form-label">CURRENT DEVELOPMENT STAGE?</label>
          <select class="form-select" id="goalStage">
            <option value="Idea Draft" ${this.answers.currentStage === 'Idea Draft' ? 'selected' : ''}>Idea Draft</option>
            <option value="MVP Development" ${this.answers.currentStage === 'MVP Development' ? 'selected' : ''}>MVP Development</option>
            <option value="Beta Launching" ${this.answers.currentStage === 'Beta Launching' ? 'selected' : ''}>Beta Launching</option>
          </select>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <button class="btn" onclick="window.GoalModule.prevStep()">⇦ Back</button>
          <button class="btn btn-primary" onclick="window.GoalModule.finishWizard()">[Launch Chief of Staff workflow]</button>
        </div>
      `;
    }
  },

  nextStep: function() {
    this.saveStepData();
    if (this.currentStep === 0 && !this.answers.title.trim()) {
      window.FounderOS.showToast("Please enter a goal title.", "danger");
      window.FounderOS.sfx.playAlert();
      return;
    }
    this.currentStep++;
    this.showStep();
  },

  prevStep: function() {
    this.saveStepData();
    this.currentStep--;
    this.showStep();
  },

  saveStepData: function() {
    if (this.currentStep === 0) {
      this.answers.title = document.getElementById("goalTitle").value;
    } else if (this.currentStep === 1) {
      this.answers.deadline = document.getElementById("goalDeadline").value;
    } else if (this.currentStep === 2) {
      this.answers.targetUsers = document.getElementById("goalUsers").value;
    } else if (this.currentStep === 3) {
      this.answers.revenueModel = document.getElementById("goalRevenue").value;
    } else if (this.currentStep === 4) {
      this.answers.teamSize = document.getElementById("goalTeam").value;
    } else if (this.currentStep === 5) {
      this.answers.currentStage = document.getElementById("goalStage").value;
    }
  },

  finishWizard: function() {
    this.saveStepData();
    
    // Hide wizard UI content
    document.getElementById("wizardStepContent").innerHTML = `
      <div style="text-align:center; padding: 40px 0;">
        <div style="font-family:var(--font-heading); font-size:14px; color:var(--accent-cyan); margin-bottom:16px;">
          ORCHESTRATING WORKFLOWS...
        </div>
        <div style="font-size:12px; color:var(--text-secondary)">
          Product Manager Agent is designing product roadmap based on your goals.
        </div>
      </div>
    `;

    const terminal = document.getElementById("wizardTerminal");
    const terminalBody = document.getElementById("wizardTerminalBody");
    terminal.style.display = "block";

    const steps = [
      "founder.ai@os:~$ analyze-market --goal='" + this.answers.title + "'",
      "Analyzing target user base: " + this.answers.targetUsers + "...",
      "Matching revenue model patterns: " + this.answers.revenueModel + "...",
      "Generating Product Requirements Document (PRD)...",
      "Drafting Sprint Plan milestones for team of " + this.answers.teamSize + " members...",
      "Updating datastores... Done.",
      "Redirecting to Roadmap Planner..."
    ];

    let i = 0;
    terminalBody.innerHTML = "";
    
    const streamTerminal = () => {
      if (i < steps.length) {
        const line = document.createElement("div");
        line.className = "terminal-line";
        if (steps[i].startsWith("founder.ai")) {
          line.innerHTML = `<span class="terminal-prompt">${steps[i].substring(0, 16)}</span>${steps[i].substring(16)}`;
        } else {
          line.textContent = steps[i];
        }
        
        if (steps[i].includes("Done") || steps[i].includes("Redirecting")) {
          line.style.color = "var(--accent-green)";
        }
        
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        i++;
        setTimeout(streamTerminal, 700);
      } else {
        // Update global state
        window.FounderOS.updateState("mission", this.answers.title);
        window.FounderOS.updateState("progress", 0);
        window.FounderOS.updateState("daysLeft", parseInt(this.answers.deadline) || 14);
        window.FounderOS.state.goalDetails = { ...this.answers };
        
        // Dynamically update PRD document text
        window.FounderOS.state.documents.prd = `# Product Requirements Document (PRD)

## 1. Objective
Launch a new platform: ${this.answers.title}.

## 2. Target Audience
${this.answers.targetUsers}

## 3. Revenue Model
${this.answers.revenueModel}

## 4. Workflows & Sprint Milestones
- Week 1: Foundation research & auth mockup setup
- Week 2: Core modules logic validation & public staging deploy`;

        // Update marketing
        window.FounderOS.state.marketingCampaign.twitter = `⚡ Announcing our new mission: ${this.answers.title}!

Targeting ${this.answers.targetUsers} with a sleek ${this.answers.revenueModel} model.

Designed and deployed via FounderOS. Stay tuned!`;

        // Update Roadmap
        window.FounderOS.state.roadmap = [
          { week: "Week 1", phase: "Research & Setup", items: ["Domain setup", "Wireframe draft", "Authentication Integration"] },
          { week: "Week 2", phase: "Dashboard & Core Launch", items: ["Core logic implementation", "Stripe payment", "Beta testing", "Launch day"] }
        ];

        window.FounderOS.showToast("Mission Roadmap and PRD generated successfully!", "success");
        window.FounderOS.sfx.playSuccess();

        setTimeout(() => {
          window.location.hash = "planner";
        }, 1000);
      }
    };

    streamTerminal();
  }
};
