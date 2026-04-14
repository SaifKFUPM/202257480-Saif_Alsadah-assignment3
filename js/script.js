// ==================== //
// State                 //
// ==================== //

const state = {
    repos: [],
    activeFilter: 'all',
    activeSort: 'updated',
    visitorName: localStorage.getItem('visitorName') || null,
};


// ==================== //
// Theme Toggle          //
// ==================== //

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function getStoredTheme() {
    return localStorage.getItem('theme');
}

function setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        html.dataset.theme = 'dark';
        themeToggle.textContent = '☀️';
    } else {
        delete html.dataset.theme;
        themeToggle.textContent = '🌙';
    }
}

function toggleTheme() {
    const currentTheme = html.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);
    setStoredTheme(newTheme);
}

function initTheme() {
    const storedTheme = getStoredTheme();

    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

themeToggle.addEventListener('click', toggleTheme);

globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

initTheme();


// ==================== //
// Visitor Name          //
// ==================== //

const visitorBanner = document.getElementById('visitor-banner');
const visitorBannerName = document.getElementById('visitor-banner-name');
const namePrompt = document.getElementById('name-prompt');
const visitorNameInput = document.getElementById('visitor-name-input');
const saveNameBtn = document.getElementById('save-name-btn');
const changeNameLink = document.getElementById('change-name-link');

function initVisitorName() {
    if (state.visitorName) {
        visitorBannerName.textContent = state.visitorName;
        visitorBanner.classList.add('visible');
        namePrompt.classList.add('hidden');
    } else {
        visitorBanner.classList.remove('visible');
        namePrompt.classList.remove('hidden');
    }
}

saveNameBtn.addEventListener('click', () => {
    const name = visitorNameInput.value.trim();
    if (name.length >= 2) {
        state.visitorName = name;
        localStorage.setItem('visitorName', name);
        visitorNameInput.value = '';
        visitorNameInput.classList.remove('error');
        initVisitorName();
    } else {
        visitorNameInput.classList.add('error');
    }
});

// Allow Enter key to save name
visitorNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveNameBtn.click();
});

// Clear error state while typing
visitorNameInput.addEventListener('input', () => {
    visitorNameInput.classList.remove('error');
});

changeNameLink.addEventListener('click', (e) => {
    e.preventDefault();
    state.visitorName = null;
    localStorage.removeItem('visitorName');
    initVisitorName();
    // Scroll to about section so name prompt is visible
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

initVisitorName();


// ========================== //
// GitHub API + Projects       //
// ========================== //

const GITHUB_USERNAME = 'PwnSaif';

// Fallback project data — shown if GitHub API is unavailable
const FALLBACK_REPOS = [
    {
        id: 1,
        name: 'chatbot',
        description: 'Real-time client-server chat system using Python sockets with multi-threaded connection handling and Tkinter GUI. Features message broadcasting, user authentication, and command handling.',
        language: 'Python',
        html_url: 'https://github.com/PwnSaif/chatbot',
        pushed_at: '2024-01-05T00:00:00Z',
        topics: ['networking'],
    },
    {
        id: 2,
        name: 'port-scanner',
        description: 'Multi-threaded TCP port scanner capable of scanning configurable port ranges with timeout handling and open/closed/filtered classification.',
        language: 'Python',
        html_url: 'https://github.com/PwnSaif/port-scanner',
        pushed_at: '2024-01-04T00:00:00Z',
        topics: ['networking', 'security'],
    },
    {
        id: 3,
        name: 'hash-cracker',
        description: 'Dictionary-based MD5 hash cracker that iterates a wordlist and compares computed hashes against a target. Relevant to credential-security analysis.',
        language: 'Python',
        html_url: 'https://github.com/PwnSaif/hash-cracker',
        pushed_at: '2024-01-03T00:00:00Z',
        topics: ['security'],
    },
    {
        id: 4,
        name: 'password-gen',
        description: "Configurable generator using Python's cryptographically secure random module, supporting custom length and character-set options.",
        language: 'Python',
        html_url: 'https://github.com/PwnSaif/password-gen',
        pushed_at: '2024-01-02T00:00:00Z',
        topics: ['security'],
    },
    {
        id: 5,
        name: 'http-analyser',
        description: 'Tool to send HTTP requests and inspect status codes and response headers for web-application security assessment.',
        language: 'Python',
        html_url: 'https://github.com/PwnSaif/http-analyser',
        pushed_at: '2024-01-01T00:00:00Z',
        topics: ['networking', 'security'],
    },
];

// Keywords used to map a repo to filter categories
const SECURITY_KEYWORDS = ['security', 'hash', 'cracker', 'password', 'vuln', 'exploit', 'pentest', 'malware', 'forensic', 'ctf', 'reverse', 'xss', 'sqli', 'injection', 'crypto'];
const NETWORKING_KEYWORDS = ['network', 'port', 'scanner', 'socket', 'http', 'tcp', 'udp', 'chat', 'server', 'client', 'request', 'analyser', 'analyzer', 'packet', 'proxy'];

// Derive filter tags from a repo object
function getRepoTags(repo) {
    const tags = new Set();
    const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();

    if (repo.language === 'Python') tags.add('python');
    if (SECURITY_KEYWORDS.some(kw => text.includes(kw))) tags.add('security');
    if (NETWORKING_KEYWORDS.some(kw => text.includes(kw))) tags.add('networking');

    return tags;
}

// Convert a kebab/snake_case repo name to Title Case for display
function formatRepoName(name) {
    return name.replaceAll(/[-_]/g, ' ').replaceAll(/\b\w/g, c => c.toUpperCase());
}

// Safely escape user-provided content before inserting into the DOM
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Build a project card element from a repo object
function createProjectCard(repo) {
    const techTags = [];
    if (repo.language) techTags.push(repo.language);
    (repo.topics || []).slice(0, 3).forEach(t => {
        const label = t.charAt(0).toUpperCase() + t.slice(1);
        if (!techTags.includes(label)) techTags.push(label);
    });

    const tagsHtml = techTags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');

    const card = document.createElement('div');
    card.className = 'project-card fade-in visible';
    card.innerHTML = `
        <div class="project-content">
            <h3>${escapeHtml(formatRepoName(repo.name))}</h3>
            <p>${escapeHtml(repo.description || 'No description available.')}</p>
            <div class="project-tech">${tagsHtml}</div>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                View on GitHub →
            </a>
        </div>
    `;
    return card;
}

// Build a skeleton placeholder card shown while loading
function createSkeletonCard() {
    const card = document.createElement('div');
    card.className = 'project-card skeleton';
    card.innerHTML = `
        <div class="project-content">
            <div class="skeleton-line skeleton-title"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line skeleton-short"></div>
        </div>
    `;
    return card;
}

const projectsGrid = document.getElementById('projects-grid');
const emptyState = document.getElementById('no-projects');
const fallbackNotice = document.getElementById('api-fallback-notice');

// Filter, sort, then render all project cards from state.repos
function renderProjects() {
    projectsGrid.innerHTML = '';

    let filtered = state.repos.filter(repo => {
        if (state.activeFilter === 'all') return true;
        return getRepoTags(repo).has(state.activeFilter);
    });

    if (state.activeSort === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.activeSort === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    // 'updated' keeps the default pushed_at-descending order from the API

    if (filtered.length === 0) {
        emptyState.classList.add('visible');
    } else {
        emptyState.classList.remove('visible');
        filtered.forEach(repo => projectsGrid.appendChild(createProjectCard(repo)));
    }
}

function fetchGitHubRepos() {
    // Show skeleton cards while waiting for the API
    for (let i = 0; i < 3; i++) {
        projectsGrid.appendChild(createSkeletonCard());
    }

    fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
        { headers: { 'Accept': 'application/vnd.github+json' } }
    )
        .then(res => {
            if (!res.ok) throw new Error(`GitHub API responded with status ${res.status}`);
            return res.json();
        })
        .then(repos => {
            // Exclude forks — only show original work
            state.repos = repos.filter(r => !r.fork);
            fallbackNotice.classList.remove('visible');
            renderProjects();
        })
        .catch(err => {
            // Fall back to the hardcoded project list on any network or API error
            console.warn('GitHub API unavailable, using fallback data:', err);
            state.repos = FALLBACK_REPOS;
            fallbackNotice.classList.add('visible');
            renderProjects();
        });
}

// Filter buttons — update state and re-render
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        state.activeFilter = button.dataset.filter;
        renderProjects();
    });
});

// Sort dropdown — update state and re-render
document.getElementById('sort-select').addEventListener('change', (e) => {
    state.activeSort = e.target.value;
    renderProjects();
});

// Start the GitHub fetch on page load
fetchGitHubRepos();


// ==================== //
// Form Validation       //
// ==================== //

const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const toast = document.getElementById('toast');

// Validation helper functions
function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
}

function clearValidation(input, errorElement) {
    input.classList.remove('error', 'success');
    errorElement.textContent = '';
}

// Validation rules
function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateMessage(message) {
    if (!message.trim()) {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters';
    }
    return '';
}

// Real-time validation on blur
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    const errorElement = document.getElementById('name-error');
    if (error) {
        showError(nameInput, errorElement, error);
    } else {
        showSuccess(nameInput, errorElement);
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    const errorElement = document.getElementById('email-error');
    if (error) {
        showError(emailInput, errorElement, error);
    } else {
        showSuccess(emailInput, errorElement);
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    const errorElement = document.getElementById('message-error');
    if (error) {
        showError(messageInput, errorElement, error);
    } else {
        showSuccess(messageInput, errorElement);
    }
});

// Clear validation on input
nameInput.addEventListener('input', () => {
    clearValidation(nameInput, document.getElementById('name-error'));
});

emailInput.addEventListener('input', () => {
    clearValidation(emailInput, document.getElementById('email-error'));
});

messageInput.addEventListener('input', () => {
    clearValidation(messageInput, document.getElementById('message-error'));
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const messageError = validateMessage(messageInput.value);

    // Show errors if any
    if (nameError) {
        showError(nameInput, document.getElementById('name-error'), nameError);
    } else {
        showSuccess(nameInput, document.getElementById('name-error'));
    }

    if (emailError) {
        showError(emailInput, document.getElementById('email-error'), emailError);
    } else {
        showSuccess(emailInput, document.getElementById('email-error'));
    }

    if (messageError) {
        showError(messageInput, document.getElementById('message-error'), messageError);
    } else {
        showSuccess(messageInput, document.getElementById('message-error'));
    }

    // If no errors, submit form
    if (!nameError && !emailError && !messageError) {
        showToast('Message sent successfully! Thank you for reaching out.', 'success');

        // Reset form
        contactForm.reset();
        clearValidation(nameInput, document.getElementById('name-error'));
        clearValidation(emailInput, document.getElementById('email-error'));
        clearValidation(messageInput, document.getElementById('message-error'));
    } else {
        showToast('Please fix the errors above.', 'error');
    }
});


// ==================== //
// Toast Notifications   //
// ==================== //

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast ' + type;

    // Show toast
    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);

    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 4000);
}


// ==================== //
// Scroll Animations     //
// ==================== //

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

// Check on load
window.addEventListener('load', checkFade);

// Check on scroll
window.addEventListener('scroll', checkFade);


// ========================= //
// Smooth Scroll (fallback)  //
// ========================= //

// For browsers that don't support CSS smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if handled by visitor name change link
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});
