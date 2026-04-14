# Saif Alsadah - Personal Portfolio (Assignment 2)

A responsive, interactive personal portfolio website built as part of SWE 363 (Web Engineering) Assignment 2 at KFUPM. This assignment builds upon Assignment 1 by adding dynamic content, form validation, animations, and enhanced user feedback.

## 🌐 Live Demo

[View Portfolio](https://saif-alsadah.netlify.app/)

## 📋 Project Overview

This portfolio showcases my skills, projects, and certifications as a Computer Science student with a concentration in Cybersecurity & Blockchain. The site features interactive project filtering, form validation, scroll animations, and a dark/light theme toggle.

### Features

**From Assignment 1:**
- Responsive Design — Works seamlessly on desktop, tablet, and mobile
- Dark/Light Theme Toggle — User preference saved to localStorage
- Smooth Navigation — CSS smooth scrolling between sections
- Modern UI — Card-based layouts, hover effects, clean typography

**New in Assignment 2:**
- **Project Filtering** — Filter projects by technology (All, Python, Security, Networking)
- **Form Validation** — Real-time validation with error messages
- **Toast Notifications** — Success/error feedback messages
- **Scroll Animations** — Fade-in effects as sections come into view
- **Empty State Handling** — User feedback when no projects match filter

## 🛠️ Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, CSS Variables, Media Queries, Transitions, Animations)
- JavaScript (DOM manipulation, localStorage, Event handling, Form validation)
- Google Fonts (Inter)

## 📁 Project Structure

```
assignment-2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Live Server extension (optional, for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SaifKFUPM/202257480-Saif_Alsadah-assignment2.git
   ```

2. Navigate to the project folder:
   ```bash
   cd 202257480-Saif_Alsadah-assignment2
   ```

3. Open `index.html` in your browser, or use Live Server in VS Code:
   - Right-click `index.html`
   - Select "Open with Live Server"

### Deployment

The site can be deployed to any static hosting service:

- **GitHub Pages**: Push to `main` branch, enable Pages in repository settings
- **Netlify**: Drag and drop the folder or connect your GitHub repo
- **Vercel**: Import from GitHub

## ✨ New Features Explained

### Project Filtering
Click the filter buttons (All, Python, Security, Networking) above the projects grid to show only matching projects. Projects animate smoothly when filtered, and an empty state message appears if no projects match.

### Form Validation
The contact form validates input in real-time:
- **Name**: Required, minimum 2 characters
- **Email**: Required, must be valid email format
- **Message**: Required, minimum 10 characters

Error messages appear below each field, and inputs show red/green borders for invalid/valid states.

### Toast Notifications
After form submission, a toast notification slides up from the bottom:
- Green for success ("Message sent successfully!")
- Red for errors ("Please fix the errors above")

### Scroll Animations
Sections fade in smoothly as you scroll down the page, creating a polished user experience.

## 🤖 AI Usage Summary

AI tools (Claude) were used during development for:

- Implementing project filtering logic with data attributes
- Creating form validation with real-time feedback
- Building toast notification system
- Adding scroll-triggered animations
- Debugging and code optimization

All AI-generated code was reviewed, understood, and modified to fit the project requirements. See [docs/ai-usage-report.md](docs/ai-usage-report.md) for detailed documentation.

## 📄 Documentation

- [AI Usage Report](docs/ai-usage-report.md) — Detailed breakdown of AI tool usage
- [Technical Documentation](docs/technical-documentation.md) — Architecture and implementation details

## 📝 License

This project is created for educational purposes as part of KFUPM coursework.

## 📧 Contact

- **Email**: saiftaheralsadah@gmail.com
- **GitHub**: [PwnSaif](https://github.com/PwnSaif)
- **LinkedIn**: [SaifAlsadah](https://www.linkedin.com/in/saifalsadah/)

---

Built by Saif Alsadah | SWE 363 - Spring 2025