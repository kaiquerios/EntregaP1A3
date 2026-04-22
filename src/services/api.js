// URL base da API
const BASE_URL = 'http://localhost:8080/api/v1';

// Pega o token salvo no navegador
function getToken() {
  return localStorage.getItem('token');
}

// Busca os dados do usuário pelo ID
async function getUser(id) {
  const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

// Atualiza nome do usuário
async function updateUser(id, data) {
  const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Altera a senha do usuário
async function changePassword(currentPassword, newPassword) {
  const response = await fetch(`${BASE_URL}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  return response.json();
}

export { getUser, updateUser, changePassword };