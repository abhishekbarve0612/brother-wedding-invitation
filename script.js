// script.js

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Fade-In Animation on Scroll
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Language Toggle
const langEnBtn = document.getElementById('lang-en');
const langHiBtn = document.getElementById('lang-hi');
const langMrBtn = document.getElementById('lang-mr');
const elements = document.querySelectorAll('[data-en]');

function setLanguage(lang) {
    elements.forEach(el => {
        // Check if the element is the chat bubble (which has nested elements)
        if (el.classList.contains('chat-bubble')) {
            // Update the nested quote-text, speaker-name, and buttons separately
            const quoteText = el.querySelector('.quote-text');
            const speakerName = el.querySelector('.speaker-name');
            const sureBtn = el.querySelector('.action-btn.sure');
            const noThanksBtn = el.querySelector('.action-btn.no-thanks');
            if (quoteText) {
                quoteText.textContent = quoteText.getAttribute(`data-${lang}`);
            }
            if (speakerName) {
                speakerName.textContent = speakerName.getAttribute(`data-${lang}`);
            }
            if (sureBtn) {
                sureBtn.textContent = sureBtn.getAttribute(`data-${lang}`);
            }
            if (noThanksBtn) {
                noThanksBtn.textContent = noThanksBtn.getAttribute(`data-${lang}`);
            }
        } else {
            // For all other elements, update the text content directly
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });
    langEnBtn.classList.toggle('active', lang === 'en');
    langHiBtn.classList.toggle('active', lang === 'hi');
    langMrBtn.classList.toggle('active', lang === 'mr');
}

langEnBtn.addEventListener('click', () => setLanguage('en'));
langHiBtn.addEventListener('click', () => setLanguage('hi'));
langMrBtn.addEventListener('click', () => setLanguage('mr'));

// RSVP Functionality
const rsvpBtn = document.querySelector('.rsvp-btn');
const rsvpForm = document.querySelector('.rsvp-form');
const form = document.getElementById('rsvpForm');

rsvpBtn.addEventListener('click', () => {
    rsvpForm.style.display = rsvpForm.style.display === 'none' ? 'block' : 'none';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    alert(`Thank you, ${name}! Your response: "${message}" has been noted.`);
    form.reset();
    rsvpForm.style.display = 'none';
});

// Doodle Girl Animation on Scroll
const doodleGirl = document.querySelector('.doodle-girl');
let hasAppeared = false;
let dismissedByButton = false; // Flag to track if doodle was dismissed by button

// Function to hide the doodle girl
function hideDoodleGirl(source) {
    doodleGirl.classList.remove('visible');
    doodleGirl.classList.add('hidden');
    if (source === 'button') {
        dismissedByButton = true; // Set flag if dismissed by button
    }
}

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    // Reset dismissedByButton when scrolling back to the top
    if (window.scrollY < 50) {
        dismissedByButton = false; // Allow reappearance after reaching top
        hasAppeared = false; // Reset appearance flag
        hideDoodleGirl('scroll'); // Hide when scrolling to top
    }

    // Show doodle girl when scrolling to 80% of the page, but only if not dismissed by button
    if (scrollPercentage >= 80 && !hasAppeared && !dismissedByButton) {
        doodleGirl.classList.remove('hidden');
        doodleGirl.classList.add('visible');
        hasAppeared = true;
    }
});

// Add event listeners to the buttons
const sureBtn = document.querySelector('.action-btn.sure');
const noThanksBtn = document.querySelector('.action-btn.no-thanks');

if (sureBtn && noThanksBtn) {
    sureBtn.addEventListener('click', () => hideDoodleGirl('button'));
    noThanksBtn.addEventListener('click', () => hideDoodleGirl('button'));
}