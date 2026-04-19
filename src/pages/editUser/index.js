import React, { useState } from 'react';
import './index.css';

function EditUser() {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [username, setUsername] = useState('');
  const [showUsername, setShowUsername] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  const email = 'usuario@email.com';

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
        </div>

        {/* Email centralizado */}
        <div className="edit-user-field edit-user-email-field">
          <label className="edit-user-label">Email</label>
          <input
            className="edit-user-input edit-user-input--readonly"
            type="email"
            value={email}
            readOnly
          />
          <span className="edit-user-hint">O email não pode ser alterado.</span>
        </div>

        {/* Layout duas colunas */}
        <div className="edit-user-columns">

          {/* Coluna esquerda */}
          <div className="edit-user-col">

            <div className="edit-user-field">
              <label className="edit-user-label">Nome</label>
              <input
                className="edit-user-input"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <button
              className="edit-user-toggle-btn"
              onClick={() => setShowUsername(!showUsername)}
            >
              {showUsername ? '✕ Cancelar' : 'Alterar nome de usuário'}
            </button>

            {showUsername && (
              <div className="edit-user-expandable">
                <div className="edit-user-field">
                  <label className="edit-user-label">Novo nome de usuário</label>
                  <input
                    className="edit-user-input"
                    type="text"
                    placeholder="@novo_usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <button className="edit-user-confirm-btn">Confirmar</button>
              </div>
            )}

          </div>

          {/* Coluna direita */}
          <div className="edit-user-col">

            <div className="edit-user-field">
              <label className="edit-user-label">Sobrenome</label>
              <input
                className="edit-user-input"
                type="text"
                placeholder="Seu sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />
            </div>

            <button
              className="edit-user-toggle-btn"
              onClick={() => setShowSenha(!showSenha)}
            >
              {showSenha ? '✕ Cancelar' : 'Alterar senha'}
            </button>

            {showSenha && (
              <div className="edit-user-expandable">
                <div className="edit-user-field">
                  <label className="edit-user-label">Senha atual</label>
                  <input
                    className="edit-user-input"
                    type="password"
                    placeholder="Digite sua senha atual"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                  />
                </div>
                <div className="edit-user-field">
                  <label className="edit-user-label">Nova senha</label>
                  <input
                    className="edit-user-input"
                    type="password"
                    placeholder="Digite a nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                </div>
                <div className="edit-user-field">
                  <label className="edit-user-label">Confirmar nova senha</label>
                  <input
                    className="edit-user-input"
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                </div>
                <button className="edit-user-confirm-btn">Confirmar</button>
              </div>
            )}

          </div>

        </div>

        {/* Rodapé */}
        <div className="edit-user-footer">
          <button className="edit-user-cancel-btn">Cancelar</button>
          <button className="edit-user-save-btn">Salvar alterações</button>
        </div>

      </div>
    </div>
  );
}

export default EditUser;