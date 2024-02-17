class CustomException extends Error {
  constructor(private status: number, message:string) {
    super(message)
    this.status = status
  }
}

export default CustomException