
const searchIcon = document.getElementById('searchIcon');
const searchBar = document.getElementById('searchBar');
let isOpened = false;

searchIcon.addEventListener("click", function () {
    if (isOpened) {
        searchBar.style.display = 'none';
        searchIcon.style.borderTopRightRadius = 'var(--radius-01)';
        searchIcon.style.borderBottomRightRadius = 'var(--radius-01)';
        isOpened = false;
    } else {
        searchBar.style.display = 'block';
        isOpened = true;
        searchIcon.style.borderTopRightRadius = '0';
        searchIcon.style.borderBottomRightRadius = '0';
    }
});
// Function to filter tasks based on search input
function filterTasks(searchInput) {
  const allTasks = document.querySelectorAll(".text-card");

  allTasks.forEach((task) => {
    const taskName = task.querySelector("#task").textContent.toLowerCase();
    const dueDate = task.querySelector("#duedate").textContent.toLowerCase();
    const createDate = task.querySelector("#createDate").textContent.toLowerCase();

    // Check if the task name, due date, or creation date contains the search input
    if (
      taskName.includes(searchInput) ||
      dueDate.includes(searchInput) ||
      createDate.includes(searchInput)
    ) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// Event listener for search input
searchBar.addEventListener("input", function () {
  const searchInput = searchBar.value.toLowerCase();
  filterTasks(searchInput);
});



// Function to sort task cards based on specified criteria
function sortTasks(criteria) {
  const taskListWrapper = document.getElementById("taskListWrapper");
  const taskCards = Array.from(taskListWrapper.getElementsByClassName("text-card"));

  switch (criteria) {
    case "creationTime":
      taskCards.sort((a, b) => {
        const timeA = new Date(a.querySelector("#createDate").textContent).getTime();
        const timeB = new Date(b.querySelector("#createDate").textContent).getTime();
        return timeA - timeB;
      });
      break;
    case "day":
      taskCards.sort((a, b) => {
        const dayA = new Date(a.querySelector("#createDate").textContent).getDate();
        const dayB = new Date(b.querySelector("#createDate").textContent).getDate();
        return dayA - dayB;
      });
      break;
    case "month":
      taskCards.sort((a, b) => {
        const monthA = new Date(a.querySelector("#createDate").textContent).getMonth();
        const monthB = new Date(b.querySelector("#createDate").textContent).getMonth();
        return monthA - monthB;
      });
      break;
    case "taskName":
      taskCards.sort((a, b) => {
        const taskNameA = a.querySelector("#task").textContent.toLowerCase();
        const taskNameB = b.querySelector("#task").textContent.toLowerCase();
        return taskNameA.localeCompare(taskNameB);
      });
      break;
    case "dueDate":
      taskCards.sort((a, b) => {
        const dueDateA = new Date(a.querySelector("#duedate").textContent);
        const dueDateB = new Date(b.querySelector("#duedate").textContent);
        return dueDateA - dueDateB;
      });
      break;
    default:
      // If criteria is not recognized, do nothing
      return;
  }

  // Clear existing task list and append sorted task cards
  taskListWrapper.innerHTML = "";
  taskCards.forEach(card => taskListWrapper.appendChild(card));
}


// Event listener to trigger sorting when the Due Date sort button is clicked
document.getElementById("DueDateSort").addEventListener("click", function() {
  sortTasks("dueDate");
});

// Event listener to trigger sorting when the Alphabetically sort button is clicked
document.getElementById("alphabetShot").addEventListener("click", function() {
  sortTasks("taskName");
});

// Event listener to trigger sorting when the Creation Date sort button is clicked
document.getElementById("creationDateSort").addEventListener("click", function() {
  sortTasks("creationTime");
});

