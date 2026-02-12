// ===== PRELOADER FIX =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            // Extra: verwijder het element volledig na animatie
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 2500); // Verlaagd van 3000 naar 2500ms
});

// ===== LANGUAGE SELECTOR =====
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
let currentLang = 'nl';

langToggle.addEventListener('click', () => {
    langDropdown.classList.toggle('active');
    langToggle.classList.toggle('active');
});

document.querySelectorAll('.lang-option').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        setLanguage(lang);
        
        // Update UI
        document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        
        langToggle.querySelector('.lang-current').textContent = lang.toUpperCase();
        langDropdown.classList.remove('active');
        langToggle.classList.remove('active');
    });
});

function setLanguage(lang) {
    currentLang = lang;
    
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        const text = element.getAttribute('data-' + lang);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'SELECT') {
            // Skip select elements
            return;
        } else {
            element.textContent = text;
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-selector')) {
        langDropdown.classList.remove('active');
        langToggle.classList.remove('active');
    }
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== STATS COUNTER =====
const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('[data-target]');
            numbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        num.innerText = target;
                        clearInterval(counter);
                    } else {
                        num.innerText = Math.ceil(current);
                    }
                }, 30);
            });
            observerStats.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observerStats.observe(statsSection);
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-button');
        const loader = submitBtn.querySelector('.submit-loader');
        
        submitBtn.style.pointerEvents = 'none';
        let width = 0;
        const loaderInterval = setInterval(() => {
            width += Math.random() * 30;
            if (width >= 100) width = 100;
            loader.style.width = width + '%';
            
            if (width === 100) {
                clearInterval(loaderInterval);
                const originalText = submitBtn.querySelector('span').getAttribute('data-' + currentLang) || 'Offerte Aanvragen';
                submitBtn.innerHTML = '<span>✓ Bericht Verzonden!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    contactForm.reset();
                    loader.style.width = '0';
                    submitBtn.innerHTML = '<span>' + originalText + '</span><div class="submit-loader"></div>';
                    submitBtn.style.background = '';
                    submitBtn.style.pointerEvents = 'auto';
                }, 3000);
            }
        }, 100);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ===== SERVICE CARDS ANIMATION =====
const observerCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = (index * 0.1) + 's';
    observerCards.observe(card);
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-particles');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== MOUSE FOLLOW EFFECT =====
const heroElement = document.querySelector('.hero');
if (heroElement) {
    heroElement.addEventListener('mousemove', (e) => {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const rect = heroImage.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroImage.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        }
    });
}

console.log('✨ Elite Klus - Website geladen!');