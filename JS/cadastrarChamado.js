// Escondendo SERVIÇOS CATEGORIAS E SUB-CATEGORIA

document.addEventListener('DOMContentLoaded', function() {
    const servicoSelect = document.getElementById("servico");
    const categoriaSelect = document.getElementById("categoria");
    const subCategoriaSelect = document.getElementById("sub-categoria");

    // Evento 'change' no select de Serviço
    servicoSelect.addEventListener("change", function() {
        let selectedService = this.value;

        // Ocultar todas as opções de categoria
        document.querySelectorAll("#categoria option").forEach(option => {
            option.style.display = "none";
        });

        // Mostrar a opção vazia
        document.querySelector("#categoria option[value='null']").style.display = "block";

        // Exibir as opções da categoria correspondente
        if (selectedService === "appPMESP") {
            document.querySelectorAll(".appPMESP").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "appDiversos") {
            document.querySelectorAll(".appDiversos").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "copAxon") {
            document.querySelectorAll(".copAxon").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "copMotorolla") {
            document.querySelectorAll(".copMotorolla").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "correio") {
            document.querySelectorAll(".correio").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "dciTelefoniaAdm") {
            document.querySelectorAll(".dciTelefoniaAdm").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "hardware") {
            document.querySelectorAll(".hardware").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "plataformasMoveis") {
            document.querySelectorAll(".plataformasMoveis").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "radioComunicacao") {
            document.querySelectorAll(".radioComunicacao").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "rede") {
            document.querySelectorAll(".rede").forEach(option => {
                option.style.display = "block";
            });
        } else if (selectedService === "segActiveDirectory") {
            document.querySelectorAll(".segActiveDirectory").forEach(option => {
                option.style.display = "block";
            });
        }else if (selectedService === "servidor") {
            document.querySelectorAll(".servidor").forEach(option => {
                option.style.display = "block";
            });
        }


        // Resetar a seleção da categoria
        categoriaSelect.value = "null";
        subCategoriaSelect.style.display = "none"; // Esconder o select de sub-categoria inicialmente
        subCategoriaSelect.value = "null"; // Resetar a seleção
    });

        // Evento 'change' no select de Categoria
        categoriaSelect.addEventListener("change", function() {
            let selectedCategory = this.value;

            // Verificar se uma categoria foi selecionada
            if (selectedCategory !== "null") {
                // Ocultar todas as opções de sub-categoria
                document.querySelectorAll("#sub-categoria option").forEach(option => {
                    option.style.display = "none";
                });

                // Exibir as opções que correspondem à categoria selecionada
                document.querySelectorAll(`#sub-categoria option.${selectedCategory}`).forEach(option => {
                    option.style.display = "block";
                });

                // Exibir o select de sub-categoria
                subCategoriaSelect.style.display = "block";
            } else {
                // Se nenhuma categoria for selecionada, esconder o select de sub-categoria
                subCategoriaSelect.style.display = "none";
                subCategoriaSelect.value = "null"; // Resetar a seleção
            }
        });

});

// Input files
let inputFiles = [];

function handleFiles(input) {
    for (let file of input.files) {
        inputFiles.push(file);
        displayFile(file);
    }
    input.value = "";
}

function displayFile(file) {
    const fileList = document.getElementById("dp-files");
    const listItem = document.createElement("li");
    listItem.className = "file-item";
    
    const fileLink = document.createElement("span");
    fileLink.className = "file-link";
    fileLink.textContent = file.name;
    fileLink.onclick = () => openModal(file);
    
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.onclick = () => removeFile(listItem, file.name);
    
    listItem.appendChild(fileLink);
    listItem.appendChild(removeButton);
    fileList.appendChild(listItem);
}

function openModal(file) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = "";
    
    const reader = new FileReader();
    reader.onload = function (e) {
        let preview;
        if (file.type.startsWith("image")) {
            preview = document.createElement("img");
        } else if (file.type === "application/pdf") {
            preview = document.createElement("iframe");
        }
        if (preview) {
            preview.src = e.target.result;
            modalContent.appendChild(preview);
            modal.style.display = "flex";
        }
    };
    reader.readAsDataURL(file);
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function removeFile(listItem, fileName) {
    inputFiles = inputFiles.filter(file => file.name !== fileName);
    listItem.remove();
}

// Atualizar campo Titulo
document.addEventListener("DOMContentLoaded", function () {
    const servico = document.getElementById("servico");
    const categoria = document.getElementById("categoria");
    const subCategoria = document.getElementById("sub-categoria");
    const titulo = document.getElementById("titulo");

    function atualizarTitulo() {
        const servicoSelecionado = servico.options[servico.selectedIndex].text.trim();
        const categoriaSelecionada = categoria.options[categoria.selectedIndex]?.text.trim() || "";
        const subCategoriaSelecionada = subCategoria.options[subCategoria.selectedIndex]?.text.trim() || "";

        let tituloFinal = [servicoSelecionado, categoriaSelecionada, subCategoriaSelecionada]
            .filter(texto => texto && texto !== "") // Remove vazios
            .join(" - "); // Junta os textos com separador

        titulo.value = tituloFinal;
    }

    servico.addEventListener("change", atualizarTitulo);
    categoria.addEventListener("change", atualizarTitulo);
    subCategoria.addEventListener("change", atualizarTitulo);
});

// Mascara 1º telefone
document.addEventListener("DOMContentLoaded", function () {
    const telefoneSolicitante = document.getElementById("telefoneSolicitante");

    telefoneSolicitante.addEventListener("input", function () {
        let telefoneValue = telefoneSolicitante.value.replace(/\D/g, ''); // Remove tudo que não é número
        if (telefoneValue.length <= 10) {
            telefoneValue = telefoneValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Formato (XX) XXXX-XXXX
        } else {
            telefoneValue = telefoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formato (XX) XXXXX-XXXX
        }
        telefoneSolicitante.value = telefoneValue; // Aplica a máscara
    });
});

// Mascara 2º telefone
document.addEventListener("DOMContentLoaded", function () {
    const telefoneAfetado = document.getElementById("telefoneAfetado");

    telefoneAfetado.addEventListener("input", function () {
        let telefoneValue = telefoneAfetado.value.replace(/\D/g, ''); // Remove tudo que não é número
        if (telefoneValue.length <= 10) {
            telefoneValue = telefoneValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Formato (XX) XXXX-XXXX
        } else {
            telefoneValue = telefoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formato (XX) XXXXX-XXXX
        }
        telefoneAfetado.value = telefoneValue; // Aplica a máscara
    });
});

// Inserindo Hora atual
document.addEventListener("DOMContentLoaded", function () {
    const dataHoraSpan = document.querySelector(".dataHora");

    function obterDataHoraBrasilia() {
        const data = new Date();

        // Definindo opções para a data e a hora
        const optionsData = {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };

        const optionsHora = {
            timeZone: "America/Sao_Paulo",
            hour12: false, // Para formato 24h
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        // Formatar data e hora
        const dataFormatada = new Intl.DateTimeFormat('pt-BR', optionsData).format(data);
        const horaFormatada = new Intl.DateTimeFormat('pt-BR', optionsHora).format(data);

        // Criar a string final
        const dataHora = `Data: ${dataFormatada} - Hora: ${horaFormatada}`;

        return dataHora;
    }

    // Insere a data e hora no span
    dataHoraSpan.textContent = obterDataHoraBrasilia();
});






// --- pegando dados ---
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btnSalvarChamado").addEventListener("click", function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Captura os valores dos inputs de texto
        let dadosFormulario = new FormData();
        dadosFormulario.append("protocolo", document.querySelector(".protocolo").innerText);
        dadosFormulario.append("dataHora", document.querySelector(".dataHora").innerText);
        dadosFormulario.append("analista", document.querySelector(".analista").innerText);
        dadosFormulario.append("solicitante", document.querySelector("#solicitante").value);
        dadosFormulario.append("telefoneSolicitante", document.querySelector("#telefoneSolicitante").value);
        dadosFormulario.append("afetado", document.querySelector("#afetado").value);
        dadosFormulario.append("telefoneAfetado", document.querySelector("#telefoneAfetado").value);
        dadosFormulario.append("contato", document.querySelector("#contato").value);
        dadosFormulario.append("opm", document.querySelector("#opm").value);
        dadosFormulario.append("endereco", document.querySelector("textarea").value);
        dadosFormulario.append("tituloChamado", document.querySelector("#titulo").value);
        dadosFormulario.append("descricao", document.querySelectorAll("textarea")[1].value);
        dadosFormulario.append("comentarioInterno", document.querySelectorAll("textarea")[2].value);
        dadosFormulario.append("servico", document.querySelector("#servico").value);
        dadosFormulario.append("categoria", document.querySelector("#categoria").value);
        dadosFormulario.append("subCategoria", document.querySelector("#sub-categoria").value);

        // Captura os arquivos anexados
        let fileInput = document.querySelector("#file-input");
        if (fileInput.files.length > 0) {
            for (let i = 0; i < fileInput.files.length; i++) {
                dadosFormulario.append("anexos[]", fileInput.files[i]);
            }
        }

        // Envio dos dados para o PHP
        fetch("processa_form.php", {
            method: "POST",
            body: dadosFormulario
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do servidor:", data);
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
        });
    });
});
