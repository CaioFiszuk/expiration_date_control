# Controlador De Validade

## Índice

- [Descrição](#descri%C3%A7%C3%A3o)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Utilizar](#como-utilizar)
- [Contribuições](#contribui%C3%A7%C3%B5es)
- [Licença](#licen%C3%A7a)

## Descrição

O **Controlador De Validade** é um aplicativo que permite ao usuário ter um melhor controle sobre o vencimento dos produtos de sua loja ou estoque.

## Funcionalidades

- **Cores que indicam a proximidade da data**: O aplicativo permite registrar e listar os produtos. A cor ficará vermelha na semana do vencimento indicando um alerta. Ficará laranja na semana anterior indicando atenção.
- **PDF**: Permite baixar todos os itens da lista em formato PDF
- **Edição**: Edita um item específico da lista
- **Deleção**: Deleta um item específico da lista

## Tecnologias Utilizadas

- **CSS3**
- **React Js**
- **Node Js**
- **React-Modal**
- **JsPDF**

## Como Utilizar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/CaioFiszuk/expiration_date_control.git
   ```

2. **Acesse o diretório do projeto**:

   ```bash
   cd frontend
   ```

3. **Abra o arquivo `src/components/App.Jsx` em seu navegador preferido**.

### Bibliotecas de Terceiros
  Este software utiliza as seguintes bibliotecas open source:

- React.js — Licença MIT

- Node.js — Licença MIT

- jsPDF — Licença MIT

- React-Modal — Licença MIT

### Geração de Relatórios em PDF

Para exportação de relatórios, utilizei a biblioteca [jsPDF](https://github.com/parallax/jsPDF) com o plugin `autoTable`, garantindo estabilidade e compatibilidade com grandes volumes de dados. A escolha foi feita após testes com outras soluções que apresentaram falhas com dados dinâmicos.

### Licença

Este software é proprietário. O uso está restrito ao comprador/licenciado autorizado.

Não é permitida a redistribuição, cópia ou modificação sem autorização prévia.

Para licenciamento comercial, entre em contato: [caiolopes871@gmail.com]