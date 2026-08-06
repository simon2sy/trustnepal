/**
 * GlobalTrade - Premium Import/Export Website
 * Counter Animation
 * Author: Senior UI/UX Designer
 */

(function() {
    'use strict';

    // Counter Configuration
    const counterConfig = {
        duration: 2000,
        threshold: 0.5
    };

    // Animate Counter Function
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(timer);
                element.textContent = end;
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Format Number with Commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Initialize Counter
    function initCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const start = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(element, start, target, counterConfig.duration);
                    observer.unobserve(element);
                    
                    // Animate progress bar if exists
                    const statItem = element.closest('.stat-item');
                    if (statItem) {
                        const progressBar = statItem.querySelector('.stat-progress-bar');
                        if (progressBar) {
                            setTimeout(() => {
                                const width = progressBar.style.width;
                                progressBar.style.transition = 'width 2s ease';
                                progressBar.style.width = '0';
                                setTimeout(() => {
                                    progressBar.style.width = width;
                                }, 10);
                            }, 100);
                        }
                    }
                }
            });
        }, {
            threshold: counterConfig.threshold
        });
        
        observer.observe(element);
    }

    // Initialize All Counters
    function init() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            initCounter(counter);
        });

        // Custom counters with different configurations
        const customCounters = document.querySelectorAll('[data-counter]');
        customCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue(counter, 0, target, duration);
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();