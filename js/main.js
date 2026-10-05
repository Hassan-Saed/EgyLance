/**
 * main.js — EgyLance Frontend JavaScript
 * Handles: countdown timer, form validation, sticky header,
 *          mobile nav toggle, scroll-to-top, active nav link.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =============================================
       1. STICKY HEADER ON SCROLL
    ============================================= */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('sticky', window.scrollY > 80);
        });
    }

    /* =============================================
       2. MOBILE NAV TOGGLE (hamburger)
    ============================================= */
    const navToggle = document.getElementById('nav-toggle');
    const mainNav   = document.querySelector('.main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            navToggle.classList.toggle('active');
        });
        // Close nav when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    /* =============================================
       3. ACTIVE NAV LINK (highlight current page)
    ============================================= */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active-nav');
        }
    });

    /* =============================================
       4. COUNTDOWN TIMER (Events Section)
    ============================================= */
    const countDownDate = new Date('Dec 31, 2026 23:59:59').getTime();
    const timeUnits = document.querySelectorAll('.events .info .time .unit span:first-child');

    if (timeUnits.length === 4) {
        const [daysSpan, hoursSpan, minutesSpan, secondsSpan] = timeUnits;

        const pad = n => (n < 10 ? `0${n}` : n);

        const timer = setInterval(() => {
            const distance = countDownDate - Date.now();
            if (distance < 0) { clearInterval(timer); return; }

            daysSpan.textContent    = pad(Math.floor(distance / 86400000));
            hoursSpan.textContent   = pad(Math.floor((distance % 86400000) / 3600000));
            minutesSpan.textContent = pad(Math.floor((distance % 3600000) / 60000));
            secondsSpan.textContent = pad(Math.floor((distance % 60000) / 1000));
        }, 1000);
    }

    /* =============================================
       5. REGISTER FORM — PASSWORD VALIDATION
    ============================================= */
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            const password        = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            const errorEl         = document.getElementById('password-error');

            if (password !== confirmPassword) {
                e.preventDefault();
                errorEl.classList.add('visible');
            } else {
                errorEl.classList.remove('visible');
            }
        });
    }

    /* =============================================
       6. SMOOTH SCROLLING (internal anchor links)
    ============================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* =============================================
       7. SCROLL-TO-TOP BUTTON
    ============================================= */
    const scrollBtn = document.getElementById('scroll-to-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =============================================
       8. SKILLS PROGRESS BAR ANIMATION
    ============================================= */
    const skillsSection = document.querySelector('.our-skills');
    if (skillsSection) {
        const bars = skillsSection.querySelectorAll('.the-progress span');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bars.forEach(bar => bar.classList.add('animated'));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(skillsSection);
    }

    /* =============================================
       9. NEWSLETTER FORM — SUBSCRIBE FEEDBACK
    ============================================= */
    document.querySelectorAll('.subscribe form, .footer-newsletter-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                emailInput.value = '';
                const btn = form.querySelector('input[type="submit"]');
                if (btn) {
                    const original = btn.value;
                    btn.value = 'Subscribed!';
                    setTimeout(() => { btn.value = original; }, 2500);
                }
            }
        });
    });

});
