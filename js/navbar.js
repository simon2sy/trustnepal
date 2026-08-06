/**
 * GlobalTrade - Premium Import/Export Website
 * Navbar Component
 * Author: Senior UI/UX Designer
 */

(function() {
    'use strict';

    // Navbar Elements
    const navbar = document.getElementById('mainNavbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar Scroll Effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Smooth Scroll to Sections
    function smoothScrollToSection(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                updateActiveNavLink(this);

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        }
    }

    // Update Active Nav Link
    function updateActiveNavLink(clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }

    // Highlight Active Section on Scroll
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const section = document.querySelector(targetId);
                
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            }
        });
    }

    // Navbar Toggle Animation
    function animateNavbarToggler() {
        const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon-custom');
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            togglerIcon.style.transform = 'rotate(90deg)';
        } else {
            togglerIcon.style.transform = 'rotate(0deg)';
        }
    }

    // Initialize
    function init() {
        // Initial navbar state
        handleNavbarScroll();

        // Event Listeners
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            highlightActiveSection();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToSection);
        });

        if (navbarToggler) {
            navbarToggler.addEventListener('click', animateNavbarToggler);
        }

        // Handle navbar collapse events
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            navbarCollapse.addEventListener('shown.bs.collapse', () => {
                document.body.style.overflow = 'hidden';
            });
            
            navbarCollapse.addEventListener('hidden.bs.collapse', () => {
                document.body.style.overflow = '';
            });
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();