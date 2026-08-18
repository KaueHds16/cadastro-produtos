const express = require("express");
const fs = require("fs");

const app = express();
const PORTA = 3000;

const arquivoBanco = "bancoDeDadosFalso.json";

// Permite receber JSON nas requisições
app.use(express.json());

// Permite acessar os arquivos da pasta public
app.use(express.static("public"));


// ==========================================
// GET /produtos
// Buscar todos os produtos
// ==========================================

app.get("/produtos", (req, res) => {

    fs.readFile(arquivoBanco, "utf8", (erro, dados) => {

        if (erro) {
            return res.status(500).json({
                erro: "Erro ao ler o banco de dados."
            });
        }

        const produtos = JSON.parse(dados);

        res.json(produtos);
    });
});


// ==========================================
// POST /produtos
// Cadastrar um novo produto
// ==========================================

app.post("/produtos", (req, res) => {

    const { nome, preco, quantidade } = req.body;


    // Validação do nome
    if (!nome || nome.trim() === "") {

        return res.status(400).json({
            erro: "O nome do produto é obrigatório."
        });
    }


    // Validação do preço
    if (preco === undefined || preco <= 0) {

        return res.status(400).json({
            erro: "O preço deve ser maior que zero."
        });
    }


    // Validação da quantidade
    if (quantidade === undefined || quantidade < 0) {

        return res.status(400).json({
            erro: "A quantidade não pode ser negativa."
        });
    }


    // Ler o arquivo JSON
    fs.readFile(arquivoBanco, "utf8", (erro, dados) => {

        if (erro) {

            return res.status(500).json({
                erro: "Erro ao ler o banco de dados."
            });
        }


        const produtos = JSON.parse(dados);


        // Criar ID automaticamente
        let novoId = 1;

        if (produtos.length > 0) {

            novoId = produtos[produtos.length - 1].id + 1;
        }


        // Criar o novo produto
        const novoProduto = {

            id: novoId,

            nome: nome.trim(),

            preco: Number(preco),

            quantidade: Number(quantidade)
        };


        // Adicionar produto ao Array
        produtos.push(novoProduto);


        // Salvar novamente no JSON
        fs.writeFile(

            arquivoBanco,

            JSON.stringify(produtos, null, 4),

            (erro) => {

                if (erro) {

                    return res.status(500).json({
                        erro: "Erro ao salvar o produto."
                    });
                }


                res.status(201).json(novoProduto);
            }
        );
    });
});


// ==========================================
// DELETE /produtos/:id
// Excluir um produto
// ==========================================

app.delete("/produtos/:id", (req, res) => {

    const id = Number(req.params.id);

    fs.readFile(arquivoBanco, "utf8", (erro, dados) => {

        if (erro) {
            console.log("Erro ao ler o arquivo:", erro);

            return res.status(500).json({
                erro: "Erro ao ler o banco de dados."
            });
        }

        let produtos;

        try {
            produtos = JSON.parse(dados);
        } catch (erro) {
            console.log("Erro ao interpretar JSON:", erro);

            return res.status(500).json({
                erro: "Erro ao interpretar o banco de dados."
            });
        }

        const quantidadeAntes = produtos.length;

        produtos = produtos.filter((produto) => {
            return Number(produto.id) !== id;
        });

        // Verifica se realmente encontrou o produto
        if (produtos.length === quantidadeAntes) {

            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        try {

            fs.writeFileSync(
                arquivoBanco,
                JSON.stringify(produtos, null, 4),
                "utf8"
            );

            console.log(`Produto ${id} excluído com sucesso.`);

            return res.json({
                mensagem: "Produto excluído com sucesso."
            });

        } catch (erro) {

            console.log("ERRO AO SALVAR:", erro);

            return res.status(500).json({
                erro: "Erro ao excluir o produto."
            });
        }
    });
});
// ==========================================
// Iniciar servidor
// ==========================================

app.listen(PORTA, () => {

    console.log(
        `Servidor funcionando em http://localhost:${PORTA}`
    );
});