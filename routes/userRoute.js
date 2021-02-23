const express = require('express')
const cookieParser = require('cookie-parser')
const router = express.Router() 
const {registerGetting, registerPosting} = require('../controllers/registerControl.js')
const {loginGetting, loginPosting, logingOut} = require('../controllers/logInOutControl.js')
const {resetGetting, resetPosting, resetParamsGetting, newResetPosting} = require('../controllers/resetControl.js')

// REGISTER
router.get('/register', registerGetting) 
router.post('/register', registerPosting) 

// LOGIN
router.get('/login', loginGetting) 
router.post('/login', loginPosting) 
// LOGOUT
router.get('/logout', logingOut)

// RESET PASSWORD
router.get('/reset', resetGetting) 
router.post('/reset', resetPosting) 
// NEW RESET 
router.get('/reset/:token', resetParamsGetting)
router.post('/newreset', newResetPosting)

module.exports = router