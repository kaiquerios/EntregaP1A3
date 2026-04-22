document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const btnSubmit = document.getElementById('btnSubmit');
    
    const emailInput = document.getElementById('email');
    const birthInput = document.getElementById('birthDate');
    const nameInputs = [document.getElementById('firstName'), document.getElementById('lastName')];

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    };

    birthInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        let formatted = '';

        if (val.length > 0) {
            formatted = val.substring(0, 2);
            if (val.length > 2) formatted += '/' + val.substring(2, 4);
            if (val.length > 4) formatted += '/' + val.substring(4, 8);
        }
        e.target.value = formatted;
        checkValidity();
    });

    nameInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            checkValidity();
        });
    });

    function checkValidity() {
        const emailValid = validateEmail(emailInput.value);
        const dateComplete = birthInput.value.length === 10;
        const allFilled = [...form.querySelectorAll('input')].every(input => input.value.trim() !== '');

        if (emailValid && dateComplete && allFilled) {
            btnSubmit.disabled = false;
        } else {
            btnSubmit.disabled = true;
        }
    }

    form.addEventListener('input', checkValidity);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        const confirmEmail = document.getElementById('confirmEmail').value;

        if (emailInput.value !== confirmEmail) {
            alert("Os e-mails não coincidem!");
            return;
        }

        if (password !== confirmPass) {
            alert("As senhas não coincidem!");
            return;
        }

        alert("Cadastro realizado com sucesso!");
        console.log("Dados validados e prontos para o envio.");
    });
});