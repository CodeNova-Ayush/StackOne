const questions = [
  {
    question: "What is typeof null?",
    options: ["'null'", "'object'", "'undefined'", "'string'"],
    answer: 1,
    explanation: "In JavaScript, 'typeof null' returns 'object'. This is a historical bug in the language."
  },
  {
    question: "Which is NOT primitive?",
    options: ["Boolean", "String", "Symbol", "Float"],
    answer: 3,
    explanation: "JavaScript has primitives like Boolean, String, Symbol, Number, and BigInt. 'Float' is not a separate primitive."
  },
  {
    question: "What is 0.1 + 0.2 === 0.3?",
    options: ["true", "false", "NaN", "TypeError"],
    answer: 1,
    explanation: "Due to binary precision issues, 0.1 + 0.2 equals 0.30000000000000004, which is not strictly equal to 0.3."
  },
  {
    question: "Which declares block scope?",
    options: ["var", "let", "global", "unlet"],
    answer: 1,
    explanation: "Variables declared with 'let' and 'const' are block-scoped and hoisted, but remain in the Temporal Dead Zone."
  },
  {
    question: "What is [] + []?",
    options: ["[]", "undefined", "NaN", "''"],
    answer: 3,
    explanation: "When adding two arrays, JavaScript converts both to empty strings, resulting in an empty string concatenation."
  },
  {
    question: "Which method removes the last element?",
    options: ["shift()", "pop()", "slice()", "splice()"],
    answer: 1,
    explanation: "'pop()' removes and returns the last element. 'shift()' removes and returns the first element."
  },
  {
    question: "Which creates a shallow copy?",
    options: ["Object.assign()", "Spread operator", "Both of these", "None of these"],
    answer: 2,
    explanation: "Both the spread operator '{ ...user }' and 'Object.assign({}, user)' create a shallow copy of the object."
  },
  {
    question: "What is the difference between == and ===?",
    options: ["Reference vs Value", "Coercion vs Strict", "Speed", "Object only"],
    answer: 1,
    explanation: "== compares for equality after type coercion. === compares both value and type without coercion."
  },
  {
    question: "What does Promise.all() do?",
    options: ["All-or-nothing", "Resolves any", "Runs sequentially", "Fails only if all fail"],
    answer: 0,
    explanation: "Promise.all() resolves when all promises resolve, or rejects immediately if any promise rejects."
  },
  {
    question: "How to check property existence?",
    options: ["'prop' in obj", "hasOwnProperty()", "Both of these", "None of these"],
    answer: 2,
    explanation: "Both the 'in' operator and the 'hasOwnProperty()' method check for properties inside an object."
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;
let timerID = null;

export function init(container) {
  resetState();
  showQuestion(container);
}

function resetState() {
  currentIndex = 0;
  score = 0;
  answered = false;
  stopTimer();
}

function showQuestion(container) {
  if (currentIndex >= questions.length) {
    showResult(container);
    return;
  }

  const data = questions[currentIndex];
  const progressPercent = (currentIndex / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  let optionsHTML = "";
  for (let i = 0; i < data.options.length; i++) {
    optionsHTML += `
      <button class="quiz-option" data-index="${i}">
        <span>${data.options[i]}</span>
        <span class="quiz-option-status-icon"></span>
      </button>
    `;
  }

  const workspace = container.querySelector("#quiz-workspace");
  workspace.innerHTML = `
    <div class="quiz-header">
      <span>Question <strong>${currentIndex + 1}</strong> of ${questions.length}</span>
      <div id="quiz-timer-display" class="quiz-timer">⏱️ 30s</div>
    </div>
    <div class="quiz-progress-bar-container" style="margin-bottom: 24px;">
      <div class="quiz-progress-bar" style="width: ${progressPercent}%;"></div>
    </div>
    <div class="quiz-question-card">
      <h3 class="question-text">${data.question}</h3>
      <div class="quiz-options-list" id="quiz-options">${optionsHTML}</div>
    </div>
    <div class="quiz-actions">
      <button id="quiz-next-btn" class="btn btn-primary" style="display: none;">
        ${isLastQuestion ? "Finish Quiz" : "Next Question →"}
      </button>
    </div>
  `;

  container.querySelectorAll(".quiz-option").forEach(function (button) {
    button.addEventListener("click", function () {
      if (answered) return;
      checkAnswer(container, parseInt(button.getAttribute("data-index"), 10));
    });
  });

  container.querySelector("#quiz-next-btn").addEventListener("click", function () {
    currentIndex = currentIndex + 1;
    answered = false;
    showQuestion(container);
  });

  startTimer(container, 30);
}

function checkAnswer(container, selectedIndex) {
  stopTimer();
  answered = true;

  const data = questions[currentIndex];
  const isCorrect = selectedIndex === data.answer;

  if (isCorrect) score = score + 1;

  container.querySelectorAll(".quiz-option").forEach(function (button) {
    button.disabled = true;
    const i = parseInt(button.getAttribute("data-index"), 10);
    const icon = button.querySelector(".quiz-option-status-icon");
    if (i === data.answer) {
      button.classList.add("correct");
      icon.innerText = "✓";
    } else if (i === selectedIndex) {
      button.classList.add("incorrect");
      icon.innerText = "✗";
    }
  });

  let statusLabel = isCorrect ? "Correct Answer!" : selectedIndex === -1 ? "Time's up! Incorrect" : "Incorrect Answer";

  const box = document.createElement("div");
  box.className = "explanation-box";

  const status = document.createElement("p");
  status.className = isCorrect ? "explanation-status correct" : "explanation-status incorrect";
  status.innerText = statusLabel;

  const body = document.createElement("p");
  body.className = "explanation-text";
  body.innerText = data.explanation;

  box.appendChild(status);
  box.appendChild(body);
  container.querySelector(".quiz-question-card").appendChild(box);

  const nextBtn = container.querySelector("#quiz-next-btn");
  nextBtn.style.display = "block";
  nextBtn.focus();
}

function startTimer(container, secondsLeft) {
  if (!container.isConnected) return stopTimer();

  const display = container.querySelector("#quiz-timer-display");
  if (!display) return;

  display.innerText = "⏱️ " + secondsLeft + "s";
  secondsLeft <= 5 ? display.classList.add("danger") : display.classList.remove("danger");

  if (secondsLeft <= 0) {
    checkAnswer(container, -1);
    return;
  }

  timerID = setTimeout(function () {
    startTimer(container, secondsLeft - 1);
  }, 1000);
}

function stopTimer() {
  if (timerID !== null) {
    clearTimeout(timerID);
    timerID = null;
  }
}

function showResult(container) {
  stopTimer();

  const percentage = Math.round((score / questions.length) * 100);

  let verdict = "Keep learning! JavaScript has some tricky quirks. Try again to improve your score.";
  if (percentage >= 80) verdict = "Excellent job! You have a solid grasp of JavaScript.";
  else if (percentage >= 50) verdict = "Good effort! You know the basics, but review the explanations to master the language.";

  const workspace = container.querySelector("#quiz-workspace");
  workspace.innerHTML = `
    <div class="quiz-summary-card">
      <h2>Quiz Completed!</h2>
      <div class="quiz-summary-score-badge">${percentage}%</div>
      <h3>You scored ${score} / ${questions.length}</h3>
      <p class="quiz-summary-text">${verdict}</p>
      <button id="quiz-retry-btn" class="btn btn-primary" style="margin-top: 12px; padding: 12px 32px;">
        Play Again
      </button>
    </div>
  `;

  container.querySelector("#quiz-retry-btn").addEventListener("click", function () {
    resetState();
    showQuestion(container);
  });
}
