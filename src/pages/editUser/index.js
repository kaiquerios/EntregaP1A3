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

      </div>
    </div>
  );
}

export default EditUser;