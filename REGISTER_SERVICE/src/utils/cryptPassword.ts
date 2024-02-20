import bcrypt from 'bcrypt'

const cryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}

export default cryptPassword
