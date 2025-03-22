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
            // Update the nested quote-text and speaker-name elements separately
            const quoteText = el.querySelector('.quote-text');
            const speakerName = el.querySelector('.speaker-name');
            if (quoteText) {
                quoteText.textContent = quoteText.getAttribute(`data-${lang}`);
            }
            if (speakerName) {
                speakerName.textContent = speakerName.getAttribute(`data-${lang}`);
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

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    if (scrollPercentage >= 80 && !hasAppeared) {
        doodleGirl.classList.add('visible');
        hasAppeared = true;
    }
});