// All functionality in one DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Certificate modal functionality
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    
    let currentCertIndex = 0;
    let allCertificates = [];

    function openModal(index) {
        if (index >= 0 && index < allCertificates.length) {
            currentCertIndex = index;
            modal.classList.remove('hidden');
            modalImg.src = allCertificates[index].src;
            modalImg.alt = allCertificates[index].alt;
            setTimeout(() => {
                modal.style.opacity = 1;
            }, 10);
        }
    }

    function closeModalFunc() {
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.classList.add('hidden');
            modalImg.src = '';
        }, 200);
    }



    // Initialize certificates array
    const certCards = document.querySelectorAll('.certificates-carousel .cert-card');
    allCertificates = Array.from(certCards).map(card => {
        const img = card.querySelector('.cert-img');
        return {
            src: img ? img.src : '',
            alt: img ? img.alt : '',
            title: card.querySelector('.cert-title') ? card.querySelector('.cert-title').textContent : ''
        };
    });

    // Add click event listeners to certificate cards
    certCards.forEach((card, index) => {
        card.addEventListener('click', () => openModal(index));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                openModal(index);
            }
        });
    });

    // Modal event listeners
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalFunc();
        });
    }



    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal || modal.classList.contains('hidden')) return;
        
        if (e.key === 'Escape') {
            closeModalFunc();
        }
    });

    // Set modal transition
    if (modal) {
        modal.style.transition = 'opacity 0.2s';
        modal.style.opacity = 0;
    }

    // Project cards click handler
    document.querySelectorAll('.project-card').forEach(card => {
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.addEventListener('click', function(e) {
            // Защита: само ляв бутон и без drag
            if (e.button !== 0) return;
            const href = card.getAttribute('href');
            if (href) window.open(href, '_blank', 'noopener');
        });
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const href = card.getAttribute('href');
                if (href) window.open(href, '_blank', 'noopener');
            }
        });
    });

    // Hamburger menu logic
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.cv-nav');
    const navLinks = document.querySelector('.nav-links');

    console.log('Menu elements:', { menuToggle, nav, navLinks }); // Debug log

    if (menuToggle && nav && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked'); // Debug log
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    } else {
        console.log('Menu elements not found:', { menuToggle, nav, navLinks }); // Debug log
    }
});


