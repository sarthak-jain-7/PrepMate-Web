// ==========================================================================
// PREPMATE - DSA PRACTICE MODULE (dsa.js)
// Dynamic problem filtering, search, modal view, and completion tracking
// ==========================================================================

let completedProblemIds = new Set();
let currentFilterTopic = 'all';
let currentFilterDifficulty = 'all';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PREP_DATA || !window.PREP_DATA.dsaProblems) {
    console.error('PREP_DATA not loaded properly.');
    return;
  }

  loadCompletedStatus();
  initDsaFilters();
  renderDsaProblems();
});

// --------------------------------------------------------------------------
// 1. Completion State Management (LocalStorage)
// --------------------------------------------------------------------------
function loadCompletedStatus() {
  try {
    const keys = window.STORAGE_KEYS || { DSA_COMPLETED: 'prepmate_dsa_completed' };
    const raw = localStorage.getItem(keys.DSA_COMPLETED);
    if (raw) {
      const arr = JSON.parse(raw);
      completedProblemIds = new Set(arr);
    }
  } catch (e) {
    console.error('Error reading completed DSA items:', e);
    completedProblemIds = new Set();
  }
}

function toggleProblemCompleted(problemId) {
  const isCompleted = completedProblemIds.has(problemId);
  const problem = PREP_DATA.dsaProblems.find((p) => p.id === problemId);
  const title = problem ? problem.title : problemId;

  if (isCompleted) {
    completedProblemIds.delete(problemId);
    showToast(`Unmarked: ${title}`, 'info');
  } else {
    completedProblemIds.add(problemId);
    showToast(`Completed: ${title}! Keep it up!`, 'success');
    if (window.logActivity) {
      logActivity(`Solved DSA Problem: ${title} (${problem ? problem.difficulty : 'Practice'})`);
    }
  }

  // Save to LocalStorage
  const keys = window.STORAGE_KEYS || { DSA_COMPLETED: 'prepmate_dsa_completed' };
  localStorage.setItem(keys.DSA_COMPLETED, JSON.stringify([...completedProblemIds]));

  // Re-render
  renderDsaProblems();

  // If modal is open for this problem, update modal toggle button
  const modalToggleBtn = document.getElementById('modalCompleteBtn');
  if (modalToggleBtn && modalToggleBtn.getAttribute('data-problem-id') === problemId) {
    updateModalCompleteButton(modalToggleBtn, !isCompleted);
  }
}

// --------------------------------------------------------------------------
// 2. Filter & Search Controls
// --------------------------------------------------------------------------
function initDsaFilters() {
  const searchInput = document.getElementById('dsaSearchInput');
  const topicFilter = document.getElementById('dsaTopicFilter');
  const diffFilter = document.getElementById('dsaDiffFilter');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderDsaProblems();
    });
  }

  if (topicFilter) {
    topicFilter.addEventListener('change', (e) => {
      currentFilterTopic = e.target.value;
      renderDsaProblems();
    });
  }

  if (diffFilter) {
    diffFilter.addEventListener('change', (e) => {
      currentFilterDifficulty = e.target.value;
      renderDsaProblems();
    });
  }

  // Topic pill clicks if available
  const topicPills = document.querySelectorAll('.dsa-topic-pill');
  topicPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      topicPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilterTopic = pill.getAttribute('data-topic');
      if (topicFilter) topicFilter.value = currentFilterTopic;
      renderDsaProblems();
    });
  });
}

// --------------------------------------------------------------------------
// 3. Problem List Rendering
// --------------------------------------------------------------------------
function renderDsaProblems() {
  const container = document.getElementById('dsaCardsContainer');
  const countLabel = document.getElementById('dsaResultCount');
  if (!container) return;

  const allProblems = PREP_DATA.dsaProblems;
  const filtered = allProblems.filter((p) => {
    // Topic match
    const matchTopic = currentFilterTopic === 'all' || p.topic.toLowerCase() === currentFilterTopic.toLowerCase();
    // Difficulty match
    const matchDiff = currentFilterDifficulty === 'all' || p.difficulty.toLowerCase() === currentFilterDifficulty.toLowerCase();
    // Search match
    const matchSearch =
      currentSearchQuery === '' ||
      p.title.toLowerCase().includes(currentSearchQuery) ||
      p.topic.toLowerCase().includes(currentSearchQuery) ||
      p.description.toLowerCase().includes(currentSearchQuery);

    return matchTopic && matchDiff && matchSearch;
  });

  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} of ${allProblems.length} Problems (${completedProblemIds.size} Solved)`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</p>
        <h3>No matching DSA problems found</h3>
        <p>Try modifying your search or filter criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  filtered.forEach((p) => {
    const isCompleted = completedProblemIds.has(p.id);
    const card = document.createElement('div');
    card.className = `card dsa-card card-interactive ${isCompleted ? 'completed-card' : ''}`;

    const diffBadgeClass = `badge-${p.difficulty.toLowerCase()}`;

    card.innerHTML = `
      <div class="dsa-card-header">
        <div class="dsa-badges">
          <span class="badge ${diffBadgeClass}">${p.difficulty}</span>
          <span class="badge badge-primary">${p.topic}</span>
        </div>
        ${isCompleted ? '<span class="badge badge-success">✓ Solved</span>' : ''}
      </div>

      <h3 class="dsa-card-title">${p.title}</h3>
      <p class="dsa-card-desc">${p.description}</p>

      <div class="dsa-card-footer">
        <span class="dsa-complexity">⏱ ${p.timeComplexity} | 💾 ${p.spaceComplexity}</span>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="openDsaDetailModal('${p.id}')">
            View & Practice
          </button>
          <button type="button" class="btn-complete-toggle ${isCompleted ? 'is-completed' : ''}" 
                  onclick="toggleProblemCompleted('${p.id}')"
                  title="${isCompleted ? 'Mark Incomplete' : 'Mark Completed'}">
            ${isCompleted ? '✓ Done' : '○'}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// 4. Detailed Problem Modal
// --------------------------------------------------------------------------
function openDsaDetailModal(problemId) {
  const problem = PREP_DATA.dsaProblems.find((p) => p.id === problemId);
  if (!problem) return;

  const isCompleted = completedProblemIds.has(problem.id);
  const diffBadgeClass = `badge-${problem.difficulty.toLowerCase()}`;

  const modalHtml = `
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <span class="badge ${diffBadgeClass}">${problem.difficulty}</span>
      <span class="badge badge-primary">${problem.topic}</span>
      <span class="badge" style="background: var(--bg-surface-alt); border: 1px solid var(--border-color); color: var(--text-secondary);">
        Time: ${problem.timeComplexity} | Space: ${problem.spaceComplexity}
      </span>
    </div>

    <div class="modal-section-title">Problem Statement</div>
    <p>${problem.description}</p>

    <div class="modal-section-title">Example 1</div>
    <div class="code-block">
      <strong>Input:</strong> ${problem.exampleInput}<br>
      <strong>Output:</strong> ${problem.exampleOutput}<br>
      <strong>Explanation:</strong> ${problem.explanation}
    </div>

    <div class="modal-section-title">Constraints</div>
    <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); background: var(--bg-surface-alt); padding: 0.75rem; border-radius: var(--radius-sm);">
      ${problem.constraints}
    </div>

    <div class="modal-section-title">💡 Approach & Solution Hint</div>
    <div style="background: var(--primary-50); border: 1px solid var(--primary-100); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.9rem; color: var(--text-primary);">
      ${problem.hint}
    </div>

    <div style="margin-top: 1.75rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
      <button type="button" id="modalCompleteBtn" class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}" 
              data-problem-id="${problem.id}" onclick="toggleProblemCompleted('${problem.id}')">
        ${isCompleted ? '✓ Mark as Incomplete' : '✓ Mark as Completed'}
      </button>
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  openModal(problem.title, modalHtml);
}

function updateModalCompleteButton(btn, isCompleted) {
  if (isCompleted) {
    btn.className = 'btn btn-secondary';
    btn.innerHTML = '✓ Mark as Incomplete';
  } else {
    btn.className = 'btn btn-primary';
    btn.innerHTML = '✓ Mark as Completed';
  }
}

// Global functions for inline HTML calls
window.openDsaDetailModal = openDsaDetailModal;
window.toggleProblemCompleted = toggleProblemCompleted;
