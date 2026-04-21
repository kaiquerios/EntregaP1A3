import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import iconCLT from '../../../assets/img/icon_clt.png';

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('loja');
    
     // Recolhimento dos dados brutos e verificação de ADM
    const processToken = useCallback((token) => {
        try {
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            
            setUser({ nome: decodedPayload.nome, perfil: decodedPayload.perfil });
            setIsLoggedIn(true);
            setIsAdmin(decodedPayload.perfil === 'Administrador' || decodedPayload.perfil === 'Admin');
        } catch (error) {
            console.error("Erro ao ler o token", error);
            handleLogout();
        }
    }, []);

    // Verifica se já existe um token ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            processToken(token);
        }
    }, [processToken]);

    // Função que verifica clique para fechar o menu flutuante
    useEffect(() => {
        
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    // Apagar token
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false);
        setIsMenuOpen(false);
        
        //implementar lógica utilizando useNavigate
        window.location.href = '/';
    };

    //Recolher iniciais para inserir no avatar
    const getInitials = (fullName) => {
        if (!fullName) return "";
        const parts = fullName.trim().split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    };

    return(
    <nav className='navbar'>
        <div className='navbar-container'>

            <div className='mobile-menu-icon' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? '✖' : '☰'}
            </div>
            
            <div className='navbar-logo'>
                <img src={iconCLT} alt="Icone CLT" />
                <span>CLT</span> Gaming
            </div>
            
    
        {/*No primeiro momento, essa barra deve sumir em mobile*/}
            <div className='search-bar'>
                <input type='text' placeholder='Buscar jogos...'/>
                <span className='search-icon'>{/*incluir icone*/}🔎</span>
            </div>

        {/*Menu de navegação*/}
            <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <a href='#loja' 
                className={`navbar-item ${activeTab === 'loja' ? 'active' : ''}`} 
                onClick={() => {setActiveTab('loja'); setIsMobileMenuOpen(false)}}>Loja</a>

                <a href='#biblioteca' 
                className={`navbar-item ${activeTab === 'biblioteca' ? 'active' : ''}`} 
                onClick={() => {setActiveTab('biblioteca'); setIsMobileMenuOpen(false)}}>Biblioteca</a>

                <a href='#rankings' 
                className={`navbar-item ${activeTab === 'rankings' ? 'active' : ''}`} 
                onClick={() => {setActiveTab('rankings'); setIsMobileMenuOpen(false)}}>Rankings</a>
            </div>

        </div>

            <div className='navbar-actions'>
                {isLoggedIn ? (
                    <>
                        {isAdmin && (
                            <a href='#painel' className='navbar-item admin'>Painel ADM</a>
                        )}

                        <div className='action-icon notification'>
                           🔔 <span className='badge-notification'>0</span>
                        </div>

                        <div className='action-icon cart'>
                           🛒 <span className='badge-cart'>0</span>
                        </div>

                        <div className='user-profile' ref={menuRef}>
                            <span 
                                className='user-avatar' 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {getInitials(user?.nome)}
                            </span>
                            
                            {isMenuOpen && (
                                <div className='user-dropdown'>
                                    <div className='dropdown-header'>
                                        <p className='user-name'>{user?.nome}</p>
                                        {isAdmin && <p className='user-role'>{user?.perfil}</p>}
                                    </div>
                                    <div className='dropdown-divider'></div>
                                    <a href="#conta" className='dropdown-item'>Editar conta</a>
                                    <a href="#pagamento" className='dropdown-item'>Métodos de pagamento</a>
                                    <div className='dropdown-divider'></div>
                                    <button onClick={handleLogout} className='dropdown-item logout-btn'>Finalizar sessão</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Agora é apenas um link/botão que redireciona para a página do seu colega */
                    <a href="/login" className='btn-login' style={{ textDecoration: 'none' }}>
                        Entrar
                    </a>
                )}
            </div>
        </nav>
    );
}

export default Navbar;