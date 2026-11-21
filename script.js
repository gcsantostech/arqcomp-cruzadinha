// =====================================================
// Cruzadinha Profundo Tux
// =====================================================

// Tamanho do tabuleiro
const LINHAS = 13;
const COLUNAS = 16;

// As 16 palavras do jogo.
// linha e coluna: onde a palavra começa (começando do 0)
// direcao: "H" = horizontal, "V" = vertical
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

// Matrizes para guardar os elementos de cada casa
const inputs = []; // inputs[linha][coluna] -> campo de texto (ou null)
const casas = []; // casas[linha][coluna] -> célula <td>

// Direção usada ao digitar (para andar para a próxima casa)
let direcaoAtual = "H";

// -----------------------------------------------------
// Funções auxiliares
// -----------------------------------------------------

// Diz se a casa (linha, coluna) faz parte da palavra p
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

// Devolve as palavras que passam por uma casa
function palavrasDaCasa(linha, coluna) {
  const lista = [];
  for (let i = 0; i < palavras.length; i++) {
    if (casaPertence(palavras[i], linha, coluna)) {
      lista.push(palavras[i]);
    }
  }
  return lista;
}

// Lê as letras digitadas para uma palavra
function lerPalavra(p) {
  let texto = "";
  for (let i = 0; i < p.resposta.length; i++) {
    let l = p.linha;
    let c = p.coluna;
    if (p.direcao === "H") {
      c = c + i;
    } else {
      l = l + i;
    }
    texto = texto + inputs[l][c].value;
  }
  return texto;
}

// Coloca o cursor numa casa, se ela existir
function focarCasa(linha, coluna) {
  if (linha < 0 || linha >= LINHAS || coluna < 0 || coluna >= COLUNAS) {
    return;
  }
  if (inputs[linha][coluna] !== null) {
    inputs[linha][coluna].focus();
  }
}

// Anda uma casa na direção atual (passo = 1 avança, -1 volta)
function andar(linha, coluna, passo) {
  if (direcaoAtual === "H") {
    focarCasa(linha, coluna + passo);
  } else {
    focarCasa(linha + passo, coluna);
  }
}

// -----------------------------------------------------
// Montagem do tabuleiro e das pistas
// -----------------------------------------------------

function numerarPalavras() {
  // Percorre o tabuleiro de cima para baixo, da esquerda para a direita.
  // Toda casa onde começa uma palavra recebe o próximo número.
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

        // número da pista (se alguma palavra começa aqui)
        for (let i = 0; i < palavras.length; i++) {
          if (palavras[i].linha === l && palavras[i].coluna === c) {
            const span = document.createElement("span");
            span.className = "numero";
            span.textContent = palavras[i].numero;
            td.appendChild(span);
            break;
          }
        }

        // campo onde o jogador digita
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

  // Clicar na pista leva o cursor para a primeira casa da palavra
  botao.addEventListener("click", function () {
    direcaoAtual = p.direcao;
    focarCasa(p.linha, p.coluna);
  });

  p.itemPista = li;
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

// -----------------------------------------------------
// Eventos do teclado
// -----------------------------------------------------

function aoFocar(evento) {
  const input = evento.target;
  const l = Number(input.dataset.linha);
  const c = Number(input.dataset.coluna);

  // Se só passa uma palavra por aqui, usa a direção dela
  const lista = palavrasDaCasa(l, c);
  if (lista.length === 1) {
    direcaoAtual = lista[0].direcao;
  }

  input.select(); // a próxima letra digitada substitui a atual
}

function aoDigitar(evento) {
  const input = evento.target;
  const l = Number(input.dataset.linha);
  const c = Number(input.dataset.coluna);

  // aceita só letras de A a Z, em maiúsculo
  let valor = input.value.toUpperCase();
  valor = valor.replace(/[^A-Z]/g, "");
  input.value = valor;

  limparMarcas();

  if (valor !== "") {
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
    } else if (direcaoAtual === "V" && l > 0 && inputs[l - 1][c] !== null) {
      inputs[l - 1][c].value = "";
    }
    limparMarcas();
    evento.preventDefault();
  }
}

// -----------------------------------------------------
// Conferir, contador e reiniciar
// -----------------------------------------------------

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
    palavras[i].statusPista.textContent = "";
  }
}

// Pinta as casas de uma palavra com a classe indicada
function marcarCasas(p, classe) {
  for (let i = 0; i < p.resposta.length; i++) {
    let l = p.linha;
    let c = p.coluna;
    if (p.direcao === "H") {
      c = c + i;
    } else {
      l = l + i;
    }
    // casa compartilhada: se a palavra está certa, tira o vermelho
    if (classe === "certa") {
      casas[l][c].classList.remove("errada");
    }
    casas[l][c].classList.add(classe);
  }
}

function conferir() {
  limparMarcas();
  let acertos = 0;

  // 1ª passada: marca as palavras erradas (e a pista correspondente)
  for (let i = 0; i < palavras.length; i++) {
    const p = palavras[i];
    if (lerPalavra(p) !== p.resposta) {
      marcarCasas(p, "errada");
      p.itemPista.classList.add("errada");
      p.statusPista.textContent = "✘ errada";
    }
  }

  // 2ª passada: marca as certas (casas compartilhadas ficam verdes)
  for (let i = 0; i < palavras.length; i++) {
    const p = palavras[i];
    if (lerPalavra(p) === p.resposta) {
      acertos++;
      marcarCasas(p, "certa");
      p.itemPista.classList.add("certa");
      p.statusPista.textContent = "✔ certa";
    }
  }

  document.getElementById("contador").textContent =
    acertos + " de " + palavras.length + " palavras";

  const mensagem = document.getElementById("mensagem");
  if (acertos === palavras.length) {
    mensagem.textContent = "Parabéns! Você acertou todas as palavras!";
  } else {
    mensagem.textContent =
      "Em verde estão as certas e em vermelho as erradas ou incompletas. Corrija e confira de novo.";
  }
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
  document.getElementById("contador").textContent =
    "0 de " + palavras.length + " palavras";
  document.getElementById("mensagem").textContent =
    "Tabuleiro limpo. Clique numa casa e digite.";
  direcaoAtual = "H";
  focarCasa(palavras[0].linha, palavras[0].coluna);
}

// -----------------------------------------------------
// Início do jogo
// -----------------------------------------------------

numerarPalavras();
montarTabuleiro();
montarPistas();

document.getElementById("btn-conferir").addEventListener("click", conferir);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);
