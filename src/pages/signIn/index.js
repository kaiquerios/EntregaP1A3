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
        {/*aqui entraria a lógica de integração com o Backend (API)*/}
        console.log('Tentando login com:', { email, password });
        
        setError(''); // Limpa erros se tudo estiver ok
        alert('Login realizado com sucesso! (Simulação)');
    };
    return (
        <div className='signin-container'>
            <form className='signin-form' onSubmit={handleSubmit}>
                <h2>Entrar na <span className='logo-text'>CLT Gaming</span></h2>
                
                {/*exibição de mensagem de erro, se houver*/}
                {error && <p className='error-message'>{error}</p>}

}

export default SignIn;
