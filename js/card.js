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
          <button onclick="responderVisitante('O morador irá te atender agora.')">Atender</button>
          <button onclick="responderVisitante('O morador recusou a visita.')">Recusar</button>
          <button onclick="responderVisitante('O morador está ocupado no momento.')">Estou Ocupado</button>
        </div>
      </div>
    `;
  }
}

function responderVisitante(resposta) {
  localStorage.setItem("campainhaResposta", JSON.stringify({
    resposta,
    data: Date.now()
  }));
  alert(resposta);
  document.getElementById("notificacao").innerHTML = "";
}

setInterval(atualizarCard, 1000);
