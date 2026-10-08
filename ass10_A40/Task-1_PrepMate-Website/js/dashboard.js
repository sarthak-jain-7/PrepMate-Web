// ==========================================================================
// PREPMATE - STUDENT DASHBOARD (dashboard.js)
// Real-time metrics, analytics aggregation, progress bars, activity feed & reset
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderDashboardMetrics();
  bindDashboardEvents();
});

// --------------------------------------------------------------------------
// 1. Data Aggregation & Rendering
// --------------------------------------------------------------------------
function renderDashboardMetrics() {
  const keys = window.STORAGE_KEYS || {
    QUIZ_RESULTS: 'prepmate_quiz_results',
    DSA_COMPLETED: 'prepmate_dsa_completed',
    PROGRESS: 'prepmate_progress'
  };

  // 1. Aptitude Quiz Stats
  let totalAttempted = 0;
  let totalCorrect = 0;
  let quizSessionsCount = 0;
  let latestQuizScore = null;

  try {
    const rawQuiz = localStorage.getItem(keys.QUIZ_RESULTS);
    if (rawQuiz) {
      const parsed = JSON.parse(rawQuiz);
      totalAttempted = parsed.totalAttempted || 0;
      totalCorrect = parsed.totalCorrect || 0;
      quizSessionsCount = (parsed.attempts && parsed.attempts.length) || 0;
      latestQuizScore = parsed.latest || null;
    }
  } catch (e) {
    console.error('Error loading quiz stats:', e);
  }

  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // 2. DSA Solved Stats
  let completedDsaCount = 0;
  let easySolved = 0;
  let medSolved = 0;
  let hardSolved = 0;
  const totalDsaCount = (window.PREP_DATA && window.PREP_DATA.dsaProblems && window.PREP_DATA.dsaProblems.length) || 20;

  try {
    const rawDsa = localStorage.getItem(keys.DSA_COMPLETED);
    if (rawDsa) {
      const arr = JSON.parse(rawDsa);
      completedDsaCount = arr.length;

      if (window.PREP_DATA && window.PREP_DATA.dsaProblems) {
        arr.forEach((id) => {
          const prob = PREP_DATA.dsaProblems.find((p) => p.id === id);
          if (prob) {
            if (prob.difficulty === 'Easy') easySolved++;
            if (prob.difficulty === 'Medium') medSolved++;
            if (prob.difficulty === 'Hard') hardSolved++;
          }
        });
      }
    }
  } catch (e) {
    console.error('Error loading DSA stats:', e);
  }

  // 3. Overall Readiness Calculation
  // Weighted: DSA (50%) + Aptitude Accuracy & Practice (35%) + Study Activity (15%)
  const dsaProgressRatio = Math.min(completedDsaCount / totalDsaCount, 1);
  const aptProgressRatio = Math.min(totalAttempted / 30, 1) * (accuracy / 100);
  const sessionRatio = Math.min(quizSessionsCount / 5, 1);

  let overallScore = Math.round((dsaProgressRatio * 50) + (aptProgressRatio * 35) + (sessionRatio * 15));
  if (overallScore > 100) overallScore = 100;

  // 4. Update Header Stat Cards
  updateElementText('statTotalQuestions', totalAttempted);
  updateElementText('statCorrectAnswers', totalCorrect);
  updateElementText('statAccuracy', `${accuracy}%`);
  updateElementText('statDsaSolved', `${completedDsaCount}/${totalDsaCount}`);
  updateElementText('statStudySessions', quizSessionsCount);
  updateElementText('statOverallProgress', `${overallScore}%`);

  // 5. Update Progress Gauges & Bars
  updateProgressBar('overallProgressFill', overallScore);
  updateElementText('overallScoreLabel', `${overallScore}%`);

  // DSA Difficulty Bars
  const easyTotal = (window.PREP_DATA && window.PREP_DATA.dsaProblems) ? PREP_DATA.dsaProblems.filter((p) => p.difficulty === 'Easy').length : 9;
  const medTotal = (window.PREP_DATA && window.PREP_DATA.dsaProblems) ? PREP_DATA.dsaProblems.filter((p) => p.difficulty === 'Medium').length : 8;
  const hardTotal = (window.PREP_DATA && window.PREP_DATA.dsaProblems) ? PREP_DATA.dsaProblems.filter((p) => p.difficulty === 'Hard').length : 3;

  const easyPercent = Math.round((easySolved / (easyTotal || 1)) * 100);
  const medPercent = Math.round((medSolved / (medTotal || 1)) * 100);
  const hardPercent = Math.round((hardSolved / (hardTotal || 1)) * 100);

  updateProgressBar('easyDsaFill', easyPercent);
  updateElementText('easyDsaText', `${easySolved} / ${easyTotal} (${easyPercent}%)`);

  updateProgressBar('medDsaFill', medPercent);
  updateElementText('medDsaText', `${medSolved} / ${medTotal} (${medPercent}%)`);

  updateProgressBar('hardDsaFill', hardPercent);
  updateElementText('hardDsaText', `${hardSolved} / ${hardTotal} (${hardPercent}%)`);

  // Aptitude Mastery Bar
  const aptMasteryPercent = Math.min(Math.round((totalAttempted / 18) * 100), 100);
  updateProgressBar('aptMasteryFill', aptMasteryPercent);
  updateElementText('aptMasteryText', `${totalAttempted} Attempted (${accuracy}% Acc)`);

  // 6. Render Recent Activity Feed
  renderRecentActivityFeed();
}

function updateElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function updateProgressBar(id, percentage) {
  const bar = document.getElementById(id);
  if (bar) bar.style.width = `${percentage}%`;
}

// --------------------------------------------------------------------------
// 2. Activity Feed Renderer
// --------------------------------------------------------------------------
function renderRecentActivityFeed() {
  const feedContainer = document.getElementById('recentActivityFeed');
  if (!feedContainer) return;

  const keys = window.STORAGE_KEYS || { PROGRESS: 'prepmate_progress' };
  let activities = [];
  try {
    const raw = localStorage.getItem(keys.PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      activities = parsed.activities || [];
    }
  } catch (e) {
    console.error('Error reading activities:', e);
  }

  if (activities.length === 0) {
    feedContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.5rem; margin-bottom: 0.35rem;">📝</p>
        <p>No recent activity recorded yet.</p>
        <p style="font-size: 0.85rem; margin-top: 0.25rem;">Solve a DSA problem or take an aptitude quiz to start tracking your progress!</p>
      </div>
    `;
    return;
  }

  feedContainer.innerHTML = '';
  activities.forEach((act) => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-bullet"></div>
      <div style="flex: 1;">
        <div class="activity-text">${act.text}</div>
        <div class="activity-time">${act.timestamp}</div>
      </div>
    `;
    feedContainer.appendChild(item);
  });
}

// --------------------------------------------------------------------------
// 3. Reset Progress Handler
// --------------------------------------------------------------------------
function bindDashboardEvents() {
  const resetBtn = document.getElementById('resetProgressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', handleResetProgress);
  }
}

function handleResetProgress() {
  const confirmed = window.confirm(
    'Are you sure you want to reset all your preparation progress? This will clear your quiz results, completed DSA problems, and activity history. Your theme preference will be preserved.'
  );

  if (confirmed) {
    const keys = window.STORAGE_KEYS || {
      QUIZ_RESULTS: 'prepmate_quiz_results',
      DSA_COMPLETED: 'prepmate_dsa_completed',
      PROGRESS: 'prepmate_progress'
    };

    // Only clear PrepMate preparation data, preserve theme
    localStorage.removeItem(keys.QUIZ_RESULTS);
    localStorage.removeItem(keys.DSA_COMPLETED);
    localStorage.removeItem(keys.PROGRESS);

    // Re-render
    renderDashboardMetrics();
    if (window.showToast) {
      showToast('Preparation progress has been successfully reset.', 'info');
    }
  }
}
