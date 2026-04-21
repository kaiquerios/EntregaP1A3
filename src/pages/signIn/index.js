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
