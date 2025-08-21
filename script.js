let currentQuestion = 0, score = 0, timerId, timeLeft = 15;
let subjectKey = null, questions = [], answers = [];

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  subjectKey = params.get("subject");

  if (document.getElementById("subject-title")) {
    // On quiz page
    startQuiz(subjectKey);
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    document.getElementById("prev-btn").addEventListener("click", prevQuestion);
  }

  if (document.querySelector(".review")) {
    // On result page
    renderResults();
  }

  if (document.getElementById("leaderboard")) {
    // On leaderboard page
    loadLeaderboard();
  }
});

function startQuiz(subKey) {
  if (!subKey || !quizData[subKey]) {
    window.location.href = "index.html";
    return;
  }
  questions = quizData[subKey];
  document.getElementById("subject-title").innerText = subKey.toUpperCase() + " Quiz";
  document.getElementById("progress").innerText = `Question ${currentQuestion+1} / ${questions.length}`;
  loadFromSession();
  renderQuestion();
  startTimer();
}

function loadFromSession(){
  // If user navigated away/back, restore progress
  const saved = sessionStorage.getItem("quizProgress");
  if (saved) {
    const obj = JSON.parse(saved);
    if (obj.subject === subjectKey) {
      currentQuestion = obj.currentQuestion || 0;
      answers = obj.answers || [];
      score = obj.score || 0;
    }
  }
}

function persistProgress(){
  sessionStorage.setItem("quizProgress", JSON.stringify({
    subject: subjectKey, currentQuestion, answers, score
  }));
}

function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-box").innerText = q.q;

  const box = document.getElementById("options-box");
  box.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(idx, btn);
    if (answers[currentQuestion] === idx) btn.classList.add("selected");
    box.appendChild(btn);
  });

  document.getElementById("progress").innerText = `Question ${currentQuestion+1} / ${questions.length}`;
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = 15;
  updateTimer();
  timerId = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      // Auto-advance if time runs out
      autoAdvance();
    }
  }, 1000);
}

function updateTimer(){
  const el = document.getElementById("timer");
  el.innerText = timeLeft;
  el.style.outline = timeLeft <= 5 ? "2px solid #ef4444" : "1px solid rgba(255,255,255,.08)";
}

function selectAnswer(i, btn) {
  answers[currentQuestion] = i;
  // Visually mark
  document.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  persistProgress();
}

function nextQuestion() {
  if (answers[currentQuestion] === undefined) {
    alert("Please select an answer before moving to the next question!");
    return;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    startTimer();
    persistProgress();
  } else {
    finishQuiz();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    startTimer();
    persistProgress();
  }
}

function autoAdvance(){
  // Move ahead without requiring an answer (timer rule), but do not allow final submit without answers
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    startTimer();
    persistProgress();
  } else {
    // At last question: if unanswered, force selection before finishing
    if (answers[currentQuestion] === undefined) {
      // Give a small grace period: keep showing question with timer 0 and require answer
      alert("Time's up! Please select an answer to finish.");
    } else {
      finishQuiz();
    }
  }
}

function finishQuiz(){
  // Validate: users should not be able to submit without selecting an answer
  const anyUnanswered = questions.some((_, i) => answers[i] === undefined);
  if (anyUnanswered) {
    alert("Please answer all questions before submitting.");
    return;
  }
  // Compute and go to results
  let s = 0;
  questions.forEach((q, i) => { if (q.answer === answers[i]) s++; });
  sessionStorage.setItem("quizResult", JSON.stringify({
    subject: subjectKey, answers, score: s, total: questions.length
  }));
  window.location.href = "result.html";
}

function renderResults(){
  const dataRaw = sessionStorage.getItem("quizResult");
  if (!dataRaw) { window.location.href = "index.html"; return; }
  const data = JSON.parse(dataRaw);
  const sub = data.subject;
  const qs = (window.quizData && quizData[sub]) ? quizData[sub] : [];

  let reviewHtml = "";
  data.score = 0;
  qs.forEach((q, i) => {
    const correct = q.answer === data.answers[i];
    if (correct) data.score++;
    reviewHtml += `<div class="review-item ${correct ? "correct":"incorrect"}">
      <div><strong>Q${i+1}.</strong> ${q.q}</div>
      <div>Your Answer: ${q.options[data.answers[i]] ?? "<em>None</em>"}</div>
      <div>Correct Answer: <strong>${q.options[q.answer]}</strong></div>
    </div>`;
  });

  const pct = (data.score / qs.length * 100).toFixed(2);
  document.getElementById("summary").innerHTML = `
    <strong>${sub.toUpperCase()}</strong> — Score: <strong>${data.score}/${qs.length}</strong> (${pct}%)
  `;
  document.getElementById("answer-review").innerHTML = reviewHtml;

  // Save to leaderboard (Top 5, descending)
  const user = localStorage.getItem("currentUser") || "Anonymous";
  const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  board.push({ name: user, score: data.score, subject: sub, date: new Date().toISOString() });
  board.sort((a,b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(board.slice(0,5)));

  // retake link
  const retake = document.getElementById("retake-link");
  retake.href = `quiz.html?subject=${encodeURIComponent(sub)}`;
}

function loadLeaderboard(){
  const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  const list = document.getElementById("leaderboard");
  if (!board.length) {
    list.innerHTML = "<li>No scores yet. Play a quiz!</li>";
    return;
  }
  list.innerHTML = board.map((e,i) => `<li><strong>${i+1}.</strong> ${e.name} — ${e.score} (${e.subject.toUpperCase()})</li>`).join("");
}
