(() => {
  const STORAGE_KEY = "daylist.tasks.v1";
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");
  const taskList = document.getElementById("task-list");
  const taskSearch = document.getElementById("task-search");
  const sortSelect = document.getElementById("sort-tasks");
  const summary = document.getElementById("task-summary");
  const message = document.getElementById("storage-message");
  const title = document.getElementById("workspace-title");
  const dateLabel = document.getElementById("today-date");
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

  if (!taskForm || !taskInput || !dueDateInput || !taskList || !taskSearch || !sortSelect || !summary || !message || !title || !dateLabel) {
    console.error("The workspace could not start because required page elements are missing.");
    return;
  }

  const labels = {
    all: "All tasks",
    today: "Today",
    important: "Important",
    pending: "Pending",
    completed: "Completed"
  };
  let activeFilter = "all";
  let tasks = loadTasks();

  dateLabel.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date()).toUpperCase();

  function isValidTask(task) {
    return task !== null
      && typeof task === "object"
      && typeof task.id === "string"
      && typeof task.text === "string"
      && task.text.trim().length > 0
      && typeof task.createdAt === "string"
      && !Number.isNaN(Date.parse(task.createdAt))
      && (task.dueDate === "" || (typeof task.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)))
      && typeof task.completed === "boolean"
      && typeof task.important === "boolean";
  }

  function loadTasks() {
    try {
      const savedValue = window.localStorage.getItem(STORAGE_KEY);
      if (savedValue === null) return [];
      const parsed = JSON.parse(savedValue);
      if (!Array.isArray(parsed)) {
        message.hidden = false;
        message.textContent = "Saved task data was not in the expected format. Your list will start empty.";
        console.warn("Daylist ignored saved task data because it was not an array.");
        return [];
      }

      const validTasks = parsed.filter(isValidTask);
      if (validTasks.length !== parsed.length) {
        message.hidden = false;
        message.textContent = "Some saved task data could not be read and was skipped.";
        console.warn("Daylist skipped one or more invalid saved tasks.");
      }
      return validTasks;
    } catch (error) {
      message.hidden = false;
      message.textContent = "Your saved list could not be read. Check your browser storage settings.";
      console.error("Daylist could not read tasks from local storage.", error);
      return [];
    }
  }

  function saveTasks() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      message.hidden = true;
      message.textContent = "";
      return true;
    } catch (error) {
      message.hidden = false;
      message.textContent = "Changes are visible, but could not be saved in this browser.";
      console.error("Daylist could not save tasks to local storage.", error);
      return false;
    }
  }

  function localDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function filteredTasks() {
    const query = taskSearch.value.trim().toLocaleLowerCase();
    const today = localDateString();
    const visibleTasks = tasks.filter((task) => {
      const matchesFilter = activeFilter === "all"
        || (activeFilter === "today" && task.dueDate === today)
        || (activeFilter === "important" && task.important)
        || (activeFilter === "completed" && task.completed)
        || (activeFilter === "pending" && !task.completed);
      const searchableText = `${task.text} ${task.dueDate} ${task.createdAt}`.toLocaleLowerCase();
      return matchesFilter && searchableText.includes(query);
    });

    return visibleTasks.sort((first, second) => {
      if (sortSelect.value === "alphabetical") {
        return first.text.localeCompare(second.text);
      }
      if (sortSelect.value === "due") {
        if (!first.dueDate) return second.dueDate ? 1 : 0;
        if (!second.dueDate) return -1;
        return first.dueDate.localeCompare(second.dueDate);
      }
      return Date.parse(second.createdAt) - Date.parse(first.createdAt);
    });
  }

  function updateCounts() {
    const countByFilter = {
      all: tasks.length,
      today: tasks.filter((task) => task.dueDate === localDateString()).length,
      important: tasks.filter((task) => task.important).length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length
    };

    Object.entries(countByFilter).forEach(([filter, count]) => {
      const countElement = document.querySelector(`[data-count="${filter}"]`);
      if (countElement) countElement.textContent = String(count);
    });
  }

  function makeTaskElement(task) {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-complete" : ""}`;
    item.dataset.taskId = task.id;

    const checkbox = document.createElement("input");
    checkbox.className = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `${task.completed ? "Uncomplete" : "Complete"} ${task.text}`);

    const details = document.createElement("div");
    details.className = "task-details";
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    const metadata = document.createElement("span");
    metadata.className = "task-metadata";
    const created = new Date(task.createdAt);
    const createdLabel = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(created);
    metadata.textContent = task.dueDate
      ? `Added ${createdLabel} · Due ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${task.dueDate}T00:00:00Z`))}`
      : `Added ${createdLabel}`;
    details.append(taskText, metadata);

    const actions = document.createElement("div");
    actions.className = "task-actions";
    const importantButton = document.createElement("button");
    importantButton.className = "task-action important-action";
    importantButton.type = "button";
    importantButton.dataset.action = "important";
    importantButton.setAttribute("aria-pressed", String(task.important));
    importantButton.setAttribute("aria-label", `${task.important ? "Remove from" : "Mark as"} important: ${task.text}`);
    importantButton.textContent = task.important ? "★" : "☆";
    const deleteButton = document.createElement("button");
    deleteButton.className = "task-action delete-action";
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
    deleteButton.textContent = "×";
    actions.append(importantButton, deleteButton);
    item.append(checkbox, details, actions);
    return item;
  }

  function render() {
    title.textContent = labels[activeFilter];
    filterButtons.forEach((button) => {
      const selected = button.dataset.filter === activeFilter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    const visibleTasks = filteredTasks();
    taskList.replaceChildren();
    visibleTasks.forEach((task) => taskList.append(makeTaskElement(task)));

    const noun = visibleTasks.length === 1 ? "task" : "tasks";
    summary.textContent = `${visibleTasks.length} ${noun}`;
    if (visibleTasks.length === 0) {
      const emptyState = document.createElement("li");
      emptyState.className = "empty-state";
      const hasSearch = taskSearch.value.trim().length > 0;
      emptyState.textContent = hasSearch
        ? "No tasks match your search. Try another word."
        : tasks.length === 0
          ? "Your list is clear. Add a task above to get started."
          : `No ${labels[activeFilter].toLocaleLowerCase()} tasks right now.`;
      taskList.append(emptyState);
    }
    updateCounts();
  }

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();
    if (!text) {
      taskInput.setCustomValidity("Enter a task before adding it.");
      taskInput.reportValidity();
      taskInput.setCustomValidity("");
      taskInput.focus();
      return;
    }

    tasks.push({
      id: window.crypto && typeof window.crypto.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      createdAt: new Date().toISOString(),
      dueDate: dueDateInput.value,
      completed: false,
      important: false
    });
    taskForm.reset();
    saveTasks();
    render();
    taskInput.focus();
  });

  taskList.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.classList.contains("task-checkbox")) return;
    const item = event.target.closest("[data-task-id]");
    const task = tasks.find((candidate) => candidate.id === item?.dataset.taskId);
    if (!task) return;
    task.completed = event.target.checked;
    saveTasks();
    render();
  });

  taskList.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    const actionButton = event.target.closest("button[data-action]");
    const item = actionButton?.closest("[data-task-id]");
    const task = tasks.find((candidate) => candidate.id === item?.dataset.taskId);
    if (!actionButton || !task) return;

    if (actionButton.dataset.action === "delete") {
      tasks = tasks.filter((candidate) => candidate.id !== task.id);
    } else if (actionButton.dataset.action === "important") {
      task.important = !task.important;
    } else {
      return;
    }
    saveTasks();
    render();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter in labels ? button.dataset.filter : "all";
      render();
    });
  });

  taskSearch.addEventListener("input", render);
  sortSelect.addEventListener("change", render);
  render();
})();
