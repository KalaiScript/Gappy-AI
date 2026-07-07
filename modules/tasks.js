// Module 4: Task Board (Kanban + AI Expansion)
window.TasksModule = {
  render: function(container) {
    this.renderBoard(container);
  },

  renderBoard: function(container) {
    const state = window.FounderOS.state;
    
    const todo = state.tasks.filter(t => t.status === "todo");
    const inProgress = state.tasks.filter(t => t.status === "in-progress");
    const done = state.tasks.filter(t => t.status === "done");

    container.innerHTML = `
      <!-- AI Expansion Interface -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">⚡ AI TASK GENERATOR & EXPANDER</div>
        </div>
        <div style="display:flex; gap: 12px; margin-bottom: 14px;">
          <input type="text" class="form-input" id="taskExpandInput" placeholder="Enter high-level task, e.g., Build Authentication" style="flex-grow:1;">
          <button class="btn btn-primary" onclick="window.TasksModule.expandTask()">[AI Expand Task]</button>
        </div>
        <div class="terminal-window" id="expandTerminal" style="display:none; margin-top: 14px;">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="t-dot red"></span>
              <span class="t-dot yellow"></span>
              <span class="t-dot green"></span>
            </div>
            <div class="terminal-title">PROJECT MANAGER AGENT - EXPANDER</div>
          </div>
          <div class="terminal-body" id="expandTerminalBody">
            Synthesizing dependency task lists...
          </div>
        </div>
      </div>

      <!-- Kanban Columns -->
      <div class="kanban-board">
        <div class="kanban-col">
          <div class="kanban-col-header">
            <span>TO DO</span>
            <span class="kanban-col-count" id="todoCount">${todo.length}</span>
          </div>
          <div class="kanban-list" id="todoCol">
            ${todo.map(t => this.renderTaskCard(t)).join('')}
          </div>
        </div>

        <div class="kanban-col">
          <div class="kanban-col-header">
            <span>IN PROGRESS</span>
            <span class="kanban-col-count" id="inProgressCount">${inProgress.length}</span>
          </div>
          <div class="kanban-list" id="inProgressCol">
            ${inProgress.map(t => this.renderTaskCard(t)).join('')}
          </div>
        </div>

        <div class="kanban-col">
          <div class="kanban-col-header">
            <span>DONE</span>
            <span class="kanban-col-count" id="doneCount">${done.length}</span>
          </div>
          <div class="kanban-list" id="doneCol">
            ${done.map(t => this.renderTaskCard(t)).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderTaskCard: function(task) {
    return `
      <div class="task-card" id="${task.id}">
        <div class="task-card-header">
          <span class="task-title">${task.title}</span>
          <span class="task-priority priority-${task.priority}">${task.priority}</span>
        </div>
        <div class="task-desc">${task.desc}</div>
        <div class="task-meta">
          <div class="task-owner">
            <span class="avatar-mini">${task.owner.charAt(0)}</span>
            <span>${task.owner}</span>
          </div>
          <div>⏱ ${task.time}</div>
        </div>
        <div style="display:flex; justify-content: flex-end; gap: 6px; margin-top:10px;">
          ${task.status !== 'todo' ? `<button class="btn" style="padding: 2px 6px; font-size:8px;" onclick="window.TasksModule.moveTask('${task.id}', 'todo')">To Do</button>` : ''}
          ${task.status !== 'in-progress' ? `<button class="btn" style="padding: 2px 6px; font-size:8px;" onclick="window.TasksModule.moveTask('${task.id}', 'in-progress')">Work</button>` : ''}
          ${task.status !== 'done' ? `<button class="btn btn-primary" style="padding: 2px 6px; font-size:8px;" onclick="window.TasksModule.moveTask('${task.id}', 'done')">Done</button>` : ''}
        </div>
      </div>
    `;
  },

  moveTask: function(taskId, newStatus) {
    const state = window.FounderOS.state;
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      
      // If we move a task to done, maybe boost progress by a little
      if (newStatus === "done") {
        const completed = state.tasks.filter(t => t.status === "done").length;
        const total = state.tasks.length;
        const newPct = Math.round((completed / total) * 100);
        window.FounderOS.updateState("progress", newPct);
      }
      
      // Rerender Board
      this.renderBoard(document.getElementById("contentArea"));
      window.FounderOS.showToast(`Task '${task.title}' moved to ${newStatus.toUpperCase()}`, "info");
      
      // Update badge
      const taskBadge = document.getElementById("taskBadge");
      if (taskBadge) {
        taskBadge.textContent = state.tasks.filter(t => t.status !== "done").length;
      }
    }
  },

  expandTask: function() {
    const input = document.getElementById("taskExpandInput");
    const term = document.getElementById("expandTerminal");
    const termBody = document.getElementById("expandTerminalBody");
    if (!input || !input.value.trim() || !term) return;

    term.style.display = "block";
    termBody.innerHTML = "";

    const userQuery = input.value.trim();
    const lines = [
      "founder.ai@os:~$ expand-task --query='" + userQuery + "'",
      "Analyzing component dependencies for: " + userQuery + "...",
      "Expanding high-level task into micro-tasks...",
      "1. Frontend Login Interface (Est: 2 days)",
      "2. Google OAuth client setup (Est: 1 day)",
      "3. Forgot Password / Verification link delivery (Est: 1 day)",
      "4. Database session schema and validations (Est: 2 days)",
      "5. Unit test auth endpoints (Est: 1 day)",
      "Writing newly generated microtasks into active sprint datastore... Done."
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
        setTimeout(stream, 700);
      } else {
        // Add tasks to list
        const state = window.FounderOS.state;
        const newTasks = [
          { id: "etask-1", title: "Frontend Login UI", desc: "Build input fields, neon styling, and validators.", status: "todo", priority: "high", owner: "Alex", time: "2 days" },
          { id: "etask-2", title: "Google OAuth Integration", desc: "Set up login callbacks and client configs.", status: "todo", priority: "medium", owner: "Sarah", time: "1 day" },
          { id: "etask-3", title: "Forgot Password Hook", desc: "Create session password resets.", status: "todo", priority: "low", owner: "Sarah", time: "1 day" }
        ];
        
        state.tasks.push(...newTasks);
        
        // Rerender Board
        setTimeout(() => {
          this.renderBoard(document.getElementById("contentArea"));
          window.FounderOS.showToast("Added 3 AI-expanded microtasks to Board!", "success");
          window.FounderOS.sfx.playSuccess();
          
          const taskBadge = document.getElementById("taskBadge");
          if (taskBadge) {
            taskBadge.textContent = state.tasks.filter(t => t.status !== "done").length;
          }
        }, 1000);
      }
    };
    stream();
  }
};
