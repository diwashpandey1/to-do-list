// Function to set data with expiration time
function setTemporaryData(key, value, expirationInDays) {
  var now = new Date();
  var expiration = new Date(now.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
  var item = {
      value: value,
      expiration: expiration.getTime()
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Function to get data
function getTemporaryData(key) {
  var itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  var item = JSON.parse(itemStr);
  var now = new Date().getTime();
  if (now > item.expiration) {
      localStorage.removeItem(key);
      return null;
  }
  return item.value;
}


// Select the task input field
const taskInput = document.getElementById("taskInput");



// Function to add a task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  const dueDate = document.getElementById("dueDateInput").value.trim();
  const currentDate = new Date().toLocaleString("en-US");

  if (!task) {
      alert("Task can't be empty. Please enter a task.");
      return;
  }

  const newTask = {
      task: task,
      dueDate: dueDate ? dueDate : 'No Due Date',
      isImportant: false,
      isCompleted: false,
      createDate: currentDate
  };

  // Store the task locally with expiration for 1 day
  setTemporaryData('task_' + Date.now(), JSON.stringify(newTask), 1);

  // Render the task on UI
  renderTask(newTask);
}


// // Call addTask function when clicking on "Add Task" button
document.getElementById("addTaskBtn").addEventListener("click", addTask());

// Call addTask function when pressing Enter key in task input field
document.getElementById("taskInput").addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      addTask();
  }
});

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  const dueDate = document.getElementById("dueDateInput").value.trim();
  const currentDate = new Date().toLocaleString("en-US");

  if (!task) {
      alert("Task can't be empty. Please enter a task.");
      return;
  }

  const newTask = {
      task: task,
      dueDate: dueDate ? dueDate : 'No Due Date',
      isImportant: false,
      isCompleted: false,
      createDate: currentDate
  };

  console.log("New task:", newTask);

  // Store the task locally with expiration for 1 day
  setTemporaryData('task_' + Date.now(), JSON.stringify(newTask), 1);

  console.log("Task added to local storage.");

  // Render the task on UI
  renderTask(newTask);
}

// Function to render a task onto the UI
function renderTask(task) {
  const tasksWrapper = document.getElementById("taskListWrapper");

  const newTaskCard = document.createElement("div");
  newTaskCard.className = "text-card";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function() {
      task.isCompleted = this.checked;
      setTemporaryData('task_' + Date.now(), JSON.stringify(task), 1);
      if (task.isCompleted) {
          completeSection.appendChild(newTaskCard);
      } else {
          pendingSection.appendChild(newTaskCard);
      }
  });

  const taskParagraph = document.createElement("p");
  taskParagraph.textContent = task.task;

  const dueDateParagraph = document.createElement("p");
  dueDateParagraph.textContent = task.dueDate;

  const importantParagraph = document.createElement("p");
  importantParagraph.style.cursor = "pointer";
  importantParagraph.textContent = task.isImportant ? "★" : "☆";
  importantParagraph.addEventListener("click", function() {
      task.isImportant = !task.isImportant;
      importantParagraph.textContent = task.isImportant ? "★" : "☆";
      setTemporaryData('task_' + Date.now(), JSON.stringify(task), 1);
      if (task.isImportant) {
          importantSection.appendChild(newTaskCard);
      } else {
          tasksWrapper.appendChild(newTaskCard);
      }
  });

  const createDateParagraph = document.createElement("p");
  createDateParagraph.textContent = task.createDate;

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-trash"></i>';
  editButton.className = "delete";
  editButton.addEventListener("click", function() {
      localStorage.removeItem('task_' + Date.now());
      newTaskCard.remove();
  });

  newTaskCard.appendChild(checkbox);
  newTaskCard.appendChild(taskParagraph);
  newTaskCard.appendChild(dueDateParagraph);
  newTaskCard.appendChild(importantParagraph);
  newTaskCard.appendChild(createDateParagraph);
  newTaskCard.appendChild(editButton);

  taskSection.appendChild(newTaskCard)

  // Append the task card to the appropriate section
  if (task.isCompleted) {
      completeSection.appendChild(newTaskCard);
  } else if (task.isImportant) {
      importantSection.appendChild(newTaskCard);
  } else {
      tasksWrapper.appendChild(newTaskCard);
  }
}



// Call renderTask function for each stored task on page load
window.addEventListener("load", function() {
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('task_')) {
          const task = JSON.parse(localStorage.getItem(key));
          renderTask(task);
      }
  }
});

// Select sections
const completeSection = document.getElementById("completeSection");
const importantSection = document.getElementById("importantSection");
const pendingSection = document.getElementById("pendingSection");
const taskSection = document.getElementById("taskSection");
