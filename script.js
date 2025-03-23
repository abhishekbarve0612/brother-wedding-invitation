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

// Doodle Girl Animation (Trigger on Reception Section Visibility)
const doodleGirl = document.querySelector('.doodle-girl');
let hasAppeared = false;
let dismissedByButton = false; // Flag to track if doodle was dismissed by button

function hideDoodleGirl(source) {
    doodleGirl.classList.remove('visible');
    doodleGirl.classList.add('hidden');
    if (source === 'button') {
        dismissedByButton = true;
    }
}

function showDoodleGirl() {
    if (!hasAppeared && !dismissedByButton) {
        doodleGirl.classList.remove('hidden');
        doodleGirl.classList.add('visible');
        hasAppeared = true;
    }
}

// Trigger doodle girl when Reception section is 30% in view
const receptionSection = document.getElementById('reception-inviters');
const doodleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showDoodleGirl();
        }
    });
}, { threshold: 0.3 });

if (receptionSection) {
    doodleObserver.observe(receptionSection);
}

// Hide doodle girl when scrolling back to the top (Hero section)
window.addEventListener('scroll', () => {
    if (window.scrollY < 50) {
        dismissedByButton = false; // Allow reappearance after reaching top
        hasAppeared = false; // Reset appearance flag
        hideDoodleGirl('scroll'); // Hide when scrolling to top
    }
});

// Add event listener to the "Sure" button
const sureBtn = document.querySelector('.action-btn.sure');
if (sureBtn) {
    sureBtn.addEventListener('click', () => hideDoodleGirl('button'));
}

// Language Toggle
const langEnBtn = document.getElementById('lang-en');
const langHiBtn = document.getElementById('lang-hi');
const langMrBtn = document.getElementById('lang-mr');
const elements = document.querySelectorAll('[data-en]');

function setLanguage(lang) {
    elements.forEach(el => {
        if (el.classList.contains('ampersand-hero')) {
            // Handle the ampersand in the Hero section
            el.textContent = el.getAttribute(`data-${lang}`);
        } else if (el.classList.contains('chat-bubble')) {
            const quoteText = el.querySelector('.quote-text');
            const speakerName = el.querySelector('.speaker-name');
            const sureBtn = el.querySelector('.action-btn.sure');
            if (quoteText) {
                quoteText.textContent = quoteText.getAttribute(`data-${lang}`);
            }
            if (speakerName) {
                speakerName.textContent = speakerName.getAttribute(`data-${lang}`);
            }
            if (sureBtn) {
                sureBtn.textContent = sureBtn.getAttribute(`data-${lang}`);
            }
        } else if (el.classList.contains('location-btn')) {
            // Update only the text inside the <span> to preserve the GPS icon
            const span = el.querySelector('span');
            if (span) {
                span.textContent = el.getAttribute(`data-${lang}`);
            }
        } else {
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

// Petal Falling Animation
const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petals = [];
const numPetals = 50;

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 2 - 1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.angle += this.spin;

        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.fillStyle = '#f7c948';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < numPetals; i++) {
    petals.push(new Petal());
}

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animatePetals);
}

animatePetals();

// Resize Canvas on Window Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});