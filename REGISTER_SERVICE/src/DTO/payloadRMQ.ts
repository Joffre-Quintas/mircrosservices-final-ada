class PayloadRMQDTO {
    constructor(private userId: string, private name: string, private email: string, private queue = 'register') {}
}
export default PayloadRMQDTO
