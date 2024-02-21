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

    private async sendMail(notificationName: string, email: string) {
        const emailToSend = templates[notificationName as keyof typeof templates];
        console.log('Email to send:', emailToSend, notificationName, email);
        const info = await this.mailService.getTransporter().sendMail(emailToSend)
        console.log('Preview URL: ' + info)
           
    }

    private receiveAndProcessMessages() {
        this.connectionRabbitmq.receiveMessages((message: any) => {
            const { notificationName, email } = JSON.parse(message.content.toString());
            console.log('Message:', JSON.parse(message.content.toString()));
            this.sendMail(notificationName, email);
            console.log('Email sent to:', email)
        });
    }

    public main() {
        this.receiveAndProcessMessages();
    }
}

new EmailNotificationService();