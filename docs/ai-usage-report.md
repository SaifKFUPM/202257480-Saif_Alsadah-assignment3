# AI Usage Report - Assignments 2 & 3

## Overview

This document outlines how AI tools were used during the development of my personal portfolio website across SWE 363 Assignments 2 and 3.

---

## Tools Used & Use Cases

### Claude (Anthropic)

**Primary AI assistant used throughout the project.**

### Assignment 2

| Use Case | How It Helped |
|----------|---------------|
| Project Filtering | Asked for guidance on implementing filter buttons with data attributes. Learned about `data-*` attributes and how to use them for filtering DOM elements. |
| Form Validation | Requested help building real-time form validation. Received explanations of validation patterns, regex for email, and how to show/hide error messages. |
| Toast Notifications | Asked how to create animated notification messages. Learned about CSS transforms, transitions, and timing with JavaScript setTimeout. |
| Scroll Animations | Requested implementation of fade-in effects on scroll. Understood Intersection Observer concept and simpler scroll-based detection. |
| Code Review | Submitted code for review to identify bugs and improvements. |
| Documentation | Used Claude to help structure documentation for the new features. |

### Assignment 3

| Use Case | How It Helped |
|----------|---------------|
| Architecture Planning | Discussed how to centralize application state in a single `state` object to support API data, active filter, sort order, and visitor name in one place. |
| GitHub API Integration | Received guidance on using `fetch` with the GitHub REST API, handling non-OK responses, and graceful degradation to fallback data. |
| Skeleton Loading Cards | Learned how to create shimmer-animated placeholder cards using a CSS `@keyframes` gradient and linear-gradient `background-size` trick. |
| Filter + Sort Pipeline | Asked how to combine filtering and sorting on an in-memory array before re-rendering rather than toggling CSS classes on static DOM nodes. |
| Visitor Name State | Discussed patterns for persisting user state with localStorage, toggling UI elements based on stored values, and using `delete obj.prop` for dataset removal. |
| Linter Warnings | Claude identified and fixed warnings: `dataset` over `getAttribute`, `replaceAll` over `replace`, `globalThis` over `window`, and optional chaining. |
| XSS Prevention | Guided the use of `document.createTextNode` inside a temporary `<div>` to safely escape API-sourced strings before inserting them as HTML. |

---

## Benefits & Challenges

### Benefits

1. **Faster Implementation** — AI provided working code patterns that I could study and adapt, speeding up development significantly.

2. **Learning New Concepts** — Learned about `data-*` attributes for storing metadata on HTML elements, which I hadn't used before.

3. **Best Practices** — AI suggested patterns like separating validation logic into reusable functions, which made the code cleaner and more maintainable.

4. **Debugging Help** — When my filter animation wasn't working correctly, AI helped identify the timing issue between CSS transitions and JavaScript class changes.

5. **Comprehensive Features** — AI helped me think through edge cases like empty states and form validation feedback that I might have overlooked.

### Challenges

1. **Understanding Complex Logic** — The scroll animation code took time to fully understand. I had to step through it manually to grasp how `getBoundingClientRect()` works.

2. **Integration Issues** — Some AI-generated code needed modification to work with my existing CSS variables and class naming conventions.

3. **Over-Engineering Risk** — AI sometimes suggested more complex solutions than necessary. I had to simplify some implementations.

4. **Testing Required** — All code needed thorough testing across different browsers and screen sizes.

---

## Learning Outcomes

### Technical Skills Gained

1. **Data Attributes**
   - Using `data-*` attributes to store metadata on HTML elements
   - Accessing data attributes with `element.getAttribute('data-*')` and `element.dataset`
   - Filtering elements based on data attribute values

2. **Form Validation**
   - Client-side validation patterns
   - Regular expressions for email validation
   - Real-time validation on blur vs. submit
   - Managing input states (error, success, neutral)

3. **CSS Animations & Transitions**
   - Combining CSS transitions with JavaScript class toggling
   - Using `transform` and `opacity` for smooth animations
   - Timing animations with `setTimeout`
   - Creating slide-in/fade-in effects

4. **User Feedback Patterns**
   - Toast notification implementation
   - Empty state handling
   - Error message positioning and styling
   - Visual feedback for form validation

5. **Event Handling**
   - Multiple event listeners on related elements
   - Event delegation concepts
   - Scroll event optimization

### Conceptual Understanding

- **Progressive Enhancement** — Features work without JavaScript, but are enhanced with it
- **User Experience** — Importance of feedback for every user action
- **Accessibility** — Error messages should be visible and clear
- **Performance** — Animations should be smooth and not impact scrolling

---

## Responsible Use & Modifications

### How I Ensured Academic Integrity

1. **Understanding Before Accepting**
   - For every code suggestion, I traced through the logic step by step
   - Asked follow-up questions when I didn't understand something
   - Made sure I could explain each function's purpose

2. **Active Modification**
   - Changed variable names to match my naming conventions
   - Adjusted timing values for animations based on testing
   - Modified validation rules to fit my requirements
   - Integrated with my existing CSS variables

3. **Testing & Debugging**
   - Tested all features across Chrome, Firefox, and Safari
   - Tested responsive behavior at multiple breakpoints
   - Fixed issues that arose during testing independently

### Specific Modifications Made

| AI Suggestion | My Modification |
|---------------|-----------------|
| Generic filter categories | Changed to Python, Security, Networking to match my actual projects |
| Basic email regex | Kept simple regex after researching that complex patterns often reject valid emails |
| 3-second toast duration | Changed to 4 seconds for better readability |
| Intersection Observer for scroll | Simplified to scroll event + getBoundingClientRect for better browser support |
| Generic error messages | Customized messages to be more helpful ("at least 10 characters" instead of "too short") |
| Separate validation file | Kept in main script.js since the file is still manageable in size |

### Code I Wrote Independently

- HTML structure modifications for filter buttons and data attributes
- CSS color scheme adjustments for dark mode toast messages
- Integration of new features with existing theme toggle
- All content (project descriptions, filter categories)
- Testing and bug fixes

---

## Feature-by-Feature AI Interaction

### 1. Project Filtering

**What I asked:** "How can I filter project cards based on category buttons?"

**What I learned:**
- Using `data-tags` attribute to store multiple categories
- `classList.add/remove` for showing/hiding elements
- Adding animation delays for smooth transitions

**My modifications:**
- Added specific categories matching my projects
- Implemented fade-out animation before hiding
- Added empty state message

### 2. Form Validation

**What I asked:** "How do I validate a contact form with real-time feedback?"

**What I learned:**
- Validation on `blur` event for real-time feedback
- Clearing validation on `input` event for better UX
- Separating validation logic into reusable functions

**My modifications:**
- Adjusted minimum character requirements
- Added success state styling (green border)
- Customized error messages

### 3. Toast Notifications

**What I asked:** "How can I show success/error messages after form submission?"

**What I learned:**
- Fixed positioning for toast placement
- CSS transforms for slide-in animation
- Auto-dismiss with setTimeout

**My modifications:**
- Adjusted positioning for mobile responsiveness
- Changed colors to match my theme
- Added dark mode support for toast colors

### 4. Scroll Animations

**What I asked:** "How do I make sections fade in as the user scrolls?"

**What I learned:**
- Using `getBoundingClientRect()` to detect element position
- Trigger point calculation (85% of viewport height)
- Adding `visible` class when element enters viewport

**My modifications:**
- Adjusted trigger point for better timing
- Added the animation to container divs instead of sections
- Ensured animations don't re-trigger on scroll up

---

## Assignment 3 — Additional Learning Outcomes

### New Technical Skills (Assignment 3)

1. **Fetch API & Error Handling** — Using `fetch` with `.then/.catch`, throwing on non-OK HTTP status, and providing user-visible fallback content rather than silently failing.

2. **Data-Driven Rendering** — Replacing static DOM manipulation (show/hide classes) with a `renderProjects()` function that rebuilds the grid from a filtered and sorted in-memory array — more flexible and easier to reason about.

3. **Skeleton Loading UX** — CSS shimmer animation using `background-position` on a gradient to communicate loading state without blocking the UI.

4. **localStorage State Patterns** — Reading on page load, writing on user action, clearing on request, and keeping a mirrored in-memory copy (`state.visitorName`) so the rest of the code never reads from storage directly.

5. **XSS Safety with API Data** — Using a temporary DOM node and `createTextNode` to escape untrusted strings from the GitHub API before inserting them as HTML.

6. **Modern JS Best Practices** — `dataset` over `getAttribute`, `replaceAll` over regex `replace`, `globalThis` over `window`, optional chaining (`?.`) — flagged by the linter and understood before fixing.

### Assignment 3 Modifications Made

| AI Suggestion | My Modification |
| --- | --- |
| Include all repos in the grid | Added `.filter(r => !r.fork)` to exclude forked repos |
| Show topics array as-is | Capped at 3 topics per card to keep cards compact |
| Generic keyword lists | Tuned security/networking keyword arrays to match my actual project names |
| Fetch inside async function | Converted to `.then/.catch` chain to avoid linter warning about top-level async calls |
| Banner as fixed overlay | Changed to a full-width bar above `<main>` so it doesn't cover content |
| Store name directly in event handler | Mirrored name in `state.visitorName` first, then called `initVisitorName()` to keep UI logic in one place |

---

## Conclusion

AI tools accelerated my development process across both assignments, particularly for implementing patterns I was encountering for the first time (real-time validation, Fetch API, skeleton loading). The key discipline was treating every suggestion as a starting point — studying it, modifying it to fit my design, and testing it thoroughly before accepting it.

For each feature I followed this process:

1. Ask AI for guidance and explanation
2. Study the suggested code line by line
3. Implement and modify to fit my project
4. Test across browsers and screen sizes
5. Debug issues independently when possible

This approach ensured I understood every line of code while still benefiting from AI assistance. The result is a portfolio with polished, well-reasoned features I can confidently explain and extend.
