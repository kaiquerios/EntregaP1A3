document.addEventListener('DOMContentLoaded', () => {
    
    // Mapeando os elementos do DOM
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Escutando o evento de "submit"
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validação simples
        if (!email || !password) {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            errorMessage.style.display = 'block'; // Mostra a caixa de erro
            return;
       //Se passou pela validação, esconde a mensagem de erro//
        e }

        /errorMessage.style.display = 'none';/
        
        console.log('Tentando login com:', { email, password });
        
        alert('Login realizado com sucesso! (Simulação)');
        
    
        localStorage.setItem('token', 'tokenabc');
        window.location.href = 'home.html'; 
        
    });
});