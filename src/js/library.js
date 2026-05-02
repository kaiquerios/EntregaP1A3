
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. O SEGURANÇA DA ROTA (Route Guard)
    const token = localStorage.getItem('token');

    if (!token) {
        
        window.location.href = 'login.html';
        return; 
    }

    const libraryGrid = document.getElementById('library-grid');

    // Seleção específica conforme solicitado: índices 10, 13 e 18
    const indicesBiblioteca = [10, 13, 18];
    const meusJogos = indicesBiblioteca.map(index => jogosDB[index]);

    function renderLibrary() {
        if (!libraryGrid) return;

        libraryGrid.innerHTML = '';

        meusJogos.forEach(jogo => {
            const card = document.createElement('article');
            card.className = 'library-card';
            
            card.innerHTML = `
                <div class="library-media">🎮</div>
                <div class="library-info">
                    <h3 class="game-name">${jogo.nome}</h3>
                    <p class="game-meta">${jogo.categoria} | ${jogo.empresa}</p>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                    </div>
                </div>
                <div class="library-actions">
                    <button class="btn-play">Jogar</button>
                    <button class="btn-manage" title="Configurações">⚙️</button>
                </div>
            `;
            
            libraryGrid.appendChild(card);
        });
    }

    renderLibrary();
});