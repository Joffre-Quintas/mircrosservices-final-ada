class CustomException extends Error {
    private status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}
export default CustomException
