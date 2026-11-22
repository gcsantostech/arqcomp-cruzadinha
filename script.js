// =====================================================
// Cruzadinha Profundo Tux
// Missão: ajudar o Profundo Tux a descobrir todas as
// palavras do tabuleiro, para que ele vá bem na prova.
// =====================================================

// Tamanho do tabuleiro
const LINHAS = 13;
const COLUNAS = 16;

const palavras = [
  {
    resposta: "DUALCORE",
    linha: 0,
    coluna: 0,
    direcao: "H",
    pista: "Processador com dois núcleos de execução no mesmo chip.",
  },
  {
    resposta: "REGISTRADORES",
    linha: 0,
    coluna: 6,
    direcao: "V",
    pista:
      "Pequenos espaços dentro do processador que guardam operandos e resultados temporários.",
  },
  {
    resposta: "EEPROM",
    linha: 1,
    coluna: 11,
    direcao: "V",
    pista:
      "Memória não volátil regravável por pulsos elétricos, alterando um byte por vez.",
  },
  {
    resposta: "CPU",
    linha: 2,
    coluna: 1,
    direcao: "H",
    pista:
      "Componente que executa as instruções dos programas, considerado o cérebro do computador.",
  },
  {
    resposta: "ULA",
    linha: 2,
    coluna: 3,
    direcao: "V",
    pista:
      "Parte do processador que realiza somas, subtrações e comparações entre números.",
  },
  {
    resposta: "QUADCORE",
    linha: 3,
    coluna: 9,
    direcao: "V",
    pista: "Processador com quatro núcleos de execução no mesmo chip.",
  },
  {
    resposta: "FLASH",
    linha: 3,
    coluna: 13,
    direcao: "V",
    pista:
      "Memória não volátil regravável, apagada em blocos, comum em pen drives e SSDs.",
  },
  {
    resposta: "DATABUS",
    linha: 4,
    coluna: 0,
    direcao: "H",
    pista:
      "Via bidirecional que transporta o conteúdo lido ou gravado entre processador e memória.",
  },
  {
    resposta: "DMA",
    linha: 4,
    coluna: 15,
    direcao: "V",
    pista:
      "Mecanismo que move blocos entre periférico e memória sem sobrecarregar o processador.",
  },
  {
    resposta: "MEMORIADEMASSA",
    linha: 6,
    coluna: 2,
    direcao: "H",
    pista: "Guarda arquivos e programas de forma permanente, como HD e SSD.",
  },
  {
    resposta: "RAM",
    linha: 7,
    coluna: 0,
    direcao: "V",
    pista:
      "Memória volátil principal, onde ficam os programas em execução; perde tudo sem energia.",
  },
  {
    resposta: "UC",
    linha: 8,
    coluna: 2,
    direcao: "V",
    pista:
      "Parte do processador que busca e decodifica cada instrução e coordena sua execução.",
  },
  {
    resposta: "CACHE",
    linha: 8,
    coluna: 12,
    direcao: "V",
    pista:
      "Memória rápida intermediária entre processador e memória principal, guardando cópias do que é muito usado.",
  },
  {
    resposta: "ROM",
    linha: 8,
    coluna: 14,
    direcao: "V",
    pista:
      "Memória não volátil gravada na fabricação, cujo conteúdo normalmente não se altera.",
  },
  {
    resposta: "MICROCONTROLADOR",
    linha: 9,
    coluna: 0,
    direcao: "H",
    pista:
      "Chip único que reúne processador, memória e periféricos, típico de placas como Arduino.",
  },
  {
    resposta: "ADDRESSBUS",
    linha: 12,
    coluna: 1,
    direcao: "H",
    pista:
      "Via de sentido único que indica qual posição da memória será acessada.",
  },
];

const explicacoes = {
  DUALCORE:
    "Dual core é um processador com dois núcleos. Cada núcleo executa instruções, então duas tarefas podem rodar ao mesmo tempo, em paralelo.",
  REGISTRADORES:
    "Registradores são as memórias mais rápidas do computador e ficam dentro da CPU. Guardam os dados que a ULA está usando agora, como operandos e resultados.",
  EEPROM:
    "A EEPROM é uma ROM que pode ser apagada e regravada por sinais elétricos, sem tirar o chip da placa. Guarda dados que precisam sobreviver sem energia.",
  CPU: "A CPU (Unidade Central de Processamento) busca, decodifica e executa as instruções dos programas. É formada principalmente por ULA, UC e registradores.",
  ULA: "A ULA (Unidade Lógica e Aritmética) faz as operações matemáticas, como soma e subtração, e as lógicas, como AND, OR e comparações.",
  QUADCORE:
    "Quad core é um processador com quatro núcleos. Mais núcleos permitem executar mais tarefas ao mesmo tempo, desde que o programa aproveite esse paralelismo.",
  FLASH:
    "A memória flash é não volátil e regravável, apagada e escrita em blocos. É a base de pen drives, cartões de memória e SSDs.",
  DATABUS:
    "O data bus (barramento de dados) leva os dados entre CPU, memória e periféricos, nos dois sentidos. Sua largura, em bits, define quantos bits trafegam por vez.",
  DMA: "O DMA (Acesso Direto à Memória) deixa um periférico trocar dados com a memória sem passar pela CPU, que fica livre para executar outras tarefas.",
  MEMORIADEMASSA:
    "A memória de massa (armazenamento) guarda grandes volumes de dados de forma permanente, como HD e SSD. É mais lenta, mas bem mais barata por byte que a RAM.",
  RAM: "A RAM (Memória de Acesso Aleatório) é a memória principal. Guarda os programas e dados em uso, é volátil e perde o conteúdo quando falta energia.",
  UC: "A UC (Unidade de Controle) busca cada instrução na memória, a decodifica e envia sinais de controle para as outras partes executarem. Ela coordena a CPU.",
  CACHE:
    "A cache é uma memória pequena e muito rápida entre a CPU e a RAM. Guarda cópias do que é mais usado, para o processador esperar menos.",
  ROM: "A ROM (Memória Somente de Leitura) é não volátil e já vem gravada de fábrica. Costuma guardar o programa de inicialização, que liga o computador.",
  MICROCONTROLADOR:
    "O microcontrolador é um computador completo em um só chip, com CPU, memória e entradas e saídas. É usado em sistemas embarcados, como o Arduino.",
  ADDRESSBUS:
    "O address bus (barramento de endereço) leva o endereço da posição de memória ou do dispositivo a ser acessado, em um só sentido: da CPU para fora.",
};

const inputs = []; 
const casas = []; 
const esperada = []; 

let totalLetras = 0;
let direcaoAtual = "H";

let tentativas = 0; 
let inicio = null; 

function posicao(p, i) {
  if (p.direcao === "H") {
    return { l: p.linha, c: p.coluna + i };
  }
  return { l: p.linha + i, c: p.coluna };
}

function casaPertence(p, linha, coluna) {
  if (p.direcao === "H") {
    return (
      linha === p.linha &&
      coluna >= p.coluna &&
      coluna < p.coluna + p.resposta.length
    );
  }
  return (
    coluna === p.coluna &&
    linha >= p.linha &&
    linha < p.linha + p.resposta.length
  );
}

function palavrasDaCasa(linha, coluna) {
  const lista = [];
  for (let i = 0; i < palavras.length; i++) {
    if (casaPertence(palavras[i], linha, coluna)) {
      lista.push(palavras[i]);
    }
  }
  return lista;
}

function esconderExplicacoes(linha, coluna) {
  const lista = palavrasDaCasa(linha, coluna);
  for (let i = 0; i < lista.length; i++) {
    lista[i].explicacaoEl.hidden = true;
  }
}

function focarCasa(linha, coluna) {
  if (linha < 0 || linha >= LINHAS || coluna < 0 || coluna >= COLUNAS) {
    return;
  }
  if (inputs[linha][coluna] !== null) {
    inputs[linha][coluna].focus();
  }
}

function andar(linha, coluna, passo) {
  if (direcaoAtual === "H") {
    focarCasa(linha, coluna + passo);
  } else {
    focarCasa(linha + passo, coluna);
  }
}

function montarEsperada() {
  for (let l = 0; l < LINHAS; l++) {
    esperada.push([]);
    for (let c = 0; c < COLUNAS; c++) {
      esperada[l].push("");
    }
  }

  for (let i = 0; i < palavras.length; i++) {
    const p = palavras[i];
    for (let j = 0; j < p.resposta.length; j++) {
      const pos = posicao(p, j);
      esperada[pos.l][pos.c] = p.resposta.charAt(j);
    }
  }

  totalLetras = 0;
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      if (esperada[l][c] !== "") {
        totalLetras++;
      }
    }
  }
}

function numerarPalavras() {
  let numero = 0;
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      let comecaAlguma = false;
      for (let i = 0; i < palavras.length; i++) {
        if (palavras[i].linha === l && palavras[i].coluna === c) {
          if (!comecaAlguma) {
            numero++;
            comecaAlguma = true;
          }
          palavras[i].numero = numero;
        }
      }
    }
  }
}

function montarTabuleiro() {
  const tabela = document.getElementById("tabuleiro");

  for (let l = 0; l < LINHAS; l++) {
    const tr = document.createElement("tr");
    inputs.push([]);
    casas.push([]);

    for (let c = 0; c < COLUNAS; c++) {
      const td = document.createElement("td");
      let input = null;

      if (palavrasDaCasa(l, c).length > 0) {
        td.className = "letra";

        for (let i = 0; i < palavras.length; i++) {
          if (palavras[i].linha === l && palavras[i].coluna === c) {
            const span = document.createElement("span");
            span.className = "numero";
            span.textContent = palavras[i].numero;
            td.appendChild(span);
            break;
          }
        }

        input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.autocomplete = "off";
        input.setAttribute(
          "aria-label",
          "Linha " + (l + 1) + ", coluna " + (c + 1),
        );
        input.dataset.linha = l;
        input.dataset.coluna = c;
        input.addEventListener("input", aoDigitar);
        input.addEventListener("keydown", aoApertarTecla);
        input.addEventListener("focus", aoFocar);
        td.appendChild(input);
      }

      tr.appendChild(td);
      inputs[l].push(input);
      casas[l].push(td);
    }
    tabela.appendChild(tr);
  }
}

function criarItemDePista(p) {
  const li = document.createElement("li");
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "pista-btn";

  const numero = document.createElement("span");
  numero.className = "pista-numero";
  numero.textContent = p.numero + ".";

  const texto = document.createElement("span");
  texto.textContent = p.pista + " (" + p.resposta.length + " letras)";

  const status = document.createElement("span");
  status.className = "pista-status";

  botao.appendChild(numero);
  botao.appendChild(texto);
  botao.appendChild(status);
  li.appendChild(botao);

  const explicacao = document.createElement("p");
  explicacao.className = "explicacao";
  explicacao.textContent = "💡 " + explicacoes[p.resposta];
  explicacao.hidden = true;
  li.appendChild(explicacao);

  botao.addEventListener("click", function () {
    direcaoAtual = p.direcao;
    focarCasa(p.linha, p.coluna);
  });

  p.itemPista = li;
  p.explicacaoEl = explicacao;
  p.statusPista = status;
  return li;
}

function ordenarPorNumero(a, b) {
  return a.numero - b.numero;
}

function montarPistas() {
  const horizontais = [];
  const verticais = [];

  for (let i = 0; i < palavras.length; i++) {
    if (palavras[i].direcao === "H") {
      horizontais.push(palavras[i]);
    } else {
      verticais.push(palavras[i]);
    }
  }

  horizontais.sort(ordenarPorNumero);
  verticais.sort(ordenarPorNumero);

  const listaH = document.getElementById("pistas-horizontais");
  const listaV = document.getElementById("pistas-verticais");

  for (let i = 0; i < horizontais.length; i++) {
    listaH.appendChild(criarItemDePista(horizontais[i]));
  }
  for (let i = 0; i < verticais.length; i++) {
    listaV.appendChild(criarItemDePista(verticais[i]));
  }
}

function aoFocar(evento) {
  const input = evento.target;
  const l = Number(input.dataset.linha);
  const c = Number(input.dataset.coluna);

  const lista = palavrasDaCasa(l, c);
  if (lista.length === 1) {
    direcaoAtual = lista[0].direcao;
  }

  input.select();
}

function aoDigitar(evento) {
  const input = evento.target;
  const l = Number(input.dataset.linha);
  const c = Number(input.dataset.coluna);

  let valor = input.value.toUpperCase();
  valor = valor.replace(/[^A-Z]/g, "");
  input.value = valor;

  limparMarcas();
  esconderExplicacoes(l, c);

  if (valor !== "") {
    if (inicio === null) {
      inicio = Date.now();
    }
    andar(l, c, 1);
  }
}

function aoApertarTecla(evento) {
  const input = evento.target;
  const l = Number(input.dataset.linha);
  const c = Number(input.dataset.coluna);
  const tecla = evento.key;

  if (tecla === "ArrowRight") {
    direcaoAtual = "H";
    focarCasa(l, c + 1);
    evento.preventDefault();
  } else if (tecla === "ArrowLeft") {
    direcaoAtual = "H";
    focarCasa(l, c - 1);
    evento.preventDefault();
  } else if (tecla === "ArrowDown") {
    direcaoAtual = "V";
    focarCasa(l + 1, c);
    evento.preventDefault();
  } else if (tecla === "ArrowUp") {
    direcaoAtual = "V";
    focarCasa(l - 1, c);
    evento.preventDefault();
  } else if (tecla === "Backspace" && input.value === "") {
    // casa já vazia: volta e apaga a anterior
    andar(l, c, -1);
    if (direcaoAtual === "H" && c > 0 && inputs[l][c - 1] !== null) {
      inputs[l][c - 1].value = "";
      esconderExplicacoes(l, c - 1);
    } else if (direcaoAtual === "V" && l > 0 && inputs[l - 1][c] !== null) {
      inputs[l - 1][c].value = "";
      esconderExplicacoes(l - 1, c);
    }
    limparMarcas();
    evento.preventDefault();
  }
}

function limparMarcas() {
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      casas[l][c].classList.remove("certa");
      casas[l][c].classList.remove("errada");
    }
  }
  for (let i = 0; i < palavras.length; i++) {
    palavras[i].itemPista.classList.remove("certa");
    palavras[i].itemPista.classList.remove("errada");
    palavras[i].itemPista.classList.remove("incompleta");
    palavras[i].statusPista.textContent = "";
  }
}

function mensagemDoTux(porcentagem) {
  if (porcentagem < 25) {
    return "O Tux ainda está no começo da revisão. Releia as pistas!";
  }
  if (porcentagem < 50) {
    return "O Tux já sabe o básico, mas ainda tem muito para revisar.";
  }
  if (porcentagem < 75) {
    return "O Tux está pegando o jeito! Continue ajudando.";
  }
  return "Falta pouco! O Tux quase está pronto para a prova.";
}

function conferir() {
  limparMarcas();
  tentativas++;

  let letrasCertas = 0;
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      if (inputs[l][c] === null) {
        continue;
      }
      const valor = inputs[l][c].value;
      if (valor === "") {
        continue;
      }
      if (valor === esperada[l][c]) {
        casas[l][c].classList.add("certa");
        letrasCertas++;
      } else {
        casas[l][c].classList.add("errada");
      }
    }
  }

  let acertos = 0;
  for (let i = 0; i < palavras.length; i++) {
    const p = palavras[i];
    let certas = 0;
    let erradas = 0;

    for (let j = 0; j < p.resposta.length; j++) {
      const pos = posicao(p, j);
      const valor = inputs[pos.l][pos.c].value;
      if (valor === esperada[pos.l][pos.c]) {
        certas++;
      } else if (valor !== "") {
        erradas++;
      }
    }

    const resumo = certas + " de " + p.resposta.length + " letras";

    if (certas === p.resposta.length) {
      acertos++;
      p.itemPista.classList.add("certa");
      p.statusPista.textContent = "✔ certa";
      p.explicacaoEl.hidden = false;
    } else if (erradas > 0) {
      p.itemPista.classList.add("errada");
      p.statusPista.textContent = "✘ errada (" + resumo + ")";
    } else {
      p.itemPista.classList.add("incompleta");
      p.statusPista.textContent = "… incompleta (" + resumo + ")";
    }
  }

  document.getElementById("contador").textContent =
    acertos + " de " + palavras.length + " palavras";

  const porcentagem = Math.round((letrasCertas / totalLetras) * 100);
  document.getElementById("preparo-barra").style.width = porcentagem + "%";
  document.getElementById("preparo-texto").textContent =
    "Preparo do Tux para a prova: " + porcentagem + "%";

  const mensagem = document.getElementById("mensagem");
  if (acertos === palavras.length) {
    mensagem.textContent = "Missão cumprida! O Tux está pronto para a prova!";
    mostrarVitoria();
  } else {
    let dica = " Verde = letra certa, vermelho = letra errada.";
    if (acertos > 0) {
      dica = dica + " Cada palavra certa mostra uma explicação na pista.";
    }
    mensagem.textContent = mensagemDoTux(porcentagem) + dica;
  }
}

function calcularNota(qtdTentativas) {
  if (qtdTentativas <= 2) {
    return "10,0";
  }
  if (qtdTentativas <= 4) {
    return "9,0";
  }
  if (qtdTentativas <= 7) {
    return "8,0";
  }
  return "7,0";
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  if (min === 0) {
    return seg + "s";
  }
  return min + "min " + seg + "s";
}

function criarConfete() {
  const area = document.getElementById("confete");
  area.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const pedaco = document.createElement("span");
    pedaco.style.left = Math.random() * 100 + "%";
    pedaco.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    pedaco.style.animationDelay = Math.random() * 1.5 + "s";
    area.appendChild(pedaco);
  }
}

function mostrarVitoria() {
  let segundos = 0;
  if (inicio !== null) {
    segundos = Math.round((Date.now() - inicio) / 1000);
  }

  let textoTentativas = tentativas + " conferências";
  if (tentativas === 1) {
    textoTentativas = "1 conferência";
  }

  document.getElementById("vitoria-palavras").textContent =
    palavras.length + " de " + palavras.length;
  document.getElementById("vitoria-tentativas").textContent = textoTentativas;
  document.getElementById("vitoria-tempo").textContent =
    formatarTempo(segundos);
  document.getElementById("vitoria-nota").textContent =
    calcularNota(tentativas);

  criarConfete();
  document.getElementById("vitoria").hidden = false;
  document.getElementById("btn-jogar-de-novo").focus();
}

function fecharVitoria() {
  document.getElementById("vitoria").hidden = true;
  document.getElementById("confete").innerHTML = "";
}

function reiniciar() {
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      if (inputs[l][c] !== null) {
        inputs[l][c].value = "";
      }
    }
  }
  limparMarcas();
  fecharVitoria();
  for (let i = 0; i < palavras.length; i++) {
    palavras[i].explicacaoEl.hidden = true;
  }

  tentativas = 0;
  inicio = null;

  document.getElementById("contador").textContent =
    "0 de " + palavras.length + " palavras";
  document.getElementById("preparo-barra").style.width = "0%";
  document.getElementById("preparo-texto").textContent =
    "Preparo do Tux para a prova: 0%";
  document.getElementById("mensagem").textContent =
    "Tabuleiro limpo. Clique numa casa e ajude o Tux a estudar.";
  direcaoAtual = "H";
  focarCasa(palavras[0].linha, palavras[0].coluna);
}

montarEsperada();
numerarPalavras();
montarTabuleiro();
montarPistas();

document.getElementById("btn-conferir").addEventListener("click", conferir);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);
document
  .getElementById("btn-jogar-de-novo")
  .addEventListener("click", reiniciar);
document.getElementById("btn-fechar").addEventListener("click", fecharVitoria);

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    fecharVitoria();
  }
});
