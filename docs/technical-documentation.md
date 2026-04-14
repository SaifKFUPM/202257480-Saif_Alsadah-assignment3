# Technical Documentation - Assignments 2 & 3

## Project Architecture

This document provides technical details about the portfolio website's interactive features implemented across Assignments 2 and 3.

---

## File Structure

```
assignment-2/
├── index.html          # Main HTML document with data attributes
├── css/
│   └── styles.css      # Styles including animations and validation states
├── js/
│   └── script.js       # All JavaScript functionality
├── assets/
│   └── images/         # Image assets
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── .gitignore
└── README.md
```

---

## Features Overview

| Feature | Assignment | Requirement | Implementation |
| --- | --- | --- | --- |
| Dark/Light Theme Toggle | 1 | State Management | localStorage API + CSS variables |
| Project Filtering | 2 | Dynamic Content | Data attributes + class toggling |
| Form Validation | 2 | Complex Logic | Real-time validation + error messages |
| Toast Notifications | 2 | User Feedback | CSS animations + JavaScript |
| Scroll Animations | 2 | Animation | Scroll event + CSS transitions |
| GitHub API Integration | 3 | API Integration | Fetch API + skeleton loading + fallback |
| Project Sorting | 3 | Complex Logic | In-memory sort + data-driven render |
| Visitor Name State | 3 | State Management | localStorage + greeting banner |
| Preconnect Hint | 3 | Performance | `<link rel="preconnect">` in `<head>` |

---

## Feature 1: Project Filtering

### HTML Structure

Each project card has a `data-tags` attribute containing space-separated categories:

```html
<div class="project-card" data-tags="python networking security">
    <!-- Project content -->
</div>
```

Filter buttons have a `data-filter` attribute:

```html
<div class="filter-buttons">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="python">Python</button>
    <button class="filter-btn" data-filter="security">Security</button>
    <button class="filter-btn" data-filter="networking">Networking</button>
</div>
```

### JavaScript Logic

```javascript
function filterProjects(filter) {
    projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags');
        const shouldShow = filter === 'all' || tags.includes(filter);

        if (shouldShow) {
            card.classList.remove('hidden', 'fade-out');
        } else {
            card.classList.add('fade-out');
            setTimeout(() => card.classList.add('hidden'), 300);
        }
    });
}
```

### CSS Animation

```css
.project-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
}

.project-card.fade-out {
    opacity: 0;
    transform: scale(0.95);
}

.project-card.hidden {
    display: none;
}
```

### Flow Diagram

```
User clicks filter button
        ↓
Remove 'active' class from all buttons
        ↓
Add 'active' class to clicked button
        ↓
Get filter value from data-filter attribute
        ↓
Loop through all project cards
        ↓
    ┌─────────────────────────────────┐
    │ Does card's data-tags include   │
    │ the filter value (or is 'all')? │
    └─────────────────────────────────┘
        ↓                    ↓
       YES                   NO
        ↓                    ↓
    Show card           Add fade-out class
        ↓                    ↓
                        After 300ms, add hidden class
        ↓
Check if any cards visible
        ↓
    ┌─────────────────┐
    │ Visible count?  │
    └─────────────────┘
        ↓           ↓
       > 0          0
        ↓           ↓
    Hide empty   Show empty
    state msg    state msg
```

---

## Feature 2: Form Validation

### Validation Rules

| Field | Rules | Error Messages |
|-------|-------|----------------|
| Name | Required, min 2 chars | "Name is required" / "Name must be at least 2 characters" |
| Email | Required, valid format | "Email is required" / "Please enter a valid email address" |
| Message | Required, min 10 chars | "Message is required" / "Message must be at least 10 characters" |

### HTML Structure

```html
<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
    <span class="error-message" id="name-error"></span>
</div>
```

### Validation Functions

```javascript
function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return ''; // Empty string = valid
}
```

### CSS States

```css
input.error {
    border-color: var(--error-color);
}

input.success {
    border-color: var(--success-color);
}

.error-message {
    color: var(--error-color);
    font-size: 0.85rem;
}
```

### Event Flow

```
User types in input
        ↓
'input' event fires → Clear validation state
        ↓
User leaves input (blur)
        ↓
'blur' event fires → Run validation
        ↓
    ┌──────────────┐
    │ Valid input? │
    └──────────────┘
        ↓         ↓
       YES        NO
        ↓         ↓
    Add success  Add error class
    class        Show error message
        ↓
User submits form
        ↓
Validate ALL fields
        ↓
    ┌─────────────────┐
    │ All fields OK?  │
    └─────────────────┘
        ↓           ↓
       YES          NO
        ↓           ↓
    Show success  Show error toast
    toast         Focus first error
    Reset form
```

---

## Feature 3: Toast Notifications

### HTML Structure

```html
<div class="toast" id="toast"></div>
```

### JavaScript Implementation

```javascript
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast ' + type;
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);

    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 4000);
}
```

### CSS Animation

```css
.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast.visible {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

.toast.success {
    background-color: var(--success-bg);
    color: var(--success-color);
}

.toast.error {
    background-color: var(--error-bg);
    color: var(--error-color);
}
```

### Animation Timeline

```
0ms     → Set content and type class
10ms    → Add 'visible' class (trigger animation)
300ms   → Animation complete (toast fully visible)
4000ms  → Remove 'visible' class (trigger exit animation)
4300ms  → Toast hidden
```

---

## Feature 4: Scroll Animations

### HTML Structure

Add `fade-in` class to elements that should animate:

```html
<section id="about">
    <div class="container fade-in">
        <!-- Content -->
    </div>
</section>
```

### JavaScript Implementation

```javascript
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    const triggerBottom = window.innerHeight * 0.85;

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('load', checkFade);
window.addEventListener('scroll', checkFade);
```

### CSS Animation

```css
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```

### How It Works

```
Page loads / User scrolls
        ↓
checkFade() runs
        ↓
Calculate trigger point (85% of viewport height)
        ↓
For each .fade-in element:
        ↓
    ┌─────────────────────────────────┐
    │ Is element top < trigger point? │
    └─────────────────────────────────┘
        ↓                    ↓
       YES                   NO
        ↓                    ↓
    Add 'visible'       Keep hidden
    class               (wait for scroll)
        ↓
    CSS transition
    animates element
    into view
```

---

## Feature 5: Theme Toggle (from Assignment 1)

### localStorage Usage

```javascript
// Save preference
localStorage.setItem('theme', 'dark');

// Retrieve preference
const theme = localStorage.getItem('theme');

// Apply theme
document.documentElement.setAttribute('data-theme', theme);
```

### Theme Detection Priority

1. Check localStorage for saved preference
2. Check system preference (`prefers-color-scheme`)
3. Default to light theme

---

## CSS Variables

### Color System

```css
:root {
    /* Base colors */
    --primary-color: #2563eb;
    --bg-color: #ffffff;
    --text-color: #1e293b;
    
    /* Status colors */
    --success-color: #10b981;
    --success-bg: #d1fae5;
    --error-color: #ef4444;
    --error-bg: #fee2e2;
}

[data-theme="dark"] {
    --bg-color: #0f172a;
    --text-color: #f1f5f9;
    --success-bg: #065f46;
    --error-bg: #7f1d1d;
}
```

---

## Browser Compatibility

### Features Used

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Variables | ✅ | ✅ | ✅ | ✅ |
| CSS Transitions | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| data-* attributes | ✅ | ✅ | ✅ | ✅ |
| getBoundingClientRect | ✅ | ✅ | ✅ | ✅ |

All features work in modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+).

---

## Performance Considerations

### Optimizations Applied

1. **Debounced Scroll** — Scroll animations use simple class checking, minimal computation
2. **CSS Transitions** — Hardware-accelerated properties (transform, opacity)
3. **Event Delegation** — Filter buttons use individual listeners (only 4 buttons)
4. **Minimal DOM Manipulation** — Only classList changes, no innerHTML updates

### Potential Improvements

1. Add debouncing/throttling to scroll event for large pages
2. Use Intersection Observer API for more efficient scroll detection
3. Lazy load project images if added in future

---

## Testing Checklist

### Functional Testing

- [x] Filter buttons show correct projects
- [x] "All" button shows all projects
- [x] Empty state appears when no matches
- [x] Form validates on blur
- [x] Form validates on submit
- [x] Success toast appears on valid submit
- [x] Error toast appears on invalid submit
- [x] Theme toggle works
- [x] Theme persists on refresh
- [x] Scroll animations trigger correctly

### Responsive Testing

- [x] Mobile (320px - 480px)
- [x] Tablet (768px)
- [x] Desktop (1024px+)
- [x] Filter buttons wrap on mobile
- [x] Toast positions correctly on mobile

### Browser Testing

- [x] Chrome
- [x] Firefox
- [x] Safari
- [x] Edge

---

## Future Improvements

1. **Search** — Add text search on top of filter + sort
2. **Form Backend** — Connect form to email service (Formspree, Netlify Forms)
3. **Accessibility** — Add ARIA live regions for dynamic content updates
4. **Debounce Scroll** — Throttle the scroll animation handler for large pages

---

## Assignment 3 — New Features

### Feature 6: GitHub API Integration

#### API Flow

```text
Page loads
    ↓
3 skeleton cards rendered immediately
    ↓
fetch(github.com/users/PwnSaif/repos)
    ↓
    ┌─────────────┐       ┌────────────────────┐
    │  API success │       │   API failure       │
    └─────────────┘       └────────────────────┘
           ↓                        ↓
  state.repos = repos      state.repos = FALLBACK_REPOS
  hide fallback notice     show fallback notice
           ↓                        ↓
           └──────────┬─────────────┘
                      ↓
               renderProjects()
```

#### State Object

```javascript
const state = {
    repos: [],           // array of repo objects from API or fallback
    activeFilter: 'all', // current filter category
    activeSort: 'updated', // 'updated' | 'name-asc' | 'name-desc'
    visitorName: localStorage.getItem('visitorName') || null,
};
```

#### Tag Inference

Tags are derived at render time from repo name, description, and topics:

```javascript
function getRepoTags(repo) {
    const tags = new Set();
    const text = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase();
    if (repo.language === 'Python') tags.add('python');
    if (SECURITY_KEYWORDS.some(kw => text.includes(kw))) tags.add('security');
    if (NETWORKING_KEYWORDS.some(kw => text.includes(kw))) tags.add('networking');
    return tags;
}
```

#### Skeleton Loading CSS

```css
@keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
}

.skeleton-line {
    background: linear-gradient(90deg,
        var(--border-color) 25%,
        var(--bg-secondary) 50%,
        var(--border-color) 75%
    );
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite linear;
}
```

---

### Feature 7: Project Sorting

Filter and sort are always applied together in `renderProjects()`:

```text
state.repos
    → filter by state.activeFilter (getRepoTags)
    → sort by state.activeSort (localeCompare / default API order)
    → clear grid
    → append new cards
    → show/hide empty state
```

Sort options:

| Value | Behavior |
| --- | --- |
| `updated` | Keeps API order (pushed_at descending) |
| `name-asc` | `a.name.localeCompare(b.name)` |
| `name-desc` | `b.name.localeCompare(a.name)` |

---

### Feature 8: Visitor Name State

#### Visitor Name Flow

```text
Page loads
    ↓
Read localStorage.getItem('visitorName')
    ↓
    ┌──────────────┐       ┌──────────────────┐
    │  Name exists  │       │   No name stored  │
    └──────────────┘       └──────────────────┘
           ↓                        ↓
  Show greeting banner      Show name prompt
  Hide name prompt          Hide greeting banner
```

#### Storage Keys

| Key | Value | When Set |
| --- | --- | --- |
| `theme` | `'dark'` or `'light'` | On theme toggle |
| `visitorName` | User's entered name | On "Save" button click |

---

## Updated Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
| --- | --- | --- | --- | --- |
| CSS Variables | ✅ | ✅ | ✅ | ✅ |
| Fetch API | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| Optional chaining (`?.`) | ✅ 80+ | ✅ 74+ | ✅ 13.1+ | ✅ 80+ |
| CSS `@keyframes` | ✅ | ✅ | ✅ | ✅ |
| `dataset` API | ✅ | ✅ | ✅ | ✅ |

---

## Updated Testing Checklist

### Assignment 3

- [x] Skeleton cards appear on page load
- [x] GitHub repos load and replace skeleton cards
- [x] Fallback data shown when API unavailable (test by going offline)
- [x] Fallback notice visible when using fallback data
- [x] Filter buttons work on API-fetched repos
- [x] Sort dropdown reorders visible cards
- [x] Filter + sort work together correctly
- [x] Empty state shown when filter matches nothing
- [x] Visitor name prompt visible on first visit
- [x] Entering a name hides the prompt and shows greeting banner
- [x] Greeting banner persists across page reloads
- [x] "Change name" link clears name and re-shows prompt
- [x] All Assignment 2 features still work (no regressions)
