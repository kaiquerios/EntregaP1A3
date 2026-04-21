document.addEventListener('DOMContentLoaded', () => {

    const userArea = document.getElementById('user-area');
    const navNotif = document.getElementById('nav-notification');
    const navCart = document.getElementById('nav-cart');
    
    function renderUserArea() {
        const token = localStorage.getItem('token'); 

        if (token) {
            // CONTEXTO: LOGADO
            if(navNotif) navNotif.style.display = 'flex';
            if(navCart) navCart.style.display = 'flex';

            userArea.innerHTML = `
                <span class="user-avatar" id="avatar-btn">AR</span>
                <div class="user-dropdown" id="user-dropdown">
                    <div class="dropdown-header">
                        <p class="user-name">Alisson Rodrigo</p>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="#conta" class="dropdown-item">Editar conta</a>
                    <a href="#pagamento" class="dropdown-item">Métodos de pagamento</a>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item logout-btn" id="logout-btn">Finalizar sessão</button>
                </div>
            `;

            const avatarBtn = document.getElementById('avatar-btn');
            const userDropdown = document.getElementById('user-dropdown');
            const logoutBtn = document.getElementById('logout-btn');
            
            // Toggle do menu de usuário
            avatarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });

            // Lógica de Logout: limpa token e carrinho
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('token'); 
                localStorage.removeItem('cartCount'); 
                cartCount = 0;
                updateCartBadge();
                renderUserArea(); 
            });

        } else {
            // CONTEXTO: DESLOGADO
            if(navNotif) navNotif.style.display = 'none';
            if(navCart) navCart.style.display = 'none';

            userArea.innerHTML = `<a href="login.html" class="btn-login">Entrar</a>`;
        }
    }

    renderUserArea();

    // Fechar menu de usuário ao clicar fora
    document.addEventListener('click', (e) => {
        const userDropdown = document.getElementById('user-dropdown');
        if (userDropdown && userDropdown.classList.contains('active') && !userArea.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    /*MENU MOBILE*/
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navbarMenu = document.getElementById('navbar-menu');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            mobileBtn.textContent = navbarMenu.classList.contains('active') ? '✖' : '☰';
        });
    }

    /*LÓGICA DO CARROSSEL*/
    
    // Seleciona os 5 primeiros jogos do banco de dados para o destaque
    const destaqueGames = typeof jogosDB !== 'undefined' ? jogosDB.slice(0, 5) : [];

    let currentSlide = 0;
    const bannerTitulo = document.getElementById('banner-titulo');
    const bannerEmpresa = document.getElementById('banner-empresa');
    const bannerCategoria = document.getElementById('banner-categoria');
    const bannerAno = document.getElementById('banner-ano');
    const bannerDescricao = document.getElementById('banner-descricao');
    const bannerPreco = document.getElementById('banner-preco');
    const dotsContainer = document.getElementById('banner-dots-container');

    if (dotsContainer && destaqueGames.length > 0) {
        dotsContainer.innerHTML = ''; // Limpa indicadores estáticos

        destaqueGames.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => updateBanner(index));
            dotsContainer.appendChild(dot);
        });

        function updateBanner(index) {
            currentSlide = index;
            const game = destaqueGames[index];
            
            bannerTitulo.textContent = game.nome;
            bannerEmpresa.textContent = game.empresa;
            bannerCategoria.textContent = game.categoria;
            bannerAno.textContent = game.ano;
            bannerDescricao.textContent = game.descricao;
            
            // Formatação de moeda para o padrão brasileiro
            const precoFormatado = parseFloat(game.preco).toFixed(2).replace('.', ',');
            bannerPreco.textContent = `R$ ${precoFormatado}`;

            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        updateBanner(0);

        setInterval(() => {
            let nextSlide = (currentSlide + 1) % destaqueGames.length;
            updateBanner(nextSlide);
        }, 4000); 
    }

    /*GESTÃO DO CARRINHO*/
    
    const btnCart = document.querySelector('.btn-cart'); 
    const badgeCart = document.querySelector('.badge-cart');
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

    function updateCartBadge() {
        if (badgeCart) {
            badgeCart.textContent = cartCount;
        }
    }

    updateCartBadge();

    if (btnCart) {
        btnCart.addEventListener('click', () => {
            const token = localStorage.getItem('token');

            // Redireciona para login se não estiver logado
            if (!token) {
                window.location.href = 'login.html';
                return;
            }

            // Se logado, adiciona ao carrinho
            cartCount++; 
            localStorage.setItem('cartCount', cartCount); 
            updateCartBadge(); 

            // Feedback visual no botão
            const textoOriginal = btnCart.textContent; 
            btnCart.textContent = '✓ Adicionado!';
            btnCart.style.backgroundColor = '#28a745';
            btnCart.style.color = '#fff';

            setTimeout(() => {
                btnCart.textContent = textoOriginal;
                btnCart.style.backgroundColor = '';
                btnCart.style.color = '';
            }, 1500);
        });
    }
});