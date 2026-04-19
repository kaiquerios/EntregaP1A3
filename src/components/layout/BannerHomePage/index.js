import React, {useState, useEffect } from 'react';
import './index.css';

function Banner() {
    const [games, setGames] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = 'http://localhost:8080/api/v1/public/jogos';

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setGames(data.slice(0,5));
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro na inntegração com a API de Jogos", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className='banner-loading'>Sincronizando jogos da API...</div>
    if (games.length === 0) return null;

    const currentGame = games[activeIndex];

    return (
        <section className='banner-home'>
            <div className='banner-container'>

                <div className='banner-info'>
                    <div className='banner-label'>
                        <span className='label-dot'></span> {currentGame.empresa_nome || "DESTAQUE"}
                    </div>

                    {/*Mapeamento do CSV*/}
                    <h1 className='banner-title'>{currentGame.nome}</h1>

                    <div className='banner-tags'>
                        <span className='banner-tag'>{currentGame.categoria}</span>
                        <span className='banner-tag'>{currentGame.ano}</span>
                        <span className='banner-tag'>Digital</span>
                    </div>

                    <p className='banner-description'>{currentGame.descricao}</p>

                    <div className='banner-pricing'>
                        <span className='price'>R$ {currentGame.preco}</span>
                    </div>

                    <div className='banner-btns'>
                        <button className='btn-cart'>Adicionar ao carrinho</button>
                        <button className='btn-details'>Ver detalhes</button>
                    </div>
                </div>

                    <div className='banner-media'>
                        <div className='media-card'>
                            <div className='media-placeholder'>🎮</div>
                            <div className='media-stats'>
                                <div className='stars'>⭐⭐⭐⭐⭐</div>
                                <span className='rating-text'>Premium Edition</span>
                            </div>
                        </div>
                    </div>
            </div>

            <div className='banner-dots'>
                {games.map((_, i) =>(
                    <span
                    key={i}
                    className={`dot ${activeIndex === i ? 'active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    ></span>
                ))}
            </div>
        </section>
    )

}

export default Banner;