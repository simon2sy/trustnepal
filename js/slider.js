/**
 * GlobalTrade - Premium Import/Export Website
 * Slider/Carousel Component
 * Author: Senior UI/UX Designer
 */

(function() {
    'use strict';

    // Showcase Slider
    class ShowcaseSlider {
        constructor(container) {
            this.container = container;
            this.track = container.querySelector('.showcase-track');
            this.items = container.querySelectorAll('.showcase-item');
            this.prevBtn = container.querySelector('.showcase-prev');
            this.nextBtn = container.querySelector('.showcase-next');
            this.indicatorsContainer = container.querySelector('.showcase-indicators');
            
            this.currentIndex = 0;
            this.itemsToShow = this.getItemsToShow();
            this.autoplayInterval = null;
            this.autoplayDelay = 5000;
            
            this.init();
        }
        
        getItemsToShow() {
            const width = window.innerWidth;
            if (width < 768) return 1;
            if (width < 1200) return 2;
            return 3;
        }
        
        init() {
            this.createIndicators();
            this.attachEventListeners();
            this.updateSlider();
            this.startAutoplay();
        }
        
        createIndicators() {
            if (!this.indicatorsContainer) return;
            
            const totalSlides = Math.ceil(this.items.length / this.itemsToShow);
            
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'showcase-indicator';
                if (i === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', () => {
                    this.goToSlide(i);
                    this.resetAutoplay();
                });
                
                this.indicatorsContainer.appendChild(indicator);
            }
        }
        
        attachEventListeners() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.prev();
                    this.resetAutoplay();
                });
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    this.next();
                    this.resetAutoplay();
                });
            }
            
            // Touch events for mobile swipe
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            this.track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            });
            
            // Pause autoplay on hover
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoplay();
            });
            
            this.container.addEventListener('mouseleave', () => {
                this.startAutoplay();
            });
            
            // Update on window resize
            window.addEventListener('resize', () => {
                this.itemsToShow = this.getItemsToShow();
                this.updateSlider();
            });
        }
        
        handleSwipe(startX, endX) {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
                this.resetAutoplay();
            }
        }
        
        updateSlider() {
            const totalSlides = Math.ceil(this.items.length / this.itemsToShow);
            const maxIndex = totalSlides - 1;
            
            if (this.currentIndex > maxIndex) {
                this.currentIndex = maxIndex;
            }
            
            const offset = -this.currentIndex * 100;
            this.track.style.transform = `translateX(${offset}%)`;
            
            this.updateIndicators();
        }
        
        updateIndicators() {
            if (!this.indicatorsContainer) return;
            
            const indicators = this.indicatorsContainer.querySelectorAll('.showcase-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        next() {
            const totalSlides = Math.ceil(this.items.length / this.itemsToShow);
            this.currentIndex = (this.currentIndex + 1) % totalSlides;
            this.updateSlider();
        }
        
        prev() {
            const totalSlides = Math.ceil(this.items.length / this.itemsToShow);
            this.currentIndex = (this.currentIndex - 1 + totalSlides) % totalSlides;
            this.updateSlider();
        }
        
        goToSlide(index) {
            this.currentIndex = index;
            this.updateSlider();
        }
        
        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.next();
            }, this.autoplayDelay);
        }
        
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }
        
        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }

    // Product Filter and Grid
    class ProductFilter {
        constructor() {
            this.filterButtons = document.querySelectorAll('.filter-btn');
            this.productItems = document.querySelectorAll('.product-item');
            
            this.init();
        }
        
        init() {
            this.filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    this.filterProducts(filter);
                    this.updateActiveButton(button);
                });
            });
        }
        
        filterProducts(filter) {
            this.productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        updateActiveButton(activeButton) {
            this.filterButtons.forEach(button => {
                button.classList.remove('active');
            });
            activeButton.classList.add('active');
        }
    }

    // Initialize
    function init() {
        // Initialize Showcase Slider
        const showcaseSlider = document.querySelector('.showcase-slider');
        if (showcaseSlider) {
            new ShowcaseSlider(showcaseSlider);
        }

        // Initialize Product Filter
        const productFilters = document.querySelector('.product-filters');
        if (productFilters) {
            new ProductFilter();
        }

        // Image Hover Zoom Effect
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const img = card.querySelector('.product-image');
            if (img) {
                card.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                });
                card.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();