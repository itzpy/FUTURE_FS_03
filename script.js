// Smooth scrolling for navigation links
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

// Counter animation for innovation stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const current = parseInt(counter.textContent);
        const increment = target / 50; // Adjust speed here
        
        if (current < target) {
            counter.textContent = Math.ceil(current + increment);
            setTimeout(() => animateCounters(), 50);
        } else {
            counter.textContent = target;
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            
            // Start counter animation when innovation section comes into view
            if (entry.target.id === 'innovation') {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Newsletter form submission with Supabase integration
document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const submitButton = this.querySelector('button[type="submit"]');
    const emailInput = this.querySelector('input[type="email"]');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFormError(emailInput, 'Please enter a valid email address');
        return;
    }

    try {
        // Show loading state
        submitButton.innerHTML = 'Subscribing...';
        submitButton.disabled = true;
        emailInput.disabled = true;
        
        // Remove any existing messages
        removeExistingMessages(this);
        
        // Attempt to subscribe via Supabase
        const result = await subscribeToNewsletter(email);
        
        if (result.success) {
            // Success state
            showFormSuccess(this, submitButton, emailInput, 'Welcome to Apple updates! You\'re now subscribed.');
        } else {
            // Handle specific error types
            if (result.code === 'DUPLICATE_EMAIL') {
                showFormError(emailInput, 'This email is already subscribed to our newsletter');
            } else {
                showFormError(emailInput, result.error || 'Failed to subscribe. Please try again later.');
            }
            
            // Reset button state on error
            submitButton.innerHTML = 'Subscribe';
            submitButton.disabled = false;
            emailInput.disabled = false;
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        showFormError(emailInput, 'Connection error. Please check your internet and try again.');
        
        // Reset button state on error
        submitButton.innerHTML = 'Subscribe';
        submitButton.disabled = false;
        emailInput.disabled = false;
    }
});

// Helper function to show form success state
function showFormSuccess(form, button, input, message) {
    button.innerHTML = 'Subscribed! ✅';
    button.style.background = '#34d399';
    button.style.borderColor = '#34d399';
    input.value = '';
    input.placeholder = 'Successfully subscribed!';
    input.style.borderColor = '#34d399';
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'newsletter-message success-message text-green-400 text-sm mt-2 animate-fade-in';
    successMessage.textContent = message;
    form.appendChild(successMessage);
    
    // Reset after 4 seconds
    setTimeout(() => {
        button.innerHTML = 'Subscribe';
        button.disabled = false;
        button.style.background = '#0071e3';
        button.style.borderColor = '#0071e3';
        input.disabled = false;
        input.placeholder = 'Enter your email';
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        removeExistingMessages(form);
    }, 4000);
}

// Helper function to show form error state
function showFormError(input, message) {
    input.style.borderColor = '#ef4444';
    input.placeholder = message;
    
    // Show error message
    const form = input.closest('form');
    removeExistingMessages(form);
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'newsletter-message error-message text-red-400 text-sm mt-2 animate-fade-in';
    errorMessage.textContent = message;
    form.appendChild(errorMessage);
    
    // Reset styling after 3 seconds
    setTimeout(() => {
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        input.placeholder = 'Enter your email';
        removeExistingMessages(form);
    }, 3000);
}

// Helper function to remove existing messages
function removeExistingMessages(form) {
    const existingMessages = form.querySelectorAll('.newsletter-message');
    existingMessages.forEach(msg => msg.remove());
}

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.classList.add('animate-fade-in');
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(29, 29, 31, 0.85)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(29, 29, 31, 0.72)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Mobile menu toggle functionality (if needed in future)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Utility function for smooth animations
function animateElement(element, animation, duration = 500) {
    element.style.animation = `${animation} ${duration}ms ease-in-out`;
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}

// Product card interactions
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
});

// Enhanced scroll effects for parallax-like experience
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);
