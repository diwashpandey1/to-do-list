
const openListBtn = document.getElementById('openlist');
const sidebar = document.getElementById('blogList');
isShown = false;

sidebar.style.transition = 'var(--transition)';

openListBtn.addEventListener('click' , function() {
  if(isShown){
    sidebar.style.left = '-300px';
    isShown = false;
  } else {
    sidebar.style.left = '0';
    isShown = true;
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const seeMoreButtons = document.querySelectorAll("#seemore");

  seeMoreButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const hiddenContent = button.parentElement.querySelector(".hidden-content");
      
      if (hiddenContent.style.display === "none") {
        hiddenContent.style.display = "block";
        button.textContent = "See Less...";
      } else {
        hiddenContent.style.display = "none";
        button.textContent = "See More...";
      }
    });
  });
});


const workSpace = document.getElementById("blogContainer");
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