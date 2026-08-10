/**
 * ==========================================================================
 * STACKLY UNIVERSAL FORM VALIDATION & INTERACTIVITY ENGINE
 * Comprehensive, High-Performance Validation for Public & Dashboard Forms
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Toast Container
    let toastContainer = document.querySelector('.db-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'db-toast-container';
        document.body.appendChild(toastContainer);
    }

    // Toast Notification System
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `db-toast ${type}`;
        
        let icon = 'fa-circle-info';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'error') icon = 'fa-triangle-exclamation';

        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(toast, 
                { opacity: 0, y: 30, scale: 0.9 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.5)" }
            );
        }

        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                gsap.to(toast, {
                    opacity: 0,
                    y: -20,
                    scale: 0.9,
                    duration: 0.3,
                    onComplete: () => toast.remove()
                });
            } else {
                toast.remove();
            }
        }, 4000);
    };

    // 2. Email & Phone Regex Validators
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{7,18}$/;

    // Helper: Show Error on Field
    function setFieldError(field, message) {
        field.classList.add('error');
        
        // Find existing error container or create one
        let errSpan = field.parentNode.querySelector('.error-msg, .db-error-msg');
        if (!errSpan && field.id) {
            errSpan = document.getElementById('err-' + field.id);
        }
        
        if (!errSpan) {
            errSpan = document.createElement('span');
            errSpan.className = 'db-error-msg';
            if (field.parentNode) {
                field.parentNode.appendChild(errSpan);
            }
        }
        
        if (errSpan) {
            errSpan.innerText = message;
            errSpan.style.display = 'block';
        }
    }

    // Helper: Clear Error on Field
    function clearFieldError(field) {
        field.classList.remove('error');
        let errSpan = field.parentNode.querySelector('.error-msg, .db-error-msg');
        if (!errSpan && field.id) {
            errSpan = document.getElementById('err-' + field.id);
        }
        if (errSpan) {
            errSpan.innerText = '';
        }
    }

    // Helper: Validate a Single Input Field
    function validateInput(field) {
        const value = field.value ? field.value.trim() : '';
        const isRequired = field.hasAttribute('required') || field.classList.contains('required');
        const type = field.getAttribute('type') || field.tagName.toLowerCase();
        const name = field.getAttribute('name') || field.id || '';

        // Check Required
        if (isRequired) {
            if (type === 'checkbox' && !field.checked) {
                setFieldError(field, 'This field is required');
                return false;
            }
            if (value === '') {
                setFieldError(field, 'This field is required');
                return false;
            }
        }

        // Validate Email
        if (type === 'email' || name.toLowerCase().includes('email')) {
            if (value !== '' && !emailRegex.test(value)) {
                setFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Validate Phone
        if (type === 'tel' || name.toLowerCase().includes('phone')) {
            const digits = value.replace(/\D/g, '');
            if (value !== '' && (!phoneRegex.test(value) || digits.length < 7)) {
                setFieldError(field, 'Please enter a valid phone number (min 7 digits)');
                return false;
            }
        }

        // Validate Password
        if (type === 'password' && isRequired) {
            if (value.length < 6) {
                setFieldError(field, 'Password must be at least 6 characters');
                return false;
            }
        }

        // Validate Select dropdowns
        if (field.tagName.toLowerCase() === 'select' && isRequired) {
            if (value === '' || value.toLowerCase().includes('select')) {
                setFieldError(field, 'Please select a valid option');
                return false;
            }
        }

        // Validate Textareas with minimum length requirement
        if (field.tagName.toLowerCase() === 'textarea' && isRequired) {
            if (value.length < 10) {
                setFieldError(field, 'Please enter at least 10 characters');
                return false;
            }
        }

        clearFieldError(field);
        return true;
    }

    // 3. Attach Live Validation Listeners to all inputs, selects, textareas
    function bindLiveValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearFieldError(input);
            });
            input.addEventListener('change', () => {
                clearFieldError(input);
            });
            input.addEventListener('blur', () => {
                if (input.value && input.value.trim() !== '') {
                    validateInput(input);
                }
            });
        });
    }

    // 4. Attach Validation to ALL Forms on the page
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        bindLiveValidation(form);

        form.addEventListener('submit', function(e) {
            let isFormValid = true;
            let firstInvalidField = null;

            const fields = form.querySelectorAll('input, select, textarea');
            fields.forEach(field => {
                // Ignore submit buttons or hidden fields
                const type = field.getAttribute('type');
                if (type === 'submit' || type === 'button' || type === 'hidden') return;

                const valid = validateInput(field);
                if (!valid) {
                    isFormValid = false;
                    if (!firstInvalidField) firstInvalidField = field;
                }
            });

            // Specific confirm password validation for signup forms
            const pwd = form.querySelector('input[name="password"], #password');
            const confirmPwd = form.querySelector('input[name="confirmPassword"], #confirmPassword');
            if (pwd && confirmPwd && confirmPwd.value.trim() !== '') {
                if (pwd.value !== confirmPwd.value) {
                    setFieldError(confirmPwd, 'Passwords do not match');
                    isFormValid = false;
                    if (!firstInvalidField) firstInvalidField = confirmPwd;
                }
            }

            if (!isFormValid) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    if (typeof gsap !== 'undefined') {
                        gsap.to(firstInvalidField, {
                            keyframes: [
                                { x: -6, duration: 0.08 },
                                { x: 6, duration: 0.08 },
                                { x: -4, duration: 0.08 },
                                { x: 4, duration: 0.08 },
                                { x: 0, duration: 0.08 }
                            ]
                        });
                    }
                }
                
                window.showToast('Please fill in all required fields properly.', 'error');
                return false;
            }

            // If Valid:
            // Check if it's the Contact Form
            if (form.id === 'contactForm') {
                e.preventDefault();
                const submitBtn = form.querySelector('#submitBtn, button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
                    submitBtn.disabled = true;
                }
                setTimeout(() => {
                    window.location.href = '404.html';
                }, 800);
                return;
            }

            // Check if it's Dashboard Service Request or Settings form
            if (form.closest('.db-main, .db-content, .db-tab-pane')) {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"], .db-btn-primary');
                if (submitBtn) {
                    const origHtml = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
                    submitBtn.disabled = true;
                    setTimeout(() => {
                        window.location.href = '404.html';
                    }, 1000);
                }
            }
        });
    });

    // 5. Chat Bar and Quick Inputs Validation
    document.querySelectorAll('.chat-input-bar').forEach(chatBar => {
        const sendBtn = chatBar.querySelector('button.db-btn-primary, .chat-send-btn');
        const input = chatBar.querySelector('input[type="text"], textarea');

        if (sendBtn && input) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (input.value.trim() === '') {
                    setFieldError(input, 'Please type a message');
                    input.focus();
                    window.showToast('Please type a message before sending.', 'error');
                } else {
                    window.location.href = '404.html';
                }
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendBtn.click();
                }
            });
        }
    });

});
