import mongoose from 'mongoose'
import 'dotenv/config'

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string)
    } catch (error) {
        throw new Error('Connection to DB failed!');
    }
}

export default dbConection