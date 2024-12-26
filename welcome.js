document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');

        let currentIndex = 0;
        let interval;

        // Create indicator dots
        carouselItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        function goToSlide(index) {
            carouselItems[currentIndex].classList.remove('active');
            carouselItems[index].classList.add('active');
            indicatorsContainer.children[currentIndex].classList.remove('active');
            indicatorsContainer.children[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            goToSlide((currentIndex + 1) % carouselItems.length);
        }

        function prevSlide() {
            goToSlide((currentIndex - 1 + carouselItems.length) % carouselItems.length);
        }

        // Event listeners for manual navigation
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Auto-play functionality
        function startAutoPlay() {
            interval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(interval);
        }

        // Start auto-play
        startAutoPlay();

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Lazy loading for carousel images
        const lazyLoadImages = () => {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.setAttribute('src', img.getAttribute('data-src'));
                img.removeAttribute('data-src');
                img.removeAttribute('loading');
            });
        };

        // Intersection Observer for lazy loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoadImages();
                    observer.disconnect();
                }
            });
        });

        observer.observe(document.querySelector('.carousel'));
    }

    // Quotes for the carousel
    const quotes = [
        "Travel is the only thing you buy that makes you richer",
        "The world is a book, and those who do not travel read only one page",
        "Adventure is worthwhile in itself",
        "Travel far enough, you meet yourself",
        "Life is either a daring adventure or nothing at all"
    ];

    // Function to change the quote
    function changeQuote() {
        const quoteElement = document.querySelector('.quote');
        if (quoteElement) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteElement.textContent = `"${randomQuote}"`;
        }
    }

    // Change quote every 10 seconds
    setInterval(changeQuote, 10000);

    // Initial quote change
    changeQuote();

    // Search form functionality
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server or update the page
            alert('Search functionality will be implemented in the future!');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to hotel type cards and deal cards on scroll
    const cards = document.querySelectorAll('.hotel-type-card, .deal-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));

    // Add hover effect to deal cards
    const dealCards = document.querySelectorAll('.deal-card');
    dealCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const button = card.querySelector('button');
            if (button) {
                button.style.backgroundColor = '#ffd700';
            }
        });
        card.addEventListener('mouseleave', () => {
            const button = card.querySelector('button');
            if (button) {
                button.style.backgroundColor = '#2ecc71';
            }
        });
    });

    // Dynamically update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} EmeraldStay. All rights reserved.`;
    }
});


