/**
 * GlobalTrade - Premium Import/Export Website
 * Animation Effects
 * Author: Senior UI/UX Designer
 */

(function() {
    'use strict';

    // Animation Observer for Scroll Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create Intersection Observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Optional: Unobserve after animation
                // animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    // Parallax Effect
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Typing Effect
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for elements with data-type attribute
    function initTypingEffect() {
        const typingElements = document.querySelectorAll('[data-type]');
        
        typingElements.forEach(element => {
            const text = element.getAttribute('data-type') || element.textContent;
            
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter(element, text);
                        elementObserver.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            elementObserver.observe(element);
        });
    }

    // Stagger Animation
    function staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * delay}ms`;
        });
    }

    // Initialize stagger animations
    function initStaggerAnimations() {
        const staggerGroups = document.querySelectorAll('[data-stagger]');
        
        staggerGroups.forEach(group => {
            const children = group.children;
            const delay = parseInt(group.getAttribute('data-stagger')) || 100;
            staggerAnimation(Array.from(children), delay);
        });
    }

    // Ripple Effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Initialize ripple effect
    function initRippleEffect() {
        const rippleButtons = document.querySelectorAll('.ripple-effect, .btn-primary-custom, .btn-outline-primary-custom');
        
        rippleButtons.forEach(button => {
            button.addEventListener('click', createRipple);
        });
    }

    // Smooth Number Counter
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // Image Lazy Loading with Fade In
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        lazyImages.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 10);
            });
        });
    }

    // Hover Tilt Effect
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // Magnetic Button Effect
    function initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('[data-magnetic]');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Cursor Follow Effect
    function initCursorFollow() {
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(37, 99, 235, 0.3);
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease;
                mix-blend-mode: difference;
            `;
            document.body.appendChild(cursor);
            
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
            });
            
            const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"]');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                });
                element.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                });
            });
        }
    }

    // Initialize all animations
    function init() {
        initScrollAnimations();
        initParallax();
        initTypingEffect();
        initStaggerAnimations();
        initRippleEffect();
        initLazyLoading();
        initTiltEffect();
        initMagneticButtons();
        // initCursorFollow(); // Optional: Uncomment for custom cursor
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export animateCounter for use in other modules
    window.animateCounter = animateCounter;

})();