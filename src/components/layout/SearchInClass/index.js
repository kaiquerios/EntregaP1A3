import React, {useState, useEffect} from 'react';
import './index.css';

function SearchInClass(){
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = 'http://localhost:8080/api/v1/public/jogos';

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                
                //Lógica que não deixa repetir categoria
                const uniqueCategories = []
                const seen = new Set();

                //Mapeamento de icones para os cards (posteriormente pode ser substituido por icons)
                const iconMap = {
                    'RPG': '🐲',
                    'Ação': '⚔️',
                    'Aventura': '🗺️',
                    'Social': '👥',
                    'Sandbox': '🧱',
                    'Plataforma': '🏃',
                    'Puzzle': '🧩',
                    'Horror': '👻',
                    'Tiro': '🎯',
                    'Simulação': '🚜',
                    'VR': '🥽'
                };


            data.forEach(jogo => {
            // O .trim() remove o \r invisível e qualquer espaço extra (visto através do insomnia)
            const categoriaLimpa = jogo.categoria ? jogo.categoria.trim() : "";

            
            if (!seen.has(categoriaLimpa) && iconMap[categoriaLimpa]) {
             seen.add(categoriaLimpa);
             uniqueCategories.push({
             name: categoriaLimpa,
             icon: iconMap[categoriaLimpa],
             count: `${data.filter(j => j.categoria?.trim() === categoriaLimpa).length} jogos`
            });
        }
    });
                setCategories(uniqueCategories);
                setLoading(false); 

            })
            .catch((err) => {
                console.error("Erro ao carregar categorias:", err);
                setLoading(false);
                });
    }, []);

    if (loading) return <div className='category-loading'>Mapeando categorias...</div>

    return(
        <section className='category-section'>
            <div className='category-header'>
                <div className='header-left'>
                    <h2 className='category-title'>Explorar por categoria</h2>
                </div>
                <a href="/categorias" className='view-all'>Ver todas &rarr;</a>
            </div>

            <div className='category-grid'>
                {categories.map((cat, index) => (
                    <div key={index} className='category-card'>
                        <div className='category-icon'>{cat.icon}</div>
                        <h3 className='category-name'>{cat.name}</h3>
                        <span className='category-count'>{cat.count}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SearchInClass;