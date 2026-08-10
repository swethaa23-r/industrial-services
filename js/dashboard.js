/**
 * ==========================================================================
 * STACKLY DASHBOARD GSAP ANIMATION & INTERACTIVITY ENGINE
 * Powering Admin & User Dashboards with Smooth Industrial Motion
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sidebar Mobile Toggle
    const sidebar = document.getElementById('dbSidebar');
    const toggleBtn = document.getElementById('mobileToggleBtn');
    const overlay = document.getElementById('sidebarOverlay');
    
    function toggleSidebar() {
        if(sidebar && overlay) {
            const isShowing = sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
            document.body.classList.toggle('dashboard-menu-open', isShowing);
            if (toggleBtn) {
                toggleBtn.setAttribute('aria-expanded', isShowing.toString());
            }
        }
    }
    
    // Close sidebar when clicking links on mobile
    const dbLinks = document.querySelectorAll('.db-menu a');
    dbLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991 && sidebar.classList.contains('show')) {
                toggleSidebar();
            }
        });
    });
    
    // Add close button dynamically for mobile since it will be 100% width
    const dbBrand = document.querySelector('.db-brand');
    if (dbBrand) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'db-sidebar-close d-lg-none';
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        closeBtn.style.position = 'absolute';
        closeBtn.style.right = '20px';
        closeBtn.style.top = '25px';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'var(--c-white)';
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.cursor = 'pointer';
        
        closeBtn.addEventListener('click', toggleSidebar);
        dbBrand.style.position = 'relative';
        dbBrand.appendChild(closeBtn);
    }
    
    if(toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
    if(overlay) overlay.addEventListener('click', toggleSidebar);
    
    // 2. Set Current Formatted Date in Topbar
    const dateEl = document.getElementById('currentDate');
    if(dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // 3. Helper: Animate Counter Numbers with GSAP
    function animateCounters(container) {
        const scope = container || document;
        const counters = scope.querySelectorAll('.counter');
        counters.forEach(counter => {
            const rawText = counter.innerText.replace(/[^0-9.]/g, '');
            const targetVal = parseFloat(counter.getAttribute('data-target') || rawText || 0);
            if (!isNaN(targetVal) && targetVal > 0) {
                const prefix = counter.innerText.includes('$') ? '$' : '';
                const suffix = counter.innerText.includes('%') ? '%' : (counter.innerText.includes('k') || counter.innerText.includes('K')) ? 'K' : '';
                
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: targetVal,
                    duration: 1.4,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (targetVal % 1 === 0) {
                            counter.innerText = prefix + Math.floor(obj.val).toLocaleString() + suffix;
                        } else {
                            counter.innerText = prefix + obj.val.toFixed(1) + suffix;
                        }
                    }
                });
            }
        });
    }

    // 4. Helper: Animate Progress Bars with GSAP
    function animateProgressBars(container) {
        const scope = container || document;
        const progressFills = scope.querySelectorAll('.progress-fill, .gs-progress');
        progressFills.forEach(bar => {
            const targetWidth = bar.getAttribute('data-target') || bar.style.width || '80%';
            gsap.fromTo(bar, 
                { width: '0%' }, 
                { width: targetWidth, duration: 1.2, ease: "power2.out", delay: 0.1 }
            );
        });
    }

    // 5. GSAP Initial Dashboard Entrance
    const loader = document.getElementById('loader');
    const initDelay = loader ? 600 : 100;

    setTimeout(() => {
        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Animate Sidebar Brand & Role Badge
        if (document.querySelector('.db-brand')) {
            tl.fromTo('.db-brand',
                { opacity: 0, x: -15 },
                { opacity: 1, x: 0, duration: 0.4 }
            );
        }

        // Animate Sidebar Navigation Items
        if (document.querySelectorAll('.db-menu li').length > 0) {
            tl.fromTo('.db-menu li', 
                { opacity: 0, x: -16 },
                { opacity: 1, x: 0, duration: 0.35, stagger: 0.03 },
                "-=0.25"
            );
        }

        // Animate Topbar
        if (document.querySelector('.db-topbar')) {
            tl.fromTo('.db-topbar', 
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 0.4 },
                "-=0.2"
            );
        }

        // Animate Active Pane Contents
        const activeTab = document.querySelector('.db-tab-pane[style*="display: block"]') || document.querySelector('.db-tab-pane:not([style*="display: none"])');
        if (activeTab) {
            animateTabContent(activeTab, tl);
        }

    }, initDelay);

    // 6. Helper: Comprehensive Tab Content GSAP Motion
    function animateTabContent(pane, externalTimeline) {
        if (!pane || typeof gsap === 'undefined') return;

        const tl = externalTimeline || gsap.timeline({ defaults: { ease: "power2.out" } });

        // Tab Header Slide & Fade
        const header = pane.querySelector('.db-header');
        if (header) {
            tl.fromTo(header, 
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.35 }
            );
        }

        // KPI Cards Staggered Pop
        const kpis = pane.querySelectorAll('.kpi-card');
        if (kpis.length > 0) {
            tl.fromTo(kpis, 
                { opacity: 0, y: 18, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05 },
                "-=0.2"
            );
        }

        // Animate Numeric Counters
        animateCounters(pane);

        // Cards & Grids Staggered Rise
        const cards = pane.querySelectorAll('.db-card, .catalog-card, .team-member-card, .project-card, .doc-card, .db-chat-wrapper');
        if (cards.length > 0) {
            tl.fromTo(cards, 
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
                "-=0.25"
            );
        }

        // Table Rows Staggered Cascade
        const rows = pane.querySelectorAll('.db-table tbody tr');
        if (rows.length > 0) {
            tl.fromTo(rows, 
                { opacity: 0, x: -8 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.03 },
                "-=0.3"
            );
        }

        // Chat Bubbles Cascade
        const chatBubbles = pane.querySelectorAll('.chat-bubble-wrap');
        if (chatBubbles.length > 0) {
            tl.fromTo(chatBubbles, 
                { opacity: 0, y: 10, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.05 },
                "-=0.2"
            );
        }

        // Animate Progress Bars
        animateProgressBars(pane);
    }

    // 7. Standardized SPA Tab Switcher with Fluid GSAP Transition
    const menuLinks = document.querySelectorAll('.db-menu a:not(.db-logout)');
    const tabPanes = document.querySelectorAll('.db-tab-pane');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('db-logout')) return;
            e.preventDefault();

            // Set Active Menu State
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Find Target Tab
            const text = this.innerText.trim();
            let targetId = 'tab-dashboard';

            if (text.includes('Project')) targetId = 'tab-projects';
            else if (text.includes('Service Requests')) targetId = 'tab-requests';
            else if (text.includes('Services')) targetId = 'tab-services';
            else if (text.includes('Request')) targetId = 'tab-requests';
            else if (text.includes('Maintenance')) targetId = 'tab-maintenance';
            else if (text.includes('Document')) targetId = 'tab-documents';
            else if (text.includes('Message')) targetId = 'tab-messages';
            else if (text.includes('Profile')) targetId = 'tab-profile';
            else if (text.includes('Setting')) targetId = 'tab-settings';
            else if (text.includes('Client')) targetId = 'tab-clients';
            else if (text.includes('Team')) targetId = 'tab-team';
            else if (text.includes('Report')) targetId = 'tab-reports';

            const targetPane = document.getElementById(targetId);

            if (targetPane) {
                // Hide all other tabs
                tabPanes.forEach(tp => {
                    tp.style.display = 'none';
                });

                // Display target pane
                targetPane.style.display = 'block';

                // Trigger GSAP motion cascade
                animateTabContent(targetPane);
            }

            // Close Mobile Sidebar
            if (sidebar && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                if (overlay) overlay.classList.remove('show');
            }
        });
    });

    // 8. Micro-Interactions on Interactive Elements
    document.querySelectorAll('.db-btn').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            gsap.to(btn, { scale: 0.96, duration: 0.1 });
        });
        btn.addEventListener('mouseup', () => {
            gsap.to(btn, { scale: 1, duration: 0.15, ease: "back.out(2)" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.15 });
        });
    });

    // 9. Redirect All Dashboard Subpage Standalone Buttons and Action Links to 404 Page
    document.addEventListener('click', (e) => {
        // Exclude sidebar elements, logout button, brand, and mobile toggle
        if (e.target.closest('#dbSidebar') || e.target.closest('.mobile-toggle-btn') || e.target.closest('.brand-logo') || e.target.id === 'logoutBtn') {
            return;
        }

        // If the button is a submit button or inside a form, let form validation validate first
        const submitInsideForm = e.target.closest('button[type="submit"], input[type="submit"]') || (e.target.closest('button') && e.target.closest('form'));
        if (submitInsideForm) {
            return;
        }

        // Target standalone buttons, quick-action cards, subpage action links, and button-like elements in db-content or db-tab-pane
        const actionBtn = e.target.closest('button, .db-btn, .quick-btn, .text-link, .doc-card, .catalog-card, a.db-btn, a[href="#"], input[type="button"]');
        
        if (actionBtn && actionBtn.id !== 'logoutBtn') {
            e.preventDefault();
            window.location.href = '404.html';
        }
    });

});



    // 6. User Personalization (from localStorage)
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedName) {
        const navName = document.getElementById('navUserName');
        const welcomeName = document.getElementById('welcomeUserName');
        if (navName) navName.textContent = storedName;
        if (welcomeName) welcomeName.textContent = storedName;
    }
    
    if (storedEmail) {
        const profileEmail = document.getElementById('profileEmail');
        if (profileEmail) profileEmail.textContent = storedEmail;
    }
