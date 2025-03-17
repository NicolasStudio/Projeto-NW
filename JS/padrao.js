// Função para alternar a exibição da caixa de login
function Cadastro(){
    var displayLogin = document.querySelector('.box-container-login');

    // Verifica se o elemento está oculto e alterna sua visibilidade
    if (displayLogin === 'none') {  // ❌ ERRO: deveria ser displayLogin.style.display === 'none'
        displayLogin.style.display = 'flex'; // Exibe a caixa de login
    } else {
        displayLogin.style.display = 'none'; // Oculta a caixa de login
    }
}

// Função para aplicar a máscara de CPF (XXX.XXX.XXX-XX)
function mascararCPF(input) {
    // Remove todos os caracteres que não sejam dígitos
    var digitos = input.value.replace(/\D/g, '');

    // Aplica a máscara conforme a quantidade de dígitos digitados
    if (digitos.length > 0) {
        if (digitos.length <= 3) {
            input.value = digitos;
        } else if (digitos.length <= 6) {
            input.value = digitos.substring(0, 3) + '.' + digitos.substring(3);
        } else if (digitos.length <= 9) {
            input.value = digitos.substring(0, 3) + '.' + digitos.substring(3, 6) + '.' + digitos.substring(6);
        } else {
            input.value = digitos.substring(0, 3) + '.' + digitos.substring(3, 6) + '.' + digitos.substring(6, 9) + '-' + digitos.substring(9);
        }
    }
}

// Função para validar CPF
function validarCPF(input) {
    var cpf = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        mostrarMensagemErro("CPF inválido. Verifique e tente novamente.");
        return false;
    }

    var soma = 0, resto;

    // Validação do primeiro dígito verificador
    for (var i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) {
        mostrarMensagemErro("CPF inválido. Verifique e tente novamente.");
        return false;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (var i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) {
        mostrarMensagemErro("CPF inválido. Verifique e tente novamente.");
        return false;
    }

    return true; // CPF válido
}

// Função para exibir a mensagem de erro por 5 segundos
function mostrarMensagemErro(mensagem) {
    var displayAlertError = document.querySelector('.boxAlertError');
    var spanError = displayAlertError.querySelector('span');

    displayAlertError.style.display = 'block';
    spanError.innerText = mensagem;

    setTimeout(() => {
        displayAlertError.style.display = 'none';
    }, 5000);
}

// Função para aplicar a máscara de CEP (XXXXX-XXX)
function mascararCEP(input) {
    // Remove todos os caracteres que não sejam dígitos
    var digitos = input.value.replace(/\D/g, '');

    // Aplica a máscara conforme a quantidade de dígitos digitados
    if (digitos.length > 0) {
        if (digitos.length <= 5) {
            input.value = digitos;
        } else {
            input.value = digitos.substring(0, 5) + '-' + digitos.substring(5);
        }
    }
}

// BUSCAR AUTOMATICAMENTE O CEP
async function buscarCEP(cep) {
    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {
        try {
            let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            let data = await response.json();

            if (!data.erro) {
                preencherCamposEndereco(data);
                esconderMensagemErro(); // Se encontrar o CEP, oculta o erro
            } else {
                limparCamposEndereco();
                mostrarMensagemErro("CEP não encontrado.");
            }
        } catch (error) {
            mostrarMensagemErro("Erro ao buscar CEP. Por favor, tente novamente mais tarde.");
        }
    } else {
        limparCamposEndereco();
    }
}

// FUNÇÃO PARA PREENCHER OS CAMPOS DO ENDEREÇO
function preencherCamposEndereco(data) {
    document.getElementById('logradouro').value = data.logradouro || "";
    document.getElementById('bairro').value = data.bairro || "";
    document.getElementById('cidade').value = data.localidade || "";
    document.getElementById('estado').value = data.uf || "";
}

// FUNÇÃO PARA LIMPAR OS CAMPOS DO ENDEREÇO
function limparCamposEndereco() {
    document.getElementById('logradouro').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

// FUNÇÃO PARA MOSTRAR MENSAGEM DE ERRO
function mostrarMensagemErro(mensagem) {
    let displayAlertError = document.querySelector('.boxAlertError');
    let spanError = displayAlertError.querySelector('span');

    displayAlertError.style.display = 'block';
    spanError.innerText = mensagem;

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        esconderMensagemErro();
    }, 5000);
}

// FUNÇÃO PARA ESCONDER A MENSAGEM DE ERRO
function esconderMensagemErro() {
    let displayAlertError = document.querySelector('.boxAlertError');
    displayAlertError.style.display = 'none';
}

// Função para redirecionar o usuário para o painel principal ---- REMOVER FUTURAMENTE ----
function Entrar() {
    window.location.href = "PainelPrincipal.html"; // Redireciona para outra página
}

// Função para redirecionar o usuário para o painel principal
function home(){
    window.location.href = "PainelPrincipal.html"; // Redireciona para outra página
}

function criarChamado(){
    window.location.href = "cadastrarChamado.html"; // Redireciona para outra página
}

function consultarChamado(){
    window.location.href = "consultaChamado.html"; // Redireciona para outra página
}