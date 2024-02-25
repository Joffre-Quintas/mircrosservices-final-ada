import amqp, { Channel, Connection } from 'amqplib'
import 'dotenv/config'

class Rabbitmq {
    static connection: Connection
    static channel: Channel

    static connectRabbitMQ = async () => {
        try {
            Rabbitmq.connection = await amqp.connect('amqps://pyqsndee:jl6A3s42R8KdwVpsqUT9qONpt9YDkrAO@jackal.rmq.cloudamqp.com/pyqsndee')
            Rabbitmq.channel = await Rabbitmq.connection.createChannel()

            console.log('Conectado ao RabbitMQ')
        } catch (error) {
            console.error('Erro ao conectar ao RabbitMQ:', error)
        }
    }

    static publisherInQueueNotification = (message: string) => {
        const rbChannel = Rabbitmq.channel
        rbChannel.sendToQueue(process.env.QUEUE_NAME as string, Buffer.from(message))
    }
}

export default Rabbitmq
