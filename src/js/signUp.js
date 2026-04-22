document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const birthInput = document.getElementById('birthDate');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const passwordInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirmPassword');
    const nameInputs = [document.getElementById('firstName'), document.getElementById('lastName')];

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    const isDateReal = (dateStr) => {
        if (dateStr.length !== 10) return false;
        const [day, month, year] = dateStr.split('/').map(Number);
        const dateObj = new Date(year, month - 1, day);
        return dateObj.getFullYear() === year && 
               dateObj.getMonth() === month - 1 && 
               dateObj.getDate() === day &&
               year > 1900 && year <= new Date().getFullYear();
    };

    birthInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        let formatted = '';

        if (val.length > 0) {
            let day = val.substring(0, 2);
            if (day.length === 2 && parseInt(day) > 31) day = '31';
            if (day.length === 2 && parseInt(day) === 0) day = '01';
            formatted = day;

            if (val.length > 2) {
                let month = val.substring(2, 4);
                if (month.length === 2 && parseInt(month) > 12) month = '12';
                if (month.length === 2 && parseInt(month) === 0) month = '01';
                formatted += '/' + month;
            }

            if (val.length > 4) {
                formatted += '/' + val.substring(4, 8);
            }
        }
        e.target.value = formatted;
        checkForm();
    });

    nameInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            checkForm();
        });
    });

    function checkForm() {
        const emailOk = isEmailValid(emailInput.value);
        const dateOk = isDateReal(birthInput.value); 
        const passwordsMatch = passwordInput.value === confirmPassInput.value && passwordInput.value !== '';
        const emailsMatch = emailInput.value === confirmEmailInput.value && emailInput.value !== '';
        const allFieldsFilled = [...form.querySelectorAll('input')].every(input => input.value.trim() !== '');

        if (emailOk && dateOk && passwordsMatch && emailsMatch && allFieldsFilled) {
            btnSubmit.disabled = false;
            btnSubmit.style.opacity = "1";
            btnSubmit.style.cursor = "pointer";
        } else {
            btnSubmit.disabled = true;
            btnSubmit.style.opacity = "0.5";
            btnSubmit.style.cursor = "not-allowed";
        }
    }

    form.addEventListener('input', checkForm);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Cadastro realizado com sucesso!");
        console.log("Dados prontos:", Object.fromEntries(new FormData(form)));
    });
});