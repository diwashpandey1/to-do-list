


const bar = document.getElementsByClassName("bar")[0]; // Get the first element with class "bar"
const line_1 = document.getElementById("line-1");
const line_2 = document.getElementById("line-2");
const line_3 = document.getElementById("line-3");
const slideBar = document.getElementById("slideBar");
var iscross = false;

// using click function to handle the button clicks
bar.addEventListener('click', function() {
  if (iscross) {
    line_1.style.transform = 'rotate(0deg) ';
    line_2.style.opacity = '1';
    line_2.style.transform = 'translate(0px,0px) ';
    line_3.style.transform = 'rotate(0deg) ';
    slideBar.style.right = '-1000px';
    iscross = false;
  } else {
    line_1.style.transform = 'rotate(45deg) translate(4px,14px)'; 
    line_2.style.opacity = '0 ';
    line_2.style.transform = 'translate(50px,0px) ';
    slideBar.style.right = '0px';
    line_3.style.transform = 'rotate(-45deg) translate(0px,-10px)';
    iscross = true;
  }
});

// Get all question-answer pairs
const qnAnsList = document.querySelectorAll(".qn-ans");
var showAnswer = false;
// Loop through each pair
qnAnsList.forEach(qnAns => {
  // Get question and answer elements within each pair
  const question = qnAns.querySelector(".question");
  const answer = qnAns.querySelector(".answer");
  const line1 = qnAns.querySelector('.line1');
  const line2 = qnAns.querySelector('.line2');
  
  // Add click event listener to question
  question.addEventListener('click', function() {
    if (showAnswer) {
      line1.style.transform = 'rotate(0deg)'; 
      line2.style.transform = 'rotate(90deg)'; 
      line1.opacity = '0';
      answer.style.display = 'none';
      showAnswer = false;
    } else {
      line1.style.transform = 'rotate(45deg)'; 
      line2.style.transform = 'rotate(-45deg)'; 
      answer.style.display = 'flex'; // Show
      showAnswer = true;
    }
  });
});



