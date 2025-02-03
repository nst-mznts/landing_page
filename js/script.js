const MODAL_WINDOW = document.querySelector('#modal-wrapper');
const BUTTONS = document.querySelectorAll('button[data-open]');
const BURGER = document.querySelector('#burger');
const HEADER = document.querySelector('.header');
const LOGO = document.querySelector('#header__logo');
const MOBILE_MENU = document.querySelector('#bg-for-mobile');
const FORM_WRAPPER = document.querySelector('.form-wrapper');
const FORM = document.querySelector('#form');
const FORM_INPUTS = document.querySelectorAll('input');
const NAME_INPUT = document.querySelector('#name');
const EMAIL_INPUT = document.querySelector('#email');
const PHONE_INPUT = document.querySelector('#phone');
const FORM_ERROR = document.querySelector('#form-error');
const FORM_BUTTON = FORM.querySelector('button[type="submit"]');
const THANK_WRAPPER = document.querySelector('.thank-block-wrapper');

function toggleClass(element, className, add) {
    if (add) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
};

function toggleModal(element, show) {
    toggleClass(element, 'hidden', !show);
};

function toggleMobileMenu(open) {
    toggleClass(BURGER, 'burger_active', open);
    toggleClass(HEADER, 'hidden', open);
    toggleClass(LOGO, 'hidden', open);
    toggleClass(MOBILE_MENU, 'hidden', !open);
};

function validateField(input, errorElement) {
    const isValid = input.value.trim() !== '';
    toggleClass(errorElement, 'hidden', isValid);
    toggleClass(input, 'invalid', !isValid);
    toggleClass(FORM_ERROR, 'hidden', isValid);
    return isValid;
}

function checkFormValidity() {
    const isFormValid =
        validateField(NAME_INPUT, document.querySelector('#name-error')) &&
        validateField(EMAIL_INPUT, document.querySelector('#email-error')) &&
        validateField(PHONE_INPUT, document.querySelector('#phone-error'));

    toggleClass(FORM_BUTTON, 'disabled', !isFormValid);
};

function formatPhoneNumber(input) {
    const numbers = input.value.replace(/\D/g, '');
    if (!numbers) return '';

    let formatted = numbers;
    if (numbers[0] === '9') {
        formatted = '7' + numbers;
    }
    if (numbers[0] === '7' || numbers[0] === '8') {
        formatted = numbers[0] === '8' ? '8 ' : '+7 ';
        formatted += numbers.slice(1, 4);
        if (numbers.length > 4) formatted += ' ' + numbers.slice(4, 7);
        if (numbers.length > 7) formatted += ' ' + numbers.slice(7, 9);
        if (numbers.length > 9) formatted += ' ' + numbers.slice(9, 11);
    } else {
        formatted = '+' + numbers.slice(0, 16);
    }
    return formatted;
};

function cleanForm() {
    FORM_INPUTS.forEach(input => {
        input.value = '';
        toggleClass(input, 'invalid', false);
    });
    toggleClass(document.querySelector('#name-error'), 'hidden', true);
    toggleClass(document.querySelector('#email-error'), 'hidden', true);
    toggleClass(document.querySelector('#phone-error'), 'hidden', true);
    toggleClass(FORM_ERROR, 'hidden', true);
};

function initEventListeners() {

    window.addEventListener('load', () => {
        setTimeout(() => toggleModal(MODAL_WINDOW, true), 5000);
    });

    MODAL_WINDOW.addEventListener('click', (event) => {
        if (event.target.dataset.close === 'true') {
            toggleModal(MODAL_WINDOW, false);
        }
    });

    FORM_WRAPPER.addEventListener('click', (event) => {
        if (event.target.dataset.close === 'true') {
            toggleModal(FORM_WRAPPER, false);
            cleanForm();
        }
    });

    BUTTONS.forEach(button => {
        button.addEventListener('click', () => {
            toggleModal(FORM_WRAPPER, true);
            if (BURGER.classList.contains('burger_active')) {
                toggleMobileMenu(false);
            }
        });
    });

    THANK_WRAPPER.addEventListener('click', (event) => {
        if (event.target.dataset.close === 'true' || event.target.id === 'thank-block-button') {
            toggleModal(THANK_WRAPPER, false);
        }
    });

    BURGER.addEventListener('click', () => {
        const isActive = BURGER.classList.contains('burger_active');
        toggleMobileMenu(!isActive);
    });

    NAME_INPUT.addEventListener('input', () => {
        validateField(NAME_INPUT, document.querySelector('#name-error'));
        checkFormValidity();
    });

    EMAIL_INPUT.addEventListener('input', () => {
        validateField(EMAIL_INPUT, document.querySelector('#email-error'));
        checkFormValidity();
    });

    PHONE_INPUT.addEventListener('input', (event) => {
        PHONE_INPUT.value = formatPhoneNumber(PHONE_INPUT);
        validateField(PHONE_INPUT, document.querySelector('#phone-error'));
        checkFormValidity();
    });

    FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        toggleModal(FORM_WRAPPER, false);
        toggleModal(THANK_WRAPPER, true);
    });
};

initEventListeners();
