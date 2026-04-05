import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    email_address: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    birthday: { type: Date },
    avatar: { type: String },
    bio: { type: String },

}, { timestamps: true })

userSchema.index({ email_address: 1 }, { unique: true })
userSchema.index({ mobile_number: 1 }, { unique: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)
User.syncIndexes()
export default User