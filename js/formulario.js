const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');
let imagemCapturada = '';

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(erro => {
    alert('Erro ao acessar a câmera: ' + erro);
  });

function tirarFoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
  imagemCapturada = canvas.toDataURL('image/png');
  canvas.style.display = 'none';
  alert('Foto tirada com sucesso!');
}

function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('mensagem').value = '';
  canvas.style.display = 'none';
  imagemCapturada = '';
}

async function enviarFormulario() {
  const nome = document.getElementById('nome').value;
  const mensagem = document.getElementById('mensagem').value;

  if (!imagemCapturada || !nome || !mensagem) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Atualiza o card local
  document.getElementById('resultado').innerHTML = `
    <div class="card">
      <h1>Sua chamada!</h1>
      <img src="${imagemCapturada}" class="photo" />
      <h3>${nome}</h3>
      <p>${mensagem}</p>
    </div>
  `;

  localStorage.setItem("campainha", JSON.stringify({
    nome,
    mensagem,
    imagem: imagemCapturada,
    data: Date.now()
  }));

  // Aqui você pode incluir sua lógica de envio para o Telegram
  // await enviarMensagem(nome, mensagem, imagemCapturada);
}

let ultimaResposta = 0;

function verificarRespostaDoMorador() {
  const respostaJSON = localStorage.getItem("campainhaResposta");
  if (!respostaJSON) return;

  const { resposta, data } = JSON.parse(respostaJSON);
  if (data > ultimaResposta) {
    ultimaResposta = data;

    document.getElementById("respostaMorador").innerHTML = `
      <div class="resposta card">
        <h2>Resposta do morador:</h2>
        <p>${resposta}</p>
      </div>
    `;
  }
}

setInterval(verificarRespostaDoMorador, 1000);
