document.addEventListener('DOMContentLoaded', () => {
    const wishlistGrid = document.getElementById('wishlist-grid');

    // 1. Fazendo o recorte específico dos jogos nos índices 5, 8 e 12
    const indicesDesejados = [5, 8, 12];
    const jogosNaWishlist = indicesDesejados.map(index => jogosDB[index]);

    // 2. Função para renderizar os cards dinamicamente
    function renderWishlist() {
        if (!wishlistGrid) return;

        // Limpa o container antes de inserir
        wishlistGrid.innerHTML = '';

        jogosNaWishlist.forEach(jogo => {
            const precoFormatado = parseFloat(jogo.preco).toFixed(2).replace('.', ',');
            
            const card = document.createElement('article');
            card.className = 'wishlist-card';
            
            card.innerHTML = `
                <div class="wishlist-media">🎮</div>
                <div class="wishlist-info">
                    <h3 class="game-name">${jogo.nome}</h3>
                    <p class="game-meta">${jogo.categoria} | ${jogo.ano}</p>
                    <span class="game-price">R$ ${precoFormatado}</span>
                </div>
                <div class="wishlist-actions">
                    <button class="btn-move-to-cart">Mover para o carrinho</button>
                    <button class="btn-remove" title="Remover da lista">🗑️</button>
                </div>
            `;
            
            wishlistGrid.appendChild(card);
        });
    }

    renderWishlist();
});