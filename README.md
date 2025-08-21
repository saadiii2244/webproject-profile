# Dynamic Quiz App (HTML + CSS + JavaScript)

CS 311 – Web Programming (Summer 2025) — Assignment No.2

## Pages
- `index.html` — Landing & subject selection (+ username input)
- `quiz.html` — Quiz interface (timer, Next/Prev, validation, auto-advance on timeout)
- `result.html` — Final score, percentage, correct/incorrect review, save to leaderboard
- `leaderboard.html` — Top 5 scores (localStorage)

## Data
- `data.js` — 3 subjects × 10 MCQs each (stored as a JS object)

## Features Checklist
- [x] 15s countdown per question (auto-advance when time runs out)
- [x] Next/Previous navigation
- [x] Prevent final submit with unanswered questions
- [x] Result shows score, percentage, correct vs incorrect answers
- [x] Leaderboard saved in `localStorage` (top 5, descending)
- [x] Responsive CSS (desktop/tablet/mobile) + simple animations
- [x] Retake quiz / choose another subject

## Deploy (GitHub Pages)
1. Create a public repo and upload all files in `quiz-app/`.
2. In **Settings → Pages**, set the branch to `main` (or `master`) and the root to `/`.
3. Wait for the live URL to appear and share it.

