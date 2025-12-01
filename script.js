// Highlight selected nav link
const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
    link.addEventListener("click", function () {
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

/* ----------------- script.js -----------------
   Handles:
   - Timer per game
   - Score management
   - Correct/Wrong feedback
   - Button sounds
   - Level/difficulty transitions
------------------------------------------------ */

let score = 0;
let timer = 0;
let countdown;

// Sound placeholders
const soundClick = new Audio('button-click.mp3');
const soundCorrect = new Audio('correct.mp3');
const soundWrong = new Audio('wrong.mp3');

// ----------------- TIMER -----------------
function startTimer(duration, timerEl, onTimeUp) {
  clearInterval(countdown);
  timer = duration;
  timerEl.textContent = timer;
  countdown = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      clearInterval(countdown);
      if (onTimeUp) onTimeUp();
    }
  }, 1000);
}

// ----------------- SCORE -----------------
function updateScore(amount, scoreEl) {
  score += amount;
  scoreEl.textContent = score;
}

// ----------------- FEEDBACK -----------------
function showFeedback(message, feedbackEl, correct = true) {
  feedbackEl.textContent = message;
  if (correct) {
    soundCorrect.play();
  } else {
    soundWrong.play();
  }
}

// ----------------- BUTTON SOUND -----------------
function playClickSound() {
  soundClick.play();
}

// ----------------- MULTIPLE CHOICE GAME -----------------
function checkMCAnswer(selected, correct, scoreEl, feedbackEl) {
  if (selected === correct) {
    updateScore(10, scoreEl);
    showFeedback("Correct!", feedbackEl, true);
  } else {
    updateScore(-5, scoreEl);
    showFeedback("Wrong!", feedbackEl, false);
  }
}

// ----------------- TRUE/FALSE GAME -----------------
function checkTFAnswer(selected, correct, scoreEl, feedbackEl) {
  if (selected === correct) {
    updateScore(10, scoreEl);
    showFeedback("Correct!", feedbackEl, true);
  } else {
    updateScore(-5, scoreEl);
    showFeedback("Wrong!", feedbackEl, false);
  }
}

// ----------------- SET MATCHING GAME -----------------
function checkSetMatch(dragSet, dropSet, scoreEl, feedbackEl, draggedEl, dropEl) {
  if (dragSet === dropSet) {
    dropEl.appendChild(draggedEl);
    updateScore(10, scoreEl);
    showFeedback("Correct!", feedbackEl, true);
  } else {
    updateScore(-5, scoreEl);
    showFeedback("Wrong!", feedbackEl, false);
  }
}

// ----------------- CARDINALITY CHALLENGE -----------------
function checkCardinality(userAnswer, correctAnswer, scoreEl, feedbackEl) {
  if (parseInt(userAnswer) === correctAnswer) {
    updateScore(10, scoreEl);
    showFeedback("Correct!", feedbackEl, true);
    return true; // increase difficulty
  } else {
    updateScore(-5, scoreEl);
    showFeedback(`Wrong! Correct: ${correctAnswer}`, feedbackEl, false);
    return false;
  }
}

// ----------------- UNION / INTERSECTION PUZZLE -----------------
function checkUnionIntersection(selected, correct, scoreEl, feedbackEl) {
  const selStr = selected.join(",");
  const correctStr = correct.join(",");
  if (selStr === correctStr) {
    updateScore(10, scoreEl);
    showFeedback("Correct!", feedbackEl, true);
  } else {
    updateScore(-5, scoreEl);
    showFeedback(`Wrong! Correct: {${correctStr}}`, feedbackEl, false);
  }
}

// ----------------- UTILITY -----------------
function resetScore(scoreEl) {
  score = 0;
  scoreEl.textContent = score;
}
