import { generateAnswer, calcQuiz } from "./utils.js";
const first_num = document.querySelector(".first-number");
const second_num = document.querySelector(".second-number");
const operation_ui = document.querySelector(".operation");
const answers_ui = document.querySelectorAll(".answer");
const quiz_round = document.querySelector(".quiz-round");
const operations = ["*", "-", "+"];
const quizzes = [];
const points = document.querySelector(".points");
const modalBg = document.querySelector(".modal-bg");
const result = document.querySelector(".result");
const newGame = document.querySelector(".newGame");
const quizeZone = document.querySelector(".quiz-zone");
const quizTimer = document.querySelector(".quizTimer");
const winner = document.querySelector(".winner");
const loser = document.querySelector(".loser");

// LOGIC FUNCTIONS
const generateAnswers = (corAnswer) => {
  const answers = [corAnswer];
  for (let i = 1; i < 4; i++) answers[i] = generateAnswer(corAnswer);
  const mixedAnswers = answers.sort(() => Math.random() - 0.5);
  return mixedAnswers;
};

function generateQuiz() {
  const firstNum = Math.ceil(Math.random() * 100); // 40
  const secondNum = Math.ceil(Math.random() * 100); // 33
  const ranOpIdx = Math.floor(Math.random() * operations.length);
  const operation = operations[ranOpIdx]; // +
  const correctAnswer = calcQuiz(firstNum, secondNum, operation);
  const answers = generateAnswers(correctAnswer);
  const selectedIdx = null;
  const quiz = {
    firstNum,
    secondNum,
    operation,
    correctAnswer,
    answers,
    selectedIdx,
  };
  quizzes.push(quiz);
  quiz_round.innerText = quizzes.length;
  return quiz;
}

function nextQuiz() {
  const newQuiz = generateQuiz();
  renderQuiz(newQuiz);
}

// EVENT HANDLER FUNCTIONS
function onSelectAnswer(event) {
  const currentQuiz = quizzes[quizzes.length - 1]; // currentQuiz
  currentQuiz.selectedIdx = event.target.id;
  jadval(
    currentQuiz.answers[currentQuiz.selectedIdx],
    currentQuiz.correctAnswer
  );
  nextQuiz();
}

// UI FUNCTIONS

function renderQuiz(quiz) {
  const { operation, firstNum, secondNum, answers, correctAnswer } = quiz;
  first_num.innerText = firstNum;
  second_num.innerText = secondNum;
  operation_ui.innerText = operation;

  answers_ui.forEach((answer_ui, idx) => {
    answer_ui.innerText = answers[idx];
    answer_ui.id = idx;
    answer_ui.addEventListener("click", onSelectAnswer);
  });
}

function init() {
  const firstQuiz = generateQuiz();
  renderQuiz(firstQuiz);
}

init();

let count = 0;
let Count = 5;
const data = setInterval(() => {
  Count--;

  if (Count == 0) {
    clearInterval(data);
  }
  quizTimer.innerText = `${Count}s`;
}, 1000);

// let myTimeOut = setTimeout(GameOver, 5000 + Count * 1000); ////////////////////////////

let togriJavobSoni = 0;
function jadval(current, correct) {
  if (current == correct) {
    let point = document.createElement("button");
    point.classList.add("point");
    point.classList.add("point--success");
    togriJavobSoni++;

    points.appendChild(point);
  } else {
    let point = document.createElement("button");
    point.classList.add("point");
    point.classList.add("point--fail");
    points.appendChild(point);
  }
  count++;
  if (count === 5) GameOver();
  // if (myTimeOut ||count == 15) {
  //   modalBg.style.display = "flex";
  //   result.addEventListener("click", () => {
  //     points.style.display = "grid";
  //     modalBg.classList.add("hidden");
  //     quizeZone.classList.add("hidden");
  //     quiz_round.classList.add("hidden");
  //   });
  //   newGame.addEventListener("click", () => {
  //     points.style.display = "none";
  //     modalBg.classList.remove("hidden");
  //     quizeZone.classList.remove("hidden");
  //     quiz_round.classList.remove("hidden");
  //     location.reload();
  //   });
  // alert(`Game Over!!!  ${togriJavobSoni * (100 / 25)} foiz togri`);
  // }
}

function GameOver() {
  modalBg.style.display = "flex";
  if (togriJavobSoni * (100 / 5) >= 75) {
    winner.classList.remove("hidden");
  } else {
    loser.classList.remove("hidden");
  }

  result.addEventListener("click", () => {
    points.style.display = "grid";
    modalBg.classList.add("hidden");
    quizeZone.classList.add("hidden");
    quiz_round.classList.add("hidden");
  });
  newGame.addEventListener("click", () => {
    points.style.display = "none";
    modalBg.classList.remove("hidden");
    quizeZone.classList.remove("hidden");
    quiz_round.classList.remove("hidden");
    location.reload();
  });
  // }
}
