const CONFIG = {
  timerSegundos: 3,
  redirectUrl: "home.html",
};

let timerSalvar = null;
let senhaConfirmada = false;

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const partes = token.split(".");
    if (partes.length === 3) {
      const payload = JSON.parse(atob(partes[1]));
      const nomeCompleto = payload.nome || "";
      document.getElementById("input-nome-completo").value = nomeCompleto;
      atualizarIniciais();
    }
  } catch (error) {
    console.warn("Token não pôde ser lido, campos em branco.");
  }

  document.body.classList.add("modal-open");

  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "☀️";
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "🌙";
      }
    });
  }
});

function fecharModal() {
  document.body.classList.remove("modal-open");

  fecharBloco("bloco-username", "btn-username", "Alterar nome de usuário");
  document.getElementById("input-username").value = "";

  fecharBloco("bloco-senha", "btn-senha", "Alterar senha");
  ["input-senha-atual", "input-nova-senha", "input-confirmar-senha"].forEach(
    (id) => {
      document.getElementById(id).value = "";
      document
        .getElementById(id)
        .classList.remove("input-erro", "input-sucesso");
      document.getElementById(id).type = "password";
    },
  );

  [
    "erro-senha-atual",
    "erro-nova-senha",
    "erro-confirmacao",
    "erro-username",
  ].forEach(removerMensagem);

  senhaConfirmada = false;
  esconderFeedback();

  window.history.back();
}

function toggleBloco(idBloco, idBotao, textoOriginal) {
  const bloco = document.getElementById(idBloco);
  const botao = document.getElementById(idBotao);
  const estaAberto = bloco.style.display !== "none";

  if (estaAberto) {
    fecharBloco(idBloco, idBotao, textoOriginal);
  } else {
    if (idBloco === "bloco-senha") {
      fecharBloco("bloco-username", "btn-username", "Alterar nome de usuário");
    } else if (idBloco === "bloco-username") {
      fecharBloco("bloco-senha", "btn-senha", "Alterar senha");
    }

    if (idBloco === "bloco-senha") senhaConfirmada = false;

    bloco.style.display = "flex";
    botao.textContent = "✕ Cancelar";
    bloco.style.animation = "none";
    bloco.offsetHeight;
    bloco.style.animation = "fadeSlideDown 0.2s ease";
  }
}

function fecharBloco(idBloco, idBotao, textoOriginal) {
  document.getElementById(idBloco).style.display = "none";
  document.getElementById(idBotao).textContent = textoOriginal;
}

function atualizarIniciais() {
  const nomeCompleto = document
    .getElementById("input-nome-completo")
    .value.trim();
  const partes = nomeCompleto.split(" ").filter((p) => p.length > 0);

  const inicial1 = partes[0] ? partes[0].charAt(0).toUpperCase() : "";
  const inicial2 = partes[partes.length - 1]
    ? partes[partes.length - 1].charAt(0).toUpperCase()
    : "";

  document.getElementById("avatar-iniciais").textContent =
    inicial1 + inicial2 || "--";
}

function mostrarFeedback(tipo, mensagem) {
  const el = document.getElementById("feedback-inline");
  el.textContent = mensagem;
  el.className = `feedback-inline ${tipo}`;
  el.style.display = "block";

  setTimeout(() => {
    el.style.display = "none";
  }, 4000);
}

function esconderFeedback() {
  const el = document.getElementById("feedback-inline");
  if (el) el.style.display = "none";
}

function confirmarUsername() {
  const username = document.getElementById("input-username").value.trim();

  if (!username) {
    mostrarFeedback("aviso", "Digite um novo nome de usuário.");
    return;
  }

  fecharBloco("bloco-username", "btn-username", "Alterar nome de usuário");
  document.getElementById("input-username").value = "";
  mostrarFeedback("sucesso", "Nome de usuário atualizado com sucesso!");
}

function toggleSenha(idCampo, botao) {
  const campo = document.getElementById(idCampo);
  const visivel = campo.type === "text";
  campo.type = visivel ? "password" : "text";
  botao.textContent = visivel ? "👁" : "??";
}

function confirmarSenha() {
  const senhaAtual = document.getElementById("input-senha-atual").value;
  const novaSenha = document.getElementById("input-nova-senha").value;
  const confirmar = document.getElementById("input-confirmar-senha").value;

  ["erro-senha-atual", "erro-nova-senha", "erro-confirmacao"].forEach(
    removerMensagem,
  );

  let temErro = false;

  if (!senhaAtual) {
    mostrarMensagemCampo(
      "erro-senha-atual",
      "input-senha-atual",
      "Digite sua senha atual.",
      "erro",
    );
    temErro = true;
  }

  if (!novaSenha) {
    mostrarMensagemCampo(
      "erro-nova-senha",
      "input-nova-senha",
      "Digite a nova senha.",
      "erro",
    );
    temErro = true;
  } else {
    const resultado = validarSenha(novaSenha);
    if (!resultado.valida) {
      mostrarMensagemCampo(
        "erro-nova-senha",
        "input-nova-senha",
        resultado.erros[0],
        "erro",
      );
      temErro = true;
    }
  }

  if (!confirmar) {
    mostrarMensagemCampo(
      "erro-confirmacao",
      "input-confirmar-senha",
      "Confirme a nova senha.",
      "erro",
    );
    temErro = true;
  } else if (novaSenha !== confirmar) {
    mostrarMensagemCampo(
      "erro-confirmacao",
      "input-confirmar-senha",
      "As senhas não coincidem.",
      "erro",
    );
    temErro = true;
  }

  if (temErro) return;

  senhaConfirmada = true;

  fecharBloco("bloco-senha", "btn-senha", "Alterar senha");
  ["input-senha-atual", "input-nova-senha", "input-confirmar-senha"].forEach(
    (id) => {
      document.getElementById(id).value = "";
      document
        .getElementById(id)
        .classList.remove("input-erro", "input-sucesso");
    },
  );

  mostrarFeedback("sucesso", "Senha alterada com sucesso!");
}

function salvarAlteracoes() {
  const nomeCompleto = document
    .getElementById("input-nome-completo")
    .value.trim();
  const btnSalvar = document.querySelector(".edit-user-save-btn");

  if (btnSalvar.disabled) return;

  if (!nomeCompleto) {
    mostrarMensagemCampo(
      "erro-nome",
      "input-nome-completo",
      "O nome completo é obrigatório.",
      "erro",
    );
    return;
  }

  removerMensagem("erro-nome");

  const blocoSenhaAberto =
    document.getElementById("bloco-senha").style.display !== "none";
  if (blocoSenhaAberto && !senhaConfirmada) {
    mostrarFeedback("aviso", "Confirme a alteração de senha antes de salvar.");
    return;
  }

  const usernamePreenchido = document.getElementById("input-username").value;
  if (usernamePreenchido) {
    mostrarFeedback(
      "aviso",
      "Confirme a alteração de nome de usuário antes de salvar.",
    );
    return;
  }

  btnSalvar.disabled = true;
  let contador = CONFIG.timerSegundos;
  btnSalvar.textContent = "Salvando...";
  btnSalvar.style.opacity = "0.7";

  mostrarFeedback(
    "sucesso",
    `Alterações salvas! Redirecionando em ${contador}s...`,
  );

  if (timerSalvar) clearInterval(timerSalvar);

  timerSalvar = setInterval(() => {
    contador--;

    if (contador <= 0) {
      clearInterval(timerSalvar);
      timerSalvar = null;
      window.location.href = CONFIG.redirectUrl;
    } else {
      mostrarFeedback(
        "sucesso",
        `Alterações salvas! Redirecionando em ${contador}s...`,
      );
    }
  }, 1000);
}

const REGRAS_SENHA = [
  {
    id: "min-caracteres",
    teste: (senha) => senha.length >= 8,
    mensagem: "Mínimo de 8 caracteres",
  },
  {
    id: "numero",
    teste: (senha) => /[0-9]/.test(senha),
    mensagem: "Pelo menos 1 número",
  },
];

function validarSenha(senha) {
  const erros = REGRAS_SENHA.filter((regra) => !regra.teste(senha)).map(
    (regra) => regra.mensagem,
  );
  return { valida: erros.length === 0, erros };
}

function mostrarMensagemCampo(idMensagem, idCampo, texto, tipo) {
  removerMensagem(idMensagem);
  const campo = document.getElementById(idCampo);
  const msg = document.createElement("span");
  msg.id = idMensagem;
  msg.className = `campo-mensagem campo-${tipo}`;
  msg.textContent = texto;

  const wrapper = campo.closest(".input-senha-wrapper");
  const pai = wrapper ? wrapper.parentElement : campo.parentElement;
  pai.appendChild(msg);

  if (tipo === "erro") {
    campo.classList.add("input-erro");
    campo.classList.remove("input-sucesso");
  }
}

function removerMensagem(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
