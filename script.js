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
