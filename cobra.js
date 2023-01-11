// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/


// Declaração de variáveis e constantes

var tela;
var ctx;
var Pontos = 0;
var Macas = 0;

var Pontuacao_HTML = document.getElementById('pontos');
var Macas_HTML = document.getElementById('macas');

var Iniciar = document.getElementById('iniciar');
    Iniciar.onclick = iniciar;

var CaBeCa = 0;
var BoLa = 0;

var cabeca;
var maca;
var bola;
var parede;

var pontos;
var maca_x;
var maca_y;
var parede_x;
var parede_y;

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
var noJogo = true;    

const TAMANHO_PONTO = 10;
const ALEATORIO_MAXIMO = 29;
const ATRASO = 140;
const C_ALTURA = 300;
const C_LARGURA = 300;    

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla

//iniciar(); // Chama função inicial do jogo


// Definição das funções

function iniciar() {
    tela = document.getElementById("tela");
    ctx = tela.getContext("2d");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);

    carregarImagens();
    criarCobra();
    localizarMaca();
    localizarParede();
    setTimeout("cicloDeJogo()", ATRASO);
    Audio('file:///C:/Users/raiss/OneDrive/%C3%81rea%20de%20Trabalho/jogo%20da%20cobracao/jogo%20do%20jadson/bandamagnificos-verdadeiro-amor.mp3');
}

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = CaBeCa;
    
    bola = new Image();
    bola.src = BoLa; 
    
    maca = new Image();
    maca.src = "maca.png";

    parede = new Image();
    parede.src = "parede.png";
}

function criarCobra() {
    pontos = 3;
	
    for (var z = 0; z < pontos; z++) {
        x[z] = 50 - z * TAMANHO_PONTO;
        y[z] = 50;
    }
}

function localizarMaca() {
    var r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    maca_x = r * TAMANHO_PONTO;

    r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    maca_y = r * TAMANHO_PONTO;
}

function localizarParede() {
    var r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    parede_x = r * TAMANHO_PONTO;

    r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
    parede_y = r * TAMANHO_PONTO;
}

function cicloDeJogo() {
    if (noJogo) {
        verificarMaca();
        verificarColisao();
        mover();
        fazerDesenho();
        setTimeout("cicloDeJogo()", ATRASO);
    }
}

function verificarMaca() {
    if ((x[0] == maca_x) && (y[0] == maca_y)) {
        pontos++;
        Pontos+=100;
        Macas++;
        Macas_HTML.innerHTML = Macas;
        Pontuacao_HTML.innerHTML = Pontos;
        localizarMaca();
    }
}

function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
    }

    if ((x[0] == parede_x) && (y[0] == parede_y)) {
        noJogo = false;
    }

    if (y[0] >= C_ALTURA) {
        noJogo = false;
    }

    if (y[0] < 0) {
       noJogo = false;
    }

    if (x[0] >= C_LARGURA) {
      noJogo = false;
    }

    if (x[0] < 0) {
      noJogo = false;
    }
}

function mover() {
    for (var z = pontos; z > 0; z--) {
        x[z] = x[z-1];
        y[z] = y[z-1];
    }

    if (paraEsquerda) {
        x[0] -= TAMANHO_PONTO;
    }

    if (paraDireita) {
        x[0] += TAMANHO_PONTO;
    }

    if (paraCima) {
        y[0] -= TAMANHO_PONTO;
    }

    if (paraBaixo) {
        y[0] += TAMANHO_PONTO;
    }
}

function Audio(texto) {
	var soundffec = document.createElement('audio');
	soundffec.setAttribute('src', texto);
	soundffec.play();
}

function fazerDesenho() {
    ctx.clearRect(0, 0, C_LARGURA, C_ALTURA);
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);
	
    if (noJogo) {
        ctx.drawImage(maca, maca_x, maca_y);
        ctx.drawImage(parede, parede_x, parede_y);
        for (var z = 0; z < pontos; z++) {
            if (z == 0) {
                ctx.drawImage(cabeca, x[z], y[z]);
            } else {
                ctx.drawImage(bola, x[z], y[z]);
            }
        }
    } else {
        fimDeJogo();
    }        
}

function fimDeJogo() {
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 18px serif";
    ctx.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);
}

function verificarTecla(e) {
    var tecla = e.keyCode;

    if ((tecla == TECLA_ESQUERDA) && (!paraDireita)) {
        paraEsquerda = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_DIREITA) && (!paraEsquerda)) {
        paraDireita = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_ACIMA) && (!paraBaixo)) {
        paraCima = true;
        paraDireita = false;
        paraEsquerda = false;
    }

    if ((tecla == TECLA_ABAIXO) && (!paraCima)) {
        paraBaixo = true;
        paraDireita = false;
        paraEsquerda = false;
    }
    
    if(tecla == 49) {
        CaBeCa = "cabeca_1.png"
        BoLa = "ponto_1.png"
    }
    if(tecla == 50) {
        CaBeCa = "cabeca_2.png"
        BoLa = "ponto_2.png"
    }
    if(tecla == 51) {
        CaBeCa = "cabeca_pati.png"
        BoLa = "ponto_pati.png"
    }
}