# Register_MS 💯 🚀

Este projeto é um microsserviço para o registro de usuários, utilizando MongoDB como banco de dados e RabbitMQ. veja mais sobre o desafio [aqui](#o-desafio-).

**Autoria** 🖋️

Este projeto foi desenvolvido e mantido por [Mr-Kuro](https://github.com/Mr-Kuro). Responsável por todas as implementações principais.

Para mais projetos e contribuições de Mr-Kuro, visite o [perfil dele no GitHub](https://github.com/Mr-Kuro).

## Tópicos :scroll:

- [Register\_MS 💯 🚀](#register_ms--)
  - [Tópicos :scroll:](#tópicos-scroll)
  - [O desafio 🏆](#o-desafio-)
  - [Principais implementações 🚀](#principais-implementações-)
  - [Destaques 📌](#destaques-)
  - [Benefícios 📈](#benefícios-)
  - [Como usar 🤔](#como-usar-)
    - [Rotas da Aplicação 🛣️](#rotas-da-aplicação-️)
    - [Testes 🧪](#testes-)
  - [Licença 📝](#licença-)

## O desafio 🏆

Esse microsserviço foi criado para atender a um desafio proposto pela ADA, que consiste em criar um microsserviço para o registro de usuários. O microsserviço deve ser capaz de criar usuarios, e seu código deve ser limpo, organizado, bem testado e, documentado e escalável.

## Principais implementações 🚀

Neste projeto, implementamos uma série de funcionalidades essenciais para o funcionamento do nosso sistema. Aqui estão as principais:

1. **Adaptadores**: Criamos adaptadores para o serviço RabbitMQ e para o nosso repositório de dados. Esses adaptadores permitem que o nosso código se comunique de forma eficiente com serviços externos e bibliotecas.

2. **Serviços de Domínio**: Implementamos vários serviços de domínio, incluindo `ServiceCreateUser`, `ServiceFindAllUsers` e `ServiceDeleteAllUsers`. Esses serviços contêm a lógica de negócios principal do nosso aplicativo e são responsáveis por executar tarefas específicas relacionadas ao nosso domínio de negócios.

3. **Manipuladores (Handlers)**: Desenvolvemos manipuladores para lidar com eventos específicos no nosso aplicativo. Esses manipuladores, como `HandlerCreateUser`, `HandlerDeleteAllUsers` e `HandlerFindAllUsers`, são acionados em resposta a solicitações HTTP ou mensagens de fila de mensagens.

4. **Padrão Singleton**: Utilizamos o padrão Singleton para garantir que apenas uma instância de cada serviço, adaptador e manipulador seja criada. Isso ajuda a economizar recursos e a garantir que o nosso código seja eficiente.

Essas implementações formam a base do nosso sistema e permitem que ele funcione de maneira eficaz e eficiente. Estamos sempre procurando maneiras de melhorar e expandir as nossas funcionalidades, então fique atento para futuras atualizações!

## Destaques 📌

- [x]  **Singleton Pattern:** Implementamos o padrão Singleton para o UserRepository, ServiceCreateUser e HandlerCreateUser para garantir que apenas uma instância de cada seja criada.
- [x]  **Testes:** Já implementamos testes unitários e de integração para garantir a qualidade do código.
- [x]  **Segurança:** Implementamos um middleware para proteger as rotas de deleção e listagem de usuários.
- [x]  **Clean Code:** Utilizamos boas práticas de programação e organização de código para torná-lo mais limpo e fácil de manter.


## Benefícios 📈

A estrutura e as implementações do nosso projeto trazem uma série de benefícios. Aqui estão alguns dos mais notáveis:

1. **Separation of Concerns**: Ao dividir nosso código em adaptadores, serviços e manipuladores, conseguimos uma separação clara de responsabilidades. Isso torna nosso código mais fácil de entender, testar e manter.

2. **Reutilização de Código**: O uso do padrão Singleton para nossos serviços, adaptadores e manipuladores garante que apenas uma instância de cada um seja criada. Isso nos permite reutilizar essas instâncias em toda a nossa aplicação, economizando recursos e melhorando a eficiência.

3. **Manutenção de Código**: Com a lógica de negócios centralizada em nossos serviços e a lógica de manipulação de eventos em nossos manipuladores, nosso código é mais fácil de manter. Se precisarmos alterar a forma como um evento é tratado ou como uma operação de negócios é realizada, podemos fazer isso em um único lugar.

4. **Tratamento de Erros**: O uso de blocos `try/catch` em nossos manipuladores nos permite capturar e lidar com erros de maneira eficaz. Isso nos ajuda a evitar falhas inesperadas e a fornecer respostas úteis ao usuário quando algo dá errado.

5. **Escalabilidade**: A estrutura do nosso código facilita a adição de novas funcionalidades. Se quisermos adicionar um novo serviço ou manipulador, podemos fazer isso sem perturbar o restante do nosso código.

Esses benefícios nos ajudam a desenvolver um código robusto, eficiente e fácil de manter, que pode ser facilmente expandido para atender às necessidades futuras.

## Como usar 🤔

Para testar o microsserviço, usar a ferramenta cURL ou o Postman. Deixei uma Collection do Postman no repositório para facilitar o teste, acesse este link para baixar: [Postman Collection](./ADA.postman_collection.json)

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Configure o arquivo `.env` com as informações do seu banco de dados MongoDB
4. Inicie o servidor com `npm run dev`

### Rotas da Aplicação 🛣️

Nossa aplicação possui várias rotas que correspondem a diferentes funcionalidades. Aqui estão as principais rotas e seus respectivos handlers:

1. **POST /users-create**: Esta rota é responsável por criar um novo usuário. Quando uma solicitação POST é enviada para `/users-create`, o `HandlerCreateUser` é acionado para lidar com a solicitação. Ele usa o `ServiceCreateUser` para criar o novo usuário no banco de dados.

2. **GET /find-all-users**: Esta rota é usada para obter uma lista de todos os usuários. Quando uma solicitação GET é enviada para `/find-all-users`, o `HandlerFindAllUsers` é acionado. Ele usa o `ServiceFindAllUsers` para buscar todos os usuários do banco de dados e retorna-os na resposta.

3. **DELETE /delete-all-users**: Esta rota é usada para deletar todos os usuários. Quando uma solicitação DELETE é enviada para `/delete-all-users`, o `HandlerDeleteAllUsers` é acionado. Ele usa o `ServiceDeleteAllUsers` para deletar todos os usuários do banco de dados.

Cada rota é cuidadosamente projetada para realizar uma função específica e todas as rotas trabalham juntas para fornecer a funcionalidade completa do nosso aplicativo. Estamos sempre trabalhando para adicionar novas rotas e melhorar as existentes, então fique atento para futuras atualizações!

### Testes 🧪

Para executar os testes unitários, use o comando `npm run test unit/` e para executar os testes de integração, use o comando `npm run test integration/`.

nota: para executar os testes de integração, você deve ter um banco de dados MongoDB em execução e configurar o arquivo `.env` com as informações do seu banco de dados.

## Licença 📝

Este projeto está licenciado sob a licença **MIT**.
A licença MIT é uma licença de software permissiva de código aberto. Licenças permissivas são aquelas que permitem que um software seja modificado e redistribuído com poucas restrições e exigem que os direitos autorais originais sejam mantidos.
