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
  wrong3: "Q5Wrong13",
};
const questionList = [Q1, Q2, Q3, Q4, Q5];
let i = 0;
let finalScore;
let timeLeft;
let answerArray = [];
let question;
let timerInterval;
let scoresArray = [];

// This section defines querySelectors that will be used frequently..
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
  timerInterval = setInterval(function () {
    timeLeft--;
    console.log(timeLeft);
    inGameTimer.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0 || i == questionList.length) {
      clearInterval(timerInterval);
      timeLeft = Math.max(0, timeLeft);
      endGame();
    }
  }, 1000);
}

/**
 * when the correct answer is selected, the remaining questions should increment down and the next question should be displayed.
 */
function correctAnswerClicked() {
  console.log("correct answer");
}

/**
 * when a wrong answer is selected, five seconds should be removed from the remaining time, the remaining questions should increment down and the next question should be displayed.
 */
function wrongAnswerClicked() {
  console.log("wrong answer");
  timeLeft -= 10;
  timeLeft = Math.max(0, timeLeft);
}

/**
 * this function populates a new question.  It is called after either the game is started, or an answer is picked
 */
function nextQuestion() {
  answerArray = []; //reinitialize variable.
  if (i == questionList.length) {
    timeLeft = Math.max(0, timeLeft);
    clearInterval(timerInterval);
    endGame();
    return;
  } else {
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
    console.log(answerArray);
    console.log(question);
    questionText.textContent = question.question;
    ans1Btn.textContent = answerArray[0];
    ans2Btn.textContent = answerArray[1];
    ans3Btn.textContent = answerArray[2];
    ans4Btn.textContent = answerArray[3];
  }
}

function endGame() {
  finalScore = timeLeft; // might need to put some error handling in here, if timeLeft is negative (wrong answer clicked with less than 10 seconds left)
  console.log(`finalScore: ${finalScore}`);
  inGameView.classList.remove("visible");
  inGameView.classList.add("hidden");
  postGameView.classList.remove("hidden");
  postGameView.classList.add("visible");
  console.log("game ended");
  document.querySelector("#initials").value = "";
}

function displayHighscores() {
  let scoreString = "<ol>";
  let highScoreList = document.createElement("div");
  highScoreList.setAttribute("id", "createdHighScoreList");
  scoresArray.forEach(function (scoreLi) {
    let initials = scoreLi.initials;
    let score = scoreLi.score;
    console.log(initials);
    console.log(score);
    scoreString += `<li> ${score} --- ${initials} </li>`;
  });
  scoreString += "</ol>";

  console.log(scoreString);
  document.querySelector("#highscoreView").appendChild(highScoreList);
  highScoreList.innerHTML = scoreString;

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
  console.log(newScoreInitials);

  let newScore = {
    initials: newScoreInitials,
    score: finalScore,
  };
  if (scoresArray.length === 0) {
    scoresArray.push(newScore);
  } else {
    for (let i = 0; i < scoresArray.length; i++) {
      if (finalScore >= scoresArray[i].score) {
        console.log(i);
        scoresArray.splice(i, 0, newScore);
        break;
      }
    }
  }
  console.log(newScore);
  console.log(scoresArray);

  // change to high score screen
  displayHighscores();
});

// go back button returns the user to the startGameScreen.  it also reinitializes the timer and the for loop iterator.
goBackBtn.addEventListener("click", function () {
  timeLeft = 20;
  inGameTimer.textContent = `Time: ${timeLeft}`;
  highscoreView.classList.remove("visible");
  highscoreView.classList.add("hidden");
  startGameView.classList.remove("hidden");
  startGameView.classList.add("visible");
  i = 0;
  document.querySelector("#createdHighScoreList").remove();
});

// cleawr scores button wipes the scores out of the highscore list
clearScoresBtn.addEventListener("click", function () {
  scoresArray = [];
  console.log(scoresArray);
});
