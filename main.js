const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const nodeSass = require('node-sass-middleware')
const todoRoute = require('./routes/todoRoute.js') // Router
const userRoute = require('./routes/userRoute.js') // Router
require('dotenv').config()

const app = express()
app.use( express.json() ) // middleware for json data (postman, react...)
app.set( 'view engine', 'ejs') // views
app.use(express.urlencoded( { extended: false} )) // for html data
app.use( cookieParser() )
app.use( express.static( "/public" ) );
app.use(nodeSass({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed'
    }), express.static(__dirname + '/public'))
app.use(todoRoute) // Router
app.use(userRoute) // Router

// CONNECT TO MONGO DATABASE
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(process.env.DB_MONGO_URL, options, (err) => {
    if(err) {
        console.log(err)
        return
    }
        app.listen(8000, () => {
            console.log("TodoCard App is set")
        })
})

