// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation classes when elements come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    document.querySelector('.nav-container').prepend(menuButton);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Update mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-button')) {
        createMobileMenu();
    }
});

// Countdown Clock for Submission Deadline (Full Papers)
function updateCountdown() {
    // June 3, 2025, 11:59:59 PM AOE (Anywhere on Earth, UTC-12)
    const deadline = new Date(Date.UTC(2025, 5, 18, 11, 59, 59)); // June is month 5 (0-indexed), 11:59:59 UTC
    const nowUTC = new Date();
    let diff = deadline - nowUTC;
    function pad(n) { return n.toString().padStart(2, '0'); }
    if (diff > 0) {
        let totalSeconds = Math.floor(diff / 1000);
        let weeks = Math.floor(totalSeconds / (7 * 24 * 60 * 60));
        totalSeconds -= weeks * 7 * 24 * 60 * 60;
        let days = Math.floor(totalSeconds / (24 * 60 * 60));
        totalSeconds -= days * 24 * 60 * 60;
        let hours = Math.floor(totalSeconds / (60 * 60));
        totalSeconds -= hours * 60 * 60;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        document.getElementById('countdown-clock').textContent = `Closes in ${pad(weeks)}w ${pad(days)}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
        document.getElementById('countdown-clock').textContent = 'Submission deadline has passed.';
    }
}

// Countdown Clock for Short Papers and EAs
function updateCountdownShort() {
    // August 6, 2025, 11:59:59 PM AOE (Anywhere on Earth, UTC-12)
    const deadline = new Date(Date.UTC(2025, 7, 21, 11, 59, 59)); // August is month 7 (0-indexed), 11:59:59 UTC
    const nowUTC = new Date();
    let diff = deadline - nowUTC;
    function pad(n) { return n.toString().padStart(2, '0'); }
    if (diff > 0) {
        let totalSeconds = Math.floor(diff / 1000);
        let weeks = Math.floor(totalSeconds / (7 * 24 * 60 * 60));
        totalSeconds -= weeks * 7 * 24 * 60 * 60;
        let days = Math.floor(totalSeconds / (24 * 60 * 60));
        totalSeconds -= days * 24 * 60 * 60;
        let hours = Math.floor(totalSeconds / (60 * 60));
        totalSeconds -= hours * 60 * 60;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        document.getElementById('countdown-clock-short').textContent = `Closes in ${pad(weeks)}w ${pad(days)}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
        document.getElementById('countdown-clock-short').textContent = 'Submission deadline has passed.';
    }
}

// Initialize both countdown clocks
setInterval(updateCountdown, 1000);
setInterval(updateCountdownShort, 1000);
updateCountdown();
updateCountdownShort(); 