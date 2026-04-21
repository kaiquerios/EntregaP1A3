import React from 'react';
import './index.css';
import Navbar from '../../components/layout/Navbar/index'

function GamePage() {

    return(
        <>
         <Navbar/>

         <main className='game-page'>
            
             {/*
                HERO - mídia principal + sidebar
               */}
              <section className='game-hero'>

                 {/* Mídia expandida + thumbnails */}
                 <div className='media-block'>
                     <div className='media-main'>
                        {/* TODO: <img> ou <video> vindo da API*/}
                        <span>Mídia expandida</span>
                     </div>

                     <div className='media-thumbs'>
                        {/* TODO: .map() nas mídias retornadas pela API */}
                        <div className='media-thumb active'>Mídia 1</div>
                        <div className='media-thumb'>Mídia 2</div>
                        <div className='media-thumb'>Mídia 3</div> 
                        <div className='media-thumb'>Mídia 4</div>
                        <div className='media-thumb'>Mídia 5</div>  
                     </div>
                 </div>

                 {/* Sidebar de compra*/}
                 <aside className='game-sidebar'>
                    <div className='game-card'>

                       <div className='game-cover'>
                        {/* TODO: <img src={game.cover} /> */ }
                        ICON
                       </div>

                       <h1 className='game-card-title'>
                        {/* TODO: {game.title} */}
                        Nome do jogo
                       </h1>

                       <div className='game-tags'>
                        {/* TODO: .map() nas tags do jogo*/}
                        <span className='game-tag'>Categoria</span>
                        <span className='game-tag'>Gênero</span>
                       </div>

                       <div className='game-price'>
                        {/* TODO: {game.price} */}
                        R$ 00,00
                       </div>

                       <button className='btn btn-primary'>Comprar</button>
                       <button className='btn btn-secondary'>Adicionar ao carrinho</button>
                       <button className='btn btn-secondary'>Lista de desejos</button>

                       <div className='game-info-table'>
                        <div className='game-info-row'>
                            <span className='game-info-label'>Desenvolvedor</span>
                            <span className='game-info-value'>Empresa</span>{/* TODO: `{game.developer} */}
                        </div>
                        <div className='game-info-row'>
                            <span className='game-info-label'>Distribuidora</span>
                            <span className='game-info-value'>Empresa</span>{/* TODO: `{game.publisher} */}
                        </div>
                        <div className='game-info-row'>
                            <span className='game-info-label'>Data de lançamento</span>
                            <span className='game-info-value'>01 de janeiro de 1980</span>{/* TODO: {GamePage.releaseDate} */}
                        </div>
                    </div>

                </div>
             </aside>
         </section>

         {/* 
             INSERIR ANÁLISE
             */}
             <section className='section'>
                <h2 className='section-title'>Inserir análise</h2>
                <div className='section-card'>
                    <div className='review-form'>

                        <div className='user-avatar-lg'>
                            {/* TODO: iniciais do usuário logado*/}
                            AR
                            </div>

                            <div className='review-form-content'>
                                <textarea
                                    className='review-textarea'
                                    placeholder='Escreva sua análise aqui...'
                                    />
                                    <div className='review-form-footer'>
                                        <div className='star-rating'>
                                            {/* TODO: tornar interativo*/}
                                            <span className='star filled'>★</span>
                                            <span className='star filled'>★</span>
                                            <span className='star filled'>★</span>
                                            <span className='star filled'>★</span>
                                            <span className='star'>★</span>
                                        </div>
                                        <button className='btn-publish'>Publicar</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                     </section>
                     {/*
                        SOBRE O JOGO
                     */}
                     <section className='section'>
                        <h2 className='section-title'>Sobre o jogo</h2>
                        <div className='section-card'>
                            <p className='about-text'>
                                {/* TODO: {game.about}*/}
                                Descrição do jogo vinda da API.
                            </p>
                        </div>
                     </section>

                     {/*
                        REQUISITOS DO SISTEMA
                     */}
                     <div className='requirements-grid'>
                        <div className='requirements-block'>
                            <h3>Requisitos mínimos</h3>
                            {/* TODO: .map() nos requisitos mínimos da API */}
                            <div className='req-now'><span className='req-label'>SO:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>CPU:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>RAM:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>GPU:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>Armazen:</span><span className='req-value'>-</span></div>
                        </div>

                        <div className='requirements-block'>
                            <h3>Requisitos recomendados</h3>
                            {/* TODO: .map() nos requisitos recomendados da API*/}
                            <div className='req-now'><span className='req-label'>SO:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>CPU:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>RAM:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>GPU:</span><span className='req-value'>-</span></div>
                            <div className='req-now'><span className='req-label'>Armazen:</span><span className='req-value'>-</span></div>
                        </div>
                     </div>

                     {/*
                        JOGOS SIMILARES
                     */}
                     <section className='section'>
                        <h2 className='section-title'>Jogos similares</h2>
                        <div className='similar-games'>
                            {/* TODO: .map() nos jogos similares retornados pela API */}
                            <div className='similar-game-card'><span className='similar-game-name'>JOGO 1</span></div>
                            <div className='similar-game-card'><span className='similar-game-name'>JOGO 2</span></div>
                            <div className='similar-game-card'><span className='similar-game-name'>JOGO 3</span></div>
                            <div className='similar-game-card'><span className='similar-game-name'>JOGO 4</span></div>
                        </div>
                     </section>

                     {/*
                        ANÁLISES DE OUTROS USUÁRIOS
                     */}
                     <section className='section'>
                        <h2 className='section-title'>Análises de outros usuários</h2>

                        <div className='reviews-list'>
                            {/* TODO: .map() nas reviews retornadas pela API*/}

                            <div className='review-card'>
                                <div>
                                    <div className='user-avatar-lg'>AR</div>
                                    <p className='reviewer-name'>Username</p>
                                </div>
                                <div className='review-card-body'>
                                    <div className='review-card-text'>{/* TODO: {review.text} */}</div>
                                    <div className='review-card-footer'>
                                        <div className='star-rating'>
                                            <span className='star filled'>★</span>
                                            <span className='star filled'>★</span>
                                            <span className='star filled'>★</span>
                                            <span className='star filled'>★</span>
                                            <span className='star'>★</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='review-card'>
                            <div>
                                <div className='user-avatar-lg'>JS</div>
                                <p className='reviewer-name'>Username</p>
                            </div>
                            <div className='review-card-body'>
                                <div className='review-card-text'>{/*TODO: {review.text} */}</div>
                                <div className='review-card-footer'>
                                    <div className='star-rating'>
                                        <span className='star filled'>★</span>
                                        <span className='star filled'>★</span>
                                        <span className='star filled'>★</span>
                                        <span className='star filled'>★</span>
                                        <span className='star'>★</span> 
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <button className='btn-see-all'>Ver todas as análises</button>
                </section>

            </main>

            {/*- RODAPÉ - */}
            <footer className='game-footer'>
                <p>© 2025 CLT Gaming - Projeto Acadêmico. Todos os direitos reservados.</p>
            </footer>    
        </>
    );
}

export default GamePage;
