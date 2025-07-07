let ultimaMensagem = 0;

function atualizarCard() {
  const dados = localStorage.getItem("campainha");
  if (!dados) return;

  const { nome, mensagem, imagem, data } = JSON.parse(dados);

  if (data > ultimaMensagem) {
    ultimaMensagem = data;

    document.getElementById("notificacao").innerHTML = `
      <div class="card">
        <h1>Está tocando sua campainha!</h1>
        <img src="${imagem}" class="photo" />
        <h3>${nome}</h3>
        <p>${mensagem}</p>
        <div class="botoes">
          <button onclick="atenderVisitante()">Atender</button>
          <button onclick="recusarVisitante()">Recusar</button>
          <button onclick="estouOcupado()">Estou Ocupado</button>
        </div>
      </div>
    `;
  }
}

function atenderVisitante() {
  alert("Você atendeu o visitante.");
  document.getElementById("notificacao").innerHTML = "";
}

function recusarVisitante() {
  alert("Você recusou o visitante.");
  document.getElementById("notificacao").innerHTML = "";
}

function estouOcupado() {
  alert("Você informou que está ocupado.");
  document.getElementById("notificacao").innerHTML = "";
}

setInterval(atualizarCard, 1000);
