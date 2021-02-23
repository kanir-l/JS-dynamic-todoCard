const UserSet = require('../models/userSchema') 
const crypto = require('crypto') // BUILT-IN NODE JS  // TOKEN CRYPTO URL FOR RESET PASSWORD
const nodemailer = require('nodemailer') // TUNNEL TO SEND EMAIL TO MAIL SERVER
const bcrypt = require('bcrypt') 
require('dotenv').config()

const mailTransporter = nodemailer.createTransport({
    // CRUDENTIAL 
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
        user: process.env.KR_EMAIL,
        pass: process.env.KR_PASSWORD,
    }
})

const resetGetting = (req, res) => {
    res.render('reset.ejs', {err: ''})
}

const resetPosting = async (req, res) => {
    const email = req.body.email

    const user = await UserSet.findOne({email: email})
    if(!user) return res.redirect('/register')

    // TOKEN CRYPTO URL FOR RESET PASSWORD, SAVE TOKEN EXPIRATION
    const token = await crypto.randomBytes(32).toString('hex') 
    user.token = token
    user.tokenExpiration = Date.now() + 3600000 // 1HR
    await user.save()

    // NODEMAILER 
    await mailTransporter.sendMail({
        from: process.env.KR_EMAIL,
        to: user.email,
        subject: "Reset your password, todoCard App",
        html: `<h2>Hello from todoCard App</h2></br><h3>Please click on the link <a href="http://localhost:8000/reset/${user.token}" > Here</a> to reset your new password</h3>`
    })
    res.render('checkmail.ejs')
}

const resetParamsGetting = async (req, res) => {
    const token = req.params.token 

    try {
        const user = await UserSet.findOne({token: token, tokenExpiration: { $gt: Date.now() }}) // FINDING TOKEN URL
        if(!user) return res.redirect('/register')

        res.render('newreset.ejs', {err: '', email: user.email})
    }
    catch (err) {
        res.render('reset.ejs', {err: "Try again"})
    }
}

const newResetPosting = async (req, res) => {
    const password = req.body.password // TAKING NEW PASSWORD GIVEN FROM FORM EJS
    const email = req.body.email // TAKING EMAIL HIDDENLY LINKED IN FORM EJS 

    const salt = await bcrypt.genSalt(12) // CALLING BCRYPT
    const hashedPassword = await bcrypt.hash(password, salt) // HASHED THE NEW PASSWORD

    const user = await UserSet.findOne({email: email}) // FINDING USER BY EMAIL LINKED IN FORM EJS
    user.password = hashedPassword // CALLING THE NEW PASSWORD
    user.save() // SAVE NEW DATA
    res.redirect('/login')  
}

module.exports = {
    resetGetting,
    resetPosting,
    resetParamsGetting,
    newResetPosting
}