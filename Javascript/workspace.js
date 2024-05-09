document.addEventListener('DOMContentLoaded', function() {
  const eye = document.getElementById("eye");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const login = document.getElementById("login");
  const errormsg = document.getElementById("errormsg");
  const pass = document.getElementById("pass").innerText;
  let countWrongPassword = 0;

  // Function to toggle password visibility
  eye.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eye.classList.remove('fa-eye');
      eye.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      eye.classList.remove('fa-eye-slash');
      eye.classList.add('fa-eye');
    }
  });

  // Function to handle login button click
  function handleLogin() {
    const password = passwordInput.value;
    if (password === pass) {
      login.style.display = 'none';
    } else if(password != pass) {
      countWrongPassword++;
      if (countWrongPassword >= 3) {
        const timeToWait = 10; // Time to wait in seconds
        errormsg.innerHTML = `Try again after ${timeToWait} seconds`;
        loginBtn.disabled = true; // Disable login button
        
        // Countdown timer
        let countdown = timeToWait;
        const timerInterval = setInterval(() => {
          countdown--;
          errormsg.innerHTML = `Try again after ${countdown} seconds`;
          if (countdown === 0) {
            clearInterval(timerInterval);
            errormsg.innerHTML = ''; // Clear error message
            countWrongPassword = 0; // Reset count
            loginBtn.disabled = false; // Enable login button
          }
        }, 1000); // Update every second

        // Vibrate screen
        navigator.vibrate([200, 100, 200]); // Vibration pattern: vibrate for 200ms, pause for 100ms, then vibrate for 200ms
      } else {
        errormsg.innerHTML = 'Please enter correct password!';
        // Vibrate screen for wrong password
        navigator.vibrate(200); // Vibrate for 200ms
      }
    }
  }

  // Add event listener for Enter key press on password input field
  passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  });

  // Add event listener for login button click
  loginBtn.addEventListener('click', handleLogin);
});





const switchbox = document.getElementById('switch')
const sideBar = document.getElementById('sideBar')
const check = document.getElementById("check")
const onOff = document.getElementById("on-off")

switchbox.addEventListener('click', function () {
if (check.checked) {
  onOff.innerHTML = 'ON';
} else {
  onOff.innerHTML = 'OFF';
}
});

const navigation = document.getElementById('navigation');

sideBar.addEventListener('click', function () {
if (check.checked) {
  onOff.innerHTML = 'ON';
  navigation.style.left = "0px";
} else {
  onOff.innerHTML = 'OFF';
  navigation.style.left = "-400px";
}
});

const setting = document.getElementById('setting')
const close = document.getElementById('close')
const settingSidebar = document.getElementById('settingSidebar')


setting.style.cursor = 'Pointer'

if(settingSidebar.style.right = '-300px'){
  isOpen= true;
}else{
  isOpen=false;
}

setting.addEventListener('click' , function() {
  if(isOpen){
    settingSidebar.style.right = '0px';
    setting.style.transform = 'rotate(360deg)'
    isOpen = false
  } else {
    settingSidebar.style.right = '-300px';
    setting.style.transform = 'rotate(0deg)'
    isOpen = true
  }
})

close.addEventListener('click' , function() {
    settingSidebar.style.right = '-300px';
    setting.style.transform = 'rotate(0deg)'
    isOpen = true
})





const workSpace = document.getElementById("workSpace");
const panelWidth = 280;
const updateWorkspaceWidth = () => {
  const windowWidth = window.innerWidth;
  const workSpaceWidth = windowWidth - panelWidth;
  workSpace.style.width = `${workSpaceWidth}px`;
};

// Initial call to set workspace width
updateWorkspaceWidth();

// Listen for window resize event to update workspace width
window.addEventListener("resize", updateWorkspaceWidth);

// Function to format the date as "day, date month"
function formatDate(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];

  return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}

// Fetch the current date and display it in the specified format
const currentDate = new Date();
const formattedDate = formatDate(currentDate);
document.getElementById("fetchDate").textContent = formattedDate;

const taskSection = document.getElementById("taskSection");
const todaySection = document.getElementById("todaySection");
const importantSection = document.getElementById("importantSection");
const completeSection = document.getElementById("completeSection");
const pendingSection = document.getElementById("pendingSection");

const taskBtn = document.getElementById("taskBtn");
const todayBtn = document.getElementById("todayBtn");
const importantBtn = document.getElementById("importantBtn");
const completeBtn = document.getElementById("completeBtn");
const pendingBtn = document.getElementById("pendingBtn");

// Function to hide all sections except the one passed as an argument
function hideSections(exceptSection) {
  const sections = [
    taskSection,
    todaySection,
    importantSection,
    completeSection,
    pendingSection,
  ];
  sections.forEach((section) => {
    if (section !== exceptSection) {
      section.style.display = "none";
    }
  });
}

// Event listener for the task button
taskBtn.addEventListener("click", function () {
  taskSection.style.display = "flex";
  hideSections(taskSection);
});

// Event listener for the today button
todayBtn.addEventListener("click", function () {
  todaySection.style.display = "flex";
  hideSections(todaySection);
});

// Event listener for the important button
importantBtn.addEventListener("click", function () {
  importantSection.style.display = "flex";
  hideSections(importantSection);
});

// Event listener for the complete button
completeBtn.addEventListener("click", function () {
  completeSection.style.display = "flex";
  hideSections(completeSection);
});

// Event listener for the pending button
pendingBtn.addEventListener("click", function () {
  pendingSection.style.display = "flex";
  hideSections(pendingSection);
});

// Initially display the task section
taskSection.style.display = "flex";
hideSections(taskSection);
