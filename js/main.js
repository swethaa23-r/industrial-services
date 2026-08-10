/**
 * main.js
 * Core functionality, navigation, filtering, and sliders.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       Loading Screen
       -------------------------------------------------------------------------- */
    const loader = document.getElementById('loader');
    const loaderProgress = document.getElementById('loaderProgress');
    const loaderStatus = document.getElementById('loaderStatus');
    
    if (loader) {
        const hideLoader = () => {
            if (loader.style.display === 'none') return;
            
            // Instantly fill progress bar for psychological completion
            if (loaderProgress) loaderProgress.style.width = '100%';
            if (loaderStatus) loaderStatus.innerText = 'System Ready';
            
            // Brief delay to let the user register the 100% completion before fading out
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.4s ease';
                setTimeout(() => {
                    loader.style.display = 'none';
                    window.dispatchEvent(new Event('loaderFinished'));
                }, 400);
            }, 150);
        };

        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
            
            // Absolute maximum display of 1.5 seconds as a failsafe
            setTimeout(hideLoader, 1500);
        }
    } else {
        window.dispatchEvent(new Event('loaderFinished'));
    }

    /* --------------------------------------------------------------------------
       Sticky Header
       -------------------------------------------------------------------------- */
    const header = document.getElementById('header');


    /* --------------------------------------------------------------------------
       Active Link Auto-Detection & Instant UX Feedback
       -------------------------------------------------------------------------- */
    const currentPath = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-list .nav-link, .mobile-nav-list .btn');
    
    if (navLinks.length > 0) {
        // Initial setup on load
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            if (
                linkPath === currentPath || 
                ((currentPath === '' || currentPath === 'index.html') && linkPath === 'index.html') ||
                (currentPath === 'service-details.html' && linkPath === 'services.html')
            ) {
                link.classList.add('active');
            }
        });
        
        // Instant visual feedback on click
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // If it's a mobile nav link, close the menu immediately
                if (this.closest('.mobile-nav-list')) {
                    closeMenu();
                }
                
                // Only provide instant feedback if it's not a generic "#" link (like a dropdown toggle)
                if (this.getAttribute('href') !== '#') {
                    navLinks.forEach(l => l.classList.remove('active'));
                    const targetHref = this.getAttribute('href');
                    navLinks.forEach(l => {
                        if (l.getAttribute('href') === targetHref) {
                            l.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    /* --------------------------------------------------------------------------
       Mobile Menu
       -------------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    // Accessibility Initialization
    if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-controls', 'mobileMenu');
        mobileToggle.setAttribute('aria-label', 'Open navigation menu');
    }
    
    function openMenu() {
        if(mobileMenu) mobileMenu.classList.add('open');
        if(mobileOverlay) mobileOverlay.classList.add('open');
        document.body.classList.add('menu-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
        
        // Push state to history for back button support
        if(window.history && window.history.pushState) {
            window.history.pushState({menuOpen: true}, '');
        }
    }
    
    function closeMenu() {
        if(mobileMenu) mobileMenu.classList.remove('open');
        if(mobileOverlay) mobileOverlay.classList.remove('open');
        document.body.classList.remove('menu-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    }
    
    if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
    
    // Close on Browser Back Navigation
    window.addEventListener('popstate', (e) => {
        if (document.body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            closeMenu();
        }
    });

    /* --------------------------------------------------------------------------
       Back to Top Button
       -------------------------------------------------------------------------- */
    const backToTop = document.getElementById('backToTop');
    
    // Global Scroll Listener with rAF Throttle and Passive Flag
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                // Sticky Header
                if (header) {
                    if (currentScrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }

                // Back to Top Button
                if (backToTop) {
                    if (currentScrollY > 500) {
                        backToTop.style.opacity = '1';
                        backToTop.style.visibility = 'visible';
                        backToTop.style.transform = 'translateY(0)';
                    } else {
                        backToTop.style.opacity = '0';
                        backToTop.style.visibility = 'hidden';
                        backToTop.style.transform = 'translateY(20px)';
                    }
                }
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------------
       Project Filtering
       -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                filterItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /* --------------------------------------------------------------------------
       Testimonial Slider logic moved to animations.js for GSAP integration
       -------------------------------------------------------------------------- */
    
    /* --------------------------------------------------------------------------
       Footer Newsletter Validation
       -------------------------------------------------------------------------- */
    const nlForm = document.getElementById('footerNewsletter');
    const nlMessage = document.getElementById('nlMessage');
    
    if (nlForm && nlMessage) {
        nlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('nlEmail').value;
            
            // Basic regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailPattern.test(emailInput)) {
                nlMessage.style.display = 'block';
                nlMessage.style.color = '#28a745';
                nlMessage.innerHTML = '<i class="fa-solid fa-check-circle"></i> Thank you for subscribing.';
                nlForm.reset();
            } else {
                nlMessage.style.display = 'block';
                nlMessage.style.color = '#dc3545';
                nlMessage.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter a valid email address.';
            }
            
            setTimeout(() => {
                nlMessage.style.display = 'none';
            }, 5000);
        });
    }

    /* --------------------------------------------------------------------------
       Interactive Services Logic
       -------------------------------------------------------------------------- */
    const isTabs = document.querySelectorAll('.is-tab');
    const isBgImage = document.getElementById('isBgImage');
    const isTitle = document.getElementById('isTitle');
    const isDesc = document.getElementById('isDesc');
    const isContent = document.getElementById('isContent');

    if (isTabs.length > 0 && isBgImage && isTitle && isDesc) {
        const servicesData = [
            {
                title: 'Industrial Engineering',
                desc: 'Comprehensive structural and mechanical engineering for heavy industries.',
                img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&fit=crop&w=1200&q=80&fm=webp'
            },
            {
                title: 'Plant Maintenance',
                desc: 'Preventive and reactive maintenance solutions designed to minimize downtime and maximize equipment reliability.',
                img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&fit=crop&w=1200&q=80&fm=webp'
            },
            {
                title: 'Industrial Automation',
                desc: 'Smart factory integration, robotics, PLC control systems, and intelligent automation solutions designed to improve productivity, precision, and operational efficiency.',
                img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&fit=crop&w=1200&q=80&fm=webp'
            },
            {
                title: 'Electrical Services',
                desc: 'Reliable industrial electrical installation, power distribution, control systems, testing, and maintenance.',
                img: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-4.0.3&fit=crop&w=1200&q=80&fm=webp'
            },
            {
                title: 'Fabrication & Welding',
                desc: 'Precision fabrication, structural welding, custom metalwork, and industrial fabrication solutions.',
                img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&fit=crop&w=1200&q=80&fm=webp'
            },
            {
                title: 'Safety & Inspection',
                desc: 'Comprehensive safety inspections, equipment checks, compliance verification, and industrial risk assessment to ensure zero-harm work environments.',
                img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&fit=crop&w=1200&q=80&fm=webp'
            }
        ];

        // Initial setup for default selected (index 0)
        let currentIndex = 0;
        let autoRotateInterval;

        isTitle.innerText = servicesData[0].title;
        isDesc.innerText = servicesData[0].desc;
        isBgImage.style.backgroundImage = `url('${servicesData[0].img}')`;

        // Function to switch service
        const switchService = (index) => {
            if (index === currentIndex) return;
            
            // Remove active class from all tabs
            isTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to targeted tab
            const targetTab = Array.from(isTabs).find(t => parseInt(t.getAttribute('data-index')) === index);
            if(targetTab) targetTab.classList.add('active');
            
            currentIndex = index;

            // Animate Out
            isContent.classList.add('fade-out');
            isBgImage.classList.add('img-fade-out');

            // Wait for animation, swap content, then Animate In
            setTimeout(() => {
                isTitle.innerText = servicesData[index].title;
                isDesc.innerText = servicesData[index].desc;
                
                const tempImg = new Image();
                tempImg.src = servicesData[index].img;
                tempImg.onload = () => {
                    isBgImage.style.backgroundImage = `url('${servicesData[index].img}')`;
                    isContent.classList.remove('fade-out');
                    isBgImage.classList.remove('img-fade-out');
                };
            }, 400);
        };

        // Start auto rotation
        const startAutoRotate = () => {
            autoRotateInterval = setInterval(() => {
                let nextIndex = currentIndex + 1;
                if (nextIndex >= servicesData.length) nextIndex = 0;
                switchService(nextIndex);
            }, 5000); // 5 seconds
        };

        // Reset auto rotation on manual click
        const resetAutoRotate = () => {
            clearInterval(autoRotateInterval);
            startAutoRotate();
        };

        isTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const index = parseInt(tab.getAttribute('data-index'));
                switchService(index);
                resetAutoRotate(); // user clicked manually, reset timer
            });
        });

        // Initialize the auto rotation on load
        startAutoRotate();
    }

});

document.addEventListener('DOMContentLoaded', () => {


    /* --------------------------------------------------------------------------
       Industrial Service Matrix Interactions
       -------------------------------------------------------------------------- */
    const matrixCards = document.querySelectorAll('.matrix-card');
    if (matrixCards.length > 0) {
        matrixCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // If clicked on the link itself, allow navigation
                if(e.target.closest('.mc-link')) return;
                
                // Close other cards
                matrixCards.forEach(c => {
                    if(c !== this) c.classList.remove('active');
                });
                
                // Toggle clicked card
                this.classList.toggle('active');
            });
        });
    }

    /* --------------------------------------------------------------------------
       FAQ Accordion
       -------------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close other open FAQ items for clean accordion UX
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

});

    /* --------------------------------------------------------------------------
       Lazy Load Maps (Intersection Observer)
       -------------------------------------------------------------------------- */
    const lazyMaps = document.querySelectorAll('.lazy-map');
    if ("IntersectionObserver" in window && lazyMaps.length > 0) {
        let mapObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyMap = entry.target;
                    if(lazyMap.dataset.src) {
                        lazyMap.src = lazyMap.dataset.src;
                        lazyMap.removeAttribute("data-src");
                    }
                    mapObserver.unobserve(lazyMap);
                }
            });
        }, { rootMargin: "0px 0px 300px 0px" }); // Load 300px before scrolling to it

        lazyMaps.forEach(function(lazyMap) {
            mapObserver.observe(lazyMap);
        });
    } else {
        // Fallback for older browsers
        lazyMaps.forEach(function(lazyMap) {
            if(lazyMap.dataset.src) {
                lazyMap.src = lazyMap.dataset.src;
                lazyMap.removeAttribute("data-src");
            }
        });
    }
