document.addEventListener('DOMContentLoaded', () => {
    
    // Safety check - ONLY run on the service page
    const servicePage = document.querySelector('.service-page');
    if (!servicePage) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        let { isMobile, reduceMotion } = context.conditions;
        if (reduceMotion) return;

    // ==========================================
    // 1. SERVICE HERO: Industrial System Boot
    // ==========================================
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    const bgElement = document.querySelector('.sh-bg-element');
    const gridPattern = document.querySelector('.sh-grid-pattern');
    const title = document.querySelector('.sh-title');
    const desc = document.querySelector('.sh-desc');
    const btns = document.querySelectorAll('.sh-btn');
    const visualWrapper = document.querySelector('.sh-visual-wrapper');
    const visualLine = document.querySelector('.sh-visual-line');
    if(bgElement) heroTl.to(bgElement, { opacity: 1, scale: 1, duration: 1.5 }, 0);
    if(gridPattern) heroTl.to(gridPattern, { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.inOut" }, 0.2);
    
    if(title) {
        if (isMobile) {
            title.style.opacity = '1';
            title.style.visibility = 'visible';
        } else {
            const words = title.innerText.split(' ');
            title.innerHTML = '';
            words.forEach(word => {
                const span = document.createElement('span');
                span.innerText = word + ' ';
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(20px)';
                title.appendChild(span);
            });
            const wordSpans = title.querySelectorAll('span');
            heroTl.to(wordSpans, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.8);
        }
    }
    
    if(desc) heroTl.fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);
    if(btns.length > 0) heroTl.fromTo(btns, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.4);
    
    if(visualWrapper) {
        heroTl.fromTo(visualWrapper, 
            { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', scale: isMobile ? 0.95 : 0.8, rotation: 5, opacity: 0 },
            { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, 
            1.0
        );
    }
    if(visualLine) {
        gsap.to(visualLine, { rotation: 360, duration: isMobile ? 40 : 20, repeat: -1, ease: "none" });
    }

    // ==========================================
    // 2. SERVICES OVERVIEW: Activation
    // ==========================================
    const whyCards = gsap.utils.toArray('.why-card-custom');
    
    if (whyCards.length > 0) {
        const firstRow = whyCards.slice(0, 3);
        const secondRow = whyCards.slice(3, 6);
        
        [firstRow, secondRow].forEach((row) => {
            if (row.length === 0) return;
            gsap.fromTo(row, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    stagger: 0.15, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: row[0],
                        start: "top 80%",
                        once: true
                    }
                }
            );
        });
    }
    // ==========================================
    // 3. FEATURED SERVICE SECTION
    // ==========================================
    const featuredSection = document.querySelector('.service-featured-section');
    if (featuredSection) {
        const img = featuredSection.querySelector('.sf-image-wrapper');
        const measureLine = featuredSection.querySelector('.sf-measure-line');
        const fTitle = featuredSection.querySelector('.sf-title');
        const fDesc = featuredSection.querySelector('.sf-desc');
        const listItems = featuredSection.querySelectorAll('.sf-list-item');
        
        const ftl = gsap.timeline({
            scrollTrigger: {
                trigger: featuredSection,
                start: "top 70%",
                once: true
            }
        });
        
        if(img) ftl.fromTo(img, { clipPath: 'inset(100% 0 0 0)', opacity: 0 }, { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.2, ease: "power3.out" }, 0);
        if(measureLine) ftl.to(measureLine, { height: '100%', duration: 1.5, ease: "power2.inOut" }, 0.5);
        if(fTitle) ftl.fromTo(fTitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
        if(fDesc) ftl.fromTo(fDesc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
        if(listItems.length > 0) ftl.to(listItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.7);
    }
    // ==========================================
    // 4. HORIZONTAL STORY FLOW (PROCESS)
    // ==========================================
    const storySection = document.querySelector('.story-process-section');
    if (storySection) {
        const mm = gsap.matchMedia();
        const track = storySection.querySelector('.story-track');
        const panels = gsap.utils.toArray('.story-panel');
        const activeLine = storySection.querySelector('.story-active-line');
        const movingDot = storySection.querySelector('.story-moving-dot');
        const currentCounter = storySection.querySelector('.story-current');
        
        mm.add("(min-width: 992px)", () => {
            // Deskto/Tablet Horizontal Scroll
            const totalPanels = panels.length;
            
            // 1. Horizontal Translation Timeline (Pinned)
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: storySection,
                    pin: '.story-pin-wrap',
                    start: "top top",
                    end: () => "+=" + (track.offsetWidth - window.innerWidth),
                    scrub: 1,
                    snap: 1 / (totalPanels - 1)
                }
            });
            // Move the track to the left
            scrollTl.to(track, {
                xPercent: -100 * (totalPanels - 1) / totalPanels,
                ease: "none"
            });
            
            // Progress Line Animation syncs with the scrollTl
            scrollTl.to(activeLine, { strokeDashoffset: 0, ease: "none" }, 0);
            scrollTl.to(movingDot, { cx: 990, ease: "none" }, 0); // 10 to 990
            // 2. Individual Panel Reveals
            panels.forEach((panel, i) => {
                const content = panel.querySelector('.story-panel-content');
                const title = panel.querySelector('.story-title');
                
                // Set initial states for clip-path and scale
                gsap.set(panel, { scale: isMobile ? 0.98 : 0.96, transformOrigin: "center center" });
                gsap.set(content, { opacity: 0, y: 50 });
                gsap.set(title, { clipPath: "inset(0 100% 0 0)" });
                // We want each panel to animate IN when it enters the viewport horizontally
                // We calculate when it enters based on scroll progress
                // The first panel is already visible.
                
                ScrollTrigger.create({
                    trigger: storySection,
                    start: () => "top top-=" + (i * window.innerWidth * 0.8), // approximate when it enters
                    end: () => "top top-=" + ((i+1) * window.innerWidth * 0.8),
                    onEnter: () => {
                        currentCounter.innerText = "0" + (i + 1);
                        gsap.to(panel, { scale: 1, duration: 1, ease: "power2.out" });
                        gsap.to(content, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
                        gsap.to(title, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" });
                    },
                    onEnterBack: () => {
                        currentCounter.innerText = "0" + (i + 1);
                        gsap.to(panel, { scale: 1, duration: 1, ease: "power2.out" });
                        gsap.to(content, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
                    },
                    onLeave: () => {
                        // When leaving to the left (next panel coming in)
                        gsap.to(panel, { scale: isMobile ? 0.98 : 0.96, duration: 1, ease: "power2.out" });
                        gsap.to(content, { opacity: 0, y: -30, duration: 0.5 });
                    },
                    onLeaveBack: () => {
                        // When leaving to the right (scrolling up)
                        gsap.to(panel, { scale: isMobile ? 0.98 : 0.96, duration: 1, ease: "power2.out" });
                        gsap.to(content, { opacity: 0, y: isMobile ? 20 : 50, duration: 0.5 });
                        gsap.set(title, { clipPath: "inset(0 100% 0 0)" });
                    }
                });
            });
            
            // Explicitly trigger the first panel on load
            gsap.to(panels[0], { scale: 1, duration: 1 });
            gsap.to(panels[0].querySelector('.story-panel-content'), { opacity: 1, y: 0, duration: 0.8 });
            gsap.to(panels[0].querySelector('.story-title'), { clipPath: "inset(0 0% 0 0)", duration: 1 });
        });
        
        mm.add("(max-width: 991px)", () => {
            // Mobile Vertical Stacking Reveal
            panels.forEach((panel, i) => {
                const content = panel.querySelector('.story-panel-content');
                const title = panel.querySelector('.story-title');
                
                gsap.set(content, { opacity: 0, y: 30 });
                gsap.set(title, { clipPath: "inset(0 100% 0 0)" });
                
                ScrollTrigger.create({
                    trigger: panel,
                    start: "top 70%",
                    onEnter: () => {
                        gsap.to(content, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
                        gsap.to(title, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" });
                    }
                });
            });
        });
    }
    // ==========================================
    // 5. WHY CHOOSE OUR SERVICES (STATS)// ==========================================
    // 5. WHY CHOOSE OUR SERVICES (STATS)
    // ==========================================
    const statsSection = document.querySelector('.service-stats-section');
    if (statsSection) {
        const counters = statsSection.querySelectorAll('.ss-counter');
        const rings = statsSection.querySelectorAll('.ss-ring');
        
        ScrollTrigger.create({
            trigger: statsSection,
            start: "top 80%",
            once: true,
            onEnter: () => {
                counters.forEach((counter) => {
                    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
                    gsap.fromTo(counter, 
                        { innerHTML: 0 }, 
                        { innerHTML: target, duration: 2.5, ease: "power3.out", snap: { innerHTML: 1 } }
                    );
                });
                
                if(rings.length > 0) {
                    gsap.to(rings, { opacity: 1, rotation: 180, duration: 2, stagger: 0.1, ease: "power2.out" });
                    gsap.to(rings, { rotation: 360, duration: isMobile ? 40 : 20, repeat: -1, ease: "none", delay: 2 });
                }
            }
        });
    }
    // ==========================================
    // 6. SERVICE CAPABILITIES
    // ==========================================
    const capSection = document.querySelector('.service-capabilities-section');
    if (capSection) {
        const bars = capSection.querySelectorAll('.sc-progress');
        const counters = capSection.querySelectorAll('.sc-counter');
        
        ScrollTrigger.create({
            trigger: capSection,
            start: "top 75%",
            once: true,
            onEnter: () => {
                bars.forEach((bar) => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%'; 
                });
                
                counters.forEach((counter) => {
                    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
                    gsap.fromTo(counter, 
                        { innerHTML: 0 }, 
                        { innerHTML: target, duration: 1.5, ease: "power2.out", snap: { innerHTML: 1 } }
                    );
                });
            }
        });
    }
    // ==========================================
    // 7. SERVICE IMAGE / PARALLAX CTA
    // ==========================================
    const pxSection = document.querySelector('.service-parallax-section');
    if (pxSection) {
        const bg = pxSection.querySelector('.spx-bg');
        const content = pxSection.querySelector('.spx-content');
        
        if (bg) gsap.to(bg, {
            y: "30%", 
            ease: "none",
            scrollTrigger: {
                trigger: pxSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        if (content) gsap.to(content, {
            y: "-15%", 
            ease: "none",
            scrollTrigger: {
                trigger: pxSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        const magBtn = pxSection.querySelector('.spx-magnetic-btn');
        const magWrapper = pxSection.querySelector('.spx-btn-wrapper');
        
        if (magBtn && magWrapper) {
            let isMouseMoving = false;
            magWrapper.addEventListener('mousemove', (e) => {
                if (!isMouseMoving) {
                    window.requestAnimationFrame(() => {
                        const rect = magWrapper.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        
                        gsap.to(magWrapper, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
                        isMouseMoving = false;
                    });
                    isMouseMoving = true;
                }
            }, { passive: true });
            
            magWrapper.addEventListener('mouseleave', () => {
                gsap.to(magWrapper, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        }
    }
    }); // End Responsive GSAP Context
    // ==========================================
    // 8. FAQ SECTION
    // ==========================================
    const faqSection = document.querySelector('.service-faq-section');
    if (faqSection) {
        const items = faqSection.querySelectorAll('.s-faq-item');
        
        items.forEach(item => {
            const header = item.querySelector('.s-faq-header');
            const body = item.querySelector('.s-faq-body');
            
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                items.forEach(i => {
                    i.classList.remove('open');
                    const b = i.querySelector('.s-faq-body');
                    gsap.to(b, { height: 0, opacity: 0, duration: 0.3 });
                });
                
                if (!isOpen) {
                    item.classList.add('open');
                    gsap.set(body, { height: 'auto' });
                    const h = body.offsetHeight;
                    gsap.set(body, { height: 0 });
                    gsap.to(body, { height: h, opacity: 1, duration: 0.4, ease: "power2.out", onComplete: () => {
                        body.style.height = 'auto'; 
                    }});
                }
            });
        });
    }
    // ==========================================
    // 9. FINAL CTA SECTION
    // ==========================================
    const ctaSection = document.querySelector('.service-final-cta-section');
    if (ctaSection) {
        const ctaTitle = ctaSection.querySelector('.sfcta-title');
        const ctaDesc = ctaSection.querySelector('.sfcta-desc');
        const ctaBtns = ctaSection.querySelectorAll('.sfcta-btn');
        const ctaBg = ctaSection.querySelector('.sfcta-lines-bg');
        
        const ctaTl = gsap.timeline({
            scrollTrigger: {
                trigger: ctaSection,
                start: "top 80%",
                once: true
            }
        });
        
        if (ctaTitle) {
            const chars = ctaTitle.innerText.split('');
            ctaTitle.innerHTML = '';
            chars.forEach(char => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(10px) rotate(-10deg)';
                ctaTitle.appendChild(span);
            });
            const charSpans = ctaTitle.querySelectorAll('span');
            ctaTl.to(charSpans, { opacity: 1, y: 0, rotation: 0, duration: 0.4, stagger: 0.02, ease: "back.out(2)" });
        }
        
        if (ctaDesc) ctaTl.fromTo(ctaDesc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
        if (ctaBtns.length > 0) ctaTl.fromTo(ctaBtns, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.3");
        
        if (ctaBg) {
            gsap.to(ctaBg, {
                backgroundPosition: "100px 100px",
                ease: "none",
                scrollTrigger: {
                    trigger: ctaSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                }
            });
        }
    }
});

