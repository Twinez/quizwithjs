// quiz
let questions = [
  {
    question: "Apakah ini simbol dari HTML5?",
    imgSrc: "/assets/img/html.png",
    choiceA: "Benar",
    choiceB: "Salah",
    choiceC: "Salah",
    correct: "A",
  },
  {
    question: "Apakah ini simbol dari CSS3?",
    imgSrc: "/assets/img/css.png",
    choiceA: "Salah",
    choiceB: "Benar",
    choiceC: "Salah",
    correct: "B",
  },
  {
    question: "Apakah ini simbol dari JavaScript?",
    imgSrc: "/assets/img/js.png",
    choiceA: "Salah",
    choiceB: "Salah",
    choiceC: "Benar",
    correct: "C",
  },
];

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}
