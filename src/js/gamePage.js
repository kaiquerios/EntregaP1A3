document.addEventListener('DOMContentLoaded', () => {

    /* LÓGICA DA GALERIA DE MÍDIA (THUMBNAILS) */
    const mainMediaContainer = document.getElementById('media-main-container');
    const thumbnails = document.querySelectorAll('.media-thumb');

    if (mainMediaContainer && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove a classe active de todos os thumbs
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Adiciona a classe active no thumb clicado
                this.classList.add('active');

               
            });
        });
    }

    /* LÓGICA INTERATIVA PARA AVALIAÇÃO COM ESTRELAS */
    const starContainers = document.querySelectorAll('.star-rating');

    starContainers.forEach(container => {
        // Pega apenas as estrelas dentro do formulário de avaliação, não as já publicadas
        if(container.closest('.review-form')) {
            const stars = container.querySelectorAll('.star');
            
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    // Preenche as estrelas até o índice clicado
                    stars.forEach((s, i) => {
                        if (i <= index) {
                            s.classList.add('filled');
                        } else {
                            s.classList.remove('filled');
                        }
                    });
                });
            });
        }
    });

    // lógica simples para simular redirecionamento ao carrinho no botão de comprar (se estiver logado)
    // redireciona para o login caso não esteja logado
    const btnBuy = document.querySelector('.btn-buy'); 

    if (btnBuy) {

        btnBuy.addEventListener('click', () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                window.location.href = 'login.html';
                return;
            } else {
                window.location.href = 'cart.html';
            }

        });

    }
});