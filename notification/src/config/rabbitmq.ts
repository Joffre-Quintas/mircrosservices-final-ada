import amqplib, { Channel, Connection } from 'amqplib/callback_api'

class ConnectionRabbitmq {
   static connection: Connection
   static channel: Channel

    receiveMessages = async (cb:any) => {
        try {
            amqplib.connect('amqp://127.0.0.1', (err, connection) => {
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
