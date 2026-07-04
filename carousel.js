document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.bottom-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 3000; // 3 secondi per slide

    function showSlide(index) {
        // Gestione del wrap-around (circolare)
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Rimuove la classe active da tutte le slide e i dot
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Aggiunge la classe active alla slide e al dot correnti
        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function startAutoplay() {
        stopAutoplay(); // Previene timer multipli
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Avvia l'autoplay
    startAutoplay();

    // Metti in pausa quando il mouse è sopra il carosello
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Gestione dei click sui pallini indicatori (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Riavvia l'autoplay per reimpostare il timer da zero
            startAutoplay();
        });
    });
});
