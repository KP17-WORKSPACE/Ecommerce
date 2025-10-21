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
