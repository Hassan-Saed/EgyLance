

document.addEventListener('DOMContentLoaded', () => {

    
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('sticky', window.scrollY > 80);
        });
    }

    let navToggle = document.getElementById('nav-toggle');
    const mainNav   = document.querySelector('.main-nav');
    if (!navToggle && mainNav) {
        navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.id = 'nav-toggle';
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        navToggle.setAttribute('aria-expanded', 'false');
        for (let i = 0; i < 3; i++) {
            navToggle.appendChild(document.createElement('span'));
        }
        mainNav.parentNode.insertBefore(navToggle, mainNav);
    }
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            if (!isOpen) {

                mainNav.querySelectorAll('.mega-open').forEach(el => el.classList.remove('mega-open'));
            }
        });


        mainNav.querySelectorAll('a:not(#mega-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    
    const megaToggle = document.getElementById('mega-toggle');
    if (megaToggle) {
        const megaItem = megaToggle.closest('.has-mega');
        megaToggle.addEventListener('click', e => {
            if (window.innerWidth <= 767 && megaItem) {
                e.preventDefault();
                const isOpen = megaItem.classList.toggle('mega-open');
                megaToggle.setAttribute('aria-expanded', String(isOpen));
            }
        });
    }

    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active-nav');
        }
    });

    
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

    
    const scrollBtn = document.getElementById('scroll-to-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    
    const skillsSection = document.querySelector('.our-skills');
    if (skillsSection) {
        const bars = skillsSection.querySelectorAll('.the-progress span');
        const animateBar = bar => {


            const target = bar.dataset.width || parseFloat(bar.style.width) || 0;
            bar.style.width = '0';

            void bar.offsetWidth;
            requestAnimationFrame(() => { bar.style.width = `${target}%`; });
            bar.classList.add('animated');
        };
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bars.forEach(animateBar);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(skillsSection);
    }

    
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
