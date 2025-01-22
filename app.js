
//Lista para armazenar oos números já sorteados
let listaDeNumerosSorteados = [];
// Variável que armazena o numero que limita o intervalo de escolha de número secreto 
let numeroLimite = 10;

// Função para exibir textos na tela
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Voz feminina lendo os textos na tela
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função para gerar numero aleatorio automaticamente para ser adivinhado
function numeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumeros = listaDeNumerosSorteados.length
    // Verificando se a lista está cheia e esvaziando caso true
    if(quantidadeNumeros == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    // Verificando se o número gerado já está incluso na lista se true, rodar a função novamente 
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return numeroAleatorio();
    // Se não estiver na lista: adicionar na lista e retornar o número gerado
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
} 

// Função que limpa o campo se selecionado o botão "novo jogo"
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para exibir mensagens iniciais
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Função para reiniciar o jogo ao clicar em "novo jogo"
function reiniciarJogo(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Armazenando o retorno da função numeroAleatorio() na variável numeroSecreto
let numeroSecreto = numeroAleatorio();
// Variável tentativas armazenando a quantidade de tentativa inicial
let tentativas = 1;

// Chamando a função exibirMensagemInicial para aparecer as mensagens iniciais
exibirMensagemInicial()

//  Função que verifica o chute do jogador 
function verificarChute(){
    // Pegando o valor digitado no campo
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);

    // Veirificando se chute equivale ao número secreto gerado automaticamente
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        // Verificando a quantidade de tentativas para o nome ser escrito no plural ou singular caso acerte de primeira
        pluralSingular = tentativas > 1? 'tentativas':'tentativa';
        // Armazenando mensagem que informa o acerto e o número de tentativas 
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${pluralSingular}!`;
        // Chamando a função exibirTextoNaTela para exibir a mensagemTentativas
        exibirTextoNaTela('p', mensagemTentativas);
        // Habilitando o botão "Novo Jogo"
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
        // Exibindo texto de ajuda se o número é maior ou menor
        exibirTextoNaTela('p', 'O número secreto é menor');
        } else{
        exibirTextoNaTela('p', 'O número secreto é maior');
        }
        // Somando +1 ao número de tentativas já que errou
        tentativas++;
        // Limpando o campo de escrita
        limparCampo();
    }
}






