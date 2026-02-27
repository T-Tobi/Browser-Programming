// Smooth Scrolling for Anchor Links
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

// Category Tag Interactions
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroProduct = document.querySelector('.hero-product');
    
    if (heroProduct) {
        heroProduct.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInLeft 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe Product Cards and Featured Cards
document.querySelectorAll('.product-card, .featured-card').forEach(card => {
    observer.observe(card);
});

// Add to Cart Button Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Get product name from parent card
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        // Visual feedback
        this.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(90deg)';
        }, 300);
        
        // Show notification (you can customize this)
        showNotification(`${productName} added to cart!`);
    });
});

// Notification Function
function showNotification(message) {
    // Remove existing notification if present
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #d4a574 0%, #c89f6f 100%);
        color: #1a1410;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Product Card Click Handler
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking the add-to-cart button
        if (e.target.closest('.add-to-cart')) {
            return;
        }
        
        const productName = this.querySelector('.product-name').textContent;
        console.log(`Viewing product: ${productName}`);
        // You can add navigation to product detail page here
    });
});

// Featured Card Click Handler
document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.learn-more')) {
            const cardTitle = this.querySelector('.featured-card-title').textContent;
            console.log(`Viewing featured product: ${cardTitle}`);
        }
    });
});

// Collection Image Hover Effect Enhancement
document.querySelectorAll('.collection-image').forEach(image => {
    image.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Lazy Load Effect for Images (if you add actual images later)
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                lazyLoadObserver.unobserve(img);
            }
        }
    });
});

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    lazyLoadObserver.observe(img);
});

// Navigation Scroll Effect - Add shadow on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Icon Button Interactions
document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.textContent.trim();
        
        if (icon === '🔍') {
            console.log('Search clicked');
            // Add search functionality
        } else if (icon === '👤') {
            console.log('User profile clicked');
            // Add user profile functionality
        } else if (icon === '🛒') {
            console.log('Cart clicked');
            // Add cart functionality
        }
    });
});

// View All Button Click Handler
document.querySelectorAll('.view-all-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('View all products clicked');
        // Add navigation to all products page
    });
});

// CTA Button Click Handler
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const collectionSection = document.querySelector('.section');
        if (collectionSection) {
            collectionSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key to close notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Performance: Debounce Scroll Events
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

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    // Additional scroll handling if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Illume Luxury Lamps - Website Loaded Successfully');
    
    // Add any initialization code here
    
    // Example: Set initial active tag
    const firstTag = document.querySelector('.tag');
    if (firstTag && !document.querySelector('.tag.active')) {
        firstTag.classList.add('active');
    }
});

// Form Submission Handler (if you add forms later)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        console.log('Form submitted:', Object.fromEntries(formData));
        // Add your form submission logic here
    });
});

// Console Easter Egg
console.log('%c✨ Illume Luxury Lamps ✨', 'color: #d4a574; font-size: 24px; font-weight: bold;');
console.log('%cIlluminate your space with elegance', 'color: #f5f1ed; font-size: 14px;');
