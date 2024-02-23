import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const userModel = mongoose.model('userModel', UserSchema)
export default userModel