import mongoose from 'mongoose'
import 'dotenv/config'

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string)
        console.log('Conection success!')
    } catch (error) {
        console.log('Conection fails!')
    }
}

export default dbConection
