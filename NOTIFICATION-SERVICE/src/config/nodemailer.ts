import nodemailer, { Transporter } from 'nodemailer';


class MailService {
    private transporter: Transporter;

    constructor() {
        const mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'kathleen.jacobs@ethereal.email',
                pass: 'VYAnaKFu6kQtfsbJE6'
            }
        };

        this.transporter = nodemailer.createTransport(mailConfig);
    }

    getTransporter(): Transporter {
        return this.transporter;
    }
}
const mailService = new MailService();
export default mailService;