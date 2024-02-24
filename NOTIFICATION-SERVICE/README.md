# Notification Service

- Microsserviço responsável por receber uma solicitação de notificação e encaminhar via email utizando um SMTP. OBS: A conexão com
o SMTP não é obrigatória, mas o serviço de notificação precisa receber as solicitações via MENSSAGERIA (RabbitMQ)

### Técnologias utilizadas:

- Typescript
- Rabbitmq Cloud -> ampqCloud
- Ethereal email
- Nodemailer
- Jest

### Links necessários:

- Para acessar a fila do Rabbitmq : https://jackal.rmq.cloudamqp.com/#/

- Para verificar os emails recebidos: https://thereal.email/messages


### Exemplos de Payloads :

- Para testar order-service: 
```
{
    "userId": "3578ce13-27ad-4c15-b0b4-423485696af6",
    "description": "Teste rabbit", 
    "queue":"order"
}
````
- Para register-service:
```
{
    "name": "João",
    "email": "email@teste.com",
    "cpf": "11111111111",
    "address": "f870c296-eb15-4227-94c2-fa280c6a8291",
    "password":"senha",
    "confirmPassword": "senha",
    "queue": "register"
}
```