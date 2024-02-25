import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    addressId: { type: String, required: true },
    orders: { type: Array, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

})

const user = mongoose.model('User', UserSchema)
export default user