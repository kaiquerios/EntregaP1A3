import React, { useState } from "react";
import "./index.css";

function EditUser({ onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [showUsername, setShowUsername] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const email = "usuario@email.com";

  return (
    <div className="edit-user-overlay">
      <div className="edit-user-container">

        {/* Header */}
        <div className="edit-user-header">
          <h2 className="edit-user-title">Editar Perfil</h2>
          <button className="edit-user-close" onClick={onClose}>✕</button>
        </div>

        {/* Avatar */}
        <div className="edit-user-avatar-section">
          <div className="edit-user-avatar">AR</div>
        </div>

        {/* Email */}
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

        {/* Two columns layout */}
        <div className="edit-user-columns">

          {/* Left column */}
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

          {/* Right column */}
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

        {/* Footer */}
        <div className="edit-user-footer">
          {savedSuccess && (
            <span className="edit-user-success">
              ✓ Alterações salvas com sucesso!
            </span>
          )}
          <button className="edit-user-cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="edit-user-save-btn"
            onClick={() => {
              setSavedSuccess(true);
              setTimeout(() => setSavedSuccess(false), 3000);
            }}
          >
            Salvar alterações
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditUser;