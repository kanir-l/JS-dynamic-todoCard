const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, minlength: 2, maxlength: 20 },
    email: {type: String, required: true, unique: true},
    password: { type: String, require: true},
    role: String,
    token: String,
    tokenExpiration: Date
})

const UserSet = mongoose.model('user', userSchema)

module.exports = UserSet