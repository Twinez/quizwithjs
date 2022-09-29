// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const choiceA = document.getElementById("choice-a");
const choiceB = document.getElementById("choice-b");
const choiceC = document.getElementById("choice-c");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("time-gauge");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("score-container");

// Questions data
const questions = [
  {
    question: "Siapakah dia?",
    imageUrl: "/assets/img/hitler.jpg",
    choiceA: "Adolf Hitler",
    choiceB: "Ir.Soekarno",
    choiceC: "Dr.Soetomo",
    answer: "A",
  },
  {
    question: "Apakah ini simbol dari CSS3?",
    imageUrl: "/assets/img/css.png",
    choiceA: "Salah",
    choiceB: "Benar",
    choiceC: "Mungkin",
    answer: "B",
  },
  {
    question: "Apakah ini simbol dari JavaScript?",
    imageUrl: "/assets/img/js.png",
    choiceA: "Mungkin",
    choiceB: "Salah",
    choiceC: "Benar",
    answer: "C",
  },
];

const lastQuestion = questions.length - 1;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;

// dynamic values
let TIMER;
let runningQuestion = 0;
let count = 0;
let score = 0;

// render a question
function renderQuestion() {
  let questionItem = questions[runningQuestion];

  question.innerHTML = `<p>${questionItem.question}</p>`;
  questionImage.innerHTML = `<img src="${questionItem.imageUrl}">`;
  choiceA.innerHTML = questionItem.choiceA;
  choiceB.innerHTML = questionItem.choiceB;
  choiceC.innerHTML = questionItem.choiceC;
}

// render progress
function renderProgress() {
  for (let questionIndex = 0; questionIndex <= lastQuestion; questionIndex++) {
    progress.innerHTML += `<div class='prog' id="${questionIndex}"></div>`;
  }
}

// render counter
function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    checkAnswerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      renderFinalScore();
    }
  }
}

// check answer
function checkAnswer(answer) {
  if (answer == questions[runningQuestion].answer) {
    // increment score if answer is correct
    score++;
    // change progress color to green
    checkAnswerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    checkAnswerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    renderFinalScore();
  }
}

// answer is correct
function checkAnswerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function checkAnswerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function renderFinalScore() {
  scoreContainer.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePercentage = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePercentage
  let img =
    scorePercentage >= 80
      ? "/assets/img/5.png"
      : scorePercentage >= 60
      ? "/assets/img/4.png"
      : scorePercentage >= 40
      ? "/assets/img/3.png"
      : scorePercentage >= 20
      ? "/assets/img/2.png"
      : "/assets/img/1.png";

  scoreContainer.innerHTML = `<img src="${img}">`;
  scoreContainer.innerHTML += `<p>${scorePercentage}%</p>`;
}

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

start.addEventListener("click", startQuiz);
