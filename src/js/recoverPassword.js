document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.querySelector('.signin-form');
    const emailInput = document.getElementById('recovery-email');
    const btnSubmit = document.querySelector('.btn-signin');

    recoveryForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar

        const email = emailInput.value.trim();

        if (email === "") {
            alert("Por favor, digite seu e-mail.");
            return;
        }

        // Simulação de carregamento (Efeito Gamer)
        btnSubmit.innerText = "Buscando usuário...";
        btnSubmit.style.opacity = "0.7";
        btnSubmit.disabled = true;

        setTimeout(() => {
            // Mensagem final de sucesso
            recoveryForm.innerHTML = `
                <h2>Sucesso! <span class="logo-text">Check seu E-mail</span></h2>
                <p style="text-align: center; color: var(--text-muted);">
                    Se o e-mail <strong>${email}</strong> estiver cadastrado, você receberá as instruções em instantes.
                </p>
                <div class="signin-footer">
                    <a href="login.html">Voltar ao Início</a>
                </div>
            `;
        }, 2000); // 2 segundos de simulação
    });
});