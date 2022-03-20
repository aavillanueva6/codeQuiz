console.log('code quiz');

// This section defines global variables for the application.

const Q1 = {
  question: 'What is JavaScript?',
  correct: 'A client-side and server-side scripting language',
  wrong1: 'A new version of Java',
  wrong2: 'A font that is popular on websites',
  wrong3: 'None of the other answers are correct',
};
const Q2 = {
  question: 'Which of the following is not a JavaScript Data type?',
  correct: 'Integer',
  wrong1: 'Number',
  wrong2: 'String',
  wrong3: 'Object',
};
const Q3 = {
  question:
    'Which of the following is an acceptable way to insert a comment in JavaScript?',
  correct: '// comment goes here',
  wrong1: '# comment goes here',
  wrong2: '<!-- comment goes here -->',
  wrong3: '% comment goes here',
};
const Q4 = {
  question: 'How is data stored / organized in a JavaScript Object?',
  correct: 'In key-value pairs',
  wrong1: 'There is no set structure',
  wrong2: 'In name / parameter values',
  wrong3: 'As an array',
};
const Q5 = {
  question:
    'Which of the following array methods removes the last item in the array',
  correct: 'array.pop()',
  wrong1: 'array.shift()',
  wrong2: 'array.push()',
  wrong3: 'array.lastIndexOf',
};
const questionList = [Q1, Q2, Q3, Q4, Q5];
let i;
let finalScore;
let timeLeft;
let answerArray = [];
let question;
let timerInterval;
// reinitializes scoresArray on page load.  If scores exist in local storage, it pulls them in to the scoresArray, if scores don't exist in local storage, it sets to empty array.
if (JSON.parse(localStorage.getItem('scores')) == null) {
  var scoresArray = [];
} else {
  var scoresArray = JSON.parse(localStorage.getItem('scores'));
}

// This section defines querySelectors that will be used to manipulate the DOM.
const body = document.body;
const startGameView = body.querySelector('#startGameView');
const inGameView = body.querySelector('#inGameView');
const postGameView = body.querySelector('#postGameView');
const highscoreView = body.querySelector('#highscoreView');
const questionText = body.querySelector('#questionText');

// variables used for button click listeners
const startBtn = document.querySelector('#startGameBtn');
const ans1Btn = document.querySelector('#ans1Btn');
const ans2Btn = document.querySelector('#ans2Btn');
const ans3Btn = document.querySelector('#ans3Btn');
const ans4Btn = document.querySelector('#ans4Btn');
const submitBtn = document.querySelector('#submitBtn');
const goBackBtn = document.querySelector('#goBackBtn');
const clearScoresBtn = document.querySelector('#clearScoresBtn');

// This section defines functions that will be used to execute the quiz.

/**
 * this function reinitializes the game timer to 50 seconds
 */
function initTimer() {
  timeLeft = 50;
}

/**
 * this function calls the initTimer function, displays the time on the preGame screen, and initializes the question iterator
 */
function initGame() {
  initTimer();
  preGameTimer.textContent = `Time: ${timeLeft}`; // displays the initial time for the game
  i = 0;
}

/**
 * startQuizTimer starts a countdown that is used to end the quiz if the user takes too long, and to log a score after the quiz is completed.
 */
function startQuizTimer() {
  initTimer();
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
 * when the correct answer is selected, the screen flashes green.  The resetFlash function is then called after a 250ms delay to reset the flash animation.
 */
function correctAnswerClicked() {
  body.classList.add('correctAns');
  setTimeout(resetFlash, 250);
}

/**
 * when a wrong answer is selected, ten seconds are removed from the remaining time, and the screen flashes red.  The resetFlash function is then called after a 250ms delay to reset the flash animation.
 */
function wrongAnswerClicked() {
  timeLeft -= 10;
  timeLeft = Math.max(0, timeLeft);
  body.classList.add('wrongAns');
  setTimeout(resetFlash, 250);
}

/**
 * this function removes the animation classes from the body, so that the animation can fire a second time.
 */
function resetFlash() {
  body.classList.remove('correctAns');
  body.classList.remove('wrongAns');
}

/**
 * this function populates a new question.  It is called after either the game is started, or an answer is picked
 */
function nextQuestion() {
  answerArray = []; //reinitialize variable.
  // This if statement is used to end the game if either the timer has reached 0, or all of the questions have been asked and answered.
  // if the timeLeft is negative (due to time penalty for a wrong answer), the timeLeft is set to 0, as the minimum score possible.
  if (i == questionList.length || timeLeft <= 0) {
    timeLeft = Math.max(0, timeLeft);
    clearInterval(timerInterval);
    endGame();
    return;
  }

  question = questionList[i]; // selects the next question from the questionList array

  // this section stores the questions answers in an array, then loops through each of those to generate a random order to display them.  If the randOrder numer is 0, the answer is added to the beginning of the answerArray, if it is 1, the answer is added to the end of the answerArray.
  let questionAnswers = [
    question.correct,
    question.wrong1,
    question.wrong2,
    question.wrong3,
  ];
  for (j = 0; j < questionAnswers.length; j++) {
    let randOrder = Math.floor(Math.random() * 2);
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

/**
 * This funciton ends the game.  It sets the score to equal the timeLeft and displays the score on the postGame screen
 */
function endGame() {
  finalScore = timeLeft;
  document.querySelector('#finalScoreDisplay').textContent = finalScore;

  // this handles if the user was at the highscore view when the timer runs out
  if (highscoreView.dataset.visible === 'true') {
    document.querySelector('#createdHighScoreList').remove(); // removes the score list from the DOM when the highscore screen is left.  This is required to prevent multiple score lists from being displayed.
    highscoreView.classList.remove('visible');
    highscoreView.classList.add('hidden');
    highscoreView.dataset.visible = 'false';
  }

  // classList.remove and .add are used to change which screen is visible.
  inGameView.classList.remove('visible');
  inGameView.classList.add('hidden');
  postGameView.classList.remove('hidden');
  postGameView.classList.add('visible');
  document.querySelector('#initials').value = '';
}

/**
 * this function pulls the highscores out of local storage and builds an ol with the scores listed as li's.  The ol is then appended into the highscore div and the page is displayed
 */
function displayHighscores() {
  let highScoreArray = JSON.parse(localStorage.getItem('scores'));
  let highScoreList = document.createElement('div');
  highScoreList.setAttribute('id', 'createdHighScoreList');

  // this block creates the scoreString.  This is a set of html elements and values that will create the ol to display the high score.
  if (highScoreArray !== null) {
    let scoreString = '<ol>';
    highScoreArray.forEach(function (scoreLi) {
      let position = highScoreArray.indexOf(scoreLi) + 1;
      let initials = scoreLi.initials;
      let score = scoreLi.score;
      scoreString += `<li>${position}.   ${score}  -  ${initials} </li>`;
    });
    scoreString += '</ol>';
    document.querySelector('#highscoreContainer').appendChild(highScoreList);
    highScoreList.innerHTML = scoreString;
  }
  document.querySelector('#highscoreContainer').appendChild(highScoreList);

  // classList.remove and .add are used to change which screen is visible.
  startGameView.classList.remove('visible');
  startGameView.classList.add('hidden');
  inGameView.classList.remove('visible');
  inGameView.classList.add('hidden');
  postGameView.classList.remove('visible');
  postGameView.classList.add('hidden');
  highscoreView.classList.remove('hidden');
  highscoreView.classList.add('visible');
}

// event listeners

// start button begins the game.  It starts the game timer, hides the startGameScreen, and enables the inGameScreen
startBtn.addEventListener('click', function () {
  startQuizTimer();
  // classList.remove and .add are used to change which screen is visible.
  startGameView.classList.remove('visible');
  startGameView.classList.add('hidden');
  inGameView.classList.remove('hidden');
  inGameView.classList.add('visible');
  nextQuestion();
});

// answer buttons submit the users response to be checked for correct / incorrect, and run the appropriate function based on that result
ans1Btn.addEventListener('click', function () {
  i++;
  if (answerArray[0] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

ans2Btn.addEventListener('click', function () {
  i++;
  if (answerArray[1] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

ans3Btn.addEventListener('click', function () {
  i++;
  if (answerArray[2] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

ans4Btn.addEventListener('click', function () {
  i++;
  if (answerArray[3] !== question.correct) {
    wrongAnswerClicked();
  } else {
    correctAnswerClicked();
  }
  nextQuestion();
});

// submit button submits the users initials and score to the high score list.  It hides the postGameScreen, and enables the highscoreScreen
submitBtn.addEventListener('click', function (event) {
  // update high score list
  event.preventDefault(); // this prevents the form default action.

  // this block stores the user input from the initials box as newScoreInitials.  It verifies that the input length is between 1 and 3 (inclusive) characters and sets the input to uppercase.
  let newScoreInitials = document.querySelector('#initials').value;
  if (newScoreInitials.length < 1 || newScoreInitials.length > 3) {
    document.querySelector('#errorMsg').setAttribute('class', 'visible');
    return;
  }
  document.querySelector('#errorMsg').setAttribute('class', 'hidden');
  newScoreInitials = newScoreInitials.toUpperCase();

  // this creates a newScore object with key/value pairs for initials and score
  let newScore = {
    initials: newScoreInitials,
    score: finalScore,
  };

  // this section adds the newScore into the score array, it has functionality built into it to add the new score at the appropriate place in the list to order from highest to lowest score.  If the list exceeds ten items, it removes the last score, to only display the top ten scores.
  // this adds newScore to the scoresArray if it is the first time a score is logged
  if (scoresArray.length === 0) {
    scoresArray.push(newScore);
  } else {
    // this else identifies where the newest score needs to be added to the array to have the scores in descending order.  Splices newScore into scoresArray at appropriate index
    for (let i = 0; i < scoresArray.length; i++) {
      if (finalScore > scoresArray[i].score) {
        scoresArray.splice(i, 0, newScore);
        break; // exits the for loop once the newScore is added to the scoresArray.
      }
    }
    // the purpose of this section is to add the score to the array if the value is less than the worst score currently in the array.
    let lowScore = scoresArray[scoresArray.length - 1].score;
    if (finalScore <= lowScore) {
      scoresArray.push(newScore);
    }
  }
  // this if statement is used to limit the high scores to only the top ten
  if (scoresArray.length > 10) {
    scoresArray.pop();
  }

  localStorage.setItem('scores', JSON.stringify(scoresArray));
  startGameView.setAttribute('data-previous', 'true'); // while the actual previous screen at this point is postGame, it is set to startGame at this point so that the goBack button will function correctly.
  inGameView.setAttribute('data-previous', 'false');
  postGameView.setAttribute('data-previous', 'false');
  displayHighscores(); // change to high score screen
});

// go back button returns the user from the highscoreScreen to the previous screen.  It also reinitializes the game (if going back to the startGame view).
goBackBtn.addEventListener('click', function () {
  document.querySelector('#createdHighScoreList').remove(); // removes the score list from the DOM when the highscore screen is left.  This is required to prevent multiple score lists from being displayed.
  highscoreView.dataset.visible = 'false';
  if (startGameView.dataset.previous === 'true') {
    initGame();
    // classList.remove and .add are used to change which screen is visible.
    highscoreView.classList.remove('visible');
    highscoreView.classList.add('hidden');
    startGameView.classList.remove('hidden');
    startGameView.classList.add('visible');
  } else if (inGameView.dataset.previous === 'true') {
    highscoreView.classList.remove('visible');
    highscoreView.classList.add('hidden');
    inGameView.classList.remove('hidden');
    inGameView.classList.add('visible');
  } else if (postGameView.dataset.previous === 'true') {
    highscoreView.classList.remove('visible');
    highscoreView.classList.add('hidden');
    postGameView.classList.remove('hidden');
    postGameView.classList.add('visible');
  } else {
    console.log('error at data-previous read  / write');
  }
});

// clear scores button wipes the scores out of the highscore list
clearScoresBtn.addEventListener('click', function () {
  scoresArray = [];
  localStorage.setItem('scores', null);
  document.querySelector('#createdHighScoreList').classList.add('hidden');
});

// These next three listeners are looking for a click on the highscore list links at the top of each page.  If they are clicked the highscore list is shown and a state attribute is used to track which screen the user was previously at, in order to navigate back to it later.
body
  .querySelector('#preGameHighScoreLink')
  .addEventListener('click', function () {
    startGameView.setAttribute('data-previous', 'true');
    inGameView.setAttribute('data-previous', 'false');
    postGameView.setAttribute('data-previous', 'false');
    highscoreView.setAttribute('data-visible', 'true');
    displayHighscores();
  });

body
  .querySelector('#inGameHighScoreLink')
  .addEventListener('click', function () {
    startGameView.setAttribute('data-previous', 'false');
    inGameView.setAttribute('data-previous', 'true');
    postGameView.setAttribute('data-previous', 'false');
    highscoreView.setAttribute('data-visible', 'true');
    displayHighscores();
  });

body
  .querySelector('#postGameHighScoreLink')
  .addEventListener('click', function () {
    startGameView.setAttribute('data-previous', 'false');
    inGameView.setAttribute('data-previous', 'false');
    postGameView.setAttribute('data-previous', 'true');
    highscoreView.setAttribute('data-visible', 'true');
    displayHighscores();
  });

initGame();
