# Saif Alsadah - Personal Portfolio (Assignment 3)

A responsive, interactive personal portfolio website built as part of SWE 363 (Web Engineering) Assignment 3 at KFUPM. This assignment builds upon Assignments 1 and 2 by adding API integration, advanced state management, complex filtering and sorting logic, and performance optimizations.

## 🌐 Live Demo

[View Portfolio](https://saif-alsadah.netlify.app/)

## 📋 Project Overview

This portfolio showcases my skills, projects, and certifications as a Computer Science student with a concentration in Cybersecurity & Networking. The site dynamically fetches GitHub repositories, supports project filtering and sorting, greets returning visitors by name, and is optimized for fast load times.

### Features

**From Assignment 1:**
- Responsive Design — Works seamlessly on desktop, tablet, and mobile
- Dark/Light Theme Toggle — User preference saved to localStorage
- Smooth Navigation — CSS smooth scrolling between sections
- Modern UI — Card-based layouts, hover effects, clean typography

**From Assignment 2:**
- **Project Filtering** — Filter projects by technology (All, Python, Security, Networking)
- **Form Validation** — Real-time validation with error messages
- **Toast Notifications** — Success/error feedback messages
- **Scroll Animations** — Fade-in effects as sections come into view

**New in Assignment 3:**
- **GitHub API Integration** — Live project cards fetched from the GitHub API; skeleton loading cards shown while waiting; graceful fallback to saved data if the API is unavailable
- **Project Sorting** — Sort by Most Recent, Name A–Z, or Name Z–A on top of the active filter
- **Visitor Name State** — Greeting banner for returning visitors; name stored in localStorage; prompt shown to first-time visitors
- **Performance** — `preconnect` hint for the GitHub API, font `display=swap` already in place

## 🛠️ Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, CSS Variables, Media Queries, Transitions, Animations)
- JavaScript (DOM manipulation, Fetch API, localStorage, Event handling, Form validation)
- GitHub REST API v3
- Google Fonts (Inter)

## 📁 Project Structure

```
202257480-Saif_Alsadah-assignment3/
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
   git clone https://github.com/PwnSaif/202257480-Saif_Alsadah-assignment3.git
   ```

2. Navigate to the project folder:
   ```bash
   cd 202257480-Saif_Alsadah-assignment3
   ```

3. Open `index.html` in your browser, or use Live Server in VS Code:
   - Right-click `index.html`
   - Select "Open with Live Server"

### Deployment

The site can be deployed to any static hosting service:

- **GitHub Pages**: Push to `main` branch, enable Pages in repository settings
- **Netlify**: Drag and drop the folder or connect your GitHub repo
- **Vercel**: Import from GitHub

## ✨ Features Explained

### GitHub API Integration

On page load the site fetches public repositories from the GitHub API (`PwnSaif`). Three skeleton loading cards animate while the request is in flight. Each card shows the repo name, description, language, and topics. If the API is unavailable (rate limit or offline), the site falls back to a saved list of projects and shows a notice.

### Project Filtering & Sorting

Use the filter buttons to narrow projects by category (All, Python, Security, Networking). The sort dropdown works on top of the active filter:

- **Most Recent** — default, ordered by last push date
- **Name A–Z / Z–A** — alphabetical

### Visitor Name State

First-time visitors see a small prompt in the About section asking for their name. On save, it is stored in localStorage and a personalized greeting banner appears at the top of every future visit. A "Change name" link clears the stored name and re-shows the prompt.

### Form Validation

The contact form validates input in real-time:

- **Name**: Required, minimum 2 characters
- **Email**: Required, must be valid email format
- **Message**: Required, minimum 10 characters

### Toast Notifications

After form submission, a toast notification slides up from the bottom:

- Green for success ("Message sent successfully!")
- Red for errors ("Please fix the errors above")

### Scroll Animations
Sections fade in smoothly as you scroll down the page.

## 🤖 AI Usage Summary

Claude (Anthropic) was used throughout development for:

- Architecture planning and state management design
- GitHub Fetch API integration and error handling
- Skeleton loading card implementation
- Project sorting logic (filter + sort pipeline)
- Visitor name prompt and localStorage state
- Debugging linter warnings and code review

All AI-generated code was reviewed, understood, and modified. See [docs/ai-usage-report.md](docs/ai-usage-report.md) for detailed documentation.

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