# StackOne - Ultimate Developer Workspace

StackOne is a unified developer workspace and team dashboard that aggregates core engineering utilities into a single integrated tab. By combining project tracking, code analytics, expense ledgering, portfolios, and quizzes, it serves as a central hub for individual developer workflows.

## JS Quiz Engine

A timed, interactive JavaScript quiz built with vanilla HTML, CSS, and JS. Test your knowledge of JavaScript fundamentals with 10 carefully curated questions.

### Features

- **10 Multiple-Choice Questions** — Covers topics like type coercion, scope, arrays, promises, and more.
- **30-Second Timer** — Each question has a countdown timer. If time runs out, the answer is marked incorrect.
- **Instant Feedback** — Correct and incorrect answers are highlighted with visual icons and color coding.
- **Explanations** — After answering, a detailed explanation is shown for every question.
- **Progress Bar** — A visual progress bar tracks your position through the quiz.
- **Score Summary** — At the end, a summary card shows your percentage score with a personalized verdict.
- **Play Again** — Restart the quiz anytime to improve your score.

## Team Portfolios

A directory of engineering team profiles showcasing their roles, specific skill tags, and social profiles.

### Features

- **Dynamic Avatars** — Programmatically extracts letters from team member names to create initial-based profile avatars.
- **Color Coding** — Alternating profile color themes for each member card.
- **Contact Forms** — Built-in message board form with input validation (checks empty names, valid email formats, and minimum message length rules) to ensure messages are delivered successfully.

### Tech Stack

- **HTML5** — Semantic markup for quiz structure
- **CSS3** — Dark theme with custom styling, animations, and responsive layout
- **JavaScript** — Vanilla JS for quiz logic, DOM manipulation, and timer management

### File Structure

```
├── index.html       # Main entry point linking external CSS and JS
├── style.css        # All quiz styles (dark theme, cards, buttons, animations)
├── script.js        # Quiz data, rendering, timer, and result logic
├── project.html     # Standalone quiz page with inline styles
├── quiz.js          # Modular quiz engine (ES module export)
└── README.md        # Project documentation
```

### How to Run

1. Clone the repository
2. Open `index.html` in any modern browser
3. Start answering questions before the timer runs out!
