const UserSet = require('../models/userSchema') 
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 
require('dotenv').config()

const loginGetting = (req, res) => {
    res.render('login.ejs', {err: ''})
}

const loginPosting = async (req, res) => {
    const {email, password} = req.body // LOGIN WITH EMAIL AND PASSWORD

    const user = await UserSet.findOne({email: email}) // FINDING IF THE EMAIL EXISTS
    if(!user) return res.redirect('/register')
    
    const validUser = await bcrypt.compare(password, user.password) // FINDING MATCHING PASSWORD
    if(!validUser) return res.redirect('/login')

    // SECRET KEY (JWT TYPE, OBJECT DATA PAYLOAD, SIGNATURE)
    const jwToken = await jwt.sign({user: user}, process.env.SECRET_KEY)
    // SAVE THE JWT IN COOKIES WITH LIMITED TIME
    if(jwToken) { 
        const cookie = req.cookies.jwToken
        if(!cookie) {
            res.cookie('jwToken', jwToken, {maxAge: 36000000, httpOnly: true})
        }
        return res.redirect('/')
    }
    return res.redirect('/login')
} 

const logingOut = async (req, res) => {
    res.clearCookie('jwToken').redirect('/login')
}

module.exports = {
    loginGetting,
    loginPosting,
    logingOut
}