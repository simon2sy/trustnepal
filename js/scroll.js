/**
 * GlobalTrade - Premium Import/Export Website
 * Scroll Effects
 * Author: Senior UI/UX Designer
 */

(function() {
    'use strict';

    // Back to Top Button
    class BackToTop {
        constructor() {
            this.button = document.getElementById('backToTop');
            if (!this.button) return;
            
            this.init();
        }
        
        init() {
            this.attachEventListeners();
            this.handleScroll();
        }
        
        attachEventListeners() {
            window.addEventListener('scroll', () => {
                this.handleScroll();
            });
            
            this.button.addEventListener('click', () => {
                this.scrollToTop();
            });
        }
        
        handleScroll() {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Smooth Scroll
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#' || targetId === '') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll Progress Indicator
    class ScrollProgress {
        constructor() {
            this.createProgressBar();
            this.init();
        }
        
        createProgressBar() {
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'scroll-progress';
            this.progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0;
                height: 4px;
                background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(this.progressBar);
        }
        
        init() {
            window.addEventListener('scroll', () => {
                this.updateProgress();
            });
        }
        
        updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            this.progressBar.style.width = scrollPercent + '%';
        }
    }

    // Reveal on Scroll
    class ScrollReveal {
        constructor() {
            this.elements = document.querySelectorAll('[data-reveal]');
            this.init();
        }
        
        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        
                        // Add stagger delay for children
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            child.style.transitionDelay = `${index * 0.1}s`;
                        });
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            this.elements.forEach(element => {
                observer.observe(element);
            });
        }
    }

    // Sticky Section
    class StickySection {
        constructor() {
            this.sections = document.querySelectorAll('[data-sticky]');
            this.init();
        }
        
        init() {
            this.sections.forEach(section => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            section.classList.add('is-sticky');
                        } else {
                            section.classList.remove('is-sticky');
                        }
                    });
                }, {
                    threshold: 0
                });
                
                observer.observe(section);
            });
        }
    }

    // Parallax Scrolling
    class ParallaxScroll {
        constructor() {
            this.elements = document.querySelectorAll('[data-parallax-speed]');
            this.init();
        }
        
        init() {
            if (this.elements.length === 0) return;
            
            window.addEventListener('scroll', () => {
                this.updateParallax();
            });
            
            this.updateParallax();
        }
        
        updateParallax() {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
    }

    // Scroll Spy for Navigation
    class ScrollSpy {
        constructor() {
            this.sections = document.querySelectorAll('section[id]');
            this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            this.init();
        }
        
        init() {
            window.addEventListener('scroll', () => {
                this.updateActiveLink();
            });
        }
        
        updateActiveLink() {
            const scrollPosition = window.scrollY + 100;
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    }

    // Lazy Load Images
    class LazyLoad {
        constructor() {
            this.images = document.querySelectorAll('img[data-src]');
            this.init();
        }
        
        init() {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                        
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                    }
                });
            });
            
            this.images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize all scroll effects
    function init() {
        new BackToTop();
        initSmoothScroll();
        new ScrollProgress();
        new ScrollReveal();
        new StickySection();
        new ParallaxScroll();
        new ScrollSpy();
        new LazyLoad();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();