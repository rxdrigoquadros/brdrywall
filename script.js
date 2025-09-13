/* ============================================
   BR DRYWALL - JAVASCRIPT FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Update current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validate required fields
            const requiredFields = ['nome', 'email', 'telefone', 'mensagem'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = 'var(--destructive)';
                    isValid = false;
                } else {
                    input.style.borderColor = 'var(--border)';
                }
            });
            
            if (!isValid) {
                showToast('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const emailInput = this.querySelector('[name="email"]');
                emailInput.style.borderColor = 'var(--destructive)';
                showToast('Erro', 'Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showToast('Dados enviados!', 'Entraremos em contato em breve.', 'success');
            }, 2000);
        });
    }
    
    // Toast notification function
    function showToast(title, message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastTitle = toast.querySelector('.toast-title');
        const toastDescription = toast.querySelector('.toast-description');
        const toastIcon = toast.querySelector('.toast-icon');
        
        // Update content
        toastTitle.textContent = title;
        toastDescription.textContent = message;
        
        // Update icon based on type
        if (type === 'error') {
            toastIcon.className = 'fas fa-exclamation-circle toast-icon';
            toastIcon.style.color = '#EF4444';
        } else {
            toastIcon.className = 'fas fa-check-circle toast-icon';
            toastIcon.style.color = '#10B981';
        }
        
        // Show toast
        toast.classList.add('show');
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
    
    // Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
        }
        
        updateCounter();
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate counters
                if (entry.target.classList.contains('stats-number')) {
                    const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
                    const suffix = entry.target.textContent.replace(/\d/g, '');
                    entry.target.dataset.suffix = suffix;
                    animateCounter(entry.target, target);
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .stats-card,
        .service-card,
        .feature-card,
        .portfolio-item,
        .testimonial-card,
        .process-step,
        .benefit-item
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .stats-card,
        .service-card,
        .feature-card,
        .portfolio-item,
        .testimonial-card,
        .process-step,
        .benefit-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .process-step:nth-child(1) { transition-delay: 0.1s; }
        .process-step:nth-child(2) { transition-delay: 0.2s; }
        .process-step:nth-child(3) { transition-delay: 0.3s; }
        .process-step:nth-child(4) { transition-delay: 0.4s; }
        .process-step:nth-child(5) { transition-delay: 0.5s; }
        
        .benefit-item:nth-child(1) { transition-delay: 0.1s; }
        .benefit-item:nth-child(2) { transition-delay: 0.2s; }
        .benefit-item:nth-child(3) { transition-delay: 0.3s; }
        .benefit-item:nth-child(4) { transition-delay: 0.4s; }
        .benefit-item:nth-child(5) { transition-delay: 0.5s; }
        .benefit-item:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // WhatsApp click tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            // Track WhatsApp clicks (you can integrate with Google Analytics here)
            console.log('WhatsApp button clicked');
        });
    });
    
    // Phone click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            // Track phone clicks (you can integrate with Google Analytics here)
            console.log('Phone button clicked');
        });
    });
    
    // Add loading class to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // Add image loading styles
    const imageStyle = document.createElement('style');
    imageStyle.textContent = `
        img {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(imageStyle);
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
});

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth reveal animation on scroll
const debouncedScroll = debounce(() => {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}, 10);

window.addEventListener('scroll', debouncedScroll);