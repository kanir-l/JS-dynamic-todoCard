const UserSet = require('../models/userSchema') 
const bcrypt = require('bcrypt') 

const registerGetting = (req, res) => {
    res.render('register.ejs', {err: ''}) 
}

const registerPosting = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        await new UserSet({
            username: username,
            email: email,
            password: hashedPassword
        }).save()
        
        return res.redirect('/login') // URL, NOT FILE
    }
    catch(err) {
        if(err) 
        return res.render('register.ejs', {err: err})
    }
}


module.exports = {
    registerGetting,
    registerPosting
}