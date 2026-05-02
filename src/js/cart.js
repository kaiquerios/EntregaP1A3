document.addEventListener('DOMContentLoaded', () => {
    

    const cartList = document.getElementById('cart-list');
    const totalVal = document.getElementById('total-val');
    const subtotalVal = document.getElementById('subtotal-val');

    // 2. Seleção dos itens 4 e 15 do db.js
    const indicesDesejados = [4, 15];
    const itensNoCarrinho = indicesDesejados.map(index => jogosDB[index]);

    function renderCart() {
        if (!cartList) return;

        let valorTotal = 0;
        cartList.innerHTML = '';

        itensNoCarrinho.forEach((jogo) => {
            valorTotal += jogo.preco;
            const precoFormatado = jogo.preco.toFixed(2).replace('.', ',');

            // Criando o card retangular
            const itemHtml = `
                <div class="cart-item">
                    <div class="item-img-placeholder">🎮</div>
                    <div class="item-details">
                        <div class="item-header">
                            <h3 class="item-name">${jogo.nome}</h3>
                            <span class="item-category">${jogo.categoria}</span>
                        </div>
                        <p class="item-meta">${jogo.empresa} | ${jogo.ano}</p>
                    </div>
                    <div class="item-price-area">
                        <p class="item-price">R$ ${precoFormatado}</p>
                        <button class="btn-remove-item" title="Remover item">🗑️</button>
                    </div>
                </div>
            `;
            cartList.innerHTML += itemHtml;
        });

        // Atualizando os valores do resumo
        const totalFinal = valorTotal.toFixed(2).replace('.', ',');
        totalVal.textContent = `R$ ${totalFinal}`;
        subtotalVal.textContent = `R$ ${totalFinal}`;
        
        
        const badgeCart = document.querySelector('.badge-cart');
        if(badgeCart) badgeCart.textContent = itensNoCarrinho.length;
    }

    const btnFinish = document.getElementById('btn-finish');
    if (btnFinish) {
        btnFinish.addEventListener('click', () => {
            alert('Compra finalizada com sucesso! Os jogos foram adicionados à sua biblioteca.');
            localStorage.removeItem('cartCount');
            window.location.href = 'library.html';
        });
    }

    renderCart();
});