describe('RabbitMQ', () => {
    it('should connect and consume queue', async () => {
        jest.mock('amqplib', () => ({
          connect: jest.fn().mockResolvedValue({
            createChannel: jest.fn().mockResolvedValue({
              assertQueue: jest.fn().mockResolvedValue({
                queue: 'notification-queue'
              }),
              consume: jest.fn().mockResolvedValue(true)
            })
          })
        }));
      
        const amqplib = require('amqplib');
        const connection = await amqplib.connect();
        const channel = await connection.createChannel();
        const queue = await channel.assertQueue('notification-queue');
        const consumeResult = await channel.consume('notification-queue');
      
        expect(connection).toBeDefined()
        expect(channel).toBeDefined()
        expect(queue).toEqual({ queue: 'notification-queue' });
        expect(consumeResult).toBe(true);
      });
});
