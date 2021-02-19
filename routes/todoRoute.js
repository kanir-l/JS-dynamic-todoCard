const express = require('express')
const todoCard = require('../models/cardSchema.js')
const router = express.Router()
const verifyToken = require('../middleware/verifyUser')
const {todoShow, todoAdd, todoEditGet, todoEditPost, todoDelete} = require('../controllers/todoControl.js')

// TODO SHOW AND ADD
router.get('/', verifyToken, todoShow) 
router.post('/', verifyToken, todoAdd) 
// TODO GET EDIT AND POST EDIT
router.get('/edit/:id', verifyToken, todoEditGet)
router.post('/edit/:id', verifyToken, todoEditPost)
// TODO DELETE
router.get('/delete/:id', verifyToken, todoDelete)

// TODO STATUS
router.get('/todo/:id', verifyToken, async (req, res)=>{
    try {
        await todoCard.updateOne({_id: req.params.id}, {
            $set: {
                status: "todo"
            }
        })
        res.redirect('/')
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 

router.get('/doing/:id', verifyToken, async (req, res)=>{
    try {
        await todoCard.updateOne({_id: req.params.id}, {
            $set: {
                status: "doing"
            }
        })
        res.redirect('/')
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 

router.get('/done/:id', verifyToken, async (req, res)=>{
    try {
        await todoCard.updateOne({_id: req.params.id}, {
            $set: {
                status: "done"
            }
        })
        res.redirect('/')
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 


module.exports = router