document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const birthInput = document.getElementById('birthDate');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const passwordInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirmPassword');
    const nameInputs = [document.getElementById('firstName'), document.getElementById('lastName')];
    
    // Elementos de Feedback
    const emailError = document.getElementById('emailError');
    const confirmEmailError = document.getElementById('confirmEmailError');
    const passError = document.getElementById('passError');
    const confirmPassError = document.getElementById('confirmPassError');

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

    // Máscara de Data (Lógica Original Mantida)
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
            if (val.length > 4) formatted += '/' + val.substring(4, 8);
        }
        e.target.value = formatted;
        checkForm();
    });

    // Sanitização de Nomes
    nameInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            checkForm();
        });
    });

    function checkForm() {
        const emailValue = emailInput.value;
        const confirmEmailValue = confirmEmailInput.value;
        const passValue = passwordInput.value;
        const confirmPassValue = confirmPassInput.value;

        // 1. Validação de Formato de E-mail
        const emailOk = isEmailValid(emailValue);
        if (emailValue.length > 0 && !emailOk) {
            emailError.textContent = "E-mail inválido";
            emailInput.classList.add('input-error');
        } else {
            emailError.textContent = "";
            emailInput.classList.remove('input-error');
        }

        // 2. Comparação de E-mails 
        const emailsMatch = emailValue === confirmEmailValue && confirmEmailValue !== '';
        if (confirmEmailValue.length > 0 && !emailsMatch) {
            confirmEmailError.textContent = "Os e-mails não coincidem";
            confirmEmailInput.classList.add('input-error');
        } else {
            confirmEmailError.textContent = "";
            confirmEmailInput.classList.remove('input-error');
        }

        // 3. Mínimo de 8 caracteres na Senha
        const passLengthOk = passValue.length >= 8;
        if (passValue.length > 0 && !passLengthOk) {
            passError.textContent = "Mínimo de 8 caracteres";
            passwordInput.classList.add('input-error');
        } else {
            passError.textContent = "";
            passwordInput.classList.remove('input-error');
        }

        // 4. Comparação de Senhas
        const passwordsMatch = passValue === confirmPassValue && confirmPassValue !== '';
        if (confirmPassValue.length > 0 && !passwordsMatch) {
            confirmPassError.textContent = "As senhas não coincidem";
            confirmPassInput.classList.add('input-error');
        } else {
            confirmPassError.textContent = "";
            confirmPassInput.classList.remove('input-error');
        }

        const dateOk = isDateReal(birthInput.value);
        const allFieldsFilled = [...form.querySelectorAll('input')].every(input => input.value.trim() !== '');

        // Habilitar botão apenas se TUDO estiver correto
        if (emailOk && emailsMatch && dateOk && passLengthOk && passwordsMatch && allFieldsFilled) {
            btnSubmit.disabled = false;
        } else {
            btnSubmit.disabled = true;
        }
    }

    form.addEventListener('input', checkForm);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de Token para Login
        const userSession = {
            name: document.getElementById('firstName').value,
            token: "jwt_" + Math.random().toString(36).substring(2),
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('token', JSON.stringify(userSession));
        
        alert("Cadastro realizado com sucesso!");
        window.location.href = "home.html";
    });
});