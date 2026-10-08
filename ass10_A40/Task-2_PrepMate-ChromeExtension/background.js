// ==========================================================================
// PREPMATE CHROME EXTENSION - SERVICE WORKER (background.js)
// Manages background timer state, alarms, notifications & study stats
// ==========================================================================

const STORAGE_KEYS = {
  THEME: 'prepmate_theme',
  STATS: 'prepmate_stats',
  TIMER: 'prepmate_timer',
  NOTES: 'prepmate_notes',
  FOCUS_MODE: 'prepmate_focus_mode'
};

// --------------------------------------------------------------------------
// 1. Extension Lifecycle Initialization
// --------------------------------------------------------------------------
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(null, (items) => {
    const defaults = {};

    if (!items[STORAGE_KEYS.THEME]) {
      defaults[STORAGE_KEYS.THEME] = 'light';
    }

    if (!items[STORAGE_KEYS.STATS]) {
      defaults[STORAGE_KEYS.STATS] = {
        sessions: 0,
        studyMinutes: 0,
        streakDays: 0,
        lastStudyDate: null
      };
    }

    if (!items[STORAGE_KEYS.TIMER]) {
      defaults[STORAGE_KEYS.TIMER] = {
        isRunning: false,
        mode: 'focus', // 'focus' or 'break'
        focusDuration: 25, // minutes
        breakDuration: 5,  // minutes
        remainingSeconds: 25 * 60,
        targetEndTime: null,
        sessionNumber: 1
      };
    }

    if (!items[STORAGE_KEYS.NOTES]) {
      defaults[STORAGE_KEYS.NOTES] = [];
    }

    if (!items[STORAGE_KEYS.FOCUS_MODE]) {
      defaults[STORAGE_KEYS.FOCUS_MODE] = {
        active: false,
        startedAt: null
      };
    }

    if (Object.keys(defaults).length > 0) {
      chrome.storage.local.set(defaults);
    }
  });
});

// --------------------------------------------------------------------------
// 2. Message Listener (from popup.js)
// --------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.action) return false;

  switch (message.action) {
    case 'START_TIMER':
      handleStartTimer(message.payload);
      sendResponse({ status: 'started' });
      break;

    case 'PAUSE_TIMER':
      handlePauseTimer(message.payload);
      sendResponse({ status: 'paused' });
      break;

    case 'RESET_TIMER':
      handleResetTimer(message.payload);
      sendResponse({ status: 'reset' });
      break;

    case 'TIMER_FINISHED':
      handleTimerFinished(message.payload);
      sendResponse({ status: 'finished' });
      break;

    default:
      break;
  }
  return true;
});

// --------------------------------------------------------------------------
// 3. Timer State Handlers
// --------------------------------------------------------------------------
function handleStartTimer(timerData) {
  const targetEndTime = Date.now() + (timerData.remainingSeconds * 1000);
  const updated = {
    ...timerData,
    isRunning: true,
    targetEndTime: targetEndTime
  };

  chrome.storage.local.set({ [STORAGE_KEYS.TIMER]: updated });

  // Clear existing alarm and create new one
  chrome.alarms.clear('prepMateTimerAlarm', () => {
    chrome.alarms.create('prepMateTimerAlarm', {
      when: targetEndTime
    });
  });
}

function handlePauseTimer(timerData) {
  const updated = {
    ...timerData,
    isRunning: false,
    targetEndTime: null
  };

  chrome.storage.local.set({ [STORAGE_KEYS.TIMER]: updated });
  chrome.alarms.clear('prepMateTimerAlarm');
}

function handleResetTimer(timerData) {
  const isFocus = timerData.mode === 'focus';
  const duration = isFocus ? timerData.focusDuration : timerData.breakDuration;

  const updated = {
    ...timerData,
    isRunning: false,
    remainingSeconds: duration * 60,
    targetEndTime: null
  };

  chrome.storage.local.set({ [STORAGE_KEYS.TIMER]: updated });
  chrome.alarms.clear('prepMateTimerAlarm');
}

// --------------------------------------------------------------------------
// 4. Alarm Expiration Handler (When Timer completes in background)
// --------------------------------------------------------------------------
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'prepMateTimerAlarm') {
    chrome.storage.local.get([STORAGE_KEYS.TIMER, STORAGE_KEYS.STATS], (result) => {
      const timer = result[STORAGE_KEYS.TIMER];
      const stats = result[STORAGE_KEYS.STATS] || { sessions: 0, studyMinutes: 0, streakDays: 0, lastStudyDate: null };

      if (!timer) return;

      if (timer.mode === 'focus') {
        // Focus Finished -> Transition to Break
        const sessionMins = timer.focusDuration || 25;
        const updatedStats = updateStudyStats(stats, sessionMins);

        const newSessionNumber = (timer.sessionNumber || 1) + 1;
        const newTimer = {
          ...timer,
          mode: 'break',
          isRunning: true,
          remainingSeconds: timer.breakDuration * 60,
          targetEndTime: Date.now() + (timer.breakDuration * 60 * 1000),
          sessionNumber: newSessionNumber
        };

        chrome.storage.local.set({
          [STORAGE_KEYS.TIMER]: newTimer,
          [STORAGE_KEYS.STATS]: updatedStats
        });

        // Set next alarm for break
        chrome.alarms.create('prepMateTimerAlarm', { when: newTimer.targetEndTime });

        // Show Desktop Notification
        showNotification(
          '🎯 Focus Session Complete!',
          `Great job! You completed a ${sessionMins}-minute focus session. Time for a ${timer.breakDuration}-minute break!`
        );

      } else {
        // Break Finished -> Transition to Focus
        const newTimer = {
          ...timer,
          mode: 'focus',
          isRunning: false,
          remainingSeconds: timer.focusDuration * 60,
          targetEndTime: null
        };

        chrome.storage.local.set({ [STORAGE_KEYS.TIMER]: newTimer });

        // Show Desktop Notification
        showNotification(
          '⚡ Break Finished!',
          'Break is over! Ready to start your next placement preparation session?'
        );
      }
    });
  }
});

function handleTimerFinished(payload) {
  // Triggered manually from popup if popup happens to be open when reaching 0
  chrome.alarms.clear('prepMateTimerAlarm', () => {
    // Dispatch alarm logic manually
    chrome.alarms.onAlarm.dispatch({ name: 'prepMateTimerAlarm' });
  });
}

// --------------------------------------------------------------------------
// 5. Statistics Calculation & Streak Tracker
// --------------------------------------------------------------------------
function updateStudyStats(currentStats, minutesAdded) {
  const todayStr = new Date().toISOString().split('T')[0];
  let newStreak = currentStats.streakDays || 0;

  if (!currentStats.lastStudyDate) {
    newStreak = 1;
  } else if (currentStats.lastStudyDate === todayStr) {
    // Already studied today, maintain streak
  } else {
    const lastDate = new Date(currentStats.lastStudyDate);
    const today = new Date(todayStr);
    const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak += 1; // Consecutive day
    } else if (diffDays > 1) {
      newStreak = 1; // Reset streak
    }
  }

  return {
    sessions: (currentStats.sessions || 0) + 1,
    studyMinutes: (currentStats.studyMinutes || 0) + minutesAdded,
    streakDays: newStreak,
    lastStudyDate: todayStr
  };
}

// --------------------------------------------------------------------------
// 6. Notification Dispatcher
// --------------------------------------------------------------------------
function showNotification(title, message) {
  try {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: title,
      message: message,
      priority: 2
    });
  } catch (err) {
    console.warn('PrepMate Notification error:', err);
  }
}
