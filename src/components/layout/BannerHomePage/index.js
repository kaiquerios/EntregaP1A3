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
                console.error("Erro na integração com a API de Jogos", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className='banner-loading'>Sincronizando jogos da API...</div>
    if (games.length === 0) return null;

    const currentGame = games[activeIndex];

    

}