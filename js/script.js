document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
             const navbarCollapse = document.getElementById('navbarNav');
             if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                 const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                     toggle: false
                 });
                 bsCollapse.hide();
             }

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                 e.preventDefault();

                 const targetId = href.substring(1);
                 const targetElement = document.getElementById(targetId);

                 if (targetElement) {
                     targetElement.scrollIntoView({
                         behavior: 'smooth',
                         block: 'start'
                     });
                 }
            }

        });
    });

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Please fill in all required fields.';
                formStatus.style.color = 'red';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                 formStatus.textContent = 'Please enter a valid email address.';
                 formStatus.style.color = 'red';
                 return;
            }

            formStatus.textContent = 'Message received (Frontend placeholder). Needs backend processing.';
            formStatus.style.color = 'orange';
            console.log('Form data collected:', {
                name: name,
                email: email,
                subject: document.getElementById('subject').value.trim(),
                message: message
            });
             contactForm.reset();
        });
    }

    const elementsToReveal = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const options = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                }
            });
        }, options);

        elementsToReveal.forEach(element => {
            observer.observe(element);
        });
    } else {
        elementsToReveal.forEach(element => {
            element.classList.add('active');
        });
         console.warn("IntersectionObserver not supported, animations may not appear.");
    }
});