import React from 'react';
import './index.css';

function EditUser() {
  return (
    <div className="edit-user-overlay">
      <div className="edit-user-container">

        {/* Cabeçalho */}
        <div className="edit-user-header">
          <h2 className="edit-user-title">Editar Perfil</h2>
          <button className="edit-user-close">✕</button>
        </div>

        {/* Foto de perfil */}
        <div className="edit-user-avatar-section">
          <div className="edit-user-avatar">AR</div>
          <button className="edit-user-avatar-btn">Trocar foto</button>
        </div>

        {/* Informações básicas */}
        <div className="edit-user-form">

          <div className="edit-user-field">
            <label className="edit-user-label">Nome completo</label>
            <input className="edit-user-input" type="text" placeholder="Seu nome completo" />
          </div>

          <div className="edit-user-field">
            <label className="edit-user-label">Email</label>
            <input className="edit-user-input edit-user-input--readonly" type="email" placeholder="seu@email.com" readOnly />
            <span className="edit-user-hint">O email não pode ser alterado.</span>
          </div>

          {/* Botão para abrir campo de nome de usuário */}
          <button className="edit-user-toggle-btn">Alterar nome de usuário</button>

          {/* Bloco de nome de usuário — visível apenas quando aberto */}
          <div className="edit-user-expandable">
            <div className="edit-user-field">
              <label className="edit-user-label">Novo nome de usuário</label>
              <input className="edit-user-input" type="text" placeholder="@novo_usuario" />
            </div>
            <button className="edit-user-confirm-btn">Confirmar</button>
          </div>

          {/* Botão para abrir campos de senha */}
          <button className="edit-user-toggle-btn">Alterar senha</button>

          {/* Bloco de senha — visível apenas quando aberto */}
          <div className="edit-user-expandable">
            <div className="edit-user-field">
              <label className="edit-user-label">Senha atual</label>
              <input className="edit-user-input" type="password" placeholder="Digite sua senha atual" />
            </div>
            <div className="edit-user-field">
              <label className="edit-user-label">Nova senha</label>
              <input className="edit-user-input" type="password" placeholder="Digite a nova senha" />
            </div>
            <div className="edit-user-field">
              <label className="edit-user-label">Confirmar nova senha</label>
              <input className="edit-user-input" type="password" placeholder="Confirme a nova senha" />
            </div>
            <button className="edit-user-confirm-btn">Confirmar</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EditUser;