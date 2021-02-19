const express = require('express')
const cookieParser = require('cookie-parser')
const router = express.Router() 
const {registerGetting, registerPosting} = require('../controllers/registerControl.js')
const {loginGetting, loginPosting} = require('../controllers/loginControl.js')

//REGISTER
router.get('/register', registerGetting) 
router.post('/register', registerPosting) 

//LOGIN
router.get('/login', loginGetting) 
router.post('/login', loginPosting) 

//RESET PASSWORD

//GET REQUEST - LOGOUT
router.get('/logout', (req, res)=>{
    res.clearCookie('jwToken').redirect('/login')
}) 

module.exports = router