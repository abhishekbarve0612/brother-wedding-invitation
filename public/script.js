// script.js

// Generate Google Calendar Link (Using accounts.google.com)
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
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startFormatted}/${endFormatted}&details=${encodedDetails}&location=${encodedLocation}&ctz=${encodedTimezone}`;
    const encodedCalendarUrl = encodeURIComponent(calendarUrl);

    // Use accounts.google.com to handle login
    const googleCalendarUrl = `https://accounts.google.com/ServiceLogin?service=cl&continue=${encodedCalendarUrl}`;

    console.log('Generated Google Calendar URL:', googleCalendarUrl);

    return googleCalendarUrl;
}

// Generate Apple Calendar Link (Using .ics File)
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

    // Encode the .ics content in a data URL
    const encodedICS = encodeURIComponent(icsContent);
    const appleCalendarUrl = `data:text/calendar;charset=utf-8,${encodedICS}`;

    console.log('Generated Apple Calendar ICS URL:', appleCalendarUrl);

    return appleCalendarUrl;
}

// Generate ICS File Link (For Download)
function generateICSFileLink(event) {
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

    // Encode the .ics content in a data URL
    const encodedICS = encodeURIComponent(icsContent);
    const icsFileUrl = `data:text/calendar;charset=utf-8,${encodedICS}`;

    console.log('Generated ICS File URL:', icsFileUrl);

    return icsFileUrl;
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

// Background Music
const musicTracks = [
    'music1.mp3',
    'music2.mp3',
    'music3.mp3',
    'music4.mp3',
    'music5.mp3',
    'music6.mp3',
];

// Select a random track
const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
const audio = document.getElementById('background-music');
const musicToggleBtn = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const scrollBtn = document.querySelector('.scroll-btn'); // The "See Details" button

// Set the source of the audio element
audio.src = randomTrack;
audio.volume = 0.3; // Set a lower volume to avoid being too intrusive

// Function to update the music toggle button's icon and title
function updateMusicButtonState(isPlaying) {
    if (isPlaying) {
        // Show "mute" icon (muted speaker) when music is playing
        musicIcon.innerHTML = `
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <path d="M15 9l6 6m-6 0l6-6"></path>
        `;
        musicToggleBtn.title = 'Mute Music';
    } else {
        // Show "music on" icon (speaker) when music is not playing
        musicIcon.innerHTML = `
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
        `;
        musicToggleBtn.title = 'Play Music';
    }
}

// Function to toggle music play/pause
function toggleMusic() {
    if (audio.paused) {
        audio.play().then(() => {
            updateMusicButtonState(true);
        }).catch(error => {
            console.error('Error playing audio:', error);
            updateMusicButtonState(false);
        });
    } else {
        audio.pause();
        updateMusicButtonState(false);
    }
}

// Initialize the button state (music is not playing initially)
updateMusicButtonState(false);

// Start music when the "See Details" button is clicked, if not already playing
scrollBtn.addEventListener('click', () => {
    // Scroll to the section (existing behavior)
    scrollToSection('haldi-wedding');

    // Start the music if it's not already playing
    if (audio.paused) {
        audio.play().then(() => {
            updateMusicButtonState(true);
        }).catch(error => {
            console.error('Error playing audio:', error);
            updateMusicButtonState(false);
        });
    }
});

// Add event listener for the music toggle button
musicToggleBtn.addEventListener('click', toggleMusic);