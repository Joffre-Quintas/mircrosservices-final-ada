class UserDTO {
    constructor(
        private name: string,
        private email: string,
        private cpf: string,
        private password: string,
        private confirmPassword: string,
        private addressId: string
    ) {}
}

export default UserDTO
