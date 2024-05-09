document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDateInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskTable = document.getElementById("taskTable");

  addTaskBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    const createdAt = new Date().toLocaleString();

    if (taskText.trim() !== "") {
      const newRow = taskTable.insertRow(-1);

      const tickCell = newRow.insertCell(0);
      tickCell.innerHTML = '<input type="checkbox">';

      const taskCell = newRow.insertCell(1);
      taskCell.textContent = taskText;

      const createdAtCell = newRow.insertCell(2);
      createdAtCell.textContent = createdAt;

      const dueDateCell = newRow.insertCell(3);
      if(dueDate === ""){
          dueDateCell.textContent = 'No Due Date added'
      } else {

          dueDateCell.textContent = dueDate;
      }

      const importantCell = newRow.insertCell(4);
      isImportant = false;
      importantCell.innerHTML = '&#9734;';
      importantCell.addEventListener('click', function() {
          if(isImportant){
              importantCell.innerHTML = '&#9734;';
              isImportant=false;
          } else {
              importantCell.innerHTML = '&#9733;';
              isImportant=true;
          }
      })
      

      const actionCell = newRow.insertCell(5);
      const deleteButton = document.createElement("button");
      deleteButton.title = 'Delete'
      deleteButton.innerHTML = '<i class="fas fa fa-trash"></i>';
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", function() {
        newRow.remove();
      });
      actionCell.appendChild(deleteButton);

      // Clear input fields
      taskInput.value = "";
      dueDateInput.value = "";
    } else {
      alert('Please enter a task');
    }
  });
});
