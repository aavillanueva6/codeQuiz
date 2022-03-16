console.log("code quiz");

// This section defines global variables for the application.

const Q1 = {
  question: "This is the Question 1 text",
  correct: "Q1Correct",
  wrong1: "Q1Wrong1",
  wrong2: "Q1Wrong2",
  wrong3: "Q1Wrong3",
};
const Q2 = {
  question: "This is the Question 2 text",
  correct: "Q2Correct",
  wrong1: "Q2Wrong1",
  wrong2: "Q2Wrong2",
  wrong3: "Q2Wrong3",
};
const Q3 = {
  question: "This is the Question 3 text",
  correct: "Q3Correct",
  wrong1: "Q3Wrong1",
  wrong2: "Q3Wrong2",
  wrong3: "Q3Wrong3",
};
const Q4 = {
  question: "This is the Question 4 text",
  correct: "Q4Correct",
  wrong1: "Q4Wrong1",
  wrong2: "Q4Wrong2",
  wrong3: "Q4Wrong3",
};
const Q5 = {
  question: "This is the Question 5 text",
  correct: "Q5Correct",
  wrong1: "Q5Wrong1",
  wrong2: "Q5Wrong2",
  wrong3: "Q5Wrong3",
};
const questionList = [Q1, Q2, Q3, Q4, Q5];
let i = 0;
let finalScore;
let timeLeft;
let answerArray = [];
let question;
let timerInterval;
// reinitializes scoresArray on page load.  If scores exist in local storage, it pulls them in to the scoresArray, if scores don't exist in local storage, it sets to empty array.
if (JSON.parse(localStorage.getItem("scores")) == null) {
  var scoresArray = [];
} else {
  var scoresArray = JSON.parse(localStorage.getItem("scores"));
}

// This section defines querySelectors that will be used to manipulate the DOM.
const body = document.body;
const startGameView = body.querySelector("#startGameView");
const inGameView = body.querySelector("#inGameView");
const postGameView = body.querySelector("#postGameView");
const highscoreView = body.querySelector("#highscoreView");
const questionText = body.querySelector("#questionText");

// variables used for button click listeners
const startBtn = document.querySelector("#startGameBtn");
const ans1Btn = document.querySelector("#ans1Btn");
const ans2Btn = document.querySelector("#ans2Btn");
const ans3Btn = document.querySelector("#ans3Btn");
const ans4Btn = document.querySelector("#ans4Btn");
const submitBtn = document.querySelector("#submitBtn");
const goBackBtn = document.querySelector("#goBackBtn");
const clearScoresBtn = document.querySelector("#clearScoresBtn");

// This section defines functions that will be used to execute the quiz.
/**
 * startQuizTimer starts a countdown that is used to end the quiz if the user takes too long, and to log a score after the quiz is completed.
 */
function startQuizTimer() {
  timeLeft = 20; // time in seconds left for the quiz change to 75 when ready to deploy
  inGameTimer.textContent = `Time: ${timeLeft}`; // displays the initial time for the game
  timerInterval = setInterval(function () {
    timeLeft--;
    inGameTimer.textContent = `Time: ${timeLeft}`; // displays the remaining time for the game
    if (timeLeft <= 0 || i == questionList.length) {
      clearInterval(timerInterval);
      timeLeft = Math.max(0, timeLeft);
      endGame();
    }
  }, 1000); // executes once every second
}

/**
 * when the correct answer is selected, the remaining questions should increment down and the next question should be displayed.
 */
function correctAnswerClicked() {
  body.classList.add("correctAns");
  setTimeout(resetFlash, 250);
}

/**
 * when a wrong answer is selected, five seconds should be removed from the remaining time, the remaining questions should increment down and the next question should be displayed.
 */
function wrongAnswerClicked() {
  console.log("wrong answer");
  timeLeft -= 10;
  timeLeft = Math.max(0, timeLeft);
  body.classList.add("wrongAns");
  setTimeout(resetFlash, 250);
}

function resetFlash() {
  body.classList.remove("correctAns");
  body.classList.remove("wrongAns");
}

/**
 * this function populates a new question.  It is called after either the game is started, or an answer is picked
 */
function nextQuestion() {
  answerArray = []; //reinitialize variable.
  if (i == questionList.length || timeLeft <= 0) {
    timeLeft = Math.max(0, timeLeft);
    clearInterval(timerInterval);
    endGame();
    return;
  }
  question = questionList[i];
  let questionAnswers = [
    question.correct,
    question.wrong1,
    question.wrong2,
    question.wrong3,
  ];
  for (j = 0; j < questionAnswers.length; j++) {
    let randOrder = Math.floor(Math.random() * 2);
    console.log(`randOrder: ${randOrder}`);
    if (randOrder == 0) {
      answerArray.unshift(questionAnswers[j]);
    } else {
      answerArray.push(questionAnswers[j]);
    }
  }
  questionText.textContent = question.question;
  ans1Btn.textContent = answerArray[0];
  ans2Btn.textContent = answerArray[1];
  ans3Btn.textContent = answerArray[2];
  ans4Btn.textContent = answerArray[3];
}

function endGame() {
  finalScore = timeLeft; // might need to put some error handling in here, if timeLeft is negative (wrong answer clicked with less than 10 seconds left)
  document.querySelector("#finalScoreDisplay").textContent = finalScore;

  // this handles if the user was at the highscore view when the timer runs out
  // need to add a data-attr for if highscore list is visible. and only execute next few lines if that is true.
  if (highscoreView.dataset.visible === "true") {
    document.querySelector("#createdHighScoreList").remove(); // removes the score list from the DOM when the highscore screen is left.  This is required to prevent multiple score lists from being displayed.
    highscoreView.classList.remove("visible");
    highscoreView.classList.add("hidden");
    highscoreView.dataset.visible = "false";
  }

  // classList.remove and .add are used to change which screen is visible.
  inGameView.classList.remove("visible");
  inGameView.classList.add("hidden");
  postGameView.classList.remove("hidden");
  postGameView.classList.add("visible");
  document.querySelector("#initials").value = "";
}

function displayHighscores() {
  let highScoreArray = JSON.parse(localStorage.getItem("scores"));
  let highScoreList = document.createElement("div");
  highScoreList.setAttribute("id", "createdHighScoreList");

  // this block creates the scoreString.  This is a set of html elements and values that will create the ol to display the high score.
  if (highScoreArray !== null) {
    let scoreString = "<ol>";
    highScoreArray.forEach(function (scoreLi) {
      let initials = scoreLi.initials;
      let score = scoreLi.score;
      scoreString += `<li> ${score} --- ${initials} </li>`;
    });
    scoreString += "</ol>";
    document.querySelector("#highscoreContainer").appendChild(highScoreList);
    highScoreList.innerHTML = scoreString;
  }
  document.querySelector("#highscoreContainer").appendChild(highScoreList);

  // classList.remove and .add are used to change which screen is visible.
  startGameView.classList.remove("visible");
  startGameView.classList.add("hidden");
  inGameView.classList.remove("visible");
  inGameView.classList.add("hidden");
  postGameView.classList.remove("visible");
  postGameView.classList.add("hidden");
  highscoreView.classList.remove("hidden");
  highscoreView.classList.add("visible");
}

// button listeners
// start button begins the game.  It starts the game timer, hides the startGameScreen, and enables the inGameScreen
startBtn.addEventListener("click", function () {
  console.log("start button clicked");
  startQuizTimer();
  console.log("after timer call");
  // classList.remove and .add are used to change which screen is visible.
  startGameView.classList.remove("visible");
  startGameView.classList.add("hidden");
  inGameView.classList.remove("hidden");
  inGameView.classList.add("visible");
  nextQuestion();

  // clearFrontScreen();
  // runQuiz();
});

// answer buttons submit the users response to be checked for correct / incorrect, and run the appropriate function based on that result
ans1Btn.addEventListener("click", function () {
  i++;
  console.log("answer 1 picked");
  if (answerArray[0] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

ans2Btn.addEventListener("click", function () {
  i++;
  console.log("answer 2 picked");
  if (answerArray[1] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

ans3Btn.addEventListener("click", function () {
  i++;
  console.log("answer 3 picked");
  if (answerArray[2] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

ans4Btn.addEventListener("click", function () {
  i++;
  console.log("answer 4 picked");
  if (answerArray[3] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

// submit button submits the users initials to the high score list.  It hides the postGameScreen, and enables the highscoreScreen
submitBtn.addEventListener("click", function (event) {
  // update high score list
  event.preventDefault(); // this prevents the form default action.
  let newScoreInitials = document.querySelector("#initials").value;
  if (newScoreInitials.length < 1 || newScoreInitials.length > 3) {
    document.querySelector("#errorMsg").setAttribute("class", "visible");
    return;
  }
  document.querySelector("#errorMsg").setAttribute("class", "hidden");

  newScoreInitials = newScoreInitials.toUpperCase();
  console.log(newScoreInitials);

  let newScore = {
    initials: newScoreInitials,
    score: finalScore,
  }; // object storing initials and final score on each attempt

  // this adds newScore to the scoresArray if it is the first time a score is logged
  console.log(scoresArray);
  if (scoresArray.length === 0) {
    scoresArray.push(newScore);
  } else {
    // this else identifies where the newest score needs to be added to the array to have the scores in descending order.  Splices newScore into scoresArray at appropriate index
    for (let i = 0; i < scoresArray.length; i++) {
      if (finalScore > scoresArray[i].score) {
        console.log(i);
        scoresArray.splice(i, 0, newScore);
        break; // exits the for loop once the newScore is added to the scoresArray.
      }
    }
    // there has to be a cleaner way to do this
    // the purpose of this section is to add the score to the array if the value is less than the worst score currently in the array.
    let testNumber = scoresArray[scoresArray.length - 1].score;
    if (finalScore <= testNumber) {
      scoresArray.push(newScore);
    }
  }
  // this if statement is used to limit the high scores to only the top ten
  if (scoresArray.length > 10) {
    scoresArray.pop();
  }

  console.log(newScore);
  console.log(scoresArray);
  localStorage.setItem("scores", JSON.stringify(scoresArray));
  startGameView.setAttribute("data-previous", "true");
  inGameView.setAttribute("data-previous", "false");
  postGameView.setAttribute("data-previous", "false");
  // change to high score screen
  displayHighscores();
});

// go back button returns the user from the highscoreScreen to the startGameScreen.  it also reinitializes the timer and the for iterator.
goBackBtn.addEventListener("click", function () {
  document.querySelector("#createdHighScoreList").remove(); // removes the score list from the DOM when the highscore screen is left.  This is required to prevent multiple score lists from being displayed.
  highscoreView.dataset.visible = "false";
  if (startGameView.dataset.previous === "true") {
    timeLeft = 20;
    inGameTimer.textContent = `Time: ${timeLeft}`;
    // classList.remove and .add are used to change which screen is visible.
    highscoreView.classList.remove("visible");
    highscoreView.classList.add("hidden");
    startGameView.classList.remove("hidden");
    startGameView.classList.add("visible");
    i = 0;
  } else if (inGameView.dataset.previous === "true") {
    highscoreView.classList.remove("visible");
    highscoreView.classList.add("hidden");
    inGameView.classList.remove("hidden");
    inGameView.classList.add("visible");
  } else if (postGameView.dataset.previous === "true") {
    highscoreView.classList.remove("visible");
    highscoreView.classList.add("hidden");
    postGameView.classList.remove("hidden");
    postGameView.classList.add("visible");
  } else {
    console.log("error at data-previous read  / write");
  }
});

// clear scores button wipes the scores out of the highscore list
clearScoresBtn.addEventListener("click", function () {
  scoresArray = [];
  localStorage.setItem("scores", null);
  document.querySelector("#createdHighScoreList").classList.add("hidden");
});

body
  .querySelector("#preGameHighScoreLink")
  .addEventListener("click", function () {
    startGameView.setAttribute("data-previous", "true");
    inGameView.setAttribute("data-previous", "false");
    postGameView.setAttribute("data-previous", "false");
    highscoreView.setAttribute("data-visible", "true");
    displayHighscores();
  });

body
  .querySelector("#inGameHighScoreLink")
  .addEventListener("click", function () {
    startGameView.setAttribute("data-previous", "false");
    inGameView.setAttribute("data-previous", "true");
    postGameView.setAttribute("data-previous", "false");
    highscoreView.setAttribute("data-visible", "true");
    displayHighscores();
  });

body
  .querySelector("#postGameHighScoreLink")
  .addEventListener("click", function () {
    startGameView.setAttribute("data-previous", "false");
    inGameView.setAttribute("data-previous", "false");
    postGameView.setAttribute("data-previous", "true");
    highscoreView.setAttribute("data-visible", "true");
    displayHighscores();
  });
