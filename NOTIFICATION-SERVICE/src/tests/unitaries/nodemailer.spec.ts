const mockMailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'email@email.com',
        pass: 'senha-segura'
    }
}
describe('nodemailer', () => {
    it('should create the base configuration for sending emails', () => {
        const nodemailer = require('nodemailer');
        const mailService = new nodemailer.createTransport(mockMailConfig);
        expect(mailService).toBeDefined();
    })
})