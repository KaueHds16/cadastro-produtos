const formulario = document.getElementById("formProduto");
const tabelaProdutos = document.getElementById("tabelaProdutos");
const mensagem = document.getElementById("mensagem");


// ==========================================
// BUSCAR PRODUTOS
// ==========================================

async function buscarProdutos() {

    try {

        const resposta = await fetch("/produtos");

        const produtos = await resposta.json();

        tabelaProdutos.innerHTML = "";

        produtos.forEach((produto) => {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${produto.id}</td>

                <td>${produto.nome}</td>

                <td>
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </td>

                <td>${produto.quantidade}</td>

                <td>
                    <button
                        class="botao-excluir"
                        data-id="${produto.id}">
                        Excluir
                    </button>
                </td>
            `;

            tabelaProdutos.appendChild(linha);
        });

    } catch (erro) {

        console.error(erro);

        mensagem.textContent = "Erro ao buscar os produtos.";
    }
}


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();


    const nome = document.getElementById("nome").value;

    const preco = Number(
        document.getElementById("preco").value
    );

    const quantidade = Number(
        document.getElementById("quantidade").value
    );


    const produto = {

        nome: nome,

        preco: preco,

        quantidade: quantidade
    };


    try {

        const resposta = await fetch("/produtos", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"
            },

            body: JSON.stringify(produto)
        });


        const resultado = await resposta.json();


        if (!resposta.ok) {

            mensagem.textContent = resultado.erro;

            return;
        }


        mensagem.textContent =
            "Produto cadastrado com sucesso!";


        formulario.reset();


        await buscarProdutos();

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Erro ao cadastrar o produto.";
    }
});


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

tabelaProdutos.addEventListener("click", async (evento) => {

    if (!evento.target.classList.contains("botao-excluir")) {

        return;
    }


    const id = evento.target.dataset.id;


    try {

        const resposta = await fetch(
            `/produtos/${id}`,
            {
                method: "DELETE"
            }
        );


        const resultado = await resposta.json();


        if (!resposta.ok) {

            mensagem.textContent = resultado.erro;

            return;
        }


        mensagem.textContent =
            "Produto excluído com sucesso!";


        await buscarProdutos();

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Erro ao excluir o produto.";
    }
});


// ==========================================
// CARREGAR PRODUTOS AO ABRIR A PÁGINA
// ==========================================

buscarProdutos();