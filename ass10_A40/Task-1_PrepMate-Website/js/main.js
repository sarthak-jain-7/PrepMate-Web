// ==========================================================================
// PREPMATE - CORE JAVASCRIPT (main.js)
// Theme switcher, mobile navigation, toast alerts, modals & helpers
// ==========================================================================

// Global Storage Keys
const STORAGE_KEYS = {
  THEME: 'prepmate_theme',
  QUIZ_RESULTS: 'prepmate_quiz_results',
  DSA_COMPLETED: 'prepmate_dsa_completed',
  PROGRESS: 'prepmate_progress'
};

// --------------------------------------------------------------------------
// 1. Theme Management (Dark / Light Mode)
// --------------------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  applyTheme(savedTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme} mode`, 'info');
}

// --------------------------------------------------------------------------
// 2. Mobile Navigation
// --------------------------------------------------------------------------
function initNavigation() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      const isOpen = navMenu.classList.contains('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '☰';
      }
    });
  }

  // Highlight active nav item
  highlightActiveNav();
}

function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// --------------------------------------------------------------------------
// 3. Toast Notifications
// --------------------------------------------------------------------------
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'danger') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// --------------------------------------------------------------------------
// 4. Modal Dialog Helpers
// --------------------------------------------------------------------------
function openModal(title, htmlContent) {
  let modalBackdrop = document.getElementById('globalModalBackdrop');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'globalModalBackdrop';
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true">
        <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close modal">✕</button>
        <h3 class="modal-title" id="modalTitle"></h3>
        <div class="modal-body" id="modalBody"></div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    // Event listeners for close
    modalBackdrop.querySelector('#modalCloseBtn').addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = htmlContent;

  modalBackdrop.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalBackdrop = document.getElementById('globalModalBackdrop');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

// --------------------------------------------------------------------------
// 5. Activity Logging (Stores real events in LocalStorage)
// --------------------------------------------------------------------------
function logActivity(text) {
  try {
    const rawProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    let progress = rawProgress ? JSON.parse(rawProgress) : { activities: [] };
    if (!Array.isArray(progress.activities)) {
      progress.activities = [];
    }

    const newActivity = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
    };

    progress.activities.unshift(newActivity);
    // Keep last 15 activities
    if (progress.activities.length > 15) {
      progress.activities = progress.activities.slice(0, 15);
    }

    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}

// Expose globally for other scripts
window.STORAGE_KEYS = STORAGE_KEYS;
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.logActivity = logActivity;

// --------------------------------------------------------------------------
// 6. Application Initialization
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
});

