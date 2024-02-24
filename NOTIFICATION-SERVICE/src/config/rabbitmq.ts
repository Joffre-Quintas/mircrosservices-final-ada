import amqplib, { Channel, Connection } from 'amqplib/callback_api'
import 'dotenv'

class ConnectionRabbitmq {
   static connection: Connection
   static channel: Channel

    receiveMessages = async (cb:any) => {
        try {
            amqplib.connect('amqps://pyqsndee:jl6A3s42R8KdwVpsqUT9qONpt9YDkrAO@jackal.rmq.cloudamqp.com/pyqsndee', (err, connection) => {
                if(err) {
                    throw err
                }
                connection.createChannel((err, channel) => {
                    if(err) {
                        throw err
                    }
                    channel.assertQueue('notification-queue')
                    channel.consume('notification-queue', cb, { noAck: true }
                    )
                })
            })
        }
        catch(err) {
            console.error(err)
        }
    }
}

export default ConnectionRabbitmq;
