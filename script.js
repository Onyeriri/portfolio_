// script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Optional: Stop observing once shown to prevent re-animating
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll(".hidden-left, .hidden-right, .hidden-bottom");
    hiddenElements.forEach((el) => observer.observe(el));

    // 3. Navbar Blur & Shadow Effect on Scroll
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(15, 23, 42, 0.95)";
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
            navbar.style.padding = "1rem 0"; // Shrink slightly
        } else {
            navbar.style.background = "rgba(15, 23, 42, 0.8)";
            navbar.style.boxShadow = "none";
            navbar.style.padding = "1.5rem 0"; // Original size
        }
    });

    // 4. Smooth Scroll for Anchor Links (Fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Dynamic Year Update for Footer
    const footerText = document.querySelector('footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${currentYear} Onyeriri. All Rights Reserved.`;
    }

    // 6. Active Link Highlighter based on Scroll Position
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Offset by 150px to trigger highlight before the section hits exact top
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active-link'); // You can add CSS for .active-link
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active-link');
            }
        });
    });
});