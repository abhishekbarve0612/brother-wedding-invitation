// script.js

// Generate Google Calendar Link
function generateGoogleCalendarLink(event) {
    const { title, start, end, location, timezone } = event;

    // Convert dates to UTC for Google Calendar
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Format dates as YYYYMMDDTHHMMSSZ (UTC)
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startFormatted = formatDate(startDate);
    const endFormatted = formatDate(endDate);

    // Encode event details
    const encodedTitle = encodeURIComponent(title);
    const encodedLocation = encodeURIComponent(location);
    const encodedDetails = encodeURIComponent(`Join us for ${title}!`);
    const encodedTimezone = encodeURIComponent(timezone);

    // Construct the Google Calendar URL
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startFormatted}/${endFormatted}&details=${encodedDetails}&location=${encodedLocation}&ctz=${encodedTimezone}`;

    // Log the URL for debugging
    console.log('Generated Google Calendar URL:', googleCalendarUrl);

    return googleCalendarUrl;
}

// Generate Apple Calendar Link
function generateAppleCalendarLink(event) {
    const { title, start, end, location, timezone } = event;

    // Format dates to iCalendar format (YYYYMMDDTHHMMSSZ)
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    const startFormatted = formatDate(new Date(start));
    const endFormatted = formatDate(new Date(end));

    // Create the iCalendar content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `DTSTART:${startFormatted}`,
        `DTEND:${endFormatted}`,
        `SUMMARY:${title}`,
        `LOCATION:${location}`,
        `TZID:${timezone}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Encode the .ics content in a webcal:// URL
    const encodedICS = encodeURIComponent(icsContent);
    return `webcal://data:text/calendar;charset=utf-8,${encodedICS}`;
}

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

// Toggle Calendar Options
const toggleButtons = document.querySelectorAll('.calendar-toggle-btn');
const calendarOptions = document.querySelectorAll('.calendar-options');

toggleButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const options = calendarOptions[index];
        const isVisible = options.style.display === 'flex';
        calendarOptions.forEach(opt => {
            opt.style.display = 'none';
        });
        options.style.display = isVisible ? 'none' : 'flex';
    });
});

document.addEventListener('click', (e) => {
    calendarOptions.forEach(opt => {
        if (!opt.contains(e.target) && !e.target.classList.contains('calendar-toggle-btn')) {
            opt.style.display = 'none';
        }
    });
});

// Language Toggle
const langEnBtn = document.getElementById('lang-en');
const langHiBtn = document.getElementById('lang-hi');
const langMrBtn = document.getElementById('lang-mr');
const elements = document.querySelectorAll('[data-en]');

function setLanguage(lang) {
    elements.forEach(el => {
        if (el.classList.contains('ampersand-hero')) {
            el.textContent = el.getAttribute(`data-${lang}`);
        } else if (el.classList.contains('location-btn') || el.classList.contains('calendar-btn')) {
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

// Array of rose petal colors
const petalColors = [
    '#ff4d4d', // Red
    '#ff9999', // Light Pink
    '#ffe6e6', // Very Light Pink
    '#ffcc99', // Peach
    '#ffffff'  // White
];

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 15 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 2 - 1;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
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
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
            this.size * 0.3, -this.size * 0.5,
            this.size * 0.7, -this.size * 0.5,
            this.size, 0
        );
        ctx.bezierCurveTo(
            this.size * 0.7, this.size * 0.5,
            this.size * 0.3, this.size * 0.5,
            0, 0
        );
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

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});