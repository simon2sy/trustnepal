/**
 * GlobalTrade - Premium Import/Export Website
 * Main Application Script
 * Author: Senior UI/UX Designer
 */

(function() {
    'use strict';

    // Page Loader
    class PageLoader {
        constructor() {
            this.loader = document.getElementById('pageLoader');
            this.init();
        }
        
        init() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.hide();
                }, 500);
            });
        }
        
        hide() {
            if (this.loader) {
                this.loader.classList.add('hidden');
                setTimeout(() => {
                    this.loader.style.display = 'none';
                }, 500);
            }
        }
    }

    // Three.js Background
    class ThreeBackground {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            
            this.init();
        }
        
        init() {
            // Check if Three.js is loaded
            if (typeof THREE === 'undefined') {
                console.warn('Three.js not loaded');
                return;
            }
            
            // Scene setup
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.canvas.offsetWidth / this.canvas.offsetHeight,
                0.1,
                1000
            );
            
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true
            });
            
            this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Create particles
            this.createParticles();
            
            // Camera position
            this.camera.position.z = 5;
            
            // Animation
            this.animate();
            
            // Handle resize
            window.addEventListener('resize', () => this.onResize());
        }
        
        createParticles() {
            const geometry = new THREE.BufferGeometry();
            const particlesCount = 1000;
            const positions = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 10;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.PointsMaterial({
                size: 0.02,
                color: 0x2563eb,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });
            
            this.particles = new THREE.Points(geometry, material);
            this.scene.add(this.particles);
        }
        
        animate() {
            requestAnimationFrame(() => this.animate());
            
            if (this.particles) {
                this.particles.rotation.x += 0.0005;
                this.particles.rotation.y += 0.001;
            }
            
            this.renderer.render(this.scene, this.camera);
        }
        
        onResize() {
            this.camera.aspect = this.canvas.offsetWidth / this.canvas.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
        }
    }

    // Search Functionality
    class SearchHandler {
        constructor() {
            this.searchForm = document.getElementById('searchForm');
            this.searchInput = document.getElementById('searchInput');
            this.suggestionsContainer = document.getElementById('searchSuggestions');
            
            this.suggestions = [
                { title: 'Premium Smartphones', category: 'Electronics' },
                { title: 'Cotton Fabric', category: 'Textiles' },
                { title: 'Industrial Machines', category: 'Machinery' },
                { title: 'Organic Coffee', category: 'Food Products' },
                { title: 'Automotive Parts', category: 'Automotive' },
                { title: 'Building Materials', category: 'Construction' }
            ];
            
            this.init();
        }
        
        init() {
            if (!this.searchInput) return;
            
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
            
            this.searchInput.addEventListener('focus', () => {
                if (this.searchInput.value.length > 0) {
                    this.showSuggestions();
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!this.searchInput.contains(e.target) && !this.suggestionsContainer.contains(e.target)) {
                    this.hideSuggestions();
                }
            });
            
            if (this.searchForm) {
                this.searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.performSearch(this.searchInput.value);
                });
            }
        }
        
        handleSearch(query) {
            if (query.length === 0) {
                this.hideSuggestions();
                return;
            }
            
            const filtered = this.suggestions.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
            );
            
            this.displaySuggestions(filtered);
        }
        
        displaySuggestions(items) {
            if (!this.suggestionsContainer) return;
            
            this.suggestionsContainer.innerHTML = '';
            
            if (items.length === 0) {
                this.hideSuggestions();
                return;
            }
            
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <div class="suggestion-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="suggestion-content">
                        <div class="suggestion-title">${item.title}</div>
                        <div class="suggestion-category">${item.category}</div>
                    </div>
                `;
                
                div.addEventListener('click', () => {
                    this.searchInput.value = item.title;
                    this.hideSuggestions();
                    this.performSearch(item.title);
                });
                
                this.suggestionsContainer.appendChild(div);
            });
            
            this.showSuggestions();
        }
        
        showSuggestions() {
            if (this.suggestionsContainer) {
                this.suggestionsContainer.classList.add('active');
            }
        }
        
        hideSuggestions() {
            if (this.suggestionsContainer) {
                this.suggestionsContainer.classList.remove('active');
            }
        }
        
        performSearch(query) {
            console.log('Searching for:', query);
            // Implement actual search functionality here
            // For now, scroll to products section
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Form Handler
    class FormHandler {
        constructor() {
            this.contactForm = document.getElementById('contactForm');
            this.newsletterForm = document.getElementById('newsletterForm');
            this.init();
        }
        
        init() {
            if (this.contactForm) {
                this.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
            }
            
            if (this.newsletterForm) {
                this.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
            }
        }
        
        handleContactSubmit(e) {
            e.preventDefault();
            
            // Validate form
            if (!this.contactForm.checkValidity()) {
                this.contactForm.classList.add('was-validated');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            
            setTimeout(() => {
                // Hide form and show success message
                this.contactForm.style.display = 'none';
                const successMessage = document.getElementById('contactSuccess');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.style.animation = 'fadeInUp 0.5s ease';
                }
                
                // Reset after 5 seconds
                setTimeout(() => {
                    this.contactForm.reset();
                    this.contactForm.classList.remove('was-validated');
                    this.contactForm.style.display = 'block';
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 5000);
            }, 1500);
        }
        
        handleNewsletterSubmit(e) {
            e.preventDefault();
            
            const emailInput = this.newsletterForm.querySelector('input[type="email"]');
            const submitButton = this.newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                this.newsletterForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 1000);
        }
        
        showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `alert-custom alert-${type}`;
            notification.innerHTML = `
                <div class="alert-icon">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-message">${message}</div>
                </div>
                <button class="alert-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                min-width: 300px;
                animation: slideInRight 0.5s ease;
            `;
            
            document.body.appendChild(notification);
            
            const closeBtn = notification.querySelector('.alert-close');
            closeBtn.addEventListener('click', () => {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            });
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 5000);
        }
    }

    // FAQ Accordion Enhancement
    class FAQHandler {
        constructor() {
            this.accordionButtons = document.querySelectorAll('.accordion-button');
            this.init();
        }
        
        init() {
            this.accordionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const icon = button.querySelector('i');
                    if (icon) {
                        setTimeout(() => {
                            if (button.classList.contains('collapsed')) {
                                icon.style.transform = 'rotate(0deg)';
                            } else {
                                icon.style.transform = 'rotate(180deg)';
                            }
                        }, 10);
                    }
                });
            });
        }
    }

    // Dropdown Handler
    class DropdownHandler {
        constructor() {
            this.dropdowns = document.querySelectorAll('.dropdown-custom');
            this.init();
        }
        
        init() {
            this.dropdowns.forEach(dropdown => {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleDropdown(dropdown);
                });
            });
            
            document.addEventListener('click', () => {
                this.closeAllDropdowns();
            });
        }
        
        toggleDropdown(dropdown) {
            const isActive = dropdown.classList.contains('active');
            this.closeAllDropdowns();
            
            if (!isActive) {
                dropdown.classList.add('active');
            }
        }
        
        closeAllDropdowns() {
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }

    // Initialize all components
    function init() {
        new PageLoader();
        new ThreeBackground('threejsCanvas');
        new SearchHandler();
        new FormHandler();
        new FAQHandler();
        new DropdownHandler();
        
        // Console welcome message
        console.log('%c GlobalTrade Premium Website ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 8px;');
        console.log('%c Developed with ❤️ by Senior UI/UX Designer ', 'color: #2563eb; font-size: 12px;');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();