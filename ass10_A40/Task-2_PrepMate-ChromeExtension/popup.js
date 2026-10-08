// ==========================================================================
// PREPMATE CHROME EXTENSION - POPUP CONTROLLER (popup.js)
// State management, timer synchronization, page analyzer, notes & stats
// ==========================================================================

const STORAGE_KEYS = {
  THEME: 'prepmate_theme',
  STATS: 'prepmate_stats',
  TIMER: 'prepmate_timer',
  NOTES: 'prepmate_notes',
  FOCUS_MODE: 'prepmate_focus_mode'
};

let timerInterval = null;
let focusModeInterval = null;

// Current In-Memory State
let timerState = {
  isRunning: false,
  mode: 'focus',
  focusDuration: 25,
  breakDuration: 5,
  remainingSeconds: 25 * 60,
  targetEndTime: null,
  sessionNumber: 1
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTimer();
  initFocusMode();
  initStats();
  initAnalyzer();
  initNotes();

  // Listen for storage changes from background worker
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      if (changes[STORAGE_KEYS.TIMER]) {
        timerState = changes[STORAGE_KEYS.TIMER].newValue || timerState;
        renderTimerDisplay();
      }
      if (changes[STORAGE_KEYS.STATS]) {
        renderStats(changes[STORAGE_KEYS.STATS].newValue);
      }
      if (changes[STORAGE_KEYS.NOTES]) {
        renderNotes(changes[STORAGE_KEYS.NOTES].newValue || []);
      }
    }
  });
});

// --------------------------------------------------------------------------
// 1. Theme Management (Dark / Light)
// --------------------------------------------------------------------------
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');

  chrome.storage.local.get(STORAGE_KEYS.THEME, (res) => {
    const theme = res[STORAGE_KEYS.THEME] || 'light';
    applyTheme(theme);
  });

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      chrome.storage.local.set({ [STORAGE_KEYS.THEME]: nextTheme });
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

// --------------------------------------------------------------------------
// 2. Pomodoro Timer
// --------------------------------------------------------------------------
function initTimer() {
  chrome.storage.local.get(STORAGE_KEYS.TIMER, (res) => {
    if (res[STORAGE_KEYS.TIMER]) {
      timerState = res[STORAGE_KEYS.TIMER];
    }
    
    // Check if was running in background
    if (timerState.isRunning && timerState.targetEndTime) {
      const remainingMs = timerState.targetEndTime - Date.now();
      if (remainingMs > 0) {
        timerState.remainingSeconds = Math.ceil(remainingMs / 1000);
        startLocalTimerTick();
      } else {
        // Handled by background, update state
        timerState.remainingSeconds = 0;
      }
    }

    renderTimerDurationPills();
    renderTimerDisplay();
    bindTimerButtons();
  });
}

function bindTimerButtons() {
  const startBtn = document.getElementById('startTimerBtn');
  const pauseBtn = document.getElementById('pauseTimerBtn');
  const resetBtn = document.getElementById('resetTimerBtn');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startTimer();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      pauseTimer();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetTimer();
    });
  }

  // Duration Pills Listener
  const durPills = document.querySelectorAll('.dur-pill');
  durPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      if (timerState.isRunning) return; // Prevent change while running

      const type = pill.getAttribute('data-type');
      const mins = parseInt(pill.getAttribute('data-mins'), 10);

      if (type === 'focus') {
        timerState.focusDuration = mins;
        if (timerState.mode === 'focus') {
          timerState.remainingSeconds = mins * 60;
        }
      } else if (type === 'break') {
        timerState.breakDuration = mins;
        if (timerState.mode === 'break') {
          timerState.remainingSeconds = mins * 60;
        }
      }

      chrome.storage.local.set({ [STORAGE_KEYS.TIMER]: timerState });
      renderTimerDurationPills();
      renderTimerDisplay();
    });
  });
}

function startTimer() {
  if (timerState.remainingSeconds <= 0) {
    const isFocus = timerState.mode === 'focus';
    timerState.remainingSeconds = (isFocus ? timerState.focusDuration : timerState.breakDuration) * 60;
  }

  timerState.isRunning = true;
  timerState.targetEndTime = Date.now() + (timerState.remainingSeconds * 1000);

  chrome.runtime.sendMessage({
    action: 'START_TIMER',
    payload: timerState
  });

  startLocalTimerTick();
  renderTimerDisplay();
}

function pauseTimer() {
  timerState.isRunning = false;
  timerState.targetEndTime = null;

  clearInterval(timerInterval);

  chrome.runtime.sendMessage({
    action: 'PAUSE_TIMER',
    payload: timerState
  });

  renderTimerDisplay();
}

function resetTimer() {
  timerState.isRunning = false;
  clearInterval(timerInterval);

  const isFocus = timerState.mode === 'focus';
  timerState.remainingSeconds = (isFocus ? timerState.focusDuration : timerState.breakDuration) * 60;
  timerState.targetEndTime = null;

  chrome.runtime.sendMessage({
    action: 'RESET_TIMER',
    payload: timerState
  });

  renderTimerDisplay();
}

function startLocalTimerTick() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (timerState.targetEndTime) {
      const remainingMs = timerState.targetEndTime - Date.now();
      if (remainingMs <= 0) {
        clearInterval(timerInterval);
        timerState.remainingSeconds = 0;
        renderTimerDisplay();
        return;
      }
      timerState.remainingSeconds = Math.ceil(remainingMs / 1000);
      renderTimerDisplay();
    }
  }, 1000);
}

function renderTimerDisplay() {
  const display = document.getElementById('timerDisplay');
  const modeBadge = document.getElementById('timerModeBadge');
  const sessionCounter = document.getElementById('sessionCounter');
  const progressBar = document.getElementById('timerProgressBar');
  const startBtn = document.getElementById('startTimerBtn');
  const pauseBtn = document.getElementById('pauseTimerBtn');

  const mins = Math.floor(timerState.remainingSeconds / 60);
  const secs = timerState.remainingSeconds % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (display) display.textContent = formattedTime;

  if (modeBadge) {
    const isFocus = timerState.mode === 'focus';
    modeBadge.textContent = isFocus ? 'FOCUS' : 'BREAK';
    modeBadge.className = `badge ${isFocus ? 'badge-focus' : 'badge-break'}`;
  }

  if (sessionCounter) {
    sessionCounter.textContent = `Session #${timerState.sessionNumber || 1}`;
  }

  if (progressBar) {
    const totalDurationSecs = (timerState.mode === 'focus' ? timerState.focusDuration : timerState.breakDuration) * 60;
    const pct = totalDurationSecs > 0 ? (timerState.remainingSeconds / totalDurationSecs) * 100 : 0;
    progressBar.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  }

  if (startBtn && pauseBtn) {
    if (timerState.isRunning) {
      startBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-flex';
    } else {
      startBtn.style.display = 'inline-flex';
      pauseBtn.style.display = 'none';
    }
  }
}

function renderTimerDurationPills() {
  const pills = document.querySelectorAll('.dur-pill');
  pills.forEach((p) => {
    const type = p.getAttribute('data-type');
    const mins = parseInt(p.getAttribute('data-mins'), 10);

    if (type === 'focus') {
      if (mins === timerState.focusDuration) p.classList.add('active');
      else p.classList.remove('active');
    } else if (type === 'break') {
      if (mins === timerState.breakDuration) p.classList.add('active');
      else p.classList.remove('active');
    }
  });
}

// --------------------------------------------------------------------------
// 3. Focus Mode Stopwatch
// --------------------------------------------------------------------------
function initFocusMode() {
  const toggle = document.getElementById('focusModeToggle');
  const statusText = document.getElementById('focusModeStatusText');
  const liveTimerBox = document.getElementById('focusLiveTimer');
  const elapsedLabel = document.getElementById('focusElapsedTime');

  chrome.storage.local.get(STORAGE_KEYS.FOCUS_MODE, (res) => {
    const data = res[STORAGE_KEYS.FOCUS_MODE] || { active: false, startedAt: null };

    if (toggle) toggle.checked = data.active;
    updateFocusModeUI(data.active, data.startedAt);

    if (data.active && data.startedAt) {
      startFocusStopwatch(data.startedAt);
    }
  });

  if (toggle) {
    toggle.addEventListener('change', (e) => {
      const active = e.target.checked;
      const startedAt = active ? Date.now() : null;

      chrome.storage.local.set({
        [STORAGE_KEYS.FOCUS_MODE]: { active, startedAt }
      });

      updateFocusModeUI(active, startedAt);

      if (active) {
        startFocusStopwatch(startedAt);
      } else {
        clearInterval(focusModeInterval);
      }
    });
  }
}

function updateFocusModeUI(active, startedAt) {
  const statusText = document.getElementById('focusModeStatusText');
  const liveTimerBox = document.getElementById('focusLiveTimer');

  if (statusText) {
    statusText.textContent = active ? '🔥 In Deep Focus Mode' : 'Ready to begin preparation';
    statusText.style.color = active ? 'var(--primary-600)' : 'var(--text-muted)';
  }

  if (liveTimerBox) {
    liveTimerBox.style.display = active ? 'block' : 'none';
  }
}

function startFocusStopwatch(startedAt) {
  clearInterval(focusModeInterval);
  const elapsedLabel = document.getElementById('focusElapsedTime');

  function update() {
    const diffSecs = Math.floor((Date.now() - startedAt) / 1000);
    const m = Math.floor(diffSecs / 60);
    const s = diffSecs % 60;
    if (elapsedLabel) {
      elapsedLabel.textContent = `${m}m ${String(s).padStart(2, '0')}s`;
    }
  }

  update();
  focusModeInterval = setInterval(update, 1000);
}

// --------------------------------------------------------------------------
// 4. Study Statistics Tracker
// --------------------------------------------------------------------------
function initStats() {
  chrome.storage.local.get(STORAGE_KEYS.STATS, (res) => {
    const stats = res[STORAGE_KEYS.STATS] || {
      sessions: 0,
      studyMinutes: 0,
      streakDays: 0
    };
    renderStats(stats);
  });
}

function renderStats(stats) {
  if (!stats) return;

  const sessionsEl = document.getElementById('statSessionsCount');
  const minutesEl = document.getElementById('statStudyMinutes');
  const streakEl = document.getElementById('statStreakDays');

  if (sessionsEl) sessionsEl.textContent = stats.sessions || 0;
  if (minutesEl) minutesEl.textContent = `${stats.studyMinutes || 0}m`;
  if (streakEl) streakEl.textContent = `${stats.streakDays || 0}d`;
}

// --------------------------------------------------------------------------
// 5. Page Content Analyzer
// --------------------------------------------------------------------------
function initAnalyzer() {
  const analyzeBtn = document.getElementById('analyzePageBtn');
  const resultsBox = document.getElementById('analysisResultsBox');
  const statusMsg = document.getElementById('analyzerStatusMsg');

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
      if (statusMsg) statusMsg.style.display = 'none';
      analyzeBtn.disabled = true;
      analyzeBtn.textContent = '⏳ Analyzing...';

      try {
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!activeTab || !activeTab.id || !activeTab.url) {
          throw new Error('No active browser tab detected.');
        }

        // Check if restricted URL (chrome://, edge://, about:blank, etc.)
        const url = activeTab.url.toLowerCase();
        if (
          url.startsWith('chrome://') ||
          url.startsWith('chrome-extension://') ||
          url.startsWith('edge://') ||
          url.startsWith('about:') ||
          url.startsWith('view-source:')
        ) {
          throw new Error('Analysis is restricted on internal browser pages. Please open an article or tutorial.');
        }

        // Execute content script if not already injected
        await chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ['content.js']
        });

        // Send analysis request to content script
        chrome.tabs.sendMessage(activeTab.id, { action: 'ANALYZE_PAGE' }, (response) => {
          analyzeBtn.disabled = false;
          analyzeBtn.textContent = '🔍 Analyze Current Page';

          if (chrome.runtime.lastError || !response || !response.success) {
            showAnalyzerError(
              (response && response.error) ||
              'Unable to extract content. Please refresh the page and try again.'
            );
            return;
          }

          // Populate results
          document.getElementById('pageWordCount').textContent = response.wordCount;
          document.getElementById('pageCharCount').textContent = response.charCount;
          document.getElementById('pageReadingTime').textContent = `${response.readingTime} min`;

          if (resultsBox) resultsBox.style.display = 'block';
        });

      } catch (err) {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = '🔍 Analyze Current Page';
        showAnalyzerError(err.message || 'Error communicating with active tab.');
      }
    });
  }
}

function showAnalyzerError(msg) {
  const statusMsg = document.getElementById('analyzerStatusMsg');
  const resultsBox = document.getElementById('analysisResultsBox');
  if (resultsBox) resultsBox.style.display = 'none';

  if (statusMsg) {
    statusMsg.textContent = msg;
    statusMsg.style.display = 'block';
  }
}

// --------------------------------------------------------------------------
// 6. Quick Notes Manager
// --------------------------------------------------------------------------
function initNotes() {
  const saveBtn = document.getElementById('saveNoteBtn');
  const noteInput = document.getElementById('newNoteInput');

  chrome.storage.local.get(STORAGE_KEYS.NOTES, (res) => {
    const notes = res[STORAGE_KEYS.NOTES] || [];
    renderNotes(notes);
  });

  if (saveBtn && noteInput) {
    saveBtn.addEventListener('click', () => {
      const text = noteInput.value.trim();
      if (!text) return;

      const newNote = {
        id: Date.now(),
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      chrome.storage.local.get(STORAGE_KEYS.NOTES, (res) => {
        const notes = res[STORAGE_KEYS.NOTES] || [];
        notes.unshift(newNote);
        chrome.storage.local.set({ [STORAGE_KEYS.NOTES]: notes }, () => {
          noteInput.value = '';
          renderNotes(notes);
        });
      });
    });

    noteInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        saveBtn.click();
      }
    });
  }
}

function renderNotes(notes) {
  const container = document.getElementById('notesContainer');
  if (!container) return;

  if (!notes || notes.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); font-size: 0.72rem; padding: 0.5rem 0;">
        No placement notes yet. Write down an algorithm or interview trick!
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  notes.forEach((note) => {
    const item = document.createElement('div');
    item.className = 'note-item';
    item.innerHTML = `
      <div class="note-content">
        <span>${escapeHtml(note.text)}</span>
        <span class="note-time">${note.timestamp}</span>
      </div>
      <button type="button" class="note-del-btn" title="Delete Note">✕</button>
    `;

    item.querySelector('.note-del-btn').addEventListener('click', () => {
      deleteNote(note.id);
    });

    container.appendChild(item);
  });
}

function deleteNote(noteId) {
  chrome.storage.local.get(STORAGE_KEYS.NOTES, (res) => {
    let notes = res[STORAGE_KEYS.NOTES] || [];
    notes = notes.filter((n) => n.id !== noteId);
    chrome.storage.local.set({ [STORAGE_KEYS.NOTES]: notes }, () => {
      renderNotes(notes);
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
