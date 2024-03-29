# 🍕 ADA FOOD

### Projeto de microsserviço desenvolvido durante curso da Ada Tech

## 📚 Descrição

<p>O AdaFood é um aplicativo de delivery, nele é possível o usuário se cadastrar e realizar um pedido.</p>
<p>O time de desenvolvimento da turma 1041 será responsável por desenvolver alguns serviços, como:</p>
<ul>
<li>API Gateway: O API gateway será a interface de comunicação entre o cliente e os serviços. OBS: utilize a api feita em sala de aula como base, se faça as alterações necessárias, como, por exemplo, o fluxo de verificação de token, que deve ser transferido para o AUTH
SERVICE;</li>
<li>Auth Service: Nele será necessário criar 2 rotas, uma para criação de sessão e outra para verificar a sessão;</li>
<li>Address Service: Nele será possível buscar um endereço e salvar na tabela(ou collection) de usuários, no respectivo usuário que estiver solicitando a busca;</li>
<li>Register Service: Serviço responsável por criar usuários no banco de dados. Ao criar um usuário é necessário enviar uma notificação para confirmação de email através do "Notification Service". O usuário criado deve conter as seguintes informações:
</li>

- id
- Name
- email
- cpf
- street
- number
- neighborhood
- city
- state
- country

<li>Order Service: Nele será possível realizar um pedido e salvá-lo no banco de dados em uma tabela(ou collection) especifica, contendo:</li>

- id
- user_id
- description
</ul>

<p>O Order service precisa notificar o usuário que fez o pedido através no Notification service, contendo as informações do pedido</p>
<p>Obs: A tabela de produtos não será responsabilidade do time 1041, sendo assim, não se preocupem com ela, o campo "description" é
suficiente;</p>

<ul>
<li>Notification Service: Responsável por receber uma solicitação de notificação e encaminhar via email utizando um SMTP. OBS: A conexão como SMTP não é obrigatória, mas o serviço de notificação precisa receber as solicitações via MENSSAGERIA (RabbitMQ)
</li>
</ul>

## 📋 Kanban do grupo

Trello ---> <https://trello.com/b/wRS0Exxu/ada-food>

## ✅ Features

#### ☑️ Feature/1: API Gateway

#### ☑️ Feature/3: Auth Service

#### ☑️ Feature/4: Register Service

#### ☑️ Feature/5: Order Service

#### ☑️ Feature/6: Notification Service

#### ☑️ Feature/7: Address Service

## 🛠️ Tecnologias

#### As seguintes ferramentas foram usadas na construção do projeto:

- MongoDB
- RabbitMQ
- NestJS
- TypeScript
- Nodemail
- Ethereal

## 🏃 Para rodar os Serviços

-Os arquivos .env foram deixados expostos para a avaliçao do professor.
-Rodar primeiro o notification_service. Acessar a pasta e executar npm run dev.
-Para todos os serviços restantes (exceto o address_service), acessar a pasta e rodar o comando npm run dev
-Para o address_services: acessar a pasta e rodar o comando npm start:dev

## Para acessar o RabbitMQ

https://jackal.rmq.cloudamqp.com/#/queues
user : pyqsndee
pass: ZIAx7JxzftPP_5YtyAihRJRD9a-lvgZ-

## Para conseguir acessar Ethereal (Visualizador de email) :

Link: https://ethereal.email/messages
user: kathleen.jacobs@ethereal.email
senha: VYAnaKFu6kQtfsbJE6

## Para testar o projeto cURL:

-Importar o arquivo cURL na raiz do projeto.

#### ☑️ Feature/1: API Gateway

```bash
npm run dev
```

#### ☑️ Feature/3: Auth Service

```bash
npm run dev
```

#### ☑️ Feature/4: Register Service

```bash
npm run dev
```

#### ☑️ Feature/5: Order Service

```bash
npm run dev
```

#### ☑️ Feature/6: Notification Service

```bash
npm run dev
```

#### ☑️ Feature/7: Address Service

```bash
npm run start:dev
```

## 👨🏻‍🏫 Professor

Esdras Aguilar ---> <https://github.com/esdrasac>

## 👥 Autores

<!-- Anderson -->
<a href="https://github.com/Mr-Kuro">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/100809180?v=4" width="40px;" alt=""/>
 <br />
 <sub><b>Anderson Queiroz</b></sub></a> <a href="https://github.com/Mr-Kuro" title="GitHub">🚀</a>
 <br /> <br />

<!-- Edna -->
<a href="https://github.com/ednabarboza">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/83794408?v=4" width="40px;" alt=""/>
 <br />
 <sub><b>Edna Barboza</b></sub></a> <a href="https://github.com/ednabarboza" title="GitHub">🚀</a>
 <br /> <br />

 <!-- Joffre -->
 <a href="https://github.com/Joffre-Quintas">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/117463401?v=4" width="40px;" alt=""/>
 <br />
 <sub><b>Joffre Quintas</b></sub></a> <a href="https://github.com/Joffre-Quintas" title="GitHub">🚀</a>
 <br /> <br />

 <!-- Joice -->
 <a href="https://github.com/joicescripts">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/125207562?v=4" width="40px;" alt=""/>
 <br />
 <sub><b>Joice Martins</b></sub></a> <a href="https://github.com/joicescripts" title="GitHub">🚀</a>
 <br /> <br />

 <!-- Rodrigo -->
<a href="https://github.com/Rodrigobuenow">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/127049611?v=4" width="40px;" alt=""/>
 <br />
 <sub><b>Rodrigo Bueno</b></sub></a> <a href="https://github.com/Rodrigobuenow" title="GitHub">🚀</a>
 <br /> <br />
