document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const passwordInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirmPassword');
    const fullNameInput = document.getElementById('fullName');
    
    // Elementos de Feedback
    const emailError = document.getElementById('emailError');
    const confirmEmailError = document.getElementById('confirmEmailError');
    const passError = document.getElementById('passError');
    const confirmPassError = document.getElementById('confirmPassError');
    const nameError = document.getElementById('nameError');

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

    
    fullNameInput.addEventListener('input', (e) => {
        // Permite apenas letras e espaços
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    
    // Validação simples: verificar se tem pelo menos um espaço (nome e sobrenome)
        if (e.target.value.trim().split(' ').length < 2 && e.target.value.length > 0) {
            nameError.textContent = "Digite seu nome completo";
        } else {
            nameError.textContent = "";
        }
    checkForm();
    });

    function checkForm() {
        const emailValue = emailInput.value;
        const confirmEmailValue = confirmEmailInput.value;
        const passValue = passwordInput.value;
        const confirmPassValue = confirmPassInput.value;
        const nameValue = fullNameInput.value.trim();

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

        const nameOk = nameValue.split(' ').length >= 2 && nameValue.length > 3;

        const allFieldsFilled = [...form.querySelectorAll('input')].every(input => input.value.trim() !== '');

        // Habilitar botão apenas se TUDO estiver correto
        if (emailOk && emailsMatch && passLengthOk && passwordsMatch && nameOk && allFieldsFilled) {
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
            name: document.getElementById('fullName').value,
            token: "jwt_" + Math.random().toString(36).substring(2),
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('token', JSON.stringify(userSession));
        
        alert("Cadastro realizado com sucesso!");
        window.location.href = "home.html";
    });
});