//Call in
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') // read ejs
const todoCard = require('./models/cardSchema.js')
const router = require('./routes/todoRoute.js')
const nodeSass = require('node-sass-middleware')
require('dotenv').config()


//Use it
const app = express()
app.use( express.json() ) // middleware for json data (postman, react...)
app.use( bodyParser.urlencoded({ extended: false})) // for html data
app.set( 'view engine', 'ejs') // views
app.use(nodeSass({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed'
    }), express.static(__dirname + '/public'))
app.use('/', router)
app.use( express.static( "/public" ) );

//CONNECT TO MONGO DATABASE
mongoose.connect(process.env.DB_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=> {
    if(err) return
    app.listen(8000, ()=>{
        console.log("App is set")
    })
})

