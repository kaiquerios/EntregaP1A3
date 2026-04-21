document.addEventListener('DOMContentLoaded', () => {

    const isLogged = false; 
    const userArea = document.getElementById('user-area');

    if (isLogged) {
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
                <button class="dropdown-item logout-btn">Finalizar sessão</button>
            </div>
        `;

        // Toggle do menu de usuário
        const avatarBtn = document.getElementById('avatar-btn');
        const userDropdown = document.getElementById('user-dropdown');
        
        avatarBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita fechar imediatamente
            userDropdown.classList.toggle('active');
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!userArea.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    } else {
        userArea.innerHTML = `<a href="#login" class="btn-login">Entrar</a>`;
    }

    /*MENU MOBILE */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navbarMenu = document.getElementById('navbar-menu');

    mobileBtn.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileBtn.textContent = navbarMenu.classList.contains('active') ? '✖' : '☰';
    });


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

    // Inicializa os pontos do carrossel
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

});