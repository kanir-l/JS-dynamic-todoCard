const jwt = require('jsonwebtoken') 
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const userToken = req.cookies.jwToken
    if(!userToken) return res.render('login.ejs', {err: "Log in to access the home page"})

    const validUser = jwt.verify(userToken, process.env.SECRET_KEY)
    if(validUser) {
        req.user = validUser
    }
    
    next()
}

module.exports = verifyToken