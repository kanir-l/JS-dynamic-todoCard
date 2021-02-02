const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    task: { type: String, require: true, minlength: 2, maxlength: 100 },
    description: String,
    date: { type: Date, default: Date.now },
    status: { type: String, default: "todo" }
})

const todoCard = mongoose.model('task', cardSchema)

module.exports = todoCard