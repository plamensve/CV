// Списък с курсове и съответните имена на файловете
const certificates = [
    { title: 'Programming Basics', file: 'programming_basics.jpeg' },
    { title: 'Programming Fundamentals', file: 'programming_fundamentals.jpeg' },
    { title: 'Python Advanced', file: 'python-advanced.jpg' },
    { title: 'Python OOP', file: 'oop.jpg' },
    { title: 'PostgreSQL', file: 'postgresql.jpg' },
    { title: 'Python ORM', file: 'orm.jpg' },
    { title: 'Django Basics', file: 'django-basics.jpg' },
    { title: 'Django Advanced', file: 'django-advanced.jpg' },
    { title: 'HTML & CSS', file: 'html.jpg' },
    { title: 'JS Front-End', file: 'js-front-end.jpg' },
    { title: 'Software Engineering and DevOps', file: 'devops_1.jpeg' }
];

const gallery = document.querySelector('.certificates-gallery');
const modal = document.getElementById('certificate-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-modal');

function createCertCard(cert) {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', cert.title);

    const img = document.createElement('img');
    img.src = `images/certifications/${cert.file}`;
    img.alt = cert.title;
    img.loading = 'lazy';

    const title = document.createElement('div');
    title.className = 'cert-title';
    title.textContent = cert.title;

    const org = document.createElement('div');
    org.className = 'cert-org';
    org.textContent = 'Software University';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(org);

    card.addEventListener('click', () => openModal(img.src, cert.title));
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') openModal(img.src, cert.title);
    });
    return card;
}

function openModal(src, alt) {
    modal.classList.remove('hidden');
    modalImg.src = src;
    modalImg.alt = alt;
    setTimeout(() => {
        modal.style.opacity = 1;
    }, 10);
}

function closeModalFunc() {
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.classList.add('hidden');
        modalImg.src = '';
    }, 200);
}

closeModal.addEventListener('click', closeModalFunc);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
});

gallery.innerHTML = '';
certificates.forEach(cert => {
    gallery.appendChild(createCertCard(cert));
});

// Анимация за модалния прозорец
modal.style.transition = 'opacity 0.2s';
modal.style.opacity = 0;

// Project cards click handler

document.querySelectorAll('.project-card').forEach(card => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.addEventListener('click', function(e) {
        // Защита: само ляв бутон и без drag
        if (e.button !== 0) return;
        const href = card.getAttribute('data-href');
        if (href) window.open(href, '_blank', 'noopener');
    });
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const href = card.getAttribute('data-href');
            if (href) window.open(href, '_blank', 'noopener');
        }
    });
});

// Hamburger menu logic
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.cv-nav');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && nav && navLinks) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('open')) {
            nav.classList.remove('open');
        }
    });
}

// Scroll to top button logic
const scrollBtn = document.querySelector('.scroll-top-btn');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
