const express = require('express')

const userSet = require('../models/userSchema.js')
const router = express.Router() // mini app


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

    try {
        await new userSet( {
            username: req.body.username,
            password: req.body.password
        }).save()

        res.redirect("/")
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
    
}) 

module.exports = router