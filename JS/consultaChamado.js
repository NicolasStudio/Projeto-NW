document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popupBusca");

    // Função para mostrar o pop-up
    window.mostrarPopup = function () {
        popup.classList.add("ativo");
        popup.style.display = "flex"; // Mostra o pop-up
    }

    // Função para fechar o pop-up
    window.fecharPopup = function () {
        popup.classList.remove("ativo");
        popup.style.display = "none"; // Esconde completamente
    }

    // Função para validar a busca
    window.validarBusca = function () {
        const metodo = document.getElementById("metodoBusca").value;
        const campoBusca = document.getElementById("campoBusca").value.trim();
        const erroMensagem = document.getElementById("erroMensagem");

        if (campoBusca === "") {
            erroMensagem.textContent = "Por favor, digite um valor para a busca.";
        } else {
            erroMensagem.textContent = "";
            alert(`Buscando por: ${campoBusca} usando ${metodo}`);
            fecharPopup(); // Fecha após validar
            window.location.href = "tabelaChamados.html";
        }
    }
});