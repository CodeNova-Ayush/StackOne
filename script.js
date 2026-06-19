// Quiz Questions Data
var questions = [
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
        options: ["[]", "undefined", "NaN", "'' (empty string)"],
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

// Quiz State Variables
var index = 0;
var score = 0;
var answered = false;
var selected = null;
var answerLog = [];
var timer = null;
var container = document.getElementById("quiz-container");

// Render a single question card inside the workspace
function showQuestion() {
    if (index >= questions.length) {
        showResult();
        return;
    }

    var data = questions[index];
    var progress = (index / questions.length) * 100;
    var isLast = index === questions.length - 1;

    var optionsHTML = "";
    for (var i = 0; i < data.options.length; i++) {
        optionsHTML += '<button class="quiz-option" data-index="' + i + '">';
        optionsHTML += '<span>' + data.options[i] + '</span>';
        optionsHTML += '<span class="quiz-option-status-icon"></span>';
        optionsHTML += '</button>';
    }

    var workspace = document.getElementById("quiz-workspace");
    workspace.innerHTML =
        '<div class="quiz-header">' +
            '<span>Question <strong>' + (index + 1) + '</strong> of ' + questions.length + '</span>' +
            '<div id="quiz-timer-display" class="quiz-timer">⏱️ 30s</div>' +
        '</div>' +
        '<div class="quiz-progress-bar-container" style="margin-bottom:24px">' +
            '<div class="quiz-progress-bar" style="width:' + progress + '%"></div>' +
        '</div>' +
        '<div class="quiz-question-card">' +
            '<h3 class="question-text">' + data.question + '</h3>' +
            '<div class="quiz-options-list" id="quiz-options">' + optionsHTML + '</div>' +
        '</div>' +
        '<div class="quiz-actions">' +
            '<button id="quiz-next-btn" class="btn btn-primary" style="display:none">' +
                (isLast ? "Finish Quiz" : "Next Question →") +
            '</button>' +
        '</div>';

    answered = false;
    selected = null;

    var buttons = document.querySelectorAll(".quiz-option");
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener("click", handleOptionClick);
    }

    document.getElementById("quiz-next-btn").addEventListener("click", function () {
        index++;
        showQuestion();
    });

    startTimer(30);
}

// Handle when user clicks an answer option
function handleOptionClick(event) {
    if (answered) return;
    var btn = event.currentTarget;
    var selectedIndex = parseInt(btn.getAttribute("data-index"), 10);
    checkAnswer(selectedIndex);
}

// Validate selected answer and show correct/incorrect feedback
function checkAnswer(selectedIndex) {
    stopTimer();
    answered = true;
    selected = selectedIndex;

    var data = questions[index];
    var isCorrect = selectedIndex === data.answer;

    if (isCorrect) score++;

    answerLog.push({
        question: data.question,
        selected: selectedIndex,
        correct: data.answer,
        isCorrect: isCorrect
    });

    var buttons = document.querySelectorAll(".quiz-option");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        var idx = parseInt(buttons[i].getAttribute("data-index"), 10);
        var icon = buttons[i].querySelector(".quiz-option-status-icon");
        if (idx === data.answer) {
            buttons[i].classList.add("correct");
            icon.innerText = "✓";
        } else if (idx === selectedIndex) {
            buttons[i].classList.add("incorrect");
            icon.innerText = "✗";
        }
    }

    var statusLabel = isCorrect
        ? "Correct Answer!"
        : selectedIndex === -1
            ? "Time's up! Incorrect"
            : "Incorrect Answer";

    var explanationBox = document.createElement("div");
    explanationBox.className = "explanation-box";

    var statusEl = document.createElement("p");
    statusEl.className = isCorrect ? "explanation-status correct" : "explanation-status incorrect";
    statusEl.innerText = statusLabel;

    var bodyEl = document.createElement("p");
    bodyEl.className = "explanation-text";
    bodyEl.innerText = data.explanation;

    explanationBox.appendChild(statusEl);
    explanationBox.appendChild(bodyEl);
    document.querySelector(".quiz-question-card").appendChild(explanationBox);

    var nextBtn = document.getElementById("quiz-next-btn");
    nextBtn.style.display = "block";
    nextBtn.focus();
}
