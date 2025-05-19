// Initialize navigation functionality
const initNavigation = () => {
    // Smooth scrolling for all nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Mobile menu toggle (works with both static and dynamic nav)
    const setupMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            if (!document.querySelector('.menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '☰';
                document.querySelector('header').appendChild(menuToggle);

                menuToggle.addEventListener('click', () => {
                    nav.classList.toggle('active');
                });
            }
        }
    };
    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);
};

// Responsive font scaling
const scaleFonts = () => {
    const baseSize = Math.min(
        Math.max(window.innerWidth * 0.01, 10), 
        20
    );
    document.documentElement.style.fontSize = `${baseSize}px`;
};

// Responsive background handler
const handleResponsiveBackground = () => {
    const body = document.body;
    const width = window.innerWidth;
    
    // Adjust background based on screen size
    if (width < 768) {
        body.style.backgroundSize = 'auto 100%';
        body.style.backgroundPosition = 'center';
    } else {
        body.style.backgroundSize = 'cover';
        body.style.backgroundAttachment = 'fixed';
    }
};

// Initialize navigation when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    scaleFonts();
    handleResponsiveBackground();

    // Initialize particles.js
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});

// Combined resize handler
const handleResize = () => {
    handleResponsiveBackground();
    scaleFonts();
};
window.addEventListener('resize', handleResize);

// Dynamic greeting in header
const greetingElement = document.querySelector('header p');
if (greetingElement) {
    const greetingText = "Hello, I'm";
    const name = "Brian Mwendwa";
    greetingElement.textContent = `${greetingText} ${name}`;
}

// Animate skill bars on scroll
const animateBars = () => {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for skill animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.percentage-bar').forEach(bar => {
    observer.observe(bar);
});

// Mobile menu toggle
const mobileMenuToggle = () => {
    const nav = document.querySelector('nav');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('header').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
};

// Initialize mobile menu if screen is small
if (window.innerWidth <= 768) {
    mobileMenuToggle();
}

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Form is valid - could add AJAX submission here
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.menu-toggle')) {
        mobileMenuToggle();
    }
});
