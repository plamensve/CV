(function() {
    function updateActiveCards(carousel) {
        const track = carousel.querySelector('.courses-track');
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
    document.querySelectorAll('.courses-carousel').forEach(carousel => {
        const track = carousel.querySelector('.courses-track');
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
        track.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', function(e) {
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
})(); 