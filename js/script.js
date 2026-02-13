// ============================================
// STRICT MOBILE MENU CONTROL
// ============================================

const hamburger = document.getElementById('hamburger');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const html = document.documentElement;
const body = document.body;

console.log('DOM Elements:', {
    hamburger: !!hamburger,
    mobileMenuOverlay: !!mobileMenuOverlay,
    closeMenuBtn: !!closeMenuBtn
});

// ============================================
// OPEN MENU
// ============================================
hamburger.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = mobileMenuOverlay.classList.contains('active');

    if (isOpen) {
        closeMenu();
    } else {
        hamburger.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
    }
});


// ============================================
// CLOSE MENU - MAIN FUNCTION
// ============================================
function closeMenu() {
    console.log('>>> CLOSING MENU <<<');
    
    hamburger.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    html.style.overflow = '';
    body.style.overflow = '';
}

// ============================================
// CLOSE BUTTON
// ============================================
closeMenuBtn.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    console.log('Close button clicked');
    closeMenu();
});

// ============================================
// CLOSE ON OVERLAY CLICK (Background)
// ============================================
mobileMenuOverlay.addEventListener('click', function(event) {
    // Check if click is directly on overlay, not on child elements
    if (event.target === mobileMenuOverlay) {
        console.log('Overlay background clicked');
        closeMenu();
    }
});

// ============================================
// CLOSE ON NAV LINK CLICK
// ============================================
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const href = this.getAttribute('href');
        console.log('Navigation link clicked:', href);
        
        closeMenu();
        
        // Navigate after menu closes
        setTimeout(function() {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 350);
    });
});

// ============================================
// CLOSE ON ESCAPE KEY
// ============================================
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        console.log('Escape key pressed');
        if (mobileMenuOverlay.classList.contains('active')) {
            closeMenu();
        }
    }
});

// ============================================
// PREVENT CLOSING WHEN CLICKING MENU CONTENT
// ============================================
const menuContent = document.querySelector('.mobile-menu-header');
const mobileNav = document.querySelector('.mobile-navigation');
const mobileLanguageSection = document.querySelector('.mobile-language-section');
const mobileSocialSection = document.querySelector('.mobile-social-section');
const mobileFooter = document.querySelector('.mobile-menu-footer');

const contentElements = [
    menuContent,
    mobileNav,
    mobileLanguageSection,
    mobileSocialSection,
    mobileFooter
];

contentElements.forEach(element => {
    if (element) {
        element.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

const desktopNavLinks = document.querySelectorAll('.nav-link');

function updateActiveLinks() {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    // Update desktop nav
    desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update mobile nav
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLinks);
updateActiveLinks();

// ============================================
// LANGUAGE SWITCHER
// ============================================

const desktopLangBtns = document.querySelectorAll('.lang-btn-desktop');
const mobileLanguageBtns = document.querySelectorAll('.mobile-lang-btn');

const translations = {
    nl: {
        home: 'Home',
        about: 'Over Ons',
        services: 'Diensten',
        contact: 'Contact',
        languageTitle: 'Kies Taal',
        dutch: 'Nederlands',
        english: 'English',
        german: 'Deutsch'
    },
    en: {
        home: 'Home',
        about: 'About Us',
        services: 'Services',
        contact: 'Contact',
        languageTitle: 'Choose Language',
        dutch: 'Dutch',
        english: 'English',
        german: 'German'
    },
    de: {
        home: 'Startseite',
        about: 'Über Uns',
        services: 'Leistungen',
        contact: 'Kontakt',
        languageTitle: 'Sprache wählen',
        dutch: 'Niederländisch',
        english: 'Englisch',
        german: 'Deutsch'
    }
};

let currentLanguage = localStorage.getItem('language') || 'nl';

// Initialize language
setLanguage(currentLanguage);

// Desktop language buttons
desktopLangBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        currentLanguage = this.dataset.lang;
        localStorage.setItem('language', currentLanguage);
        setLanguage(currentLanguage);
        console.log('Language changed to:', currentLanguage);
    });
});

// Mobile language buttons
mobileLanguageBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        currentLanguage = this.dataset.lang;
        localStorage.setItem('language', currentLanguage);
        setLanguage(currentLanguage);
        console.log('Language changed to:', currentLanguage);
    });
});

function setLanguage(lang) {
    console.log('Setting language to:', lang);

    // Update all nav links
    const allNavLinks = document.querySelectorAll('.nav-link');
    const navTexts = ['home', 'about', 'services', 'contact'];
    
    let linkIndex = 0;
    allNavLinks.forEach(link => {
        if (navTexts[linkIndex] && translations[lang][navTexts[linkIndex]]) {
            link.textContent = translations[lang][navTexts[linkIndex]];
            linkIndex++;
        }
    });

    // Update mobile nav link spans
    const mobileNavSpans = document.querySelectorAll('.mobile-nav-link span:not(i)');
    let spanIndex = 0;
    mobileNavSpans.forEach(span => {
        if (navTexts[spanIndex] && translations[lang][navTexts[spanIndex]]) {
            span.textContent = translations[lang][navTexts[spanIndex]];
            spanIndex++;
        }
    });

    // Update language title
    const mobileLangTitle = document.querySelector('.mobile-lang-heading');
    if (mobileLangTitle) {
        mobileLangTitle.textContent = translations[lang].languageTitle;
    }

    // Update active states and texts for language buttons
    desktopLangBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    mobileLanguageBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
        
        const langLabel = btn.querySelector('.lang-label');
        if (langLabel) {
            if (btn.dataset.lang === 'nl') {
                langLabel.textContent = translations[lang].dutch;
            } else if (btn.dataset.lang === 'en') {
                langLabel.textContent = translations[lang].english;
            } else if (btn.dataset.lang === 'de') {
                langLabel.textContent = translations[lang].german;
            }
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            event.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// STICKY NAV SHADOW
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.09)';
    }
});

// ============================================
// INITIALIZATION LOG
// ============================================

console.log('%c✓ NAVBAR FULLY LOADED', 'color: #5c4033; font-weight: bold; font-size: 14px;');
console.log('%c✓ Hamburger menu control active', 'color: #5c4033; font-size: 12px;');
console.log('%c✓ Language: ' + currentLanguage.toUpperCase(), 'color: #6d4c41; font-size: 12px;');
console.log('%c✓ All event listeners registered', 'color: #5c4033; font-size: 12px;');

const footer = document.querySelector('.footer');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

observer.observe(footer);