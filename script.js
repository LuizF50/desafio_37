/**
 * Decodifica uma mensagem galáctica onde os números são posições ao quadrado das letras no alfabeto
 * @param {string} mensagemCodificada - Mensagem com números separados por espaços
 * @returns {string} Mensagem decodificada
 */
function decodificarCodigoGalatico(mensagemCodificada) {
    // Validar se a entrada é uma string vazia ou inválida
    if (!mensagemCodificada || typeof mensagemCodificada !== 'string') {
        throw new Error('Mensagem inválida! Por favor, forneça uma string não vazia.');
    }

    // Dividir a mensagem em números individuais e remover espaços extras
    const numeros = mensagemCodificada.trim().split(/\s+/).map(num => num.trim());

    // Função auxiliar para validar se um número é um quadrado perfeito e está no intervalo válido
    const ehNumeroValido = (num) => {
        const raizQuadrada = Math.sqrt(num);
        return Number.isInteger(raizQuadrada) && raizQuadrada >= 1 && raizQuadrada <= 26;
    };

    // Decodificar cada número
    const letrasDecodificadas = numeros.map(numero => {
        const num = parseInt(numero);
        
        // Verificar se o número é válido
        if (isNaN(num) || !ehNumeroValido(num)) {
            throw new Error(`Número ${numero} não é uma posição válida no alfabeto!`);
        }

        // Calcular a posição na tabela ASCII do caractere
        const posicaoAlfabeto = Math.sqrt(num) - 1;
        const codigoAscii = 97 + posicaoAlfabeto; // 97 é o código ASCII de 'a'
        
        // Converter para letra
        return String.fromCharCode(codigoAscii);
    });

    // Juntar todas as letras em uma única string
    return letrasDecodificadas.join(' ');
}

/**
 * Função chamada ao clicar no botão "Decodificar"
 */
function decodificarMensagem() {
    const input = document.getElementById('mensagemCodificada').value;
    const resultado = document.getElementById('mensagemDecodificada');

    try {
        const mensagemDecodificada = decodificarCodigoGalatico(input);
        resultado.textContent = mensagemDecodificada;
        resultado.style.color = 'black'; // Cor padrão para o texto
    } catch (erro) {
        resultado.textContent = `Erro: ${erro.message}`;
        resultado.style.color = 'red'; // Cor de erro
    }
}