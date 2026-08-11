/**
 * animations.js
 * GSAP and ScrollTrigger configurations.
 */
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Robust vanilla JS counter
function runCounter(el, target, durationMs = 2000) {
    if (!el) return;
    const numericTarget = parseInt(target, 10);
    if (isNaN(numericTarget)) return;

    if (el.dataset.counterRunning === "true") return;
    el.dataset.counterRunning = "true";

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(easeOut * numericTarget);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.textContent = numericTarget;
            el.dataset.counterRunning = "false";
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
        initIndustrialSectorExplorer(isMobile);
        initGlobalImpactDashboard(isMobile);
        initTrustedBrandsTestimonials(isMobile);
        initContactPageAnimations(isMobile);
        initSmokeRiseAnimation();
        initAuthFooterAnimations();
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
    
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const heroActions = document.getElementById('heroActions');
    
    if (isMobile) {
        if (heroTitle) { heroTitle.style.opacity = '1'; heroTitle.style.visibility = 'visible'; }
        if (heroDesc) { heroDesc.style.opacity = '1'; heroDesc.style.visibility = 'visible'; }
        if (heroActions) { heroActions.style.opacity = '1'; heroActions.style.visibility = 'visible'; }
        return;
    }

    const tl = gsap.timeline();
    
    // Hero Title
    if (heroTitle) {
        tl.from('#heroTitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    // Hero Desc
    if (heroDesc) {
        tl.from('#heroDesc', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
    }
    
    // Hero Actions
    if (heroActions) {
        tl.from('#heroActions', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
    }
    
    // Hero Floats (Stagger)
    if (document.getElementById('heroFloats')) {
        tl.from('.float-card', {
            x: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4');
    }
}
function initScrollReveals(isMobile = false) {
    if (isMobile) {
        document.querySelectorAll('.gs-reveal-up, .gs-reveal-left, .gs-reveal-right').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'none';
        });
        return;
    }
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
    const counters = document.querySelectorAll('.counter, .exp-counter, .counter-num, .stat-number, [data-target]');
    
    counters.forEach(counter => {
        let rawTarget = counter.getAttribute('data-target');
        if (!rawTarget || isNaN(parseInt(rawTarget, 10))) {
            rawTarget = counter.textContent.trim();
        }
        
        const target = parseInt(rawTarget, 10);
        if (isNaN(target)) return;

        counter.setAttribute('data-target', target);

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        runCounter(counter, target, 2000);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(counter);
        } else if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 90%',
                once: true,
                onEnter: () => {
                    runCounter(counter, target, 2000);
                }
            });
        } else {
            runCounter(counter, target, 2000);
        }
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
    if (!section) return;

    const cards = Array.from(section.querySelectorAll('.conveyor-card-wrapper'));
    const prevBtn = document.getElementById('conveyorPrev');
    const nextBtn = document.getElementById('conveyorNext');
    const counterCurrent = section.querySelector('.current-num');
    const borderRects = section.querySelectorAll('.card-border-rect');
    
    if (cards.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isAnimating = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animated light running around active border SVG
    borderRects.forEach(rect => {
        gsap.to(rect, {
            strokeDashoffset: -490,
            duration: 4,
            repeat: -1,
            ease: "none"
        });
    });

    function getSlotConfig(slot, mobile) {
        if (mobile) {
            if (slot === 0) {
                return { x: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 10, pointerEvents: 'auto' };
            } else if (slot === 1) {
                return { x: '125%', scale: 0.85, rotation: 0, opacity: 0, zIndex: 1, pointerEvents: 'none' };
            } else {
                return { x: '-125%', scale: 0.85, rotation: 0, opacity: 0, zIndex: 1, pointerEvents: 'none' };
            }
        } else {
            if (slot === 0) {
                return { x: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 10, pointerEvents: 'auto' };
            } else if (slot === 1) {
                return { x: 380, scale: 0.88, rotation: 3, opacity: 0.65, zIndex: 2, pointerEvents: 'auto' };
            } else {
                return { x: -380, scale: 0.88, rotation: -3, opacity: 0.65, zIndex: 2, pointerEvents: 'auto' };
            }
        }
    }

    function updateConveyorPositions(immediate = false) {
        const mobileState = window.innerWidth < 768;

        cards.forEach((card, i) => {
            const slot = (i - currentIndex + cards.length) % cards.length;
            const config = getSlotConfig(slot, mobileState);
            const quoteText = card.querySelector('.card-quote-text');
            const stars = card.querySelectorAll('.card-rating i');
            const avatar = card.querySelector('.author-avatar');

            if (slot === 0) {
                card.classList.add('is-active-card');
            } else {
                card.classList.remove('is-active-card');
            }

            if (immediate || reduceMotion) {
                gsap.set(card, {
                    x: config.x,
                    scale: config.scale,
                    rotation: config.rotation,
                    opacity: config.opacity,
                    zIndex: config.zIndex,
                    pointerEvents: config.pointerEvents
                });
                isAnimating = false;
            } else {
                gsap.to(card, {
                    x: config.x,
                    scale: config.scale,
                    rotation: config.rotation,
                    opacity: config.opacity,
                    zIndex: config.zIndex,
                    pointerEvents: config.pointerEvents,
                    duration: 0.75,
                    ease: "power3.out",
                    onComplete: () => {
                        isAnimating = false;
                    }
                });

                if (slot === 0) {
                    gsap.fromTo(stars, 
                        { scale: 0, opacity: 0 }, 
                        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: "back.out(1.7)", delay: 0.15 }
                    );
                    gsap.fromTo(quoteText, 
                        { opacity: 0, y: 15 }, 
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
                    );
                    gsap.fromTo(avatar, 
                        { scale: 0.8, rotation: -10 }, 
                        { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.5)", delay: 0.25 }
                    );
                }
            }
        });

        if (counterCurrent) {
            counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
        }
    }

    // Initialize initial slot positions
    updateConveyorPositions(true);

    if (!reduceMotion) {
        // ScrollTrigger entrance timeline
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            }
        });

        // 1. Eyebrow upward with fade-in
        scrollTl.fromTo(section.querySelectorAll('.conveyor-eyebrow'), 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );

        // 2. Heading split-text style word reveal
        scrollTl.fromTo(section.querySelectorAll('.conveyor-heading .word'), 
            { y: '100%', opacity: 0 }, 
            { y: '0%', opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 
            "-=0.4"
        );

        // 3. Draw horizontal orange precision line
        scrollTl.fromTo(section.querySelectorAll('.conveyor-precision-line'), 
            { scaleX: 0 }, 
            { scaleX: 1, duration: 0.8, ease: 'power3.out' }, 
            "-=0.5"
        );

        // 4. Description
        scrollTl.fromTo(section.querySelectorAll('.conveyor-desc'), 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
            "-=0.5"
        );

        // 5. Conveyor cards entrance from horizontal positions
        cards.forEach((card, i) => {
            const slot = (i - currentIndex + cards.length) % cards.length;
            const config = getSlotConfig(slot, window.innerWidth < 768);
            const fromX = slot === 0 ? 0 : (slot === 1 ? 450 : -450);

            scrollTl.fromTo(card, 
                { x: fromX, y: 50, opacity: 0, scale: 0.85 }, 
                { x: config.x, y: 0, opacity: config.opacity, scale: config.scale, rotation: config.rotation, duration: 0.9, ease: "power3.out" }, 
                "-=0.7"
            );
        });

        // 6. Active card star stagger & quote reveal & avatar animation
        const activeCard = cards[currentIndex];
        if (activeCard) {
            scrollTl.fromTo(activeCard.querySelectorAll('.card-rating i'), 
                { scale: 0, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.7)" }, 
                "-=0.3"
            );
            scrollTl.fromTo(activeCard.querySelector('.card-quote-text'), 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 
                "-=0.2"
            );
            scrollTl.fromTo(activeCard.querySelector('.author-avatar'), 
                { scale: 0.8, rotation: -10 }, 
                { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.5)" }, 
                "-=0.3"
            );
        }

        // 7. Controls reveal
        scrollTl.fromTo(section.querySelectorAll('.conveyor-controls-wrap'), 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
            "-=0.3"
        );

        scrollTl.call(() => {
            startAutoplay();
        });
    } else {
        startAutoplay();
    }

    function goToNext() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % cards.length;
        updateConveyorPositions(false);
    }

    function goToPrev() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateConveyorPositions(false);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToNext();
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToPrev();
            resetAutoplay();
        });
    }

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (i !== currentIndex && !isAnimating) {
                isAnimating = true;
                currentIndex = i;
                updateConveyorPositions(false);
                resetAutoplay();
            }
        });
    });

    section.setAttribute('tabindex', '0');
    section.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            goToNext();
            resetAutoplay();
        } else if (e.key === 'ArrowLeft') {
            goToPrev();
            resetAutoplay();
        }
    });

    function startAutoplay() {
        if (!autoPlayTimer) {
            autoPlayTimer = setInterval(goToNext, 4500);
        }
    }

    function stopAutoplay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    section.addEventListener('mouseenter', stopAutoplay);
    section.addEventListener('mouseleave', startAutoplay);
    section.addEventListener('focusin', stopAutoplay);
    section.addEventListener('focusout', startAutoplay);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateConveyorPositions(true);
        }, 150);
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
            { opacity: 0 }, 
            { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.5");
          
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
    // --- 7. INDUSTRIAL BLUEPRINT SECTION (MISSION, VISION, EXPERTISE & STATS) ---
    initIndustrialBlueprintSection();
}

function initIndustrialBlueprintSection() {
    const section = document.getElementById('blueprintExpertise');
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Background technical grid infinite slow drift
    const gridBg = section.querySelector('.blueprint-grid-bg');
    if (gridBg && !reduceMotion) {
        gsap.to(gridBg, {
            backgroundPosition: "40px 40px",
            duration: 30,
            repeat: -1,
            ease: "none"
        });
    }

    if (reduceMotion) {
        gsap.set(section.querySelectorAll('.mv-blueprint-panel, .bp-card, .bp-stat-card, .connecting-line, .connecting-node, .blueprint-line-draw, .stat-draw-line'), {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
            rotation: 0,
            width: '100%'
        });
        
        section.querySelectorAll('.stat-number').forEach(num => {
            num.textContent = num.getAttribute('data-target');
        });
        return;
    }

    // --- 1. MISSION + VISION ANIMATION ---
    const mvContainer = section.querySelector('.mission-vision-container');
    if (mvContainer) {
        const mvTl = gsap.timeline({
            scrollTrigger: {
                trigger: mvContainer,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            }
        });

        // 1. Thin orange line draws across
        mvTl.fromTo('.connecting-line',
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "power3.inOut" }
        );

        // 2. Traveling glowing node dot
        mvTl.fromTo('.connecting-node',
            { scale: 0, x: '-200px' },
            { scale: 1, x: '200px', duration: 1.2, ease: "power2.inOut" },
            "-=0.8"
        );

        // 3. Mission panel reveals from left
        mvTl.fromTo('#missionPanel',
            { x: isMobile ? -30 : -80, opacity: 0, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
            "-=0.9"
        );

        // 4. Vision panel reveals from right
        mvTl.fromTo('#visionPanel',
            { x: isMobile ? 30 : 80, opacity: 0, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
            "-=0.9"
        );

        // 5. Panel text reveals
        mvTl.fromTo('.panel-text',
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power2.out" },
            "-=0.4"
        );
    }

    // --- 2. EXPERTISE GRID ANIMATION ---
    const expHeader = section.querySelector('#expertiseHeader');
    const cards = section.querySelectorAll('.bp-card');

    if (expHeader && cards.length > 0) {
        const expTl = gsap.timeline({
            scrollTrigger: {
                trigger: expHeader,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            }
        });

        // 1. Eyebrow appears first
        expTl.fromTo('.blueprint-eyebrow',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        // 2. Heading split-word animation
        expTl.fromTo('.blueprint-heading .word',
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
            "-=0.4"
        );

        // 3. Thin orange line draws underneath heading
        expTl.fromTo('.blueprint-line-draw',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        );

        // 4. Description reveals
        expTl.fromTo('.blueprint-desc',
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.5"
        );

        // 5. 6 Cards enter sequentially with alternating directions
        cards.forEach((card, index) => {
            const cardNum = index + 1;
            let fromVars = {};

            if (cardNum === 1 || cardNum === 4) {
                // From left
                fromVars = { x: isMobile ? -30 : -80, y: 0, opacity: 0, scale: 0.9, rotation: isMobile ? 0 : -3 };
            } else if (cardNum === 2 || cardNum === 5) {
                // From bottom
                fromVars = { x: 0, y: isMobile ? 40 : 80, opacity: 0, scale: 0.9, rotation: 0 };
            } else {
                // From right
                fromVars = { x: isMobile ? 30 : 80, y: 0, opacity: 0, scale: 0.9, rotation: isMobile ? 0 : 3 };
            }

            expTl.fromTo(card,
                fromVars,
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.85,
                    ease: "power3.out",
                    onComplete: () => {
                        const beam = card.querySelector('.card-scan-beam');
                        if (beam) {
                            gsap.fromTo(beam,
                                { top: '-100%', opacity: 1 },
                                { top: '100%', opacity: 0, duration: 0.7, ease: "power1.inOut" }
                            );
                        }
                    }
                },
                "-=0.65"
            );
        });
    }

    // --- 3. PERFORMANCE STATS ANIMATION ---
    const statsWrap = section.querySelector('#blueprintStats');
    if (statsWrap) {
        const statsCards = statsWrap.querySelectorAll('.bp-stat-card');
        const statsLine = statsWrap.querySelector('.stats-top-line');

        ScrollTrigger.create({
            trigger: statsWrap,
            start: "top 80%",
            once: true,
            onEnter: () => {
                const statsTl = gsap.timeline();

                if (statsLine) {
                    statsTl.fromTo(statsLine,
                        { scaleX: 0 },
                        { scaleX: 1, duration: 0.8, ease: "power3.out" }
                    );
                }

                statsTl.fromTo(statsCards,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
                    "-=0.4"
                );

                statsCards.forEach((card, index) => {
                    const numberEl = card.querySelector('.stat-number');
                    const suffixEl = card.querySelector('.stat-suffix');
                    const drawLine = card.querySelector('.stat-draw-line');
                    const target = parseInt(numberEl.getAttribute('data-target') || '0', 10);

                    if (drawLine) {
                        gsap.fromTo(drawLine,
                            { width: '0px' },
                            { width: '50px', duration: 0.8, ease: "power2.out", delay: index * 0.12 }
                        );
                    }

                    runCounter(numberEl, target, 2000);

                    if (suffixEl) {
                        gsap.fromTo(suffixEl,
                            { scale: 0, opacity: 0 },
                            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.3 + (index * 0.12) }
                        );
                    }
                });
            }
        });
    }
}

function initSpotlightReveal(isMobile = false) {
    // INK BLEED ANIMATION — Characters reveal as if ink is spreading onto paper
    const headings = document.querySelectorAll('.inner-hero h1, .hero-content h1, h1.gs-clip-text, .page-header-box h1');
    
    headings.forEach(heading => {
        // Prevent double initialization
        if(heading.classList.contains('inkbleed-initialized')) return;
        heading.classList.add('inkbleed-initialized');
        
        const originalText = heading.innerText;
        if (!originalText.trim()) return;
        
        // Get the computed color before we modify anything
        const computedColor = window.getComputedStyle(heading).color || '#ffffff';
        
        // Split text into words, then each word into characters
        heading.innerHTML = '';
        heading.style.overflow = 'visible';
        
        const words = originalText.split(/(\s+)/); // Preserve whitespace
        
        words.forEach(segment => {
            if (/^\s+$/.test(segment)) {
                // Whitespace — preserve it
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = '&nbsp;';
                spaceSpan.style.display = 'inline';
                heading.appendChild(spaceSpan);
                return;
            }
            
            // Create a word wrapper to prevent mid-word breaks
            const wordWrap = document.createElement('span');
            wordWrap.style.display = 'inline-block';
            wordWrap.style.whiteSpace = 'nowrap';
            
            const chars = segment.split('');
            chars.forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'ink-char';
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.opacity = '0';
                charSpan.style.transform = 'scale(0.3) translateY(8px)';
                charSpan.style.filter = 'blur(12px)';
                charSpan.style.color = computedColor;
                charSpan.style.willChange = 'transform, opacity, filter';
                charSpan.style.transformOrigin = 'center bottom';
                wordWrap.appendChild(charSpan);
            });
            
            heading.appendChild(wordWrap);
        });
        
        // Get all ink characters
        const inkChars = heading.querySelectorAll('.ink-char');
        if (inkChars.length === 0) return;
        
        // Create the ink bleed timeline
        const tl = gsap.timeline({ delay: 0.3 });
        
        // Phase 1: Ink drop — characters appear from a point with blur (the "bleed" effect)
        tl.to(inkChars, {
            opacity: 1,
            scale: 1.15,           // Overshoot slightly — ink spreading past boundary
            filter: 'blur(4px)',   // Still slightly blurred mid-bleed
            y: 0,
            duration: 0.5,
            stagger: {
                each: 0.035,
                from: 'start'
            },
            ease: 'power2.out'
        });
        
        // Phase 2: Ink settles — blur clears to sharp, scale normalizes
        tl.to(inkChars, {
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: {
                each: 0.02,
                from: 'start'
            },
            ease: 'power3.out'
        }, '-=0.35');  // Overlap with phase 1 for organic feel
        
        // Phase 3: Subtle ink shimmer — a quick brightness pulse like wet ink catching light
        tl.fromTo(inkChars, 
            { textShadow: '0 0 0px rgba(255,255,255,0)' },
            {
                textShadow: '0 0 8px rgba(255,255,255,0.3)',
                duration: 0.4,
                stagger: { each: 0.015, from: 'start' },
                ease: 'power1.inOut',
                yoyo: true,
                repeat: 1
            }, '-=0.5'
        );
    });
}
function initCascadeReveal(isMobile = false) {
    const headings = document.querySelectorAll('.section-header h2, .section-title h2');
    
    headings.forEach(heading => {
        if (isMobile) {
            heading.style.opacity = '1';
            heading.style.visibility = 'visible';
            return;
        }

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

/* ==========================================================================
   INDUSTRIAL SECTOR EXPLORER ANIMATIONS & INTERACTIONS
   ========================================================================== */
function initIndustrialSectorExplorer(isMobile = false) {
    const section = document.getElementById('industries');
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = section.querySelectorAll('.sector-card');

    if (reduceMotion) {
        gsap.set(section.querySelectorAll('.sector-card, .sector-eyebrow-line, .sector-heading .word'), {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
            rotation: 0
        });
        return;
    }

    // Background technical lines infinite drift
    const bpBg = section.querySelector('.sector-blueprint-bg');
    if (bpBg) {
        gsap.to(bpBg, {
            backgroundPosition: "36px 36px",
            duration: 35,
            repeat: -1,
            ease: "none"
        });
    }

    // Header & Cards Assembly Entrance Animation
    const header = section.querySelector('#sectorHeader');
    if (header && cards.length > 0) {
        const sectorTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            }
        });

        // 1. Eyebrow appears & orange line draws outward
        sectorTl.fromTo('.sector-eyebrow',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        ).fromTo('.sector-eyebrow-line',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
        );

        // 2. Heading split-word reveal
        sectorTl.fromTo('.sector-heading .word',
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
            "-=0.5"
        );

        // 3. Supporting text reveal
        sectorTl.fromTo('.sector-desc',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.5"
        );

        // 4. 6 Cards clean Fade Up on Scroll sequence with stagger
        sectorTl.fromTo(cards,
            { y: isMobile ? 30 : 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.12,
                ease: "power3.out"
            },
            "-=0.4"
        );
    }

    // Card Hover & Mobile Tap Interaction + Scanning Beam Effect
    cards.forEach((card) => {
        const beam = card.querySelector('.sector-scan-beam');

        const triggerScanner = () => {
            if (beam && !card.dataset.scanned) {
                card.dataset.scanned = "true";
                gsap.fromTo(beam,
                    { top: '-100%', opacity: 1 },
                    { top: '100%', opacity: 0, duration: 0.7, ease: "power1.inOut", onComplete: () => {
                        card.dataset.scanned = "";
                    }}
                );
            }
        };

        if (isMobile) {
            // Mobile tap toggle active state
            card.addEventListener('click', (e) => {
                if (e.target.closest('.sector-link')) return;
                
                cards.forEach(c => {
                    if (c !== card) c.classList.remove('active');
                });

                const isNowActive = card.classList.toggle('active');
                if (isNowActive) {
                    triggerScanner();
                }
            });
        } else {
            // Desktop mouseenter scanning beam trigger
            card.addEventListener('mouseenter', () => {
                triggerScanner();
            });
        }
    });
}

/* ==========================================================================
   GLOBAL MANUFACTURING IMPACT DASHBOARD ANIMATIONS & INTERACTIONS
   ========================================================================== */
function initGlobalImpactDashboard(isMobile = false) {
    const section = document.getElementById('globalImpact');
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
        gsap.set(section.querySelectorAll('.impact-panel, .impact-eyebrow-line, .impact-heading .word, .global-reach-banner'), {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1
        });
        
        section.querySelectorAll('.impact-counter').forEach(num => {
            const target = num.getAttribute('data-target');
            if (num.getAttribute('data-format') === 'comma') {
                num.textContent = parseInt(target, 10).toLocaleString();
            } else {
                num.textContent = target;
            }
        });
        return;
    }

    // Step 1 & 2: Header & Dashboard Assembly Sequence
    const header = section.querySelector('#impactHeader');
    const mainImgPanel = section.querySelector('#panelMainImage');
    const primaryPanel = section.querySelector('#panelPrimaryMetric');
    const contentPanel = section.querySelector('#panelContent');
    const unitsPanel = section.querySelector('#panelUnits');
    const countriesPanel = section.querySelector('#panelCountries');
    const qualityPanel = section.querySelector('#panelQuality');
    const reachBanner = section.querySelector('#globalReachBanner');

    if (header) {
        const impactTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            }
        });

        // Step 1 — Header reveal
        impactTl.fromTo('.impact-eyebrow',
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        ).fromTo('.impact-eyebrow-line',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
        ).fromTo('.impact-heading .word',
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
            "-=0.5"
        ).fromTo('.impact-desc',
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.5"
        );

        // Step 2 — Assembly Sequence:
        // 1. Main image slides from left
        if (mainImgPanel) {
            impactTl.fromTo(mainImgPanel,
                { x: isMobile ? -30 : -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", onComplete: () => {
                    // Step 5: Industrial Image Scan Beam Effect
                    const scanBeam = mainImgPanel.querySelector('.impact-scan-beam');
                    if (scanBeam) {
                        gsap.fromTo(scanBeam,
                            { left: '-100%', opacity: 1 },
                            { left: '100%', opacity: 0, duration: 1.1, ease: "power1.inOut" }
                        );
                    }
                }},
                "-=0.4"
            );
        }

        // 2. Primary Metric (25+ Years) rises from bottom
        if (primaryPanel) {
            impactTl.fromTo(primaryPanel,
                { y: isMobile ? 30 : 70, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );
        }

        // 3. Global Strength content slides from right
        if (contentPanel) {
            impactTl.fromTo(contentPanel,
                { x: isMobile ? 30 : 70, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.65"
            );
        }

        // 4. Monthly Units scales from 0.8 to 1
        if (unitsPanel) {
            impactTl.fromTo(unitsPanel,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)" },
                "-=0.5"
            );
        }

        // 5. Countries Served slides up
        if (countriesPanel) {
            impactTl.fromTo(countriesPanel,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                "-=0.5"
            );
        }

        // 6. Quality & Reliability appears last
        if (qualityPanel) {
            impactTl.fromTo(qualityPanel,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
                "-=0.5"
            );
        }

        // 7. Global reach banner reveal
        if (reachBanner) {
            impactTl.fromTo(reachBanner,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );
        }
    }

    // Step 3 — Counter Animation with formatted output
    const counters = section.querySelectorAll('.impact-counter');
    if (counters.length > 0) {
        ScrollTrigger.create({
            trigger: section.querySelector('#impactDashboardGrid') || section,
            start: "top 80%",
            once: true,
            onEnter: () => {
                counters.forEach((counterEl, idx) => {
                    const target = parseInt(counterEl.getAttribute('data-target') || '0', 10);
                    const isComma = counterEl.getAttribute('data-format') === 'comma';
                    const duration = target > 10000 ? 1600 : 2000;

                    setTimeout(() => {
                        let startTimestamp = null;
                        const step = (timestamp) => {
                            if (!startTimestamp) startTimestamp = timestamp;
                            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                            const easeOut = 1 - Math.pow(1 - progress, 3);
                            const val = Math.floor(easeOut * target);
                            counterEl.textContent = isComma ? val.toLocaleString() : val;

                            if (progress < 1) {
                                window.requestAnimationFrame(step);
                            } else {
                                counterEl.textContent = isComma ? target.toLocaleString() : target;
                            }
                        };
                        window.requestAnimationFrame(step);
                    }, idx * 120);
                });
            }
        });
    }

    // Step 4 — Traveling Network Line Nodes
    const pulseNodes = section.querySelectorAll('.network-pulse-node');
    if (pulseNodes.length > 0) {
        gsap.to('.node-a', {
            x: 300,
            y: 150,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to('.node-b', {
            x: -300,
            y: -100,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

/* ==========================================================================
   TRUSTED BY GLOBAL BRANDS TESTIMONIAL GRID ANIMATIONS
   ========================================================================== */
function initTrustedBrandsTestimonials(isMobile) {
    const section = document.querySelector('.trusted-brands-section');
    if (!section) return;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const header = section.querySelector('.tb-header');
    const cards = section.querySelectorAll('.tb-card');

    if (header) {
        gsap.fromTo(header, 
            { y: isMobile ? 25 : 40, opacity: 0 }, 
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    once: true
                }
            }
        );
    }

    if (cards.length > 0) {
        gsap.fromTo(cards, 
            { y: isMobile ? 30 : 50, opacity: 0, rotationX: isMobile ? 0 : 8 }, 
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.85,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section.querySelector('.tb-grid') || section,
                    start: "top 75%",
                    once: true
                }
            }
        );
    }

    // Subtle avatar floating animation
    const avatars = section.querySelectorAll('.tb-avatar');
    if (avatars.length > 0 && !isMobile) {
        avatars.forEach((avatar, i) => {
            gsap.to(avatar, {
                y: -4,
                duration: 2.5 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }
}

/* ==========================================================================
   CONTACT PAGE UNIQUE GSAP ANIMATIONS
   ========================================================================== */
function initContactPageAnimations(isMobile) {
    const hero = document.querySelector('.contact-hero-section');
    const cardsSection = document.querySelector('.contact-cards-container');

    if (!hero && !cardsSection) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // 1. Hero Split-Word Title & Desc Reveal
    const heroTl = gsap.timeline();
    
    if (hero) {
        heroTl.fromTo('.contact-hero-section .hero-bg-img',
            { opacity: 0, scale: 1.08 },
            { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
        ).fromTo('.contact-hero-heading .word',
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.75, stagger: 0.08, ease: "power3.out" },
            "-=0.9"
        ).fromTo('.contact-hero-desc',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4"
        ).fromTo('.contact-hero-section .breadcrumbs',
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
        );
    }

    // 2. 3D Magnet Spotlight Cards Assembly Reveal
    const cards = document.querySelectorAll('.contact-info-grid .c-info-card');
    if (cards.length > 0) {
        gsap.fromTo(cards,
            { y: isMobile ? 30 : 60, opacity: 0, rotationY: isMobile ? 0 : 15, scale: 0.92 },
            {
                y: 0,
                opacity: 1,
                rotationY: 0,
                scale: 1,
                duration: 0.85,
                stagger: 0.12,
                ease: "back.out(1.4)",
                scrollTrigger: {
                    trigger: '#contactInfoGrid',
                    start: "top 85%",
                    once: true
                }
            }
        );
    }
}

/* ==========================================================================
   SMOKE RISE TEXT GSAP ANIMATION (WELCOME BACK / CREATE YOUR ACCOUNT)
   ========================================================================== */
function initSmokeRiseAnimation() {
    const headings = document.querySelectorAll('.smoke-rise-heading');
    if (!headings.length) return;

    if (typeof gsap === 'undefined') return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    headings.forEach((heading) => {
        const words = heading.querySelectorAll('.smoke-word');
        const targetElements = words.length > 0 ? words : [heading];

        gsap.fromTo(targetElements,
            {
                opacity: 0,
                y: 40,
                scale: 1.15,
                filter: "blur(14px)",
                transformOrigin: "50% 100%"
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.25,
                stagger: 0.12,
                ease: "power3.out",
                delay: 0.2
            }
        );
    });
}

/* ==========================================================================
   AUTH FOOTER STAGGERED REVEAL & INTERACTION ANIMATIONS
   ========================================================================== */
function initAuthFooterAnimations() {
    const footer = document.querySelector('.auth-footer');
    if (!footer) return;

    if (typeof gsap === 'undefined') return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const switchText = footer.querySelector('.auth-switch-text');
    const switchBtn = footer.querySelector('.auth-switch-btn');
    const homeWrapper = footer.querySelector('.auth-home-wrapper');
    const homeLink = footer.querySelector('.auth-home-link');
    const homeIcon = footer.querySelector('.auth-home-icon');

    // Create sequenced timeline starting right after main form button animation
    const footerTl = gsap.timeline({ delay: 0.75 });

    // 1. Account switch text: fade-up + blur to sharp reveal
    if (switchText) {
        footerTl.fromTo(switchText,
            { opacity: 0, y: 15, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power2.out" }
        );
    }

    // 2. Sign Up / Sign In link animation
    if (switchBtn) {
        const isHighlightPill = switchBtn.classList.contains('auth-highlight-btn');
        footerTl.fromTo(switchBtn,
            { opacity: 0, y: 12, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
            "-=0.4"
        );

        if (isHighlightPill) {
            footerTl.to(switchBtn, {
                scale: 1.03,
                duration: 0.22,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut"
            });
        }

        // Hover animations
        switchBtn.addEventListener('mouseenter', () => {
            gsap.to(switchBtn, {
                y: -2,
                boxShadow: isHighlightPill ? "0 8px 25px rgba(242, 140, 40, 0.45)" : "none",
                duration: 0.25,
                ease: "power2.out"
            });
        });

        switchBtn.addEventListener('mouseleave', () => {
            gsap.to(switchBtn, {
                y: 0,
                boxShadow: isHighlightPill ? "0 4px 15px rgba(242, 140, 40, 0.18)" : "none",
                duration: 0.25,
                ease: "power2.out"
            });
        });
    }

    // 3. "Go Back to Home" separate subtle fade-up + icon movement
    if (homeWrapper) {
        footerTl.fromTo(homeWrapper,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
        );
    }

    if (homeIcon) {
        footerTl.fromTo(homeIcon,
            { x: -6, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" },
            "-=0.4"
        );
    }

    if (homeLink && homeIcon) {
        homeLink.addEventListener('mouseenter', () => {
            gsap.to(homeIcon, { x: -3, duration: 0.25, ease: "power2.out" });
        });
        homeLink.addEventListener('mouseleave', () => {
            gsap.to(homeIcon, { x: 0, duration: 0.25, ease: "power2.out" });
        });
    }
}
