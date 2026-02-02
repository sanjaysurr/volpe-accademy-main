// Mobile menu toggle functionality
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Toggle mobile menu
function toggleMenu() {
    const isOpen = navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('active', isOpen);
    body.classList.toggle('menu-open', isOpen);
    
    // Toggle aria-expanded for accessibility
    const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true' || false;
    hamburgerMenu.setAttribute('aria-expanded', !expanded);
}

// Close menu when clicking outside
function closeMenuOnOutsideClick(e) {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburgerMenu.contains(e.target)) {
        toggleMenu();
    }
}

// Close menu when clicking on a nav link
function closeMenuOnNavClick() {
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

// Initialize mobile menu
function initMobileMenu() {
    if (hamburgerMenu && navLinks) {
        // Set initial ARIA attributes
        hamburgerMenu.setAttribute('aria-label', 'Toggle menu');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        hamburgerMenu.setAttribute('aria-controls', 'nav-links');
        navLinks.setAttribute('id', 'nav-links');
        
        // Add event listeners
        hamburgerMenu.addEventListener('click', toggleMenu);
        document.addEventListener('click', closeMenuOnOutsideClick);
        
        // Close menu when clicking on nav links (for mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenuOnNavClick);
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            // Close menu if open on mobile
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
            
            // Smooth scroll to target
            const headerOffset = 90; // Height of your header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for diverse animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            // Reset transform based on animation type stored in data attribute
            const animType = entry.target.dataset.animType || 'fadeUp';
            
            // Special handling for module numbers
            if (entry.target.classList.contains('it-module-number')) {
                entry.target.style.transform = 'scale(1) rotateY(0deg)';
                return;
            }
            
            switch(animType) {
                case 'slideLeft':
                    entry.target.style.transform = 'translateX(0)';
                    break;
                case 'slideRight':
                    entry.target.style.transform = 'translateX(0)';
                    break;
                case 'slideUp':
                    entry.target.style.transform = 'translateY(0)';
                    break;
                case 'slideDown':
                    entry.target.style.transform = 'translateY(0)';
                    break;
                case 'scale':
                    entry.target.style.transform = 'scale(1)';
                    break;
                case 'scaleRotate':
                    entry.target.style.transform = 'scale(1) rotate(0deg)';
                    break;
                case 'fadeUpScale':
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    break;
                case 'fadeUpRotate':
                    entry.target.style.transform = 'translateY(0) rotate(0deg)';
                    break;
                case 'slideLeftScale':
                    entry.target.style.transform = 'translateX(0) scale(1)';
                    break;
                case 'slideRightScale':
                    entry.target.style.transform = 'translateX(0) scale(1)';
                    break;
                case 'slideRightRotate':
                    entry.target.style.transform = 'translateX(0) rotate(0deg)';
                    break;
                case 'zoomIn':
                    entry.target.style.transform = 'scale(1)';
                    break;
                case 'bounce':
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    break;
                default:
                    entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-description p, .quote');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Animate why-section elements - Slide from left with rotation
    const whyElements = document.querySelectorAll('.why-badge, .why-title, .why-divider, .why-subtitle, .why-mission, .advantage-title, .advantage-subtitle, .why-statement, .why-quote');
    whyElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-50px) rotate(-5deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`;
        el.dataset.animType = 'slideLeft';
        observer.observe(el);
    });

    // Animate advantage cards - Slide from left with scale bounce
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-60px) scale(0.8)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s, transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
        el.dataset.animType = 'slideLeftScale';
        observer.observe(el);
    });

    // Animate about-section elements - Slide from right
    const aboutHeaderElements = document.querySelectorAll('.about-badge, .section-title, .about-divider, .about-intro');
    aboutHeaderElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        el.dataset.animType = 'slideRight';
        observer.observe(el);
    });

    // Animate about blocks - Slide from right with scale
    const aboutBlocks = document.querySelectorAll('.about-block');
    aboutBlocks.forEach((block, blockIndex) => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(60px) scale(0.9)';
        block.style.transition = `opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${blockIndex * 0.15}s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${blockIndex * 0.15}s`;
        block.dataset.animType = 'slideRightScale';
        observer.observe(block);
    });

    // Animate promise cards and point cards - Pop in with scale
    const promiseCards = document.querySelectorAll('.promise-card, .point-card');
    promiseCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.5)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.08}s, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.08}s`;
        el.dataset.animType = 'scale';
        observer.observe(el);
    });

    // Animate Vision & Mission section - Zoom in with fade
    const vmHeaderElements = document.querySelectorAll('.vm-badge, .vm-main-title, .vm-title-divider');
    vmHeaderElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';
        el.style.transition = `opacity 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        el.dataset.animType = 'zoomIn';
        observer.observe(el);
    });

    // Animate Vision & Mission cards - Zoom in from center with rotation
    const vmCards = document.querySelectorAll('.vm-card');
    vmCards.forEach((card, cardIndex) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.7) rotate(-10deg)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${cardIndex * 0.2}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${cardIndex * 0.2}s`;
        card.dataset.animType = 'scaleRotate';
        observer.observe(card);
    });

    // Animate mission item cards - Slide from bottom with fade
    const missionItemCards = document.querySelectorAll('.mission-item-card');
    missionItemCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        el.dataset.animType = 'slideUp';
        observer.observe(el);
    });

    // Animate vision content elements - Fade with slight rotation
    const visionElements = document.querySelectorAll('.vision-icon-decoration, .vision-highlight-box');
    visionElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'rotate(-15deg) scale(0.9)';
        el.style.transition = `opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`;
        el.dataset.animType = 'scaleRotate';
        observer.observe(el);
    });

    // Animate edge-section elements - Bounce in from bottom
    const edgeElements = document.querySelectorAll('.edge-title, .edge-description, .edge-quote');
    edgeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px) scale(0.9)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
        el.dataset.animType = 'bounce';
        observer.observe(el);
    });

    // Animate courses-section header elements - Slide down with rotation
    const coursesHeaderElements = document.querySelectorAll('.courses-badge, .courses-main-title, .courses-title-divider');
    coursesHeaderElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-40px) rotate(2deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        el.dataset.animType = 'fadeUpRotate';
        observer.observe(el);
    });

    // Animate course cards - Slide up with scale and rotation
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, cardIndex) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.85) rotate(3deg)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${cardIndex * 0.15}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${cardIndex * 0.15}s`;
        card.dataset.animType = 'scaleRotate';
        observer.observe(card);
    });

    // Animate IT programs section header elements - Slide from left with scale
    const itHeaderElements = document.querySelectorAll('.it-badge, .it-main-title, .it-title-divider');
    itHeaderElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-50px) scale(0.9)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        el.dataset.animType = 'slideLeftScale';
        observer.observe(el);
    });

    // Animate IT course card - Zoom in with rotation
    const itCourseCard = document.querySelectorAll('.it-course-card');
    itCourseCard.forEach((card, cardIndex) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.7) rotate(-5deg)';
        card.style.transition = `opacity 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${cardIndex * 0.2}s, transform 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${cardIndex * 0.2}s`;
        card.dataset.animType = 'scaleRotate';
        observer.observe(card);
    });

    // Animate IT skill cards - Slide from left with bounce
    const itSkillCards = document.querySelectorAll('.it-skill-card');
    itSkillCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-40px) scale(0.9)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.08}s, transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.08}s`;
        el.dataset.animType = 'slideLeftScale';
        observer.observe(el);
    });

    // Animate IT module cards - Slide from right with fade
    const itModuleCards = document.querySelectorAll('.it-module-card');
    itModuleCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        el.dataset.animType = 'slideRight';
        observer.observe(el);
    });

    // Animate module numbers separately with flip animation
    const itModuleNumbers = document.querySelectorAll('.it-module-number');
    itModuleNumbers.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0) rotateY(180deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15 + 0.3}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15 + 0.3}s`;
        observer.observe(el);
    });

    // Animate IT detail items and graduation box - Pop in with scale
    const itFooterElements = document.querySelectorAll('.it-detail-item, .it-graduation-box');
    itFooterElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s`;
        el.dataset.animType = 'scale';
        observer.observe(el);
    });

    // Animate Digital Marketing section header elements - Slide from right with rotation
    const dmHeaderElements = document.querySelectorAll('.dm-badge, .dm-main-title, .dm-title-divider');
    dmHeaderElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px) rotate(3deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        el.dataset.animType = 'slideRightRotate';
        observer.observe(el);
    });

    // Animate Digital Marketing course card - Slide from right with scale
    const dmCourseCards = document.querySelectorAll('.dm-course-card');
    dmCourseCards.forEach((card, cardIndex) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(80px) scale(0.8)';
        card.style.transition = `opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${cardIndex * 0.2}s, transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${cardIndex * 0.2}s`;
        card.dataset.animType = 'slideRightScale';
        observer.observe(card);
    });

    // Animate Workshops section header elements - Zoom in with bounce
    const workshopsHeaderElements = document.querySelectorAll('.workshops-badge, .workshops-main-title, .workshops-title-divider');
    workshopsHeaderElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.6)';
        el.style.transition = `opacity 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s, transform 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
        el.dataset.animType = 'zoomIn';
        observer.observe(el);
    });

    // Animate workshop cards - Pop in with scale bounce
    const workshopCards = document.querySelectorAll('.workshop-card');
    workshopCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.5) rotate(5deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
        el.dataset.animType = 'scaleRotate';
        observer.observe(el);
    });

    // Animate Contact section header elements - Slide up with rotation
    const contactHeaderElements = document.querySelectorAll('.contact-badge, .contact-main-title, .contact-title-divider');
    contactHeaderElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) rotate(-2deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        el.dataset.animType = 'fadeUpRotate';
        observer.observe(el);
    });

    // Animate contact items - Slide up with scale and slight rotation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px) scale(0.85) rotate(2deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s`;
        el.dataset.animType = 'scaleRotate';
        observer.observe(el);
    });

    // CTA Button functionality
    const primaryCTA = document.querySelector('.cta-button.primary');
    const secondaryCTA = document.querySelector('.cta-button.secondary');

    if (primaryCTA) {
        primaryCTA.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    if (secondaryCTA) {
        secondaryCTA.addEventListener('click', () => {
            const programsSection = document.querySelector('#programs');
            if (programsSection) {
                programsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Contact form submit
    const contactForm = document.getElementById('contact-form');
    const contactFormStatus = document.getElementById('contact-form-status');

    // EmailJS (optional) — if you want EmailJS sending, fill these 3 values.
    const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
    const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';

    // Fallback recipient (used if EmailJS is not configured)
    const FALLBACK_RECIPIENT_EMAIL = 'goutham@mediabullsi.com';

    const isEmailJsConfigured = () => {
        const placeholders = new Set([
            'YOUR_EMAILJS_PUBLIC_KEY',
            'YOUR_EMAILJS_SERVICE_ID',
            'YOUR_EMAILJS_TEMPLATE_ID'
        ]);
        return !placeholders.has(EMAILJS_PUBLIC_KEY) &&
            !placeholders.has(EMAILJS_SERVICE_ID) &&
            !placeholders.has(EMAILJS_TEMPLATE_ID);
    };

    const setFormStatus = (text) => {
        if (contactFormStatus) contactFormStatus.textContent = text;
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = (contactForm.querySelector('#cf_name')?.value || '').trim();
            const email = (contactForm.querySelector('#cf_email')?.value || '').trim();
            const phone = (contactForm.querySelector('#cf_phone')?.value || '').trim();
            const message = (contactForm.querySelector('#cf_message')?.value || '').trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !message) {
                setFormStatus('Please fill Name, Email, and Message.');
                return;
            }

            if (submitBtn) submitBtn.disabled = true;
            setFormStatus('Sending...');

            try {
                const emailjsClient = window.emailjs;

                if (emailjsClient && isEmailJsConfigured()) {
                    emailjsClient.init({ publicKey: EMAILJS_PUBLIC_KEY });
                    await emailjsClient.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
                    setFormStatus('Sent! We’ll contact you soon.');
                    contactForm.reset();
                    return;
                }

                // Fallback: open user's mail client with prefilled email
                const subject = encodeURIComponent(`New enquiry from ${name}`);
                const body = encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\nMessage:\n${message}\n`
                );
                window.location.href = `mailto:${encodeURIComponent(FALLBACK_RECIPIENT_EMAIL)}?subject=${subject}&body=${body}`;
                setFormStatus('Opening your email app…');
            } catch (err) {
                console.error('Contact form submit failed:', err);
                setFormStatus('Something went wrong. Please try again.');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // Mobile Menu Toggle
    const navLinks = document.querySelector('.nav-links');
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navAnchors = navLinks.querySelectorAll('a');
        navAnchors.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            }
        });
    }
});

