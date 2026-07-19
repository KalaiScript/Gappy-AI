# FounderOS — AI Chief of Staff

<div align="center">

  <img src="https://img.shields.io/badge/version-2.0.1-22d3ee?style=for-the-badge&labelColor=050814" alt="Version">
  <img src="https://img.shields.io/badge/status-active-10b981?style=for-the-badge&labelColor=050814" alt="Status">
  <img src="https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-3b82f6?style=for-the-badge&labelColor=050814" alt="Stack">
  <img src="https://img.shields.io/badge/agents-6%20running-f59e0b?style=for-the-badge&labelColor=050814" alt="Agents">

  <br/><br/>

  > **Plan. Execute. Track. Ship.**  
  > *Your AI-powered operating system for startup founders.*

</div>

---

## 🧠 What is FounderOS?

**FounderOS** is a fully browser-based, AI-powered startup operating system that helps solo founders and small teams run their entire business workflow — from raw idea to product launch — without hiring a large operations team.

It provides a unified command center with 11 intelligent modules, each handling a distinct phase of the startup lifecycle. A built-in **AI Chief of Staff** agent actively monitors your mission, flags risks, generates documents, and orchestrates specialized sub-agents — all from a single, beautifully designed dashboard.

---

## ✨ Features at a Glance

| Module | Description |
|---|---|
| 🏠 **Dashboard** | Mission control — active startup progress, AI standup reports, upcoming milestones, and quick-launch actions |
| 🎯 **Goal Creator** | Interactive Q&A wizard that converts a startup idea into a full product roadmap and milestone plan |
| 📅 **AI Planner** | Week-by-week sprint timeline with AI-generated task sequences and timeline optimization controls |
| ✅ **Task Board** | Kanban board with AI micro-task expander — breaks down high-level tasks into actionable sub-steps |
| 📄 **Documents** | Auto-generates PRDs, Pitch Decks, and Launch Checklists from your mission context |
| 📣 **Marketing** | Generates platform-specific copy for Twitter/X, LinkedIn, Reddit, and launch email campaigns |
| 👥 **Team** | Team blocker scanner with Slack Resolver Agents to auto-resolve cross-team dependencies |
| 📊 **Analytics** | Velocity gauges, completion metrics, and deadline confidence forecasting |
| ⚠️ **Risk Detector** | Radar-style scanner that identifies active project risks with severity ratings and mitigation plans |
| 🤖 **AI Agents** | Console for 6 specialized agents (PM, Project Manager, Marketing, Ops, Docs, Analytics) |
| 💰 **Budget Tracker** | Burn rate monitoring, category budgets, and spend forecasting against runway |

---

## 🛠️ Tech Stack

```
Frontend     →  HTML5 (Semantic) + Vanilla CSS + Vanilla JavaScript
Fonts        →  Outfit (Headings) · Inter (Body) · Fira Code (Mono)
Animations   →  CSS keyframe animations + Lottie (lottie-player)
State        →  Reactive JS state with hash-based client-side routing
Design       →  Dark neon UI — glassmorphism, glow effects, scanlines, dot-grid
Themes       →  Neon Blue · Matrix Green · Amber CRT · Cyberpunk
```

No frameworks. No build tools. No dependencies to install.

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/KalaiScript/Gappy-AI.git

# 2. Navigate into the project
cd Gappy-AI

# 3. Open directly in your browser
open index.html
# or use VS Code Live Server / any static file server
```

> ⚡ **No servers, compilers, or build steps required.** Works in any modern browser.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Open Command Palette |
| `Enter` | Execute current command |
| `Esc` | Close Command Palette |

### Quick Commands (via Command Palette)

```
launch new startup          →  Start Goal Creator wizard
generate PRD document       →  Navigate to Documents module
create marketing campaign   →  Open Marketing module
scan for project risks      →  Open Risk Detector
show analytics              →  Navigate to Analytics
show team standup           →  Navigate to Dashboard
track budget burn           →  Open Budget Tracker
```

---

## 🎨 Themes

Switch themes using the dropdown in the top-right toolbar:

| Theme | Accent Color | Vibe |
|---|---|---|
| 🔵 Neon Blue | `#22d3ee` | Default cyberpunk dashboard |
| 🟢 Matrix Green | `#39ff14` | Terminal hacker aesthetic |
| 🟠 Amber CRT | `#ffb000` | Retro CRT monitor look |
| 🟣 Cyberpunk | `#ff007f` | High-contrast magenta/purple |

---

## 📁 Project Structure

```
Gappy-AI/
├── index.html              # App shell, sidebar, topbar, loading screen
├── style.css               # Full design system — variables, components, themes
├── app.js                  # Core app state, routing, command palette, audio
└── modules/
    ├── dashboard.js        # Mission overview, standup reports, milestones
    ├── goal.js             # Goal creation wizard & roadmap generator
    ├── planner.js          # Sprint timeline & AI schedule optimizer
    ├── tasks.js            # Kanban board & AI task expander
    ├── documents.js        # PRD, Pitch Deck & Launch Checklist generator
    ├── marketing.js        # Multi-platform copy generator
    ├── team.js             # Team management & blocker resolver
    ├── analytics.js        # Velocity metrics & deadline forecasting
    ├── risk.js             # Radar risk scanner & mitigation advisor
    ├── agents.js           # AI agents console (6 specialized agents)
    └── budget.js           # Budget tracker & burn rate monitor
```

---

## 🤖 AI Agents

FounderOS ships with **6 built-in AI agents**, each with a dedicated role:

| Agent | Role |
|---|---|
| 🧠 **Chief of Staff AI** | Orchestrates all agents, provides recommendations |
| 📋 **Product Manager** | Maintains roadmap alignment and PRD accuracy |
| 🗂️ **Project Manager** | Tracks timelines, flags blockers, adjusts sprints |
| 📣 **Marketing Agent** | Drafts campaigns and monitors messaging consistency |
| ⚙️ **Operations Agent** | Monitors team health, resolves workflow bottlenecks |
| 📝 **Documentation Agent** | Keeps docs up to date with latest mission context |
| 📊 **Analytics Agent** | Reports velocity, confidence, and burn metrics |

---

## 🧑‍💻 Author

Built by **Kalaiyarasan** — [GitHub](https://github.com/KalaiScript)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
