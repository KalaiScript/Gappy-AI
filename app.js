// FounderOS Global Engine & Routing

window.FounderOS = {
  // Audio Synthesizer Engine & Theme Selector
  audioEnabled: true,
  sfx: {
    ctx: null,
    init: function() {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playKeystroke: function() {
      if (!window.FounderOS.audioEnabled) return;
      this.init();
      const ctx = this.ctx;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    },
    playTransition: function() {
      if (!window.FounderOS.audioEnabled) return;
      this.init();
      const ctx = this.ctx;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.12);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    },
    playSuccess: function() {
      if (!window.FounderOS.audioEnabled) return;
      this.init();
      const ctx = this.ctx;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      
      const playTone = (freq, delay, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.06, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + duration);
      };
      
      playTone(523.25, 0, 0.12);     // C5
      playTone(659.25, 0.06, 0.12);  // E5
      playTone(783.99, 0.12, 0.25);  // G5
    },
    playAlert: function() {
      if (!window.FounderOS.audioEnabled) return;
      this.init();
      const ctx = this.ctx;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  },
  setTheme: function(themeName) {
    document.body.className = '';
    if (themeName !== 'default' && themeName !== 'blue') {
      document.body.classList.add(`theme-${themeName}`);
    }
    const selector = document.getElementById('themeSelector');
    if (selector) {
      selector.value = themeName;
    }
    this.sfx.playTransition();
    this.showToast(`Active Theme: ${themeName.toUpperCase()}`, 'info');
  },

  // Global State
  state: {
    mission: "Launch AI Resume Builder",
    progress: 68,
    daysLeft: 7,
    riskLevel: "LOW",
    
    // Module 1 & 2: Goal & Plan
    goalDetails: {
      title: "Launch AI Resume Builder",
      deadline: "14 Days",
      targetUsers: "Job Seekers",
      revenueModel: "SaaS Subscription",
      teamSize: "3",
      currentStage: "MVP Development"
    },
    
    roadmap: [
      { week: "Week 1", phase: "Market Research & Setup", items: ["Competitor Analysis", "Landing Page", "Authentication", "Database Schema"] },
      { week: "Week 2", phase: "Core Integration & Launch", items: ["AI Parsing API", "Builder UI Dashboard", "Stripe Payment", "Testing", "Product Hunt Launch"] }
    ],

    // Module 3: Tasks
    tasks: [
      { id: "task-1", title: "Landing Page", desc: "Build responsive landing page with neon retro aesthetic.", status: "done", priority: "high", owner: "Alex", time: "2 days" },
      { id: "task-2", title: "Pricing Page", desc: "Design Stripe payment table & integration hooks.", status: "done", priority: "medium", owner: "Sarah", time: "1 day" },
      { id: "task-3", title: "Product Demo", desc: "Record interactive video and showcase agent capabilities.", status: "done", priority: "high", owner: "John", time: "1 day" },
      { id: "task-4", title: "Email Campaign", desc: "Draft launch emails for product subscribers.", status: "done", priority: "low", owner: "John", time: "1 day" },
      { id: "task-5", title: "Frontend Login & OAuth", desc: "Connect Google OAuth and standard email auth flow.", status: "in-progress", priority: "high", owner: "Alex", time: "3 days" },
      { id: "task-6", title: "AI Resume Parsing API", desc: "Integrate LLM API to parse resume pdf files.", status: "todo", priority: "high", owner: "Sarah", time: "4 days" },
      { id: "task-7", title: "Stripe Billing Backend", desc: "Implement webhooks and subscription plans.", status: "todo", priority: "medium", owner: "Sarah", time: "2 days" },
      { id: "task-8", title: "User Dashboard UI", desc: "Implement resume builder canvas interface.", status: "todo", priority: "high", owner: "Alex", time: "3 days" },
      { id: "task-9", title: "Product Hunt Assets", desc: "Generate screenshots, videos, and descriptions.", status: "todo", priority: "low", owner: "John", time: "2 days" }
    ],

    // Module 4: Documents
    documents: {
      prd: `# Product Requirements Document (PRD)

## 1. Objective
Launch an AI Resume Builder that allows job seekers to upload raw text and receive a optimized resume parsed by AI in 10 seconds.

## 2. Target Audience
Job Seekers, Students, Career Changers.

## 3. Core Features
- PDF Upload & Parsing
- Keyword Optimization Suggestion Engine
- Retro-futuristic PDF Templates
- Automated Bullet Point Improver

## 4. Tech Stack
- Frontend: HTML/CSS/JS (Vanilla)
- API Gateway: Lemma SDK Serverless
- Storage: Lemma Datastore`,
      
      pitch: `# FounderOS - Investor Pitch Deck

## Slide 1: The Problem
Founders waste 60% of their day on coordination and documentation instead of building.

## Slide 2: The Solution
An AI Chief of Staff that acts as an autonomous operating system, executing tasks.

## Slide 3: Market Size
100k+ SaaS startups launch yearly. Total Addressable Market: $2.4B.`,
      
      checklist: `# Launch Day Checklist

- [x] Run production build checks
- [x] Verify Stripe webhook endpoints
- [x] Send sneak-peek newsletter
- [ ] Post on Product Hunt (12:01 AM PST)
- [ ] Publish Launch Thread on Twitter
- [ ] Share on HN & Reddit`
    },

    // Module 5: Marketing
    marketingCampaign: {
      twitter: `⚡ Startup Launch Announcement!

Today we are launching ResumeAI.
Create optimized resumes in 10s.

Built with Lemma SDK. Check it out! 👇

#buildinpublic #hackathon #startup`,
      linkedin: `I'm thrilled to share that we are launching ResumeAI today.

Our team has worked around the clock to create an AI-powered builder that optimizes resumes using real-world recruiter data.

Leveraging Lemma SDK, we built this from scratch in 14 days. Let's make career transitions easier!`,
      reddit: `Hey developers,

We built a retro-themed AI Resume Builder because we were tired of modern boring layouts. It uses AI to parse files and injects keywords. It's completely free to try.

Check it out and let us know what you think!`,
      email: `Subject: Launching ResumeAI 🚀

Hey there,

We just launched ResumeAI. It lets you build professional resumes instantly.

Try it now and claim 50 free generations.

Best,
FounderOS Team`
    },

    // Module 6: Team
    team: [
      { name: "Alex", role: "Frontend Dev", progress: 75, status: "Blocked", blocker: "Needs OAuth Client IDs from Sarah.", avatar: "A" },
      { name: "Sarah", role: "Backend Dev", progress: 90, status: "On Track", blocker: null, avatar: "S" },
      { name: "John", role: "Marketing", progress: 40, status: "Needs Attention", blocker: "Needs final product screenshots.", avatar: "J" }
    ],

    // Module 8: Risks
    risks: [
      { id: "r-1", title: "API Integration Behind Schedule", severity: "high", desc: "Resume parsing API integration is delayed. Frontend developers cannot proceed.", solution: "Sarah to mock the API endpoint by tonight so Alex can continue UI testing." },
      { id: "r-2", title: "Product Hunt Asset Preparation", severity: "medium", desc: "John is missing dashboard screenshot inputs.", solution: "Alex to provide mock screenshots of the dashboard interface by tomorrow." }
    ],

    // Module 9: Agents
    agents: [
      { name: "Product Manager Agent", role: "Specs & Roadmaps", status: "idle", desc: "Builds product specifications, user stories, and feature details." },
      { name: "Project Manager Agent", role: "Workflows & Tasks", status: "active", desc: "Organizes sprint boards, schedules items, and checks deadlines." },
      { name: "Marketing Agent", role: "Content & Copywriter", status: "idle", desc: "Generates launch campaigns, emails, social copy, and product updates." },
      { name: "Operations Agent", role: "System Orchestrator", status: "thinking", desc: "Integrates datastore systems, triggers functions, and monitors team progress." },
      { name: "Documentation Agent", role: "Doc Writer", status: "idle", desc: "Compiles pitch decks, PRDs, specifications, and standup notes." },
      { name: "Analytics Agent", role: "Risk & Velocity", status: "active", desc: "Monitors deadlines, estimates delays, and forecasts completion." }
    ]
  },

  // Event bus/Listeners
  listeners: {},
  onStateChange: function(key, callback) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(callback);
  },
  updateState: function(key, value) {
    this.state[key] = value;
    if (this.listeners[key]) {
      this.listeners[key].forEach(cb => cb(value));
    }
  },

  // Helper: Show floating toast
  showToast: function(message, type = "info") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    const titles = { info: "SYSTEM INFO", success: "AGENT COMPLETE", warning: "SYSTEM WARNING", danger: "ALERT TRIGGERED" };
    toast.innerHTML = `
      <div class="toast-header">
        <span>${titles[type]}</span>
        <span style="cursor:pointer" onclick="this.parentElement.parentElement.remove()">✕</span>
      </div>
      <div class="toast-body">${message}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  },

  // Helper: Text Streaming (Typewriter effect)
  typewrite: function(element, text, speed = 15, callback = null) {
    element.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        // Handle linebreaks nicely
        if (text.charAt(i) === '\n') {
          element.innerHTML += '<br>';
        } else {
          element.innerHTML += text.charAt(i);
        }
        i++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
    return interval; // Return interval so it can be cleared if needed
  },

  // Routing initialization
  initRouter: function() {
    const views = {
      dashboard: window.DashboardModule,
      goal: window.GoalModule,
      planner: window.PlannerModule,
      tasks: window.TasksModule,
      documents: window.DocumentsModule,
      marketing: window.MarketingModule,
      team: window.TeamModule,
      analytics: window.AnalyticsModule,
      risk: window.RiskModule,
      agents: window.AgentsModule
    };

    const routeChange = () => {
      const hash = window.location.hash.slice(1) || "dashboard";
      const viewFn = views[hash];
      
      // Update sidebar active state
      document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-route") === hash);
      });
      
      // Update breadcrumb
      const bcCurrent = document.getElementById("bcCurrent");
      if (bcCurrent) {
        bcCurrent.textContent = hash.charAt(0).toUpperCase() + hash.slice(1).replace("-", " ");
      }

      const contentArea = document.getElementById("contentArea");
      
      // Loading animation between screens
      const loading = document.getElementById("loadingScreen");
      if (loading) {
        loading.style.display = "flex";
        loading.style.opacity = "1";
        const bar = document.getElementById("loadingBar");
        bar.style.animation = "none";
        bar.offsetHeight; // trigger reflow
        bar.style.animation = "load 0.8s forwards cubic-bezier(0.1, 0.8, 0.2, 1)";
        
        setTimeout(() => {
          loading.style.opacity = "0";
          setTimeout(() => {
            loading.style.display = "none";
          }, 300);
          
          if (viewFn && typeof viewFn.render === "function") {
            contentArea.innerHTML = "";
            viewFn.render(contentArea);
          } else {
            contentArea.innerHTML = `<div class="panel"><h3 class="panel-title">Module Under Construction</h3><p>The module <strong>${hash}</strong> is registered but not loaded.</p></div>`;
          }
        }, 800);
      } else {
        if (viewFn && typeof viewFn.render === "function") {
          contentArea.innerHTML = "";
          viewFn.render(contentArea);
        } else {
          contentArea.innerHTML = `<div class="panel"><h3 class="panel-title">Module Under Construction</h3><p>The module <strong>${hash}</strong> is registered but not loaded.</p></div>`;
        }
      }
    };

    window.addEventListener("hashchange", routeChange);
    // Initial load
    setTimeout(routeChange, 100);
  },

  // Command Palette Handlers
  initCommandPalette: function() {
    const btn = document.getElementById("cmdPaletteBtn");
    const overlay = document.getElementById("cmdOverlay");
    const closeBtn = document.getElementById("cmdClose");
    const input = document.getElementById("cmdInput");
    const output = document.getElementById("cmdOutput");
    const suggestions = document.getElementById("cmdSuggestions");

    const openPalette = () => {
      overlay.style.display = "flex";
      input.value = "";
      input.focus();
      output.style.display = "none";
      output.innerHTML = "";
      suggestions.style.display = "block";
    };

    const closePalette = () => {
      overlay.style.display = "none";
    };

    btn.addEventListener("click", openPalette);
    closeBtn.addEventListener("click", closePalette);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePalette();
    });

    // Key events
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        openPalette();
      }
      if (e.key === "Escape" && overlay.style.display === "flex") {
        closePalette();
      }
    });

    // Suggestion click
    document.querySelectorAll(".cmd-suggest-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        input.value = btn.getAttribute("data-cmd");
        input.focus();
      });
    });

    // Enter submission
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = input.value.trim().toLowerCase();
        if (cmd) {
          executeCommand(cmd);
        }
      }
    });

    const executeCommand = (cmd) => {
      suggestions.style.display = "none";
      output.style.display = "block";
      output.innerHTML = `<div>founder.ai@os:~$ ${cmd}</div><div style="color:var(--accent-yellow)">Analyzing request...</div>`;
      
      let lines = [];
      let finalRedirect = "";
      
      if (cmd.includes("launch new startup") || cmd.includes("goal")) {
        lines = [
          "Spinning up Goal Creator Agent...",
          "Checking project parameters...",
          "Opening Module Goal Creator..."
        ];
        finalRedirect = "goal";
      } else if (cmd.includes("prd") || cmd.includes("document")) {
        lines = [
          "Deploying Documentation Agent...",
          "Synthesizing PRD requirements...",
          "Opening Document Center..."
        ];
        finalRedirect = "documents";
      } else if (cmd.includes("marketing") || cmd.includes("campaign")) {
        lines = [
          "Deploying Marketing Agent...",
          "Generating Twitter and LinkedIn drafts...",
          "Opening Marketing Center..."
        ];
        finalRedirect = "marketing";
      } else if (cmd.includes("risk") || cmd.includes("scan")) {
        lines = [
          "Scanning active datastores...",
          "Evaluating developer velocity...",
          "2 issues detected! Redirecting to Risk Detector..."
        ];
        finalRedirect = "risk";
      } else if (cmd.includes("analytics")) {
        lines = [
          "Opening Analytics dashboard..."
        ];
        finalRedirect = "analytics";
      } else if (cmd.includes("standup")) {
        lines = [
          "Collating developer updates...",
          "Checking blockers...",
          "Standup ready. Opening Dashboard..."
        ];
        finalRedirect = "dashboard";
      } else {
        lines = [
          `Command '${cmd}' unrecognized.`,
          "Available inputs: 'launch new startup', 'generate PRD document', 'create marketing campaign', 'scan for project risks'."
        ];
      }

      let i = 0;
      const printNext = () => {
        if (i < lines.length) {
          const div = document.createElement("div");
          div.textContent = lines[i];
          if (lines[i].includes("Opening") || lines[i].includes("Redirecting")) {
            div.style.color = "var(--accent-cyan)";
          }
          output.appendChild(div);
          output.scrollTop = output.scrollHeight;
          i++;
          setTimeout(printNext, 600);
        } else {
          setTimeout(() => {
            closePalette();
            if (finalRedirect) {
              window.location.hash = finalRedirect;
            }
          }, 800);
        }
      };
      
      setTimeout(printNext, 600);
    };
  },

  // Setup sidebar toggle for mobile responsive layouts
  initSidebarMobile: function() {
    const toggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");
    if (toggle && sidebar) {
      toggle.addEventListener("click", () => {
        sidebar.classList.toggle("mobile-visible");
      });
    }
  },

  // Clock
  startClock: function() {
    const clock = document.getElementById("topbarClock");
    const update = () => {
      const now = new Date();
      const time = now.toTimeString().split(' ')[0];
      if (clock) clock.textContent = time;
    };
    update();
    setInterval(update, 1000);
  },

  init: function() {
    this.startClock();
    this.initCommandPalette();
    this.initSidebarMobile();
    this.initRouter();
    
    // Sync state changes with topbar/sidebar progress
    this.onStateChange("progress", (val) => {
      const p1 = document.getElementById("sidebarProgress");
      const p2 = document.querySelector(".topbar-stat .mini-prog-fill");
      const v1 = document.getElementById("sidebarPct");
      const v2 = document.querySelector(".topbar-stat .mini-prog-val");
      if (p1) p1.style.width = val + "%";
      if (p2) p2.style.width = val + "%";
      if (v1) v1.textContent = val + "%";
      if (v2) v2.textContent = val + "%";
    });

    this.onStateChange("mission", (val) => {
      const m1 = document.getElementById("sidebarMission");
      if (m1) m1.textContent = val;
    });

    this.onStateChange("daysLeft", (val) => {
      const d1 = document.getElementById("sidebarDays");
      const d2 = document.querySelector(".topbar-chip.deadline span:last-child");
      if (d1) d1.textContent = val + " days left";
      if (d2) d2.textContent = val + " Days";
    });

    // Initial alert toast
    setTimeout(() => {
      this.showToast("FounderOS Engine Active. Welcome, Founder.", "info");
    }, 1500);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.FounderOS.init();
});
