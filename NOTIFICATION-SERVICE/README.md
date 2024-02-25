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
