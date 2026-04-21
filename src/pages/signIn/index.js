import React, { useState } from 'react';
import './index.css';

function SignIn() {
    {/*estados para armazenar os dados do formulário*/}
    const [email, setEmail,] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

{/função que lida com o envio do furmulário*/}
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede a página de recarregar
}
{/*validação simples*/}
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        // aqui entraria a lógica de integração com o Backend (API)
        console.log('Tentando login com:', { email, password });
        
        setError(''); // Limpa erros se tudo estiver ok
        alert('Login realizado com sucesso! (Simulação)');
    };
}

export default SignIn;
