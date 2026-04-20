import React from 'react';
import './index.css';

function Footer(){
    return(
        <footer className='footer-container'>
            <div className='footer-content'>

                {/*Coluna 1 do rodapé*/}
                <div className='footer-brand'>
                    <h2 className='footer-logo'>CLT <span>Gaming</span></h2>
                    <p className='footer-description'>
                        Sua loja definitiva para aquela boa jogatina após um dia cansativo.
                    </p>
                </div>

                {/*Coluna 2 Links*/}
                <div className='footer-links'>
                    <h3>Links Rápidos</h3>
                    <ul>
                        <li><a href="#lançamentos">Lançamentos</a></li>
                        <li><a href="#ofertas">Ofertas</a></li>
                        <li><a href="#assinatura">Assinatura</a></li>
                        <li><a href="#suporte">Suporte</a></li>
                    </ul>
                </div>

                {/*Coluna 3: Institucional*/}
                <div className='footer-links'>
                    <h3>Institucional</h3>
                    <ul>
                        <li><a href="#sobre">Sobre nós</a></li>
                        <li><a href="#termos">Termos de serviço</a></li>
                        <li><a href="#privacidade">Política de privacidade</a></li>
                        <li><a href="#reembolso">Política de reembolso</a></li>
                    </ul>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>&copy; {new Date().getFullYear()} CLT Gaming. Todos os direitos reservados.</p>
                <div className='footer-socials'>
                    <span className='social-icon'>X</span>
                    <span className='social-icon'>IG</span>
                    <span className='social-icon'>DC</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;