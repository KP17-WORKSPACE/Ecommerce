// Category Navigation Scroll Functionality
document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.getElementById('categoryScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 300; // pixels to scroll

        scrollLeftBtn.addEventListener('click', function () {
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', function () {
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Show/hide buttons based on scroll position
        function updateScrollButtons() {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            // Hide left button if at start
            if (scrollLeft <= 0) {
                scrollLeftBtn.style.opacity = '0';
                scrollLeftBtn.style.pointerEvents = 'none';
            } else {
                scrollLeftBtn.style.opacity = '1';
                scrollLeftBtn.style.pointerEvents = 'auto';
            }

            // Hide right button if at end
            if (scrollLeft >= maxScroll - 5) {
                scrollRightBtn.style.opacity = '0';
                scrollRightBtn.style.pointerEvents = 'none';
            } else {
                scrollRightBtn.style.opacity = '1';
                scrollRightBtn.style.pointerEvents = 'auto';
            }
        }

        // Update button visibility on scroll
        scrollContainer.addEventListener('scroll', updateScrollButtons);

        // Initial check
        updateScrollButtons();

        // Check on window resize
        window.addEventListener('resize', updateScrollButtons);
    }

    // Initialize Swiper for Hero Banner
    const heroSwiper = new Swiper('.hero-swiper', {
        // Swiper parameters
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        effect: 'slide',
        grabCursor: true,
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination dots
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        
        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        // Lazy loading
        lazy: {
            loadPrevNext: true,
        },
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            paginationBulletMessage: 'Go to slide {{index}}',
        },
        
        // Responsive breakpoints
        breakpoints: {
            // Mobile
            320: {
                autoplay: {
                    delay: 4000,
                },
            },
            // Tablet
            768: {
                autoplay: {
                    delay: 3500,
                },
            },
            // Desktop
            1024: {
                autoplay: {
                    delay: 3500,
                },
            },
        },
    });
});
