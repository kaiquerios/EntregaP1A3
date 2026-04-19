import React from 'react';
import './index.css';
import iconCLT from '../../../assets/imgs/icon_clt.png';

function Navbar() {

    const isAdmin = true;

    return(
    <nav className='navbar'>
        <div className='navbar-container'>
            
            <div className='navbar-logo' >
                <img src={iconCLT} alt="Icone CLT" />
                <span>CLT</span> Gaming
            </div>
            
    
        {/*No primeiro momento, essa barra deve sumir em mobile*/}
            <div className='search-bar'>
            <input type='text' placeholder='Buscar jogos...'/>
            <span className='search-icon'>{/*incluir icone*/}🔎</span>
            </div>

        {/*Menu de navegação*/}
            <div className='navbar-menu'>
            <a href='#loja' className='navbar-item active'>Loja</a>
            <a href='#biblioteca' className='navbar-item'>Biblioteca</a>
            <a href='#rankings' className='navbar-item'>Rankings</a>
            </div>

            </div>

            <div className='navbar-actions'>

                {/*Deve ser exibido apenas para conta com privilégio ADM*/}
                {isAdmin && (
                <a href='#painel' className='navbar-item admin'>Painel ADM</a>
                )}

                <div className='action-icon notification'>
                   🔔 <span className='badge-notification'>2</span>
                </div>

                <div className='action-icon cart'>
                   🛒 <span className='badge-cart'>3</span>
                </div>

                <div className='user-profile'>
                    <span className='user-avatar'>AR</span>
                </div>
            </div>
    
    </nav>
    );
}

export default Navbar;
