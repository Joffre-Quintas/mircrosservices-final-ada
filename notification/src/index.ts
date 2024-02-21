import mailService from './config/nodemailer';
import ConnectionRabbitmq from './config/rabbitmq';
import templates from './emails/templates';
class EmailNotificationService {
    private readonly connectionRabbitmq: ConnectionRabbitmq;
    private readonly mailService: any;

    constructor() {
        this.connectionRabbitmq = new ConnectionRabbitmq();
        this.mailService = mailService;
        this.main();
    }

    private async sendMail(queue: string, email: string) {
        const emailToSend = templates[queue as keyof typeof templates];
        console.log('Email to send:', emailToSend, queue, email);
        const info = await this.mailService.getTransporter().sendMail(emailToSend)
        console.log('Preview URL: ' + info)
           
    }

    private receiveAndProcessMessages() {
        this.connectionRabbitmq.receiveMessages((message: any) => {
            const { queue, email } = JSON.parse(message.content.toString());
            console.log('Message:', JSON.parse(message.content.toString()));
            this.sendMail(queue, email);
            console.log('Email sent to:', email)
        });
    }

    public main() {
        this.receiveAndProcessMessages();
    }
}

new EmailNotificationService();
