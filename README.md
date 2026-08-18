# Cadastro de Produtos

Aplicação Web para cadastrar e consultar produtos utilizando HTML, CSS, JavaScript, Node.js, Express e JSON.

## Funcionalidades

- Cadastro de produtos;
- Geração automática de ID;
- Validação dos dados no Back-End;
- Armazenamento no arquivo `bancoDeDadosFalso.json`;
- Consulta dos produtos cadastrados;
- Exibição dos produtos em uma tabela;
- Atualização automática da tabela após o cadastro.

## Como executar

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
node server.js
```

ou:

```bash
npm start
```

4. Acesse no navegador:

```text
http://localhost:3000
```

## Estrutura

```text
cadastro-produtos/
├── server.js
├── bancoDeDadosFalso.json
├── package.json
├── README.md
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

## Fluxo da aplicação

```text
Formulário
   ↓
JavaScript
   ↓
fetch()
   ↓
Node.js + Express
   ↓
bancoDeDadosFalso.json
   ↓
Express
   ↓
JavaScript
   ↓
Tabela
```

## Rotas

- `GET /produtos` — busca os produtos cadastrados.
- `POST /produtos` — cadastra um novo produto.

## Validações

O Back-End não aceita:

- Nome vazio;
- Preço igual ou menor que zero;
- Quantidade negativa.
