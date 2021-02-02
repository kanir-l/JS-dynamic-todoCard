//Call in
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') // read ejs

const Todorouter = require('./routes/todoRoute.js')
const Userrouter = require('./routes/userRoute.js')

const nodeSass = require('node-sass-middleware')
require('dotenv').config()


//Use it
const app = express()
app.use( express.json() ) // middleware for json data (postman, react...)
app.use( bodyParser.urlencoded({ extended: false})) // for html data

app.use('/', Todorouter)
app.use('/register', Userrouter)

app.set( 'view engine', 'ejs') // views
app.use( express.static( "/public" ) );
app.use(nodeSass({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed'
    }), express.static(__dirname + '/public'))

    
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

