# PrepMate – Placement Focus Assistant (Chrome Extension)

> **"Stay Focused. Stay Placement Ready."**

A dedicated, lightweight Google Chrome Extension designed for college students preparing for technical placement interviews, campus coding tests, and academic study sessions.

---

## 📌 Project Overview

**PrepMate – Placement Focus Assistant** brings essential productivity tools directly into the student's browser bar:
- **Pomodoro Study Timer**: Structured 25m / 50m Focus sessions and 5m / 10m Break intervals with background persistence and desktop notifications.
- **Deep Focus Mode**: Live stopwatch tracker measuring continuous problem-solving sprints without distractions.
- **Placement Study Statistics**: Daily streak counter, total study minutes, and completed session logging backed by `chrome.storage.local`.
- **Webpage Content Analyzer**: Instant calculation of word count, character count, and estimated reading time for tech articles, DSA tutorials, and company recruitment blogs.
- **Quick Placement Notes**: Persistent note-taking for storing algorithms, speed-math tricks, HR formulas, or interview reminders.
- **Theme Customization**: Sleek Dark and Light mode matching the PrepMate design system.

---

## 🛠️ Technology Stack

- **Chrome Extension Manifest V3**: Modern, secure, performant extension specification.
- **Service Worker (`background.js`)**: Background alarm scheduling, state persistence across popup closes, and system notifications.
- **Content Scripts (`content.js`)**: Isolated text extraction and readability metrics calculation.
- **Popup UI (`popup.html` & `popup.css`)**: Vanilla HTML5, modern CSS custom properties, responsive flexbox & grid design.
- **Vanilla JavaScript (`popup.js`)**: Event delegation, timer synchronization, and Chrome storage operations.
- **Chrome APIs Utilized**:
  - `storage` (`chrome.storage.local` for offline persistent data)
  - `notifications` (`chrome.notifications` for session alerts)
  - `alarms` (`chrome.alarms` for background timer wakeups)
  - `activeTab` & `scripting` (for on-demand webpage reading analysis)

---

## 📁 Folder Structure

```
PrepMate-Extension/
│
├── manifest.json       # Manifest V3 configuration with minimum required permissions
├── popup.html          # Extension popup UI (Timer, Stats, Analyzer, Notes, Focus mode)
├── popup.css           # Modern styling matching PrepMate visual identity
├── popup.js            # Main controller for timer logic, notes, stats, and page analyzer
├── background.js       # Background Service Worker managing alarms, timers & notifications
├── content.js          # Content script for extracting text metrics from active webpage
│
├── icons/              # Valid high-resolution PNG icon assets
│   ├── icon16.png      # 16x16 Favicon icon
│   ├── icon48.png      # 48x48 Extension manager icon
│   └── icon128.png     # 128x128 Web Store / Installation icon
│
└── README.md           # Documentation, installation steps, and testing guide
```

---

## 📥 How to Install in Google Chrome

1. Open **Google Chrome**.
2. In the URL address bar, navigate to:
   ```
   chrome://extensions/
   ```
3. In the top right corner, enable **"Developer mode"** toggle.
4. Click the **"Load unpacked"** button in the top left toolbar.
5. Select the **`PrepMate-Extension`** folder (located at `f:\prompt ass\PrepMate-Extension`).
6. The extension is now installed! Pin **PrepMate** to your Chrome toolbar for quick access.

---

## 🧪 Testing Pass & Verification Checklist

| Test Item | Verification | Status |
|---|---|---|
| **Manifest V3 Loading** | Loads without syntax or permission errors | ✅ Verified |
| **Popup Interface** | Opens immediately with responsive UI and zero layout shift | ✅ Verified |
| **Pomodoro Timer** | Starts, pauses, resets, and switches between 25m/50m Focus & 5m/10m Break | ✅ Verified |
| **Background Persistence** | Timer continues counting down accurately even after popup is closed | ✅ Verified |
| **Desktop Notifications** | Fires upon focus completion and break expiration | ✅ Verified |
| **Study Statistics** | Increments sessions, calculates total minutes, and maintains daily streak | ✅ Verified |
| **Webpage Analyzer** | Accurately extracts word count, char count & reading time on active tabs | ✅ Verified |
| **Restricted Page Safety** | Gracefully displays friendly warning on `chrome://` or internal pages | ✅ Verified |
| **Quick Notes** | Saves notes with timestamps, displays scrollable list, deletes notes | ✅ Verified |
| **Dark/Light Mode** | Toggles theme seamlessly and persists across browser restarts | ✅ Verified |
| **Privacy & Security** | Zero telemetry, no external network requests, zero personal data collected | ✅ Verified |

---

## 🤖 Generative AI Tool & Assistance

**AI Tool Used:** Antigravity (Google DeepMind)

### AI Assistance Breakdown:
1. **Architecture & Manifest Design**: Configured clean Manifest V3 declarations with minimum required permissions (`storage`, `notifications`, `alarms`, `activeTab`, `scripting`).
2. **UI/UX Consistency**: Mirrored the visual language of the PrepMate web portal with matching indigo-violet gradient accents, compact typography, rounded cards, and smooth micro-animations.
3. **Background Service Worker**: Implemented timer alarms and message handlers that prevent timer loss when Chrome closes the popup.
4. **Content Script Safety**: Developed an isolated TreeWalker text-extraction engine that ignores hidden elements and scripts without collecting any sensitive user input.
5. **Debugging & Optimization**: Eliminated race conditions in timer countdowns and handled restricted browser URLs safely.

---

## 📝 Changes Made by Student

<!-- STUDENT SUBMISSION SECTION: Document any custom modifications, additional features, or styling tweaks made after AI generation -->

- [ ] **Custom Timer Presets**: Added custom study duration intervals (e.g. 45 min focus / 15 min break).
- [ ] **Notification Sounds**: Added custom audio alerts when timer finishes.
- [ ] **Color Palette Adjustments**: Customized accent colors in `popup.css`.
- [ ] **Website Blocking List**: Implemented an optional distraction blocker for social media sites.
- [ ] **Other Modifications**: *(Describe any other manual code changes here)*

---

## 📄 Academic Integrity & License

This Chrome Extension is developed as an academic project for student placement preparation. Built using standard Web and Chrome Extension APIs without external frameworks.
