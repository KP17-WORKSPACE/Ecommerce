// Category Navigation Scroll Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Set CSS variable for header height so sticky elements can sit flush below it
    function setHeaderHeight() {
        const header = document.querySelector('.header');
        if (!header) return;
        const height = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', height + 'px');
    }

    // Run once on load
    setHeaderHeight();

    // Update on resize and when fonts/images load
    window.addEventListener('resize', function () {
        // debounce for performance
        clearTimeout(window.__setHeaderHeightTO);
        window.__setHeaderHeightTO = setTimeout(setHeaderHeight, 120);
    });
    window.addEventListener('load', setHeaderHeight);
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
        speed: 800,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        effect: 'slide',
        grabCursor: true,
        watchSlidesProgress: true,
        
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
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        
        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        // Lazy loading
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        },
        
        // Preload images
        preloadImages: false,
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            paginationBulletMessage: 'Go to slide {{index}}',
        },
        
        // Smooth transitions
        on: {
            init: function () {
                // Add fade-in effect on initialization
                this.slides.forEach((slide, index) => {
                    if (index === 0) {
                        slide.style.opacity = '1';
                    }
                });
            },
            slideChangeTransitionStart: function () {
                // Smooth opacity transition
                this.slides.forEach(slide => {
                    if (slide.classList.contains('swiper-slide-active')) {
                        slide.style.opacity = '1';
                    }
                });
            },
        },
        
        // Responsive breakpoints
        breakpoints: {
            // Mobile
            320: {
                autoplay: {
                    delay: 4500,
                },
                speed: 600,
            },
            // Tablet
            768: {
                autoplay: {
                    delay: 4000,
                },
                speed: 750,
            },
            // Desktop
            1024: {
                autoplay: {
                    delay: 4000,
                },
                speed: 800,
            },
        },
    });

    // Horizontal Scroll for category-products-scroll-wrapper sections
    const scrollWrappers = document.querySelectorAll('.category-products-scroll-wrapper');
    
    scrollWrappers.forEach((wrapper) => {
        const scrollContainer = wrapper.querySelector('.category-products-scroll');
        const scrollLeftBtn = wrapper.querySelector('.category-scroll-btn-left');
        const scrollRightBtn = wrapper.querySelector('.category-scroll-btn-right');

        if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
            const scrollAmount = 220; // Width of one product card + gap

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
                if (scrollLeft <= 5) {
                    scrollLeftBtn.style.opacity = '0.3';
                    scrollLeftBtn.style.pointerEvents = 'none';
                } else {
                    scrollLeftBtn.style.opacity = '1';
                    scrollLeftBtn.style.pointerEvents = 'auto';
                }

                // Hide right button if at end
                if (scrollLeft >= maxScroll - 5) {
                    scrollRightBtn.style.opacity = '0.3';
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
    });

    // Back to Top Button Smooth Scroll
    const backToTopLink = document.querySelector('.back-to-top-link');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
