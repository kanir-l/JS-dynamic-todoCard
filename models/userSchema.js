const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, minlength: 2, maxlength: 20 },
    password: { type: String, require: true}
})

const userSet = mongoose.model('user', userSchema)

module.exports = userSet