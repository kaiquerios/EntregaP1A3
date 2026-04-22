const cartEl = document.getElementById('cart');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');

let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        id: 1,
        name: 'Produto 1',
        price: 29.99,
        quantity: 2,
        Image: 'https://cdn-icons-png.flaticon.com/512/2933/2933116.png'
    },
    {
        id: 2,
        name: 'Outro produto',
        price: 39.99,
        quantity: 2,
        Image: 'https://cdn-icons-png.flaticon.com/512/709/709496.png'
    }
];
    
function formatPrice(value) {
    return value.toLocaleString('pt-BR', { 
        style: 'currency',
        currency: 'BRL' 
     });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    cartEl.innerHTML = '';
    
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        el.classname = 'product';
        itemEl.innerHTML = `
            <img src="${item.Image}" alt="">
            <div class="product-info">
                <strong>${item.name}</strong>
                <span>${formatPrice(item.price)}</span>
                </div>
                <div class="product-actions">
                    <input type="number" min="1" value="${item.quantity}" data-id="${item.id}"
                    <button class="remove-btn" data-id="${item.id}">Remover</button>
                </div>
        `;
        cartEl.appendChild(itemEl);
    });

    updateTotals();
    saveCart();
}

function updateTotals() {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    subtotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(subtotal);
}

cartEl.addEventListener('input', e => {
    if (e.target.type === 'number') {
        const id = Number(e.target.dataset.id);
        const product = cart.find(p=> p.id === id);
        const quantity = Number(e.target.value);
        updateTotals();
        saveCart();
       }
    }
});

cartEl.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
        const id = Number(e.target.dataset.id);
        cart = cart.filter(item => item.id !== id);
        renderCart();
    }
});

renderCart();
