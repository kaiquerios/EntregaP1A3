import React, { useState } from "react";
import './index.css';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
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

    const handleDateChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        let formattedVal = '';

        if (val.length > 0) {
            let day = parseInt(val.substring(0, 2));
            if (day > 31) val = '31' + val.substring(2);

            formattedVal = val.substring(0, 2);
            if (val.length >2) {
                let month = parseInt(val.substring(2, 4));
                if (month > 12) val = val.substring(0, 2) + '12' + val.substring(4);

                formattedVal += '/' + val.substring(2, 4);
            }

            if (val.length > 4) {
                formattedVal += '/' + val.substring(4, 8);
            }
        }

        setFormData(prev => ({ ...prev, birthDate: formattedVal.substring(0, 10)}));
    };

    

    const handleSubmt = (e) => {
        e.preventDefault();

        const dateParts = formData.birthDate.split('/');

        if (dateParts.length !==3) {
            alert("Por favor, preencha a data de nascimento completa.");
            return;
        }

        const isoDate = '${dateParts[2]}-${dateParts[1]}-${dateParts[0]}';

        const dataParaEnviar = {
            ...formData, birthDate: isoDate
        };

        console.log("Dados prontos para o Banco de Dados:", dataParaEnviar);

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
        !formData.firstName ||
        !formData.lastName || 
        !formData.birthDate ||
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

                    <div className="form-row">
                        <div className="form-field">
                            <label>Nome</label>
                            <input type="text" name="firstName" placeholder="Ex: Chris" onChange={handleChange} />
                        </div>

                        <div className="form-field">
                            <label>Sobrenome</label>
                            <input type="text" name="lastName" placeholder="Ex: Redfield" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-field">
                            <label>Data de Nascimento</label>
                            <input type="text" name="birthDate" placeholder="DD/MM/AAAA" value={formData.birthDate} onChange={handleChange} maxLength="10" className="input-date" />
                        </div>

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