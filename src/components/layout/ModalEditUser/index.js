import React, { useState, useEffect } from "react";
import "./index.css";
import { getUser, updateUser, changePassword } from "../../../services/api";

function ModalEditUser({ onClose }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showUsername, setShowUsername] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Trava o scroll da página quando o modal abre
  useEffect(() => {
    document.body.classList.add('modal-open');

    // Remove a trava quando o modal fecha
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Busca os dados do usuário assim que o modal abre
  useEffect(() => {
    async function buscarUsuario() {
      try {
        // Pega o ID do usuário a partir do token salvo no navegador
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        const data = await getUser(userId);

        // Separa o nome completo em nome e sobrenome
        const partes = data.nome ? data.nome.split(' ') : ['', ''];
        setFirstName(partes[0] || '');
        setLastName(partes.slice(1).join(' ') || '');
        setEmail(data.email || '');

      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    buscarUsuario();
  }, []);

  function handleSalvar() {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  // Enquanto carrega, mostra mensagem de carregamento
  if (loading) {
    return (
      <div className="edit-user-overlay">
        <div className="edit-user-container">
          <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-user-overlay">
      <div className="edit-user-container">

        {/* Cabeçalho */}
        <div className="edit-user-header">
          <h2 className="edit-user-title">Editar Perfil</h2>
          <button className="edit-user-close" onClick={onClose}>✕</button>
        </div>

        {/* Avatar — exibe as iniciais do usuário */}
        <div className="edit-user-avatar-section">
          <div className="edit-user-avatar">
            {firstName.charAt(0)}{lastName.charAt(0)}
          </div>
        </div>

        {/* Email — somente leitura */}
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

        {/* Layout de duas colunas */}
        <div className="edit-user-columns">

          {/* Coluna esquerda — Nome e alterar usuário */}
          <div className="edit-user-col">

            <div className="edit-user-field">
              <label className="edit-user-label">Nome</label>
              <input
                className="edit-user-input"
                type="text"
                placeholder="Seu nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <button
              className="edit-user-toggle-btn"
              onClick={() => setShowUsername(!showUsername)}
            >
              {showUsername ? "✕ Cancelar" : "Alterar nome de usuário"}
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

          {/* Coluna direita — Sobrenome e alterar senha */}
          <div className="edit-user-col">

            <div className="edit-user-field">
              <label className="edit-user-label">Sobrenome</label>
              <input
                className="edit-user-input"
                type="text"
                placeholder="Seu sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <button
              className="edit-user-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "✕ Cancelar" : "Alterar senha"}
            </button>

            {showPassword && (
              <div className="edit-user-expandable">
                <div className="edit-user-field">
                  <label className="edit-user-label">Senha atual</label>
                  <input
                    className="edit-user-input"
                    type="password"
                    placeholder="Digite sua senha atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="edit-user-field">
                  <label className="edit-user-label">Nova senha</label>
                  <input
                    className="edit-user-input"
                    type="password"
                    placeholder="Digite a nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="edit-user-field">
                  <label className="edit-user-label">Confirmar nova senha</label>
                  <input
                    className="edit-user-input"
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="edit-user-confirm-btn">Confirmar</button>
              </div>
            )}

          </div>
        </div>

        {/* Rodapé — botões de ação */}
        <div className="edit-user-footer">
          {savedSuccess && (
            <span className="edit-user-success">
              ✓ Alterações salvas com sucesso!
            </span>
          )}
          <button className="edit-user-cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="edit-user-save-btn" onClick={handleSalvar}>
            Salvar alterações
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalEditUser;