// ==========================================================================
// PREPMATE - APTITUDE QUIZ ENGINE (aptitude.js)
// State management, scoring, question navigation, review & storage
// ==========================================================================

let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {}; // Map: questionId -> selectedOptionIndex
let selectedCategory = 'all';

// Initialize Aptitude Quiz Page
document.addEventListener('DOMContentLoaded', () => {
  if (!window.PREP_DATA || !window.PREP_DATA.aptitudeQuestions) {
    console.error('PREP_DATA not loaded properly.');
    return;
  }

  initCategoryFilters();
  loadCategoryQuestions('all');
  bindQuizControls();
});

// --------------------------------------------------------------------------
// 1. Category Filtering
// --------------------------------------------------------------------------
function initCategoryFilters() {
  const categoryPills = document.querySelectorAll('.category-filter-btn');
  categoryPills.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      categoryPills.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');
      selectedCategory = cat;
      loadCategoryQuestions(cat);
    });
  });
}

function loadCategoryQuestions(category) {
  if (category === 'all') {
    currentQuestions = [...PREP_DATA.aptitudeQuestions];
  } else {
    currentQuestions = PREP_DATA.aptitudeQuestions.filter((q) => q.category === category);
  }

  // Reset quiz state
  currentQuestionIndex = 0;
  userAnswers = {};

  // Hide results view if visible, show quiz box
  const resultsCard = document.getElementById('quizResultsCard');
  const quizPlayArea = document.getElementById('quizPlayArea');
  if (resultsCard) resultsCard.style.display = 'none';
  if (quizPlayArea) quizPlayArea.style.display = 'block';

  renderCurrentQuestion();
}

// --------------------------------------------------------------------------
// 2. Question Rendering & Option Selection
// --------------------------------------------------------------------------
function renderCurrentQuestion() {
  if (currentQuestions.length === 0) return;

  const currentQ = currentQuestions[currentQuestionIndex];

  // Update Category Badge & Counter
  const categoryBadge = document.getElementById('qCategoryBadge');
  const counterLabel = document.getElementById('qCounterLabel');
  const progressBarFill = document.getElementById('quizProgressBarFill');

  if (categoryBadge) categoryBadge.textContent = currentQ.category;
  if (counterLabel) {
    counterLabel.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
  }

  // Update Progress Bar
  if (progressBarFill) {
    const progressPercent = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBarFill.style.width = `${progressPercent}%`;
  }

  // Update Question Text
  const questionTitle = document.getElementById('questionText');
  if (questionTitle) {
    questionTitle.textContent = currentQ.question;
  }

  // Render Options
  const optionsContainer = document.getElementById('optionsContainer');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    currentQ.options.forEach((optText, idx) => {
      const optBtn = document.createElement('button');
      optBtn.type = 'button';
      optBtn.className = 'option-btn';
      if (userAnswers[currentQ.id] === idx) {
        optBtn.classList.add('selected');
      }

      optBtn.innerHTML = `
        <span class="option-indicator">${letters[idx]}</span>
        <span class="option-text">${optText}</span>
      `;

      optBtn.addEventListener('click', () => {
        selectOption(currentQ.id, idx);
      });

      optionsContainer.appendChild(optBtn);
    });
  }

  // Update Nav Button States
  updateNavigationButtons();
}

function selectOption(questionId, optionIndex) {
  userAnswers[questionId] = optionIndex;
  renderCurrentQuestion();
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevQuestionBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const submitBtn = document.getElementById('submitQuizBtn');

  if (prevBtn) {
    prevBtn.disabled = currentQuestionIndex === 0;
    prevBtn.style.opacity = currentQuestionIndex === 0 ? '0.5' : '1';
  }

  const isLast = currentQuestionIndex === currentQuestions.length - 1;
  if (nextBtn) {
    nextBtn.style.display = isLast ? 'none' : 'inline-flex';
  }
  if (submitBtn) {
    submitBtn.style.display = isLast ? 'inline-flex' : 'none';
  }
}

// --------------------------------------------------------------------------
// 3. Navigation Controls
// --------------------------------------------------------------------------
function bindQuizControls() {
  const prevBtn = document.getElementById('prevQuestionBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const submitBtn = document.getElementById('submitQuizBtn');
  const restartBtn = document.getElementById('restartQuizBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderCurrentQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderCurrentQuestion();
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', submitQuiz);
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      loadCategoryQuestions(selectedCategory);
      showToast('Quiz reset. Good luck!', 'info');
    });
  }
}

// --------------------------------------------------------------------------
// 4. Scoring & Quiz Submission
// --------------------------------------------------------------------------
function submitQuiz() {
  const total = currentQuestions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  currentQuestions.forEach((q) => {
    const chosen = userAnswers[q.id];
    if (chosen === undefined) {
      unattemptedCount++;
    } else if (chosen === q.correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const percentage = Math.round((correctCount / total) * 100);

  // Save to LocalStorage
  saveQuizResults({
    category: selectedCategory,
    totalQuestions: total,
    correctCount: correctCount,
    incorrectCount: incorrectCount,
    unattemptedCount: unattemptedCount,
    percentage: percentage,
    date: new Date().toISOString()
  });

  // Log activity
  logActivity(`Completed ${selectedCategory.toUpperCase()} Aptitude Quiz: ${scoreGrade(percentage)} (${percentage}%)`);

  // Render Result Screen
  displayResults(total, correctCount, incorrectCount, unattemptedCount, percentage);
  showToast(`Quiz Completed! Score: ${correctCount}/${total} (${percentage}%)`, 'success');
}

function scoreGrade(percent) {
  if (percent >= 80) return 'Distinction';
  if (percent >= 60) return 'Proficient';
  if (percent >= 40) return 'Average';
  return 'Needs Practice';
}

function displayResults(total, correct, incorrect, unattempted, percentage) {
  const quizPlayArea = document.getElementById('quizPlayArea');
  const resultsCard = document.getElementById('quizResultsCard');

  if (quizPlayArea) quizPlayArea.style.display = 'none';
  if (resultsCard) {
    resultsCard.style.display = 'block';

    // Populate score circle
    const scoreVal = document.getElementById('resScoreVal');
    const percentVal = document.getElementById('resPercentVal');
    const correctVal = document.getElementById('resCorrectVal');
    const incorrectVal = document.getElementById('resIncorrectVal');
    const accuracyVal = document.getElementById('resAccuracyVal');

    if (scoreVal) scoreVal.textContent = `${correct}/${total}`;
    if (percentVal) percentVal.textContent = `${percentage}%`;
    if (correctVal) correctVal.textContent = correct;
    if (incorrectVal) incorrectVal.textContent = incorrect;
    if (accuracyVal) {
      const attempted = correct + incorrect;
      const acc = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      accuracyVal.textContent = `${acc}%`;
    }

    // Render Answer Review List
    renderAnswerReview();
  }
}

function renderAnswerReview() {
  const reviewContainer = document.getElementById('reviewListContainer');
  if (!reviewContainer) return;

  reviewContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  currentQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[q.id];
    const isCorrect = userChoice === q.correctAnswer;
    const isUnattempted = userChoice === undefined;

    const reviewItem = document.createElement('div');
    reviewItem.className = `review-item ${isCorrect ? 'is-correct' : 'is-incorrect'}`;

    const userChoiceText = isUnattempted
      ? '<span style="color: var(--warning); font-weight:700;">Not Attempted</span>'
      : `<span style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'}; font-weight:700;">${letters[userChoice]}: ${q.options[userChoice]}</span>`;

    const correctChoiceText = `<span style="color: var(--success); font-weight:700;">${letters[q.correctAnswer]}: ${q.options[q.correctAnswer]}</span>`;

    reviewItem.innerHTML = `
      <div class="review-q-title">Q${idx + 1}. ${q.question}</div>
      <div class="review-answers">
        <div><strong>Your Answer:</strong> ${userChoiceText}</div>
        <div><strong>Correct Answer:</strong> ${correctChoiceText}</div>
      </div>
      <div class="review-exp">
        💡 <strong>Explanation:</strong> ${q.explanation}
      </div>
    `;

    reviewContainer.appendChild(reviewItem);
  });
}

// --------------------------------------------------------------------------
// 5. LocalStorage Storage Management
// --------------------------------------------------------------------------
function saveQuizResults(resultObj) {
  try {
    const keys = window.STORAGE_KEYS || { QUIZ_RESULTS: 'prepmate_quiz_results', PROGRESS: 'prepmate_progress' };
    const raw = localStorage.getItem(keys.QUIZ_RESULTS);
    let quizHistory = raw ? JSON.parse(raw) : { attempts: [], latest: null, totalAttempted: 0, totalCorrect: 0 };

    quizHistory.attempts.push(resultObj);
    quizHistory.latest = resultObj;
    quizHistory.totalAttempted += (resultObj.correctCount + resultObj.incorrectCount);
    quizHistory.totalCorrect += resultObj.correctCount;

    localStorage.setItem(keys.QUIZ_RESULTS, JSON.stringify(quizHistory));
  } catch (e) {
    console.error('Error saving quiz results:', e);
  }
}
