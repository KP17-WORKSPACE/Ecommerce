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

    // ========================= 
    // Authentication Page Functions
    // ========================= 

    // Password Toggle Functionality
    const passwordToggleBtns = document.querySelectorAll('.password-toggle-btn');
    passwordToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the input field in the parent wrapper
            const wrapper = this.closest('.password-input-wrapper');
            const input = wrapper.querySelector('input[type="password"], input[type="text"]');
            const icon = this.querySelector('i');
            
            if (input && input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else if (input) {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    });

    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!loginForm.checkValidity()) {
                e.stopPropagation();
                loginForm.classList.add('was-validated');
                return;
            }

            // Form is valid - simulate login
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log('Login attempt:', { email, password });
            
            // Here you would typically make an API call
            // For demo, just redirect to home
            alert('Login successful! (Demo mode)');
            // window.location.href = 'index.html';
        });
    }

    // Signup Form Validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if passwords match
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            const confirmInput = document.getElementById('signupConfirmPassword');
            
            if (password !== confirmPassword) {
                confirmInput.setCustomValidity('Passwords do not match');
            } else {
                confirmInput.setCustomValidity('');
            }
            
            if (!signupForm.checkValidity()) {
                e.stopPropagation();
                signupForm.classList.add('was-validated');
                return;
            }

            // Form is valid - simulate signup
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const mobile = document.getElementById('signupMobile').value;
            
            console.log('Signup attempt:', { name, email, mobile, password });
            
            // Here you would typically make an API call
            alert('Account created successfully! (Demo mode)');
            // window.location.href = 'login.html';
        });

        // Real-time password match validation
        const confirmPasswordInput = document.getElementById('signupConfirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                const password = document.getElementById('signupPassword').value;
                if (this.value !== password) {
                    this.setCustomValidity('Passwords do not match');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
    }

    // Forgot Password Form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!forgotPasswordForm.checkValidity()) {
                e.stopPropagation();
                forgotPasswordForm.classList.add('was-validated');
                return;
            }

            // Form is valid - show success step
            const email = document.getElementById('resetEmail').value;
            document.getElementById('sentToEmail').textContent = email;
            
            // Hide step 1, show step 2
            document.getElementById('step1').classList.add('d-none');
            document.getElementById('step2').classList.remove('d-none');
        });
    }

    // Resend Link
    const resendLink = document.getElementById('resendLink');
    if (resendLink) {
        resendLink.addEventListener('click', function() {
            alert('Reset link sent again! (Demo mode)');
        });
    }

    // OTP Form
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        const otpInputs = otpForm.querySelectorAll('input');
        
        // Auto-focus next input
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                if (this.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });

            // Handle backspace
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });

            // Only allow numbers
            input.addEventListener('beforeinput', function(e) {
                if (e.data && !/[0-9]/.test(e.data)) {
                    e.preventDefault();
                }
            });
        });

        otpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get OTP value
            let otp = '';
            otpInputs.forEach(input => otp += input.value);
            
            if (otp.length === 6) {
                console.log('OTP submitted:', otp);
                alert('OTP verified successfully! (Demo mode)');
                // Redirect or show reset password form
            }
        });
    }

    // OTP Timer and Resend
    const resendOTP = document.getElementById('resendOTP');
    const otpTimer = document.getElementById('otpTimer');
    if (resendOTP && otpTimer) {
        let timeLeft = 30;
        resendOTP.disabled = true;

        const countdown = setInterval(() => {
            timeLeft--;
            otpTimer.textContent = `(${timeLeft}s)`;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                resendOTP.disabled = false;
                otpTimer.textContent = '';
            }
        }, 1000);

        resendOTP.addEventListener('click', function() {
            if (!this.disabled) {
                alert('OTP sent again! (Demo mode)');
                // Restart timer
                timeLeft = 30;
                this.disabled = true;
                const newCountdown = setInterval(() => {
                    timeLeft--;
                    otpTimer.textContent = `(${timeLeft}s)`;
                    
                    if (timeLeft <= 0) {
                        clearInterval(newCountdown);
                        resendOTP.disabled = false;
                        otpTimer.textContent = '';
                    }
                }, 1000);
            }
        });
    }
});

// ========================= 
// PRODUCT DETAILS PAGE FUNCTIONALITY
// ========================= 

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product details page
    const pdpMainImage = document.getElementById('mainImage');
    if (!pdpMainImage) return; // Exit if not on PDP

    const zoomLens = document.getElementById('zoomLens');
    const zoomResult = document.getElementById('zoomResult');
    const mainImageWrapper = document.querySelector('.pdp-main-image-wrapper');
    const thumbnails = document.querySelectorAll('.pdp-thumbnail');
    const wishlistBtn = document.querySelector('.pdp-wishlist-btn');
    const colorOptions = document.querySelectorAll('.pdp-color-option');
    const sizeOptions = document.querySelectorAll('.pdp-size-option');
    const variantSelected = document.querySelector('.pdp-variant-selected');
    const pincodeBtn = document.querySelector('.pdp-pincode-btn');
    const pincodeInput = document.querySelector('.pdp-pincode-input');
    const addToCartBtns = document.querySelectorAll('#addToCart, #mobileAddToCart');
    const buyNowBtns = document.querySelectorAll('#buyNow, #mobileBuyNow');

    // ========== Image Zoom Functionality (Desktop) ==========
    let imageZoom = null;
    
    function initZoom() {
        if (window.innerWidth >= 992 && zoomResult && zoomLens && mainImageWrapper) {
            const img = pdpMainImage;
            const lens = zoomLens;
            const result = zoomResult;
            
            // Calculate zoom ratio
            const cx = result.offsetWidth / lens.offsetWidth;
            const cy = result.offsetHeight / lens.offsetHeight;
            
            // Set background properties for zoom result
            result.style.backgroundImage = `url('${img.src}')`;
            
            mainImageWrapper.addEventListener('mousemove', moveLens);
            lens.addEventListener('mousemove', moveLens);
            
            mainImageWrapper.addEventListener('mouseenter', function() {
                lens.style.display = 'block';
                result.style.display = 'block';
            });
            
            mainImageWrapper.addEventListener('mouseleave', function() {
                lens.style.display = 'none';
                result.style.display = 'none';
            });
            
            function moveLens(e) {
                e.preventDefault();
                
                // Get cursor position
                const pos = getCursorPos(e);
                
                // Calculate lens position
                let x = pos.x - (lens.offsetWidth / 2);
                let y = pos.y - (lens.offsetHeight / 2);
                
                // Prevent lens from going outside image
                if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
                if (x < 0) { x = 0; }
                if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
                if (y < 0) { y = 0; }
                
                // Set lens position
                lens.style.left = x + 'px';
                lens.style.top = y + 'px';
                
                // Display zoomed image
                result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
            }
            
            function getCursorPos(e) {
                const a = img.getBoundingClientRect();
                const x = e.pageX - a.left - window.pageXOffset;
                const y = e.pageY - a.top - window.pageYOffset;
                return { x: x, y: y };
            }
        }
    }
    
    // Initialize zoom on load
    initZoom();
    
    // Reinitialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (zoomLens && zoomResult) {
                zoomLens.style.display = 'none';
                zoomResult.style.display = 'none';
            }
            initZoom();
        }, 250);
    });

    // ========== Thumbnail Click Handler ==========
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image with smooth transition
            const newImageSrc = this.getAttribute('data-image');
            pdpMainImage.style.opacity = '0';
            
            setTimeout(() => {
                pdpMainImage.src = newImageSrc;
                if (zoomResult) {
                    zoomResult.style.backgroundImage = `url('${newImageSrc}')`;
                }
                pdpMainImage.style.opacity = '1';
            }, 150);
        });
    });

    // ========== Wishlist Toggle ==========
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                // Add to wishlist animation
                this.innerHTML = '<i class="bi bi-heart-fill"></i>';
                
                // Simple feedback
                const feedback = document.createElement('div');
                feedback.textContent = 'Added to Wishlist';
                feedback.style.cssText = `
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: var(--accent-success);
                    color: white;
                    padding: 0.75rem 1.25rem;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    box-shadow: var(--shadow-lg);
                    z-index: 9999;
                    animation: slideInRight 0.3s ease;
                `;
                document.body.appendChild(feedback);
                
                setTimeout(() => {
                    feedback.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => feedback.remove(), 300);
                }, 2000);
            } else {
                this.innerHTML = '<i class="bi bi-heart"></i>';
            }
        });
    }

    // ========== Color Variant Selection ==========
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // Update selected variant text
            const colorName = this.getAttribute('data-color');
            if (variantSelected) {
                variantSelected.textContent = colorName;
            }
        });
    });

    // ========== Size/Storage Variant Selection ==========
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // Optionally update price based on storage
            const storage = this.getAttribute('data-storage');
            console.log('Selected storage:', storage);
            // You can add price update logic here
        });
    });

    // ========== Pincode Check ==========
    if (pincodeBtn && pincodeInput) {
        pincodeBtn.addEventListener('click', function() {
            const pincode = pincodeInput.value.trim();
            
            if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
                pincodeInput.style.borderColor = 'var(--accent-danger)';
                
                // Simple error feedback
                const errorMsg = document.createElement('div');
                errorMsg.textContent = 'Please enter a valid 6-digit pincode';
                errorMsg.style.cssText = `
                    color: var(--accent-danger);
                    font-size: 0.75rem;
                    margin-top: 0.25rem;
                `;
                
                // Remove existing error if any
                const existing = pincodeInput.parentElement.querySelector('.error-msg');
                if (existing) existing.remove();
                
                errorMsg.className = 'error-msg';
                pincodeInput.parentElement.appendChild(errorMsg);
                
                setTimeout(() => {
                    pincodeInput.style.borderColor = '';
                    if (errorMsg.parentElement) errorMsg.remove();
                }, 3000);
                
                return;
            }
            
            // Success state
            pincodeInput.style.borderColor = 'var(--accent-success)';
            
            // Simulate checking delivery
            pincodeBtn.textContent = 'Checking...';
            pincodeBtn.disabled = true;
            
            setTimeout(() => {
                pincodeBtn.textContent = 'Check';
                pincodeBtn.disabled = false;
                pincodeInput.style.borderColor = '';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.innerHTML = '<i class="bi bi-check-circle-fill"></i> Delivery available in your area!';
                successMsg.style.cssText = `
                    color: var(--accent-success);
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                `;
                
                const existing = pincodeInput.parentElement.querySelector('.success-msg');
                if (existing) existing.remove();
                
                successMsg.className = 'success-msg';
                pincodeInput.parentElement.appendChild(successMsg);
            }, 1000);
        });
        
        // Allow Enter key to check pincode
        pincodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                pincodeBtn.click();
            }
        });
    }

    // ========== Add to Cart Handler ==========
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get selected options
            const activeColor = document.querySelector('.pdp-color-option.active');
            const activeSize = document.querySelector('.pdp-size-option.active');
            
            const selectedColor = activeColor ? activeColor.getAttribute('data-color') : null;
            const selectedStorage = activeSize ? activeSize.getAttribute('data-storage') : null;
            
            console.log('Add to Cart:', { selectedColor, selectedStorage });
            
            // Animation feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> ADDED';
            this.disabled = true;
            
            // Success notification
            const notification = document.createElement('div');
            notification.textContent = 'Item added to cart!';
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: var(--accent-success);
                color: white;
                padding: 0.875rem 1.5rem;
                border-radius: 6px;
                font-size: 0.9375rem;
                font-weight: 600;
                box-shadow: var(--shadow-xl);
                z-index: 9999;
                animation: slideInRight 0.3s ease;
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2500);
        });
    });

    // ========== Buy Now Handler ==========
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const activeColor = document.querySelector('.pdp-color-option.active');
            const activeSize = document.querySelector('.pdp-size-option.active');
            
            const selectedColor = activeColor ? activeColor.getAttribute('data-color') : null;
            const selectedStorage = activeSize ? activeSize.getAttribute('data-storage') : null;
            
            console.log('Buy Now:', { selectedColor, selectedStorage });
            
            // Simulate redirect to checkout
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-hourglass-split me-1"></i> PROCESSING...';
            this.disabled = true;
            
            setTimeout(() => {
                // In real app: window.location.href = 'checkout.html';
                alert('Redirecting to checkout... (Demo Mode)');
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });

    // ========== Review Helpful Buttons ==========
    const reviewActionBtns = document.querySelectorAll('.pdp-review-action-btn');
    reviewActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('voted')) return;
            
            this.classList.add('voted');
            
            // Update count if it exists
            const countMatch = this.textContent.match(/\d+/);
            if (countMatch) {
                const currentCount = parseInt(countMatch[0]);
                const newCount = currentCount + 1;
                this.innerHTML = this.innerHTML.replace(/\d+/, newCount);
            }
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ========== Share Button Handler ==========
    const shareBtn = document.querySelector('.pdp-share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const productTitle = document.querySelector('.pdp-title').textContent;
            const productUrl = window.location.href;
            
            // Use Web Share API if available
            if (navigator.share) {
                navigator.share({
                    title: productTitle,
                    url: productUrl
                }).then(() => {
                    console.log('Shared successfully');
                }).catch((error) => {
                    console.log('Error sharing:', error);
                });
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(productUrl).then(() => {
                    const feedback = document.createElement('div');
                    feedback.textContent = 'Link copied to clipboard!';
                    feedback.style.cssText = `
                        position: fixed;
                        top: 80px;
                        right: 20px;
                        background: var(--primary-color);
                        color: white;
                        padding: 0.75rem 1.25rem;
                        border-radius: 6px;
                        font-size: 0.875rem;
                        font-weight: 600;
                        box-shadow: var(--shadow-lg);
                        z-index: 9999;
                        animation: slideInRight 0.3s ease;
                    `;
                    document.body.appendChild(feedback);
                    
                    setTimeout(() => {
                        feedback.style.animation = 'slideOutRight 0.3s ease';
                        setTimeout(() => feedback.remove(), 300);
                    }, 2000);
                });
            }
        });
    }
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

