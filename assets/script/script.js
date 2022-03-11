console.log("code quiz");

// This section defines global variables for the application.
let questionsLeft;

// This section builds the html elements that the quiz will use.
let body = document.body;
let timerEl = document.createElement("h2");
let startBtn = document.createElement("button");
let ansBtn1 = document.createElement("button");
let ansBtn2 = document.createElement("button");
let ansBtn3 = document.createElement("button");
let ansBtn4 = document.createElement("button");
startBtn.id = "startBtnID";
startBtn.textContent = "Start Quiz";
ansBtn1.id = "correctAnsBtnID";
ansBtn2.id = "wrongAns1BtnID";
ansBtn3.id = "wrongAns2BtnID";
ansBtn4.id = "wrongAns3BtnID";
ansBtn1.textContent = "correct";
ansBtn2.textContent = "wrong";
ansBtn3.textContent = "wrong";
ansBtn4.textContent = "wrong";

// This section builds the initial page of the site
body.appendChild(startBtn);
body.appendChild(timerEl);

// variables for button click listeners
const startBtnClick = document.querySelector("#startBtnID");
const correctBtnClick = document.querySelector("#correctAnsBtnID");
const wrong1BtnClick = document.querySelector("#wrongAns1BtnID");
const wrong2BtnClick = document.querySelector("#wrongAns2BtnID");
const wrong3BtnClick = document.querySelector("#wrongAns3BtnID");

//

// This section defines functions that will be used to execute the quiz.
/**
 * startQuizTimer starts a countdown that is used to end the quiz if the user takes too long, and to log a score after the quiz is completed.
 */
function startQuizTimer() {
  let timeLeft = 16; // time in seconds left for the quiz change to 75 when ready to deploy
  let timerInterval = setInterval(function () {
    timeLeft--;
    console.log(timeLeft);
    timerEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      console.log("time is 0");
    }
  }, 1000);
}

/**
 * when the correct answer is selected, the remaining questions should increment down and the next question should be displayed.
 */
function correctAnswerClicked() {
  console.log(`questionsLeft ${questionsLeft}`);
  console.log("correct answer");
  questionsLeft--;
  console.log(`questionsLeft ${questionsLeft}`);
}

/**
 * when a wrong answer is selected, five seconds should be removed from the remaining time, the remaining questions should increment down and the next question should be displayed.
 */
function wrongAnswerClicked() {
  console.log(`questionsLeft ${questionsLeft}`);
  console.log("wrong answer");
  questionsLeft--;
  timeLeft -= 5;
  console.log(`questionsLeft ${questionsLeft}`);
}

startBtnClick.addEventListener("click", function () {
  console.log("button clicked");
  questionsLeft = 2;
  startQuizTimer();
  console.log("after timer call");
  body.appendChild(ansBtn1);
  body.appendChild(ansBtn2);
  body.appendChild(ansBtn3);
  body.appendChild(ansBtn4);
  // clearFrontScreen();
  // runQuiz();
});

// these aren't working.  Maybe because it is reading this part of the script before the buttons are appended? Or maybe it is because lines 31 through 34 are before the buttons are appended?
wrong1BtnClick.addEventListener("click", function () {
  wrongAnswerClicked();
});

wrong2BtnClick.addEventListener("click", function () {
  wrongAnswerClicked();
});

wrong3BtnClick.addEventListener("click", function () {
  wrongAnswerClicked();
});

correctBtnClick.addEventListener("click", function () {
  correctAnswerClicked();
});
