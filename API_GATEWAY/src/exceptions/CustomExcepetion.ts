class CustomException extends Error {
    constructor(private status: number, message: string) {
        super(message)
    }
}

export default CustomException
