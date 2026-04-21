import React, { useState } from 'react';
import './index.css';

function SignIn() {
    /*estados para armazenar os dados do formulário*/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

     /*função que lida com o envio do formulário*/
    const handleSubmit = (e) => {
        e.preventDefault(); //impede a página de recarregar
//validação simples
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
         /*aqui entraria a lógica de integração com o Backend (API)*/
        console.log('Tentando login com:', { email, password });

                setError(''); //limpa erros se tudo estiver ok
        alert('Login realizado com sucesso! (Simulação)');
    };

     return (
        <div className='signin-container'>
            <form className='signin-form' onSubmit={handleSubmit}>
                <h2>Entrar na <span className='logo-text'>CLT Gaming</span></h2>
                
                {/*exibição de mensagem de erro, se houver */}
                {error && <p className='error-message'>{error}</p>}

                <div className='form-group'>
                    <label htmlFor='email'>E-mail</label>
                    <input 
                        type='email' 
                        id='email'
                        placeholder='seu@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Senha</label>
                    <input 
                        type='password' 
                        id='password'
                        placeholder='Sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type='submit' className='btn-signin'>
                    Entrar
                </button>

                <div className='signin-footer'>
                    <span>Não tem uma conta? <a href='#signup'>Cadastre-se</a></span>
                </div>
            </form>
        </div>
    );
}

export default SignIn;

        

