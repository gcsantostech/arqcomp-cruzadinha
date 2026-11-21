# <img src="assets/tux-logo.png" alt="Logo" width="30" align="absmiddle"> Cruzadinha Profundo Tux

Jogo de palavras cruzadas sobre **Arquitetura Computacional**, feito com HTML, CSS e JavaScript puros. O aluno descobre os termos a partir de pistas e confere as respostas direto no tabuleiro.

**Jogue aqui:** [Ajude o Profundo Tux](https://gcsantostech.github.io/arqcomp-cruzadinha/)

## Como jogar

1. Leia as pistas na lista **Horizontais** e **Verticais**. O número de cada pista aparece na primeira casa da palavra no tabuleiro, e cada pista informa quantas letras a resposta tem.
2. Clique numa casa e digite a letra. O cursor avança sozinho para a próxima casa da palavra.
3. Use as **setas do teclado** para mover o cursor e o **Backspace** para voltar e apagar.
4. Clique numa pista para ir direto à primeira casa da palavra correspondente.
5. Clique em **Conferir** para ver o resultado:
   - casas e pistas em **verde** indicam palavras certas (✔);
   - casas e pistas em **vermelho** indicam palavras erradas ou incompletas (✘);
   - o contador mostra quantas palavras você acertou, por exemplo `8 de 16 palavras`.
6. Clique em **Reiniciar** para limpar o tabuleiro e começar de novo.

As respostas são escritas em maiúsculas, sem acento e sem espaço (por exemplo, "memória de massa" vira `MEMORIADEMASSA`).

## Palavras e pistas

O tabuleiro usa as 16 palavras da lista, todas cruzadas entre si.

### Horizontais

| Nº | Resposta | Pista |
|----|----------|-------|
| 1 | DUALCORE | Processador com dois núcleos de execução no mesmo chip. |
| 4 | CPU | Componente que executa as instruções dos programas, considerado o cérebro do computador. |
| 8 | DATABUS | Via bidirecional que transporta o conteúdo lido ou gravado entre processador e memória. |
| 10 | MEMORIADEMASSA | Guarda arquivos e programas de forma permanente, como HD e SSD. |
| 15 | MICROCONTROLADOR | Chip único que reúne processador, memória e periféricos, típico de placas como Arduino. |
| 16 | ADDRESSBUS | Via de sentido único que indica qual posição da memória será acessada. |

### Verticais

| Nº | Resposta | Pista |
|----|----------|-------|
| 2 | REGISTRADORES | Pequenos espaços dentro do processador que guardam operandos e resultados temporários. |
| 3 | EEPROM | Memória não volátil regravável por pulsos elétricos, alterando um byte por vez. |
| 5 | ULA | Parte do processador que realiza somas, subtrações e comparações entre números. |
| 6 | QUADCORE | Processador com quatro núcleos de execução no mesmo chip. |
| 7 | FLASH | Memória não volátil regravável, apagada em blocos, comum em pen drives e SSDs. |
| 9 | DMA | Mecanismo que move blocos entre periférico e memória sem sobrecarregar o processador. |
| 11 | RAM | Memória volátil principal, onde ficam os programas em execução; perde tudo sem energia. |
| 12 | UC | Parte do processador que busca e decodifica cada instrução e coordena sua execução. |
| 13 | CACHE | Memória rápida intermediária entre processador e memória principal, guardando cópias do que é muito usado. |
| 14 | ROM | Memória não volátil gravada na fabricação, cujo conteúdo normalmente não se altera. |

## Como rodar no computador

Não precisa instalar nada. Baixe os três arquivos na mesma pasta e abra o `index.html` no navegador.

```
.
├── index.html   # estrutura da página
├── style.css    # visual do jogo
└── script.js    # lógica: tabuleiro, pistas, conferir e reiniciar
```

## Tecnologias

- HTML5
- CSS3
- JavaScript puro, sem bibliotecas