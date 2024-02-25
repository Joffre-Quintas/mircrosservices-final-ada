import amqplib, { Channel, Connection } from 'amqplib/callback_api'
import 'dotenv'

class ConnectionRabbitmq {
   static connection: Connection
   static channel: Channel

    receiveMessages = async (cb:any) => {
        try {
            amqplib.connect({
                hostname: 'rabbitmq',
                port: 5672,
                username: 'admin',
                password: 'admin',
                vhost: 'chat'
            
            }, (err, connection) => {
                if(err) {
                    throw err
                }
                connection.createChannel((err, channel) => {
                    if(err) {
                        throw err
                    }
                    channel.assertQueue('notification_queue')
                    channel.consume('notification_queue', cb, { noAck: true }
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
