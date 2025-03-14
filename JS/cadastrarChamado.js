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