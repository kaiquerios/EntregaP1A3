import React, { useState } from 'react';
import './index.css';

function SignIn() {
    /*estados para armazenar os dados do formulário*/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
