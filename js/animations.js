/**
 * animations.js
 * GSAP and ScrollTrigger configurations.
 */
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Robust vanilla JS counter
function runCounter(el, target, durationMs = 2000) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        el.innerText = Math.floor(easeOut * target);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.innerText = target;
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize animations after loader finishes
function initResponsiveAnimations() {
    const mm = gsap.matchMedia();
    
    mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        let { isMobile, reduceMotion } = context.conditions;

        if (reduceMotion) return; // Exit if reduced motion is preferred

        initHeroAnimations(isMobile);
        initCounters(isMobile);
        initSpotlightReveal(isMobile);
        initCascadeReveal(isMobile);
        initScrollReveals(isMobile);
        initWhyStacklyAnimation(isMobile);
        initAboutAnimation(isMobile);
        initProcessAnimation(isMobile);
        initTestimonialAnimation(isMobile);
        initFooterAnimation(isMobile);
        initGravityFormAnimation(isMobile);
        initClipPathReveals(isMobile);
    });
}

let animationsInitialized = false;

function startAnimations() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    if (typeof initResponsiveAnimations === 'function') {
        initResponsiveAnimations();
    }
}

window.addEventListener('loaderFinished', startAnimations);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAnimations, {
        once: true
    });
} else {
    startAnimations();
}

window.addEventListener('load', startAnimations, {
    once: true
});

setTimeout(startAnimations, 1500);

function initHeroAnimations(isMobile = false) {
    document.body.classList.add('gsap-initialized');
    const tl = gsap.timeline();
    
    // Hero Title
    if (document.getElementById('heroTitle')) {
        tl.from('#heroTitle', {
            y: isMobile ? 20 : 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    // Hero Desc
    if (document.getElementById('heroDesc')) {
        tl.from('#heroDesc', {
            y: isMobile ? 15 : 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
    }
    
    // Hero Actions
    if (document.getElementById('heroActions')) {
        tl.from('#heroActions', {
            y: isMobile ? 15 : 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
    }
    
    // Hero Floats (Stagger)
    if (document.getElementById('heroFloats')) {
        tl.from('.float-card', {
            x: isMobile ? 20 : 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4');
    }
}
function initScrollReveals(isMobile = false) {
    // Reveal Up
    const revealUpElements = document.querySelectorAll('.gs-reveal-up');
    revealUpElements.forEach((el) => {
        const delay = el.getAttribute('data-delay') || 0;
        gsap.fromTo(el, 
            { y: isMobile ? 20 : 60, opacity: 0 },
            {
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power3.out',
                delay: parseFloat(delay),
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    // Reveal Left
    const revealLeftElements = document.querySelectorAll('.gs-reveal-left');
    revealLeftElements.forEach((el) => {
        gsap.fromTo(el, 
            { x: isMobile ? -20 : -60, opacity: 0 },
            {
                x: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    // Reveal Right
    const revealRightElements = document.querySelectorAll('.gs-reveal-right');
    revealRightElements.forEach((el) => {
        gsap.fromTo(el, 
            { x: isMobile ? 20 : 60, opacity: 0 },
            {
                x: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}
function initCounters(isMobile = false) {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            onEnter: () => {
                runCounter(counter, target, 2000);
            },
            once: true
        });
    });
}
function initAboutAnimation(isMobile = false) {
    const section = document.querySelector('.trust-section');
    if (!section) return;
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });
    // Eyebrow
    tl.fromTo('.about-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
      
      // Main heading (bottom to top stagger)
      .fromTo('.about-heading .heading-line', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.3')
      
      // Description
      .fromTo('.about-desc', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      
      // Features list stagger
      .fromTo('.trust-list li', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' }, '-=0.2')
      
      // Button
      .fromTo('.about-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      
      // Image Zoom/Blur
      .fromTo('.about-img', { scale: isMobile ? 1.02 : 1.1, filter: 'blur(10px)', opacity: 0 }, { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1, ease: 'power3.out' }, '-=1.8')
      
      // Scan Line
      .fromTo('.about-scan-line', { top: '0%', opacity: 0 }, { top: '0%', opacity: 1, duration: 0.2, ease: 'power2.out' }, '-=0.8')
      .to('.about-scan-line', { top: '100%', duration: 1.2, ease: 'power1.inOut' }, '-=0.6')
      .to('.about-scan-line', { opacity: 0, duration: 0.2 }, '-=0.2')
      
      // Floating Badge
      .fromTo('.about-badge', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.5');
}
function initProcessAnimation(isMobile = false) {
    const section = document.querySelector('#processTimeline');
    if (!section) return;
    const progressLine = section.querySelector('.process-line-progress');
    const steps = section.querySelectorAll('.process-step-custom');
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#process',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    // 1. Draw the line (width on desktop, height on mobile)
    const lineAnim = isMobile ? { height: '100%' } : { width: '100%' };
    tl.to(progressLine, { ...lineAnim, duration: 2.5, ease: 'linear' });
    // 2. Concurrently reveal steps
    steps.forEach((step, index) => {
        // Calculate the time this step should activate based on its position along the 2.5s timeline.
        // There are 6 steps (index 0 to 5).
        const triggerTime = (index / (steps.length - 1)) * 2.5;
        // When the line reaches this circle:
        // - add 'is-active' class to circle
        // - fade the text in
        tl.add(() => {
            const circle = step.querySelector('.step-num');
            if (circle) circle.classList.add('is-active');
        }, triggerTime);
        tl.fromTo(step.querySelector('.step-content'), 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 
            triggerTime
        );
    });
}
function initTestimonialAnimation(isMobile = false) {
    const section = document.querySelector('#testimonials');
    const track = document.getElementById('testiTrack');
    if (!section || !track) return;
    const slides = track.querySelectorAll('.testi-slide');
    const prevBtn = document.getElementById('testiPrev');
    const nextBtn = document.getElementById('testiNext');
    const pagination = document.getElementById('testiPagination');
    let currentIndex = 0;
    let autoRotateInterval;
    let isAnimating = false;
    // Create pagination dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testi-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });
    
    const dots = pagination.querySelectorAll('.testi-dot');
    function animateSlideIn(slide) {
        const img = slide.querySelector('.testi-author img');
        const stars = slide.querySelectorAll('.testi-rating li');
        const text = slide.querySelector('.testi-text');
        const name = slide.querySelector('.testi-author h4');
        const desc = slide.querySelector('.testi-author span');
        const tl = gsap.timeline();
        
        tl.fromTo(slide, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
          .fromTo(img, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
          .fromTo(stars, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1, ease: 'power1.out' }, '-=0.3')
          .fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
          .fromTo([name, desc], { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '-=0.2');
          
        return tl;
    }
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        const currentSlide = slides[currentIndex];
        const nextSlide = slides[index];
        // Update dots
        dots[currentIndex].classList.remove('active');
        dots[index].classList.add('active');
        // Fade out current
        gsap.to(currentSlide, { 
            opacity: 0, 
            x: isMobile ? -20 : -50, 
            duration: 0.5, 
            ease: 'power2.in',
            onComplete: () => {
                currentSlide.classList.remove('active');
                nextSlide.classList.add('active');
                animateSlideIn(nextSlide).eventCallback('onComplete', () => {
                    isAnimating = false;
                });
            }
        });
        currentIndex = index;
    }
    function nextSlide() {
        let nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }
    function prevSlide() {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoRotate();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoRotate();
    });
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 5000);
    }
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    track.addEventListener('mouseleave', startAutoRotate);
    
    if (prevBtn) {
        prevBtn.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
        prevBtn.addEventListener('mouseleave', startAutoRotate);
    }
    if (nextBtn) {
        nextBtn.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
        nextBtn.addEventListener('mouseleave', startAutoRotate);
    }
    
    pagination.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    pagination.addEventListener('mouseleave', startAutoRotate);
    // Initial setup
    slides.forEach(s => s.classList.remove('active'));
    slides[0].classList.add('active');
    
    // Only animate initial slide when section is scrolled into view
    ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onEnter: () => {
            animateSlideIn(slides[0]);
            startAutoRotate();
        }
    });
}
function initFooterAnimation(isMobile = false) {
    const footer = document.querySelector('#mainFooter');
    if (!footer) return;
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
    const topAccent = footer.querySelector('.footer-top-accent');
    const logo = footer.querySelector('.footer-logo');
    const columns = footer.querySelectorAll('.footer-col');
    const socialIcons = footer.querySelectorAll('.footer-socials a');
    const newsletter = footer.querySelector('.footer-newsletter-strip');
    const bottomArea = footer.querySelector('.footer-bottom');
    // 1. Top accent line draws from left to right
    if (topAccent) {
        tl.to(topAccent, { width: '100%', duration: 0.8, ease: 'power2.inOut' });
    }
    // 2. Logo fades in and moves upward slightly
    if (logo) {
        tl.fromTo(logo, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }
    // 3. Four columns reveal sequentially with a small stagger
    if (columns.length) {
        tl.fromTo(columns, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.4');
    }
    // 4. Social icons scale from 0.9 to 1
    if (socialIcons.length) {
        tl.fromTo(socialIcons, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.2');
    }
    // 5. Newsletter strip fades upward
    if (newsletter) {
        tl.fromTo(newsletter, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    }
    // Bottom copyright
    if (bottomArea) {
        tl.fromTo(bottomArea, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, '-=0.2');
    }
}
function initWhyStacklyAnimation(isMobile = false) {
    const section = document.querySelector('.why-stackly-sec');
    if (!section) return;
    // Eyebrow and Heading
    gsap.fromTo('.why-eyebrow', 
        { opacity: 0, letterSpacing: '0px' }, 
        { 
            opacity: 1, 
            letterSpacing: '2px', 
            duration: 1, 
            ease: 'power2.out', 
            scrollTrigger: { 
                trigger: section, 
                start: 'top 80%',
                toggleActions: 'play none none none'
            } 
        }
    );
    
    gsap.fromTo('.heading-line', 
        { opacity: 0, y: 20 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: 'power2.out', 
            scrollTrigger: { 
                trigger: section, 
                start: 'top 80%',
                toggleActions: 'play none none none'
            } 
        }
    );
    // Feature Cards
    const cards = gsap.utils.toArray('.why-card-custom');
    
    cards.forEach((card, i) => {
        const icon = card.querySelector('.icon-wrap i');
        const scan = card.querySelector('.scan-line');
        const title = card.querySelector('h4');
        const desc = card.querySelector('p');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card, // Use card as trigger so it staggers based on scroll if needed, or section
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: i * 0.15 // staggered entrance
        });
        // 1. Move upward & fade
        tl.fromTo(card, { y: isMobile ? 15 : 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
          
          // 2. Icon appears, scales, rotates
          .fromTo(icon, { scale: 0.7, rotation: 0, opacity: 0 }, { scale: 1, rotation: 10, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.4')
          .to(icon, { rotation: 0, duration: 0.3, ease: 'power2.out' })
          
          // 3. Scan line moves across
          .fromTo(scan, { width: 0, opacity: 0, left: 0 }, { width: '100%', opacity: 1, duration: 0.4, ease: 'power2.inOut' }, '-=0.5')
          .to(scan, { opacity: 0, duration: 0.2 }, '-=0.1')
          
          // 4. Title and desc appear
          .fromTo(title, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.4')
          .fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');
    });
}
/* ==========================================================================
   INDUSTRIAL SYSTEM GSAP OVERHAUL (ABOUT PAGE)
   ========================================================================== */
let aboutAnimationsInitialized = false;
function makeAboutContentVisible() {
    const selectors = [
        ".hero-bg-img",
        ".gs-clip-text",
        ".header-inner .logo",
        ".desktop-nav-list li",
        ".header-actions",
        ".journey-content",
        ".journey-dot",
        ".mission-vision-grid > div",
        ".mission-vision-grid i",
        ".evs-node-inner",
        ".evs-icon",
        ".gs-sys-exp-card",
        ".team-member",
        ".cert-item",
        ".final-cta h2",
        ".final-cta .btn",
        ".footer-cta-bg",
        ".footer-cta h2",
        ".footer-logo",
        ".footer-links",
        ".footer-contact",
        ".social-links a"
    ];
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = "1";
            el.style.visibility = "visible";
            el.style.transform = "none";
            el.style.clipPath = "none";
        });
    });
}
function initAboutPageAnimations() {
    if (aboutAnimationsInitialized) return;
    if (!document.body.classList.contains('about-page')) return;
    
    aboutAnimationsInitialized = true;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        makeAboutContentVisible();
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    // Fallback for reduced motion
    if (isReduced) {
        makeAboutContentVisible();
        return;
    }
    // --- 1. ABOUT HERO & 3. NAVBAR ---
    const heroTl = gsap.timeline();
    const heroDesc = document.querySelector('.inner-hero p');
    const heroBread = document.querySelector('.inner-hero .breadcrumbs');
    heroTl.fromTo('.hero-bg-img', 
            { opacity: 0, scale: 1.08 }, 
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" })
          .fromTo('.header-inner .logo', 
            { opacity: 0, x: -30 }, 
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=1")
          .fromTo('.desktop-nav-list li', 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.8")
          .fromTo('.header-actions', 
            { opacity: 0, x: 30 }, 
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
          .fromTo('.gs-clip-text', 
            { opacity: 0, y: isMobile ? 20 : 60, clipPath: 'inset(100% 0 0 0)' }, 
            { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: "power4.out" }, "-=0.5");
          
    if(heroDesc) heroTl.fromTo(heroDesc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5");
    if(heroBread) heroTl.fromTo(heroBread, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
    // --- 4. OUR JOURNEY (TIMELINE SCRUB) & 6. JOURNEY TEXT ---
    mm.add("(min-width: 768px)", () => {
        const journeyLine = document.querySelector('.journey-line');
        const steps = document.querySelectorAll('.journey-timeline .v-step');
        
        if (journeyLine && steps.length > 0) {
            gsap.fromTo(journeyLine, 
                { scaleY: 0 }, 
                { scaleY: 1, ease: "none", scrollTrigger: { trigger: '.journey-timeline', start: "top 70%", end: "bottom 70%", scrub: 1 } }
            );
            steps.forEach((step, i) => {
                const dot = step.querySelector('.journey-dot');
                const content = step.querySelector('.journey-content');
                const xDir = i % 2 === 0 ? -40 : 40; 
                
                ScrollTrigger.create({
                    trigger: step,
                    start: "top 70%",
                    once: true,
                    onEnter: () => {
                        dot.classList.add('active-glow');
                        gsap.fromTo(dot, { scale: 0.5, opacity: 0.3 }, { scale: 1.15, opacity: 1, duration: 0.6, ease: "back.out(1.5)" });
                        gsap.fromTo(content, { x: xDir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 });
                    }
                });
            });
        }
    });
    mm.add("(max-width: 767px)", () => {
        const steps = document.querySelectorAll('.journey-timeline .v-step');
        steps.forEach((step) => {
            const dot = step.querySelector('.journey-dot');
            const content = step.querySelector('.journey-content');
            
            ScrollTrigger.create({
                trigger: step,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    dot.classList.add('active-glow');
                    gsap.fromTo(dot, { scale: 0.5, opacity: 0.3 }, { scale: 1.15, opacity: 1, duration: 0.4, ease: "power2.out" });
                    gsap.fromTo(content, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
                }
            });
        });
    });
    // --- 7. MISSION / VISION ---
    mm.add({
        isDesktop: "(min-width: 992px)",
        isMobile: "(max-width: 991px)"
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;
        const mvCards = document.querySelectorAll('.mission-vision-grid > div');
        if (mvCards.length >= 2) {
            const mCard = mvCards[0];
            const vCard = mvCards[1];
            
            const moveX = isDesktop ? 80 : 30;
            const rotY = isDesktop ? 8 : 2;
            const mvTl = gsap.timeline({ scrollTrigger: { trigger: '.mission-vision-grid', start: "top 75%", once: true } });
            mvTl.fromTo(mCard, { x: -moveX, rotationY: -rotY, opacity: 0 }, { x: 0, rotationY: isMobile ? 0 : 0, opacity: 1, duration: 1, ease: "power3.out" }, 0)
                .fromTo(vCard, { x: moveX, rotationY: rotY, opacity: 0 }, { x: 0, rotationY: isMobile ? 0 : 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);
            
            const mIcon = mvCards[0].querySelector('i');
            const vIcon = mvCards[1].querySelector('i');
            
            if (mIcon) mvTl.fromTo(mIcon, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");
            if (vIcon) mvTl.fromTo(vIcon, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
        }
    });
    // --- 11. PROFESSIONAL EXPERTISE GRID & STATISTICS ---
    const proSection = document.querySelector('.expertise-pro-section');
    if (proSection) {
        const cards = proSection.querySelectorAll('.gs-sys-pro-card');
        const statsGrid = proSection.querySelector('.gs-sys-stats');
        const counters = proSection.querySelectorAll('.exp-counter');
        if (cards.length > 0) {
            ScrollTrigger.create({
                trigger: proSection,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.fromTo(cards, 
                        { opacity: 0, y: 30 }, 
                        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                    );
                }
            });
        }
        if (statsGrid) {
            ScrollTrigger.create({
                trigger: statsGrid,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.fromTo(statsGrid, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
                    if (counters.length > 0) {
                        counters.forEach((num, index) => {
                            const target = parseInt(num.getAttribute('data-target') || '0', 10);
                            setTimeout(() => {
                                runCounter(num, target, 2000);
                            }, index * 100);
                        });
                    }
                }
            });
        }
    }
    // --- 13. LEADERSHIP TEAM ---
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
        const members = teamGrid.querySelectorAll('.team-member');
        if (members.length >= 4) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: teamGrid, start: "top 75%", once: true } });
            
            tl.fromTo(members[0], { x: isMobile ? -20 : -60, opacity: 0 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }, 0)
              .fromTo(members[1], { y: isMobile ? 20 : 50, opacity: 0 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }, 0.15)
              .fromTo(members[2], { y: isMobile ? -20 : -50, opacity: 0 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }, 0.3)
              .fromTo(members[3], { x: isMobile ? 20 : 60, opacity: 0 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }, 0.45);
        }
    }
    // --- 14. CERTIFICATIONS STAMPS ---
    const certsGrid = document.querySelector('.cert-grid');
    if (certsGrid) {
        const badges = certsGrid.querySelectorAll('.cert-item');
        gsap.fromTo(badges, 
            { scale: 1.25, opacity: 0, rotation: -5 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2)", scrollTrigger: { trigger: certsGrid, start: "top 80%", once: true } }
        );
    }
    // --- 15. CTA ---
    const cta = document.querySelector('.final-cta');
    if (cta) {
        const h2 = cta.querySelector('h2');
        const btn = cta.querySelector('.btn');
        const ctaTl = gsap.timeline({ scrollTrigger: { trigger: cta, start: "top 80%", once: true } });
        
        if (h2) ctaTl.fromTo(h2, { clipPath: 'inset(100% 0 0 0)', opacity: 0 }, { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 0.8, ease: "power3.out" });
        if (btn) ctaTl.fromTo(btn, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" });
    }
    // --- 16. FINAL IMAGE CTA ---
    const footerImg = document.querySelector('.footer-cta');
    if (footerImg) {
        const bg = footerImg.querySelector('.footer-cta-bg');
        const txt = footerImg.querySelector('h2'); 
        const fTl = gsap.timeline({ scrollTrigger: { trigger: footerImg, start: "top 80%", once: true } });
        if (bg) fTl.fromTo(bg, { scale: 1.08 }, { scale: 1, duration: 1.5, ease: "power2.out" });
        if (txt) fTl.fromTo(txt, { y: isMobile ? 15 : 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=1");
    }
    // --- 17. FOOTER ---
    const mainFooter = document.querySelector('.stackly-footer-new');
    if (mainFooter) {
        const logo = mainFooter.querySelector('.footer-logo');
        const links = mainFooter.querySelectorAll('.footer-links');
        const contact = mainFooter.querySelector('.footer-contact');
        const socials = mainFooter.querySelectorAll('.social-links a');
        const footTl = gsap.timeline({ scrollTrigger: { trigger: mainFooter, start: "top 85%", once: true } });
        
        if(logo) footTl.fromTo(logo, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
        if(links.length > 0) footTl.fromTo(links, { y: isMobile ? 10 : 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4");
        if(contact) footTl.fromTo(contact, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
        if(socials.length > 0) footTl.fromTo(socials, { scale: isMobile ? 0.95 : 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)" }, "-=0.2");
    }
    setTimeout(() => { ScrollTrigger.refresh(); }, 500);
}
// Dual initialization pattern
document.addEventListener("DOMContentLoaded", initAboutPageAnimations);
window.addEventListener("loaderFinished", initAboutPageAnimations);
function initSpotlightReveal(isMobile = false) {
    // Select all main page headings
    const headings = document.querySelectorAll('.inner-hero h1, .hero-content h1, h1.gs-clip-text, .page-header-box h1');
    
    headings.forEach(heading => {
        // Prevent double initialization
        if(heading.classList.contains('spotlight-initialized')) return;
        heading.classList.add('spotlight-initialized');
        
        // Ensure text is clean from previous spans
        const text = heading.innerText;
        if (!text.trim()) return;
        heading.innerHTML = text; // reset
        
        // Apply Spotlight CSS Inline
        heading.style.backgroundImage = 'linear-gradient(110deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0.1) 100%)';
        heading.style.backgroundSize = '250% 100%';
        heading.style.backgroundPosition = '100% 0';
        heading.style.webkitBackgroundClip = 'text';
        heading.style.webkitTextFillColor = 'transparent';
        heading.style.backgroundClip = 'text';
        heading.style.color = 'transparent';
        
        // GSAP Spotlight Animation
        gsap.to(heading, {
            backgroundPosition: '0% 0',
            duration: 1.8,
            ease: "power2.inOut",
            delay: 0.2
        });
    });
}
function initCascadeReveal(isMobile = false) {
    // Select all section page headings (h2) not in hero sections
    const headings = document.querySelectorAll('.section-header h2, .section-title h2');
    
    headings.forEach(heading => {
        if(heading.classList.contains('cascade-initialized')) return;
        heading.classList.add('cascade-initialized');
        
        const text = heading.innerText;
        if (!text.trim()) return;
        
        const words = text.trim().split(/\s+/);
        heading.innerHTML = ''; // clear original text
        
        words.forEach((word) => {
            const outerSpan = document.createElement('span');
            outerSpan.style.display = 'inline-block';
            outerSpan.style.overflow = 'hidden';
            outerSpan.style.verticalAlign = 'bottom';
            outerSpan.style.marginRight = '0.25em';
            
            const innerSpan = document.createElement('span');
            innerSpan.style.display = 'inline-block';
            innerSpan.style.transform = 'translateY(110%) rotate(2deg)'; 
            innerSpan.style.opacity = '0';
            innerSpan.style.transformOrigin = 'bottom left';
            innerSpan.innerText = word;
            innerSpan.className = 'cascade-word';
            
            outerSpan.appendChild(innerSpan);
            heading.appendChild(outerSpan);
        });
        
        // GSAP ScrollTrigger for Cascade Reveal
        gsap.to(heading.querySelectorAll('.cascade-word'), {
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: "0%",
            rotation: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out"
        });
    });
}

function initGravityFormAnimation(isMobile) {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formElements = contactForm.querySelectorAll('.form-group, .form-row');
    if (formElements.length > 0) {
        gsap.from(formElements, {
            scrollTrigger: {
                trigger: contactForm,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: -100, // Drop from top
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "bounce.out" // Gravity bounce effect
        });
    }
}

function initClipPathReveals(isMobile) {
    const figures = document.querySelectorAll('.global-impact-image figure, .global-impact-map-image figure');
    
    figures.forEach(figure => {
        const img = figure.querySelector('img');
        
        // Ensure figure has overflow hidden for scale to work
        figure.style.overflow = 'hidden';
        figure.style.display = 'block';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: figure,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

        tl.fromTo(figure, 
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut" }
        );
        
        if (img) {
            tl.fromTo(img,
                { scale: 1.3 },
                { scale: 1, duration: 1.2, ease: "power3.inOut" },
                0
            );
        }
    });
}
