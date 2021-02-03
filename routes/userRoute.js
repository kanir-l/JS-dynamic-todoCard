const express = require('express')
const bcrypt = require('bcrypt') // hash lösenord

const userSet = require('../models/userSchema.js')
const router = express.Router() // mini app


//REGISTER
router.get('/register', async (req, res)=>{

    try{
        res.render('register.ejs')
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }

}) 

router.post('/register', async (req, res)=>{
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    
    try {
        await new userSet( {
            username: req.body.username,
            password: hashPassword
        }).save()

        res.redirect("/")
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
    
}) 

//LOGIN
router.get('/login', async (req, res)=>{

    try{
        res.render('login.ejs')
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 

router.post('/login', async (req, res)=>{

    try{
        const username = req.body.username
        const password = req.body.password
        
        const user = await userSet.findOne( {username: username} )
        const checkedPass = await bcrypt.compare(password, user.password)

        if(checkedPass) {
            res.redirect('/')
        } else
            res.send("The username or password is incorrect")
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
})

module.exports = router