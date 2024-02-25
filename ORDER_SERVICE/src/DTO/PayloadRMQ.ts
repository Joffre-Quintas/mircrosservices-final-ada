class PayloadRMQDTO {
    constructor(
        private userId: string,
        private name: string,
        private email: string,
        private description: string,
        private queue = 'order'
    ) {}
}
export default PayloadRMQDTO
