document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const partes = token.split('.');
    if (partes.length === 3) {
      const payload = JSON.parse(atob(partes[1]));
      const nomeCompleto = payload.nome || '';
      const partesNome = nomeCompleto.trim().split(' ');
      document.getElementById('input-nome').value = partesNome[0] || '';
      document.getElementById('input-sobrenome').value = partesNome.slice(1).join(' ') || '';
      atualizarIniciais();
    }
  } catch (error) {
    console.warn('Token não pôde ser lido, campos em branco.');
  }

  document.body.classList.add('modal-open');
});

// volta para a página anterior
function fecharModal() {
  document.body.classList.remove('modal-open');

  // fecha os blocos expansíveis
  fecharBloco('bloco-username', 'btn-username', 'Alterar nome de usuário');
  fecharBloco('bloco-senha', 'btn-senha', 'Alterar senha');

  // volta para a página anterior
  window.history.back();
}

// abre/fecha blocos

function toggleBloco(idBloco, idBotao, textoOriginal) {
  const bloco = document.getElementById(idBloco);
  const botao = document.getElementById(idBotao);
  const estaAberto = bloco.style.display !== 'none';

  if (estaAberto) {
    fecharBloco(idBloco, idBotao, textoOriginal);
  } else {
    bloco.style.display = 'flex';
    botao.textContent = 'X Cancelar';
    bloco.style.animation = 'none';
    bloco.offsetHeight;
    bloco.style.animation = 'fadeSlideDown 0.2s ease';
  }
}

function fecharBloco(idBloco, idBotao, textoOriginal) {
  document.getElementById(idBloco).style.display = 'none';
  document.getElementById(idBotao).textContent = textoOriginal;
}

// atualiza iniciais em tempo real

function atualizarIniciais() {
  const nome = document.getElementById('input-nome').value;
  const sobrenome = document.getElementById('input-sobrenome').value;

  const inicialNome = nome.charAt(0).toUpperCase();
  const inicialSobrenome = sobrenome.charAt(0).toUpperCase();

  document.getElementById('avatar-iniciais').textContent = inicialNome + inicialSobrenome || '--';
}

function confirmarUsername() {
  const username = document.getElementById('input-username').value.trim();

  if (!username) {
    alert('Por favor, digite um novo nome de usuário.');
    return;
  }

  fecharBloco('bloco-username', 'btn-username', 'Alterar nome de usuário');
  document.getElementById('input-username').value = '';
  mostrarSucesso('✓ Nome de usuário atualizado com sucesso!');
}

function confirmarSenha() {
  const senhaAtual = document.getElementById('input-senha-atual').value;
  const novaSenha = document.getElementById('input-nova-senha').value;
  const confirmarSenha = document.getElementById('input-confirmar-senha').value;

  // Campos obrigatórios
  if (!senhaAtual || !novaSenha || !confirmarSenha) {
    alert('Por favor, preencha todos os campos de senha.');
    return;
  }

  // Validação de confirmação das senhas
  if (novaSenha !== confirmarSenha) {
    alert('A nova senha e a confirmação não coincidem.');
    return;
  }

  // Validação
  if (novaSenha.length < 6) {
    alert('A nova senha precisa ter pelo menos 6 caracteres.');
    return;
  }

  // Limpa os campos e fecha o bloco
  fecharBloco('bloco-senha', 'btn-senha', 'Alterar senha');
  document.getElementById('input-senha-atual').value = '';
  document.getElementById('input-nova-senha').value = '';
  document.getElementById('input-confirmar-senha').value = '';

  mostrarSucesso('✓ Senha alterada com sucesso!');
}

function salvarAlteracoes() {
  const nome = document.getElementById('input-nome').value.trim();

  // Validação
  if (!nome) {
    alert('Por favor, preencha o campo Nome.');
    return;
  }

  mostrarSucesso('✓ Alterações salvas com sucesso!');
}

function mostrarSucesso(mensagem) {
  const msg = document.getElementById('msg-sucesso');
  msg.textContent = mensagem;
  msg.style.display = 'inline';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
}