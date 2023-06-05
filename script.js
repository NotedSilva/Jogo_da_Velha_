let tabuleiro = Array(9).fill('');
let jogadorAtual = 'X';
let jogoTerminado = false;

function imprimirTabuleiro() {
  const squares = document.getElementsByClassName('square');
  for (let i = 0; i < 9; i++) {
    squares[i].innerText = tabuleiro[i];
    squares[i].className = 'square ' + tabuleiro[i];
  }
}

function verificarVitoria(jogador) {
  const linhas = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  const colunas = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
  const diagonais = [[0, 4, 8], [2, 4, 6]];

  for (const linha of linhas.concat(colunas, diagonais)) {
    if (linha.every((pos) => tabuleiro[pos] === jogador)) {
      return true;
    }
  }

  return false;
}

function fazerJogada(posicao) {
  if (!jogoTerminado && tabuleiro[posicao] === '') {
    tabuleiro[posicao] = jogadorAtual;
    imprimirTabuleiro();

    if (verificarVitoria(jogadorAtual)) {
      const status = document.querySelector('.status');
      status.innerText = `Jogador ${jogadorAtual} venceu!`;
      jogoTerminado = true;
      return;
    }

    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';

    if (!tabuleiro.includes('')) {
      const status = document.querySelector('.status');
      status.innerText = 'Empate!';
      jogoTerminado = true;
    } else if (jogadorAtual === 'O') {
      fazerJogadaBot();
    }
  }
}

function fazerJogadaBot() {
  const posicoesDisponiveis = tabuleiro.reduce((acc, posicao, index) => {
    if (posicao === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  const jogada = posicoesDisponiveis[Math.floor(Math.random() * posicoesDisponiveis.length)];
  fazerJogada(jogada);
}

function reiniciarJogo() {
  tabuleiro = Array(9).fill('');
  jogadorAtual = 'X';
  jogoTerminado = false;
  const status = document.querySelector('.status');
  status.innerText = '';
  imprimirTabuleiro();
}
