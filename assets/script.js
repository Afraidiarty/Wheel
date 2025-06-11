document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));

            this.classList.add('active');

            const tabType = this.getAttribute('data-tab');
            const phoneInput = document.getElementById('phone');

            if (tabType === 'email') {
                phoneInput.type = 'email';
                document.querySelector('label[for="phone"]').textContent = 'Email';
            } else {
                phoneInput.type = 'tel';
                document.querySelector('label[for="phone"]').textContent = 'Telefon raqami';
            }
        });
    });

    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeOpenIcon = document.querySelector('.eye-open');
    const eyeClosedIcon = document.querySelector('.eye-closed');

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        if (type === 'password') {
            eyeOpenIcon.style.display = 'block';
            eyeClosedIcon.style.display = 'none';
        } else {
            eyeOpenIcon.style.display = 'none';
            eyeClosedIcon.style.display = 'block';
        }

        this.classList.add('active');

        setTimeout(() => {
            this.classList.remove('active');
        }, 300);
    });

    const form = document.getElementById('registration-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const phone = document.getElementById('phone');
        const password = passwordInput;
        const terms = document.getElementById('terms');

        resetErrorStates([phone, password, terms]);

        let isValid = true;

        if (!phone.value.trim()) {
            showError(phone, 'This field is required');
            isValid = false;
        }

        if (!password.value.trim()) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!terms.checked) {
            showError(terms, 'You must accept the terms');
            isValid = false;
        }

        if (!isValid) {
            return;
        }


        showSuccessMessage();
        form.reset();
    });

    function showError(element, message) {
        const formGroup = element.closest('.form-group');

        if (!formGroup.querySelector('.error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#ff3333';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
        }

        if (element.type === 'checkbox') {
            const customCheckbox = formGroup.querySelector('.checkbox-custom');
            customCheckbox.style.borderColor = '#ff3333';
        } else {
            element.style.borderColor = '#ff3333';
        }
    }

    function resetErrorStates(elements) {
        elements.forEach(element => {
            const formGroup = element.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');

            if (errorMessage) {
                formGroup.removeChild(errorMessage);
            }

            if (element.type === 'checkbox') {
                const customCheckbox = formGroup.querySelector('.checkbox-custom');
                customCheckbox.style.borderColor = '#2e2843';
            } else {
                element.style.borderColor = '#2e2843';
            }
        });
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.backgroundColor = 'rgba(0, 128, 0, 0.1)';
        successMessage.style.color = '#00ff00';
        successMessage.style.padding = '10px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '10px';
        successMessage.style.textAlign = 'center';
        successMessage.textContent = 'Registration successful!';

        form.appendChild(successMessage);

        setTimeout(() => {
            form.removeChild(successMessage);
        }, 3000);
    }

    const bonusText = document.querySelector('.bonus-text');

    setInterval(() => {
        bonusText.style.textShadow = '0 0 10px rgba(110, 69, 255, 0.7)';

        setTimeout(() => {
            bonusText.style.textShadow = 'none';
        }, 500);
    }, 2000);

    function handleResponsiveAdjustments() {
        const windowWidth = window.innerWidth;
        const bonusTextH3 = document.querySelector('.bonus-text h3');

        if (windowWidth <= 768) {
            bonusTextH3.style.marginLeft = '0';
        } else if (windowWidth <= 992) {
            bonusTextH3.style.marginLeft = '80px';
        } else if (windowWidth <= 1200) {
            bonusTextH3.style.marginLeft = '100px';
        } else if (windowWidth <= 1400) {
            bonusTextH3.style.marginLeft = '120px';
        } else {
            bonusTextH3.style.marginLeft = '140px';
        }
    }

    handleResponsiveAdjustments();

    window.addEventListener('resize', handleResponsiveAdjustments);
});


document.addEventListener('DOMContentLoaded', () => {
    const currencySelector = document.getElementById('currencySelector');
    const currentCurrency = document.getElementById('currentCurrency');
    const currencyInput = document.getElementById('currencyInput');
    const dropdownOptions = document.querySelectorAll('.dropdown-option');
    const currencyForm = document.getElementById('currencyForm');


    function toggleDropdown() {
        currencySelector.classList.toggle('active');
    }

    function closeDropdown() {
        currencySelector.classList.remove('active');
    }


    function selectCurrency(currency) {
        currentCurrency.textContent = currency;
        currencyInput.value = currency;
        closeDropdown();

        console.log(`Currency changed to: ${currency}`);
    }

    currencySelector.addEventListener('click', (e) => {
        toggleDropdown();
    });

    currencySelector.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
        } else if (e.key === 'Escape') {
            closeDropdown();
        } else if (e.key === 'Tab' && currencySelector.classList.contains('active')) {
            closeDropdown();
        }
    });

    dropdownOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const currency = option.getAttribute('data-value');
            selectCurrency(currency);
        });

        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const currency = option.getAttribute('data-value');
                selectCurrency(currency);
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!currencySelector.contains(e.target)) {
            closeDropdown();
        }
    });

    currencyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(`Form would submit with currency: ${currencyInput.value}`);
    });
});