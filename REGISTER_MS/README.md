# Register_MS 💯 🚀

Este projeto é um microsserviço para o registro de usuários, utilizando MongoDB como banco de dados e Prisma como ORM.

## Principais implementações

- [x]  **UserRepository:** Uma classe que utiliza o Prisma para interagir com o MongoDB e realizar operações de CRUD nos dados dos usuários.
- [x]  **ServiceCreateUser:** Um serviço que utiliza o UserRepository para criar novos usuários no banco de dados.
- [x]  **HandlerCreateUser:** Um manipulador que lida com as solicitações de criação de usuários e utiliza o ServiceCreateUser para realizar a criação.
- [x]  **Singleton Pattern:** Implementamos o padrão Singleton para o UserRepository, ServiceCreateUser e HandlerCreateUser para garantir que apenas uma instância de cada seja criada.

## Benefícios

- :rocket: O microsserviço de cadastro de usuários permite a criação de usuários de forma eficiente e segura.
- :rocket: O uso do MongoDB proporciona alta performance e escalabilidade para o armazenamento de dados dos usuários.
- :rocket: O uso do Prisma simplifica a interação com o MongoDB, tornando o código mais limpo e fácil de manter.
- :rocket: A implementação do padrão Singleton para o repositório, serviços e manipuladores melhora a eficiência ao reutilizar as mesmas instâncias.

## Como usar

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Configure o arquivo `.env` com as informações do seu banco de dados MongoDB
4. Inicie o servidor com `npm run dev`

## cURL

Para testar o microsserviço, você pode usar solicitações usar a ferramenta cURL ou o Postman. Deixei uma Collection do Postman no repositório para facilitar o teste, acesse este link para baixar: [Postman Collection](./ADA.postman_collection.json)


## Testes
Este projeto ainda não possui testes, mas trbalharemos nisso em breve.

## Licença

Este projeto está licenciado sob a licença **MIT**.
A licença MIT é uma licença de software permissiva de código aberto. Licenças permissivas são aquelas que permitem que um software seja modificado e redistribuído com poucas restrições e exigem que os direitos autorais originais sejam mantidos.
