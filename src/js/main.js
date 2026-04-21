document.addEventListener('DOMContentLoaded', () => {

    const userArea = document.getElementById('user-area');

    // 1. Função dinâmica que verifica o login e atualiza a tela
    function renderUserArea() {
        // Verifica no navegador se o passaporte (token) existe
        const token = localStorage.getItem('token'); 

        if (token) {
            // CONTEXTO: LOGADO
            userArea.innerHTML = `
                <span class="user-avatar" id="avatar-btn">AR</span>
                <div class="user-dropdown" id="user-dropdown">
                    <div class="dropdown-header">
                        <p class="user-name">Alisson Rodrigo</p>
                        <p class="user-role">Administrador</p>
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
                e.stopPropagation(); // Evita fechar imediatamente
                userDropdown.classList.toggle('active');
            });

            // LÓGICA DE LOGOUT
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('token'); // Apaga o token
                localStorage.removeItem('cartCount'); //Apaga a contagem do carrinho
                cartCount = 0;
                updateCartBadge();
                renderUserArea(); // Renderiza a área de novo (agora sem token)
            });

        } else {
            // CONTEXTO: DESLOGADO
            userArea.innerHTML = `<a href="login.html" class="btn-login">Entrar</a>`;
        }
    }

    renderUserArea();

    // Fechar ao clicar fora do menu de usuário (Global)
    document.addEventListener('click', (e) => {
        const userDropdown = document.getElementById('user-dropdown');
        // Se o menu existir, estiver ativo e o clique for de fora, ele fecha
        if (userDropdown && userDropdown.classList.contains('active') && !userArea.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    /*MENU MOBILE */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navbarMenu = document.getElementById('navbar-menu');

    // Boa prática: Verificar se os elementos existem antes de adicionar o evento
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            mobileBtn.textContent = navbarMenu.classList.contains('active') ? '✖' : '☰';
        });
    }

    /* LÓGICA DO CARROSSEL*/
    const mockGames = [
        { nome: "Cyber Hunter 2077", empresa: "NexoGames", categoria: "RPG", ano: "2025", preco: "299,90", descricao: "Explore uma metrópole futurista com gráficos de tirar o fôlego." },
        { nome: "Medieval Warfare II", empresa: "CastleStudio", categoria: "Ação", ano: "2026", preco: "199,50", descricao: "Lidere seus exércitos em batalhas medievais épicas." },
        { nome: "Space Explorer VR", empresa: "GalaxyTech", categoria: "Simulação", ano: "2024", preco: "150,00", descricao: "Viaje pelo cosmos em uma simulação realista de realidade virtual." }
    ];

    let currentSlide = 0;
    const bannerTitulo = document.getElementById('banner-titulo');
    const bannerEmpresa = document.getElementById('banner-empresa');
    const bannerCategoria = document.getElementById('banner-categoria');
    const bannerAno = document.getElementById('banner-ano');
    const bannerDescricao = document.getElementById('banner-descricao');
    const bannerPreco = document.getElementById('banner-preco');
    const dotsContainer = document.getElementById('banner-dots-container');

    // Inicializa os pontos do carrossel (Verificando se o container existe na página)
    if (dotsContainer) {
        mockGames.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => updateBanner(index));
            dotsContainer.appendChild(dot);
        });

        function updateBanner(index) {
            currentSlide = index;
            const game = mockGames[index];
            
            bannerTitulo.textContent = game.nome;
            bannerEmpresa.textContent = game.empresa;
            bannerCategoria.textContent = game.categoria;
            bannerAno.textContent = game.ano;
            bannerDescricao.textContent = game.descricao;
            bannerPreco.textContent = `R$ ${game.preco}`;

            // Atualiza as bolinhas (dots)
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Carrega o primeiro jogo
        updateBanner(0);

        // Carrossel Automático
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % mockGames.length;
            updateBanner(nextSlide);
        }, 4000); // Roda a cada 4 segundos
    }

    /*NUMERAÇÃO DO CARRINHO*/
    
    // 1. Mapeamos os elementos
    const btnCart = document.querySelector('.btn-cart'); 
    const badgeCart = document.querySelector('.badge-cart');

    // 2. Buscamos se já existe algo no carrinho salvo no navegador
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

    // 3. Função para atualizar a bolinha visual na Navbar
    function updateCartBadge() {
        if (badgeCart) {
            badgeCart.textContent = cartCount;
        }
    }

    // Chama a função logo que a página carrega para mostrar o número correto
    updateCartBadge();

    // 4. O evento de clique no botão do banner
    if (btnCart && badgeCart) {
        btnCart.addEventListener('click', () => {

            const token = localStorage.getItem('token');

            if (!token) {
                window.location.href = 'login.html';
                return; 
            }
            // Incrementa o número
            cartCount++; 
            localStorage.setItem('cartCount', cartCount); 
            updateCartBadge(); 

            const textoOriginal = btnCart.textContent; 
            
            btnCart.textContent = '✓ Adicionado!';
            btnCart.style.backgroundColor = '#28a745'; // Fundo verde
            btnCart.style.color = '#fff';
            btnCart.style.transform = 'scale(0.95)'; // Efeito de "aperto"

            // lógica para o botão voltar ao normal
            setTimeout(() => {
                btnCart.textContent = textoOriginal;
                btnCart.style.backgroundColor = ''; // Remove o estilo inline (volta pro CSS)
                btnCart.style.color = '';
                btnCart.style.transform = '';
            }, 1500);
        });
    }
});