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
        html.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        html.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
}

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    setStoredTheme(newTheme);
}

function initTheme() {
    const storedTheme = getStoredTheme();
    
    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

themeToggle.addEventListener('click', toggleTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

initTheme();


// ==================== //
// Project Filtering     //
// ==================== //

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const emptyState = document.getElementById('no-projects');

function filterProjects(filter) {
    let visibleCount = 0;

    projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags');
        const shouldShow = filter === 'all' || tags.includes(filter);

        if (shouldShow) {
            card.classList.remove('hidden', 'fade-out');
            visibleCount++;
        } else {
            card.classList.add('fade-out');
            // Wait for animation then hide
            setTimeout(() => {
                card.classList.add('hidden');
            }, 300);
        }
    });

    // Show empty state if no projects match
    if (visibleCount === 0) {
        emptyState.classList.add('visible');
    } else {
        emptyState.classList.remove('visible');
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filter = button.getAttribute('data-filter');
        filterProjects(filter);
    });
});


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
        // Simulate form submission
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


// ==================== //
// Smooth Scroll (fallback) //
// ==================== //

// For browsers that don't support CSS smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});