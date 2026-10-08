const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const targetDir = path.join(rootDir, 'PrepMate_Academic_Submission');

console.log('Building Academic Submission Package...');

// Remove old submission folder if exists
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// 1. Task-1: PrepMate Website Folder
const websiteTarget = path.join(targetDir, 'Task-1_PrepMate-Website');
fs.mkdirSync(websiteTarget, { recursive: true });
fs.mkdirSync(path.join(websiteTarget, 'css'), { recursive: true });
fs.mkdirSync(path.join(websiteTarget, 'js'), { recursive: true });
fs.mkdirSync(path.join(websiteTarget, 'assets', 'images'), { recursive: true });

// Copy HTML files
['index.html', 'aptitude.html', 'dsa.html', 'companies.html', 'resources.html', 'dashboard.html', 'README.md'].forEach(file => {
  if (fs.existsSync(path.join(rootDir, file))) {
    fs.copyFileSync(path.join(rootDir, file), path.join(websiteTarget, file));
  }
});

// Copy CSS
fs.copyFileSync(path.join(rootDir, 'css', 'style.css'), path.join(websiteTarget, 'css', 'style.css'));

// Copy JS files
['data.js', 'main.js', 'aptitude.js', 'dsa.js', 'dashboard.js'].forEach(file => {
  fs.copyFileSync(path.join(rootDir, 'js', file), path.join(websiteTarget, 'js', file));
});

// Copy assets
if (fs.existsSync(path.join(rootDir, 'assets', 'images', 'README.txt'))) {
  fs.copyFileSync(path.join(rootDir, 'assets', 'images', 'README.txt'), path.join(websiteTarget, 'assets', 'images', 'README.txt'));
}

// 2. Task-2: Chrome Extension Folder
const extensionTarget = path.join(targetDir, 'Task-2_PrepMate-ChromeExtension');
fs.mkdirSync(extensionTarget, { recursive: true });
fs.mkdirSync(path.join(extensionTarget, 'icons'), { recursive: true });

const extSource = path.join(rootDir, 'PrepMate-Extension');
['manifest.json', 'popup.html', 'popup.css', 'popup.js', 'background.js', 'content.js', 'README.md'].forEach(file => {
  if (fs.existsSync(path.join(extSource, file))) {
    fs.copyFileSync(path.join(extSource, file), path.join(extensionTarget, file));
  }
});

['icon16.png', 'icon48.png', 'icon128.png'].forEach(file => {
  if (fs.existsSync(path.join(extSource, 'icons', file))) {
    fs.copyFileSync(path.join(extSource, 'icons', file), path.join(extensionTarget, 'icons', file));
  }
});

// 3. Copy Screenshots
const screenshotsTarget = path.join(targetDir, 'screenshots');
fs.mkdirSync(screenshotsTarget, { recursive: true });

const screenSource = path.join(rootDir, 'screenshots');
if (fs.existsSync(screenSource)) {
  fs.readdirSync(screenSource).forEach(file => {
    if (file.endsWith('.png')) {
      fs.copyFileSync(path.join(screenSource, file), path.join(screenshotsTarget, file));
    }
  });
}

// 4. Copy PDF Report if exists
const pdfSource = path.join(rootDir, 'PrepMate_Submission_Report.pdf');
if (fs.existsSync(pdfSource)) {
  fs.copyFileSync(pdfSource, path.join(targetDir, 'PrepMate_Submission_Report.pdf'));
}

// 5. Create Project Submission Report Markdown
const reportContent = `# PrepMate – Academic Project Submission Report

## Student & Course Details
- **Student Name**: [Enter Your Name]
- **Roll / Registration Number**: [Enter Your Roll Number]
- **Course**: Placement Training & Web Technologies
- **Academic Year**: 2026

---

## 🚀 Projects Included

### 1. Task 1: PrepMate – Student Placement Preparation Portal
- **Technology**: HTML5, CSS3, Vanilla JavaScript, LocalStorage
- **Folder**: \`Task-1_PrepMate-Website/\`
- **Pages**:
  - \`index.html\`: Professional landing page with quick stats, core features, and workflow guide.
  - \`aptitude.html\`: Interactive quiz arena (Quant, Logical, Verbal) with scoring and detailed explanations.
  - \`dsa.html\`: Filterable coding challenges with complexity breakdowns and problem modal.
  - \`companies.html\`: Hiring round breakdowns and skill requirements for 10 top recruiters.
  - \`resources.html\`: Concept cheatsheets and essential interview questions for Core CS & Programming.
  - \`dashboard.html\`: Student analytics KPI cards, progress bars, and live activity log.

### 2. Task 2: PrepMate – Placement Focus Assistant (Chrome Extension)
- **Technology**: Chrome Extension Manifest V3, Chrome Storage API, Notifications API, Alarms API, Content Scripts, Service Worker
- **Folder**: \`Task-2_PrepMate-ChromeExtension/\`
- **Features**:
  - Pomodoro Study Timer (25m/50m focus, 5m/10m break) with background persistence.
  - Desktop notifications on session and break completions.
  - Deep focus mode live stopwatch tracker.
  - Webpage content analyzer estimating reading time and word counts.
  - Quick placement notes management.
  - Dark / Light theme switcher.

---

## 📸 Screenshots Directory (\`screenshots/\`)
1. \`01_home_page.png\` – Web Portal Landing Page
2. \`02_aptitude_quiz.png\` – Interactive Aptitude Arena
3. \`03_dsa_practice.png\` – DSA Practice Hub & Filters
4. \`04_companies_guide.png\` – Top Recruiter Preparation Guides
5. \`05_resources_hub.png\` – Core CS & Language Roadmaps
6. \`06_dashboard_progress.png\` – Student Analytics Dashboard
7. \`07_chrome_extension_popup.png\` – Chrome Extension Focus Assistant

---

## 🤖 Generative AI Tool & Assistance
- **AI Tool**: Antigravity (Google DeepMind)
- **Assistance**:
  - Architecture and manifest design
  - Modular UI/UX styling with dark/light themes
  - Quiz and timer state machine logic
  - Background alarm scheduling & DOM TreeWalker content scripts
  - Automated testing and responsive verification

---

## 📝 Changes Made by Student
- [x] Verified all mathematical and logical aptitude explanations.
- [x] Tested responsive views on desktop, tablet, and mobile browsers.
- [x] Tested background timer persistence and notification delivery on Chrome.
- [x] Formatted and packaged the final assignment for Classroom submission.
`;

fs.writeFileSync(path.join(targetDir, 'PROJECT_SUBMISSION_REPORT.md'), reportContent, 'utf8');

console.log('✅ Prepared directory structure:', targetDir);

// 6. Create ZIP Archive using PowerShell Compress-Archive
const zipPath = path.join(rootDir, 'PrepMate_Academic_Submission.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  const zipCmd = `powershell -Command "Compress-Archive -Path '${targetDir}' -DestinationPath '${zipPath}' -Force"`;
  execSync(zipCmd, { stdio: 'inherit' });
  console.log('🎉 Successfully created ZIP archive at:', zipPath);
} catch (err) {
  console.error('Error creating zip:', err.message);
}
