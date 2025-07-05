(function() {
    let currentCertIndex = 0;
    let allCertificates = [];
    
    function updateActiveCards(carousel) {
        const track = carousel.querySelector('.courses-track, .certificates-track, .projects-track');
        const cards = Array.from(track.children);
        const carouselRect = carousel.getBoundingClientRect();
        let minDist = Infinity, activeIdx = 0;
        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const carouselCenter = carouselRect.left + carouselRect.width / 2;
            const dist = Math.abs(cardCenter - carouselCenter);
            if (dist < minDist) {
                minDist = dist;
                activeIdx = i;
            }
        });
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            if (i === activeIdx) card.classList.add('active');
            else if (i === activeIdx - 1) card.classList.add('prev');
            else if (i === activeIdx + 1) card.classList.add('next');
        });
    }
    
    function updateModalNavigation() {
        const prevBtn = document.querySelector('.modal-prev-btn');
        const nextBtn = document.querySelector('.modal-next-btn');
        
        // Always show both buttons for circular navigation
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
    }
    
    function showCertificate(index) {
        if (index >= 0 && index < allCertificates.length) {
            const modalImg = document.getElementById('modal-img');
            if (modalImg) {
                // Add changing effect
                modalImg.classList.add('changing');
                
                setTimeout(() => {
                    currentCertIndex = index;
                    modalImg.src = allCertificates[index].src;
                    modalImg.alt = allCertificates[index].alt;
                    
                    // Remove changing effect after image loads
                    setTimeout(() => {
                        modalImg.classList.remove('changing');
                    }, 100);
                }, 150);
            }
            updateModalNavigation();
        }
    }
    
    function showNextCertificate() {
        const nextIndex = (currentCertIndex + 1) % allCertificates.length;
        showCertificate(nextIndex);
    }
    
    function showPrevCertificate() {
        const prevIndex = currentCertIndex === 0 ? allCertificates.length - 1 : currentCertIndex - 1;
        showCertificate(prevIndex);
    }
    
    // Initialize certificate navigation
    document.addEventListener('DOMContentLoaded', function() {
        const certCards = document.querySelectorAll('.certificates-carousel .cert-card');
        allCertificates = Array.from(certCards).map(card => {
            const img = card.querySelector('.cert-img');
            return {
                src: img ? img.src : '',
                alt: img ? img.alt : ''
            };
        });
        
        // Add event listeners for modal navigation
        const prevBtn = document.querySelector('.modal-prev-btn');
        const nextBtn = document.querySelector('.modal-next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', showPrevCertificate);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextCertificate);
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            const modal = document.getElementById('certificate-modal');
            if (!modal || modal.classList.contains('hidden')) return;
            
            if (e.key === 'ArrowLeft') {
                showPrevCertificate();
            } else if (e.key === 'ArrowRight') {
                showNextCertificate();
            }
        });
    });
    
    document.querySelectorAll('.courses-carousel, .certificates-carousel, .projects-carousel').forEach(carousel => {
        const track = carousel.querySelector('.courses-track, .certificates-track, .projects-track');
        if (!track) return;
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveCards(carousel);
                    ticking = false;
                });
                ticking = true;
            }
        }
        carousel.addEventListener('scroll', onScroll);
        window.addEventListener('resize', () => updateActiveCards(carousel));
        // Snap to card on load
        setTimeout(() => updateActiveCards(carousel), 100);
        // Scroll to center on card click
        track.querySelectorAll('.course-card, .cert-card, .project-card').forEach((card, index) => {
            card.addEventListener('click', function(e) {
                // Scroll to center for all cards in projects-carousel
                const carouselRect = carousel.getBoundingClientRect();
                const cardRect = card.getBoundingClientRect();
                const scrollLeft = carousel.scrollLeft;
                const cardCenter = cardRect.left + cardRect.width / 2;
                const carouselCenter = carouselRect.left + carouselRect.width / 2;
                const diff = cardCenter - carouselCenter;
                carousel.scrollTo({
                    left: scrollLeft + diff,
                    behavior: 'smooth'
                });
            });
        });
    });

    // --- Mobile menu (hamburger) ---
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.cv-nav');
        const navLinks = document.querySelector('.nav-links');
        if (menuToggle && nav && navLinks) {
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('open');
            });
            // Close menu on link click (mobile UX)
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('open');
                });
            });
        }
    });


})(); 