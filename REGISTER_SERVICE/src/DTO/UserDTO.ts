interface IUserDTO {
    name: string
    email: string
    cpf: string
    address: object
    password: string
}

class UserDTO implements IUserDTO {
    name: string
    email: string
    cpf: string
    address: object
    password: string

    constructor(name: string, email: string, cpf: string, address: string, password: string) {
        this.name = name
        this.email = email
        this.cpf = cpf
        this.address = {
            connect: {
                id: address
            }
        }
        this.password = password
    }
}

export default UserDTO
