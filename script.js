(function() {
    'use strict';

    /* ============================================================
       MOBILE MENU TOGGLE
       ============================================================ */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ============================================================
       ACTIVE NAV LINK ON SCROLL
       ============================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    /* ============================================================
       SCROLL REVEAL ANIMATION (Intersection Observer)
       ============================================================ */
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    /* ============================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ============================================================
       TYPING EFFECT
       ============================================================ */
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const text = greeting.textContent;
        greeting.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                greeting.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 400);
    }

})();