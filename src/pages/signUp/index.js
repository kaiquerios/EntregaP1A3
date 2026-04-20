import React, { useState } from "react";
import './index.css';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        genre: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmt = (e) => {
        e.preventDefault();

        if (formData.email !== formData.confirmEmail) {
            alert("Os e-mails não coincidem!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        console.log("Formulário válido! Envando dados...", formData);
        alert("Cadastro realizado com sucesso!");
        
    };

    const isFormInvalid = 
        !formData.username || 
        !formData.email || 
        !formData.confirmEmail || 
        !formData.password || 
        !formData.confirmPassword;
        
    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <form className="auth-form" onSubmit={handleSubmt}>
                    <h2>Criar Conta</h2>

                    <div className="form-field">
                        <label>Nickname</label>
                        <input type="text" name="username" required onChange={handleChange} />

                        <div className="form-field">
                            <label>E-mail</label>
                            <input type="email" name="email" required onChange={handleChange} />

                            <div className="form-field">
                                <label>Confirmar E-mail</label>
                                <input type="email" name="confirmEmal" required onChange={handleChange} />

                                <div className="form-field">
                                    <label>Senha</label>
                                    <input type="password" name="password" required onChange={handleChange} />

                                    <div className="form-field">
                                        <label>Confirmar Senha</label>
                                        <input type="password" name="confirmPassword" required onChange={handleChange} />

                                        <button type="submit" className="btn-primary" disabled={isFormInvalid}>Finalizar Cadastro</button>

                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )    
    
}

export default SignUp