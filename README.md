# PrepMate – Student Placement Preparation Portal

> **"Prepare Smarter. Get Placement Ready."**

PrepMate is a modern, student-centric, responsive web application engineered to help college engineering and computer science students systematically prepare for technical placement interviews and campus recruitment drives.

---

## 🚀 Project Overview

PrepMate provides an end-to-end placement readiness toolkit covering:
- **Interactive Aptitude Quizzes**: Real-time evaluation across Quantitative Aptitude, Logical Reasoning, and Verbal Ability with step-by-step mathematical and logical explanations.
- **DSA Practice Arena**: Filterable problem sets (Arrays, Strings, Linked Lists, Trees, Graphs, DP, Sorting, Searching) with time/space complexities, algorithm hints, and dynamic completion tracking.
- **Company Preparation Guides**: Round-by-round hiring patterns, skill roadmaps, and preparation checklists for top tech recruiters (TCS, Infosys, Wipro, Accenture, Capgemini, Cognizant, Amazon, Microsoft, Google, Deloitte).
- **Learning Resources & Cheatsheets**: Curated revision notes and top interview questions for Programming (C, C++, Java, Python), Core CS (DBMS, OS, Networks, OOP, SE), and HR Behavioral interviews (STAR methodology).
- **Student Analytics Dashboard**: Live metrics for attempted questions, accuracy percentage, solved DSA challenges, recent activity logs, and a clean reset progress function.

---

## 🛠️ Technology Stack

Built strictly adhering to beginner-friendly, framework-free web standards:
- **HTML5**: Semantic markup, accessible attributes, clean structure.
- **CSS3**: Custom design tokens, CSS variables, glassmorphism, flexbox, responsive CSS grid, light/dark themes, and micro-interactions.
- **Vanilla JavaScript (ES6+)**: Modular application logic, dynamic DOM manipulation, real-time filtering, event delegation, and state management.
- **LocalStorage API**: Persistent client-side storage for dark/light theme preferences, quiz results history, completed DSA challenges, and recent study activity.
- **Zero External Frameworks**: No React, No Vue, No Angular, No Bootstrap, No Tailwind CSS, No Node.js backend required.

---

## 📁 Folder Structure

```
PrepMate/
│
├── index.html          # Professional Landing Page (Hero, Stats, Features, How It Works, CTA)
├── aptitude.html       # Interactive Aptitude Quiz Arena with Scoring & Explanations
├── dsa.html            # Data Structures & Algorithms Problem Hub with Filters & Modal
├── companies.html      # Company-Specific Hiring Patterns & Interview Guides
├── resources.html      # Core CS & Programming Cheatsheets and Study Guides
├── dashboard.html      # Student Analytics, Visual Progress Bars & Activity Feed
│
├── css/
│   └── style.css       # Unified Design System, CSS Variables, Responsive Media Queries
│
├── js/
│   ├── data.js         # Central Dataset (18 Aptitude Qs, 20 DSA Problems, 10 Companies, 14 Topics)
│   ├── main.js         # Theme Switcher, Mobile Hamburger, Modals, Toasts, Activity Logging
│   ├── aptitude.js     # Quiz Navigation, Option Selection, Scoring & Detailed Review Engine
│   ├── dsa.js          # DSA Filtering, Real-time Search, Problem Modal & Solved Tracking
│   └── dashboard.js    # Metric Aggregation, Readiness Scoring & Progress Reset Handler
│
├── assets/
│   └── images/         # Static graphic assets & images directory
│
└── README.md           # Project Documentation & Academic Submission Notes
```

---

## 🖥️ How to Run the Website

You can run PrepMate without installing any dependencies:

### Method 1: Direct File Execution
1. Open the project folder in File Explorer.
2. Double-click **`index.html`** to launch it directly in any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server (VS Code / Python / Node)
- **Using Python 3**:
  ```bash
  python -m http.server 3000
  ```
  Open `http://localhost:3000` in your browser.
- **Using VS Code Live Server**:
  Right-click `index.html` and select **"Open with Live Server"**.

---

## 🤖 Generative AI Tool & Assistance

**AI Tool Used:** Antigravity (Google DeepMind)

### AI Assistance Breakdown:
1. **Code Generation**: Structured modular HTML5, Vanilla CSS3 styling, and clean ES6 JavaScript without external dependencies.
2. **UI/UX Design**: Crafted a modern, student-focused design system with sleek gradients, subtle shadows, rounded cards, and seamless light/dark mode support.
3. **JavaScript Functionality**: Engineered quiz scoring state machines, dynamic multi-attribute filtering for DSA and Companies, and robust LocalStorage persistence.
4. **Debugging & Optimization**: Verified event handlers, modal lifecycles, and cross-browser responsiveness across standard desktop (1920px/1366px), tablet (768px), and mobile (390px) viewports.
5. **Testing**: Audited zero console errors, smooth navigation state transitions, and safe LocalStorage key handling.

---

## 📝 Changes Made by Student

<!-- STUDENT SUBMISSION SECTION: Fill this section with any manual modifications, new questions, or customizations you made after AI generation -->

- [ ] **Custom Questions Added**: Added custom university aptitude questions into `js/data.js`.
- [ ] **Styling & Color Tweaks**: Customized brand accent colors and font sizes in `css/style.css`.
- [ ] **Additional Companies**: Added specific regional recruiters and college campus drive details in `js/data.js`.
- [ ] **Resume / Notes Links**: Added personalized college lecture notes to `resources.html`.
- [ ] **Other Modifications**: *(Describe any other changes made here)*

---

## 📄 License & Academic Integrity

This project was developed for academic learning and placement preparation purposes. All company names and trademarks are used for educational reference only.
