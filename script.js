document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Navbar background on scroll
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-times', isOpen);
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll-triggered reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right')
        .forEach(el => observer.observe(el));

   
    const EMAILJS_PUBLIC_KEY = 'KD9Tmj3021nEb4mUJ';
    const EMAILJS_SERVICE_ID = 'service_esi8khw';  
    const EMAILJS_TEMPLATE_ID = 'template_h1kbjs8';

    const isEmailJsConfigured = EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID;

    if (isEmailJsConfigured && window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusDiv = document.getElementById('form-status');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            if (!isEmailJsConfigured) {
                statusDiv.textContent = 'Contact form isn\u2019t wired up yet — add your EmailJS keys in script.js.';
                statusDiv.classList.add('error');
                return;
            }

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            statusDiv.classList.remove('error');

            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(() => {
                    statusDiv.textContent = 'Message sent successfully! I\u2019ll get back to you soon.';
                    contactForm.reset();
                })
                .catch((err) => {
                    console.error('EmailJS error:', err);
                    statusDiv.textContent = 'Something went wrong — please try again or email me directly.';
                    statusDiv.classList.add('error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        statusDiv.textContent = '';
                        statusDiv.classList.remove('error');
                    }, 6000);
                });
        });
    }
});