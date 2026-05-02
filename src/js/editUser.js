const CONFIG = {
  timerSegundos: 3,
  redirectUrl: 'home.html'
};

let timerSalvar = null;

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

  // Lógica utilizada para o darkmode/lightmode
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme');

    // Mudança de icone
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            
            if (isLight) {
                // Muda para Dark Mode
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '☀️';
            } else {
                // Muda para Light Mode
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '🌙';
            }
        });
    }
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
  const confirmar = document.getElementById('input-confirmar-senha').value;

  ['erro-senha-atual', 'erro-nova-senha', 'erro-confirmacao'].forEach(removerMensagem);

  let temErro = false;

  if (!senhaAtual) {
    mostrarMensagemCampo('erro-senha-atual', 'input-senha-atual', 'Digite sua senha atual.', 'erro');
    temErro = true;
  }

  if (!novaSenha) {
    mostrarMensagemCampo('erro-nova-senha', 'input-nova-senha', 'Digite a nova senha.', 'erro');
    temErro = true;
  } else {
    const resultado = validarSenha(novaSenha);
    if (!resultado.valida) {
      mostrarMensagemCampo('erro-nova-senha', 'input-nova-senha', resultado.erros[0], 'erro');
      temErro = true;
    }
  }

  if (novaSenha && confirmar && novaSenha !== confirmar) {
    mostrarMensagemCampo('erro-confirmacao', 'input-confirmar-senha', 'As senhas não coincidem.', 'erro');
    temErro = true;
  }

  if (temErro) return;

  fecharBloco('bloco-senha', 'btn-senha', 'Alterar senha');
  ['input-senha-atual', 'input-nova-senha', 'input-confirmar-senha'].forEach(id => {
    document.getElementById(id).value = '';
    document.getElementById(id).classList.remove('input-erro', 'input-sucesso');
  });
  mostrarSucesso('✓ Senha alterada com sucesso!');
}

function salvarAlteracoes() {
  const nome = document.getElementById('input-nome').value.trim();
  const btnSalvar = document.querySelector('.edit-user-save-btn');

  if (btnSalvar.disabled) return;

  if (!nome) {
    mostrarMensagemCampo('erro-nome', 'input-nome', 'O nome é obrigatório.', 'erro');
    return;
  }

  removerMensagem('erro-nome');

  btnSalvar.disabled = true;
  let contador = CONFIG.timerSegundos;
  btnSalvar.textContent = `Salvando... (${contador}s)`;
  btnSalvar.style.opacity = '0.7';

  mostrarSucesso('✓ Alterações salvas! Redirecionando...');

  if (timerSalvar) clearInterval(timerSalvar);

  timerSalvar = setInterval(() => {
    contador--;
    btnSalvar.textContent = `Salvando... (${contador}s)`;

    if (contador <= 0) {
      clearInterval(timerSalvar);
      timerSalvar = null;
      window.location.href = CONFIG.redirectUrl;
    }
  }, 1000);
}

function mostrarSucesso(mensagem) {
  const msg = document.getElementById('msg-sucesso');
  msg.textContent = mensagem;
  msg.style.display = 'inline';
  setTimeout(() => {
    msg.style.display = 'none';
  }, CONFIG.timerSegundos * 1000 + 500);
}

const REGRAS_SENHA = [
  { id: 'min-caracteres', teste: (senha) => senha.length >= 8, mensagem: 'Mínimo de 8 caracteres' },
  { id: 'numero', teste: (senha) => /[0-9]/.test(senha), mensagem: 'Pelo menos 1 número' }
];

function validarSenha(senha) {
  const erros = REGRAS_SENHA
    .filter(regra => !regra.teste(senha))
    .map(regra => regra.mensagem);
  return { valida: erros.length === 0, erros };
}

function mostrarMensagemCampo(idMensagem, idCampo, texto, tipo) {
  removerMensagem(idMensagem);
  const campo = document.getElementById(idCampo);
  const msg = document.createElement('span');
  msg.id = idMensagem;
  msg.className = `campo-mensagem campo-${tipo}`;
  msg.textContent = texto;
  campo.parentElement.appendChild(msg);

  if (tipo === 'erro') {
    campo.classList.add('input-erro');
    campo.classList.remove('input-sucesso');
  }
}

function removerMensagem(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}