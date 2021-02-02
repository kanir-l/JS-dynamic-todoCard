const express = require('express')

const todoCard = require('../models/cardSchema.js')
const router = express.Router() // mini app

// GET REQUEST - READ ON THE BROWSER BY EJS AND DATABASE (index.ejs)
router.get('/', async (req, res)=>{
    try{
        const data = await todoCard.find()
        const todos = data.filter((card)=>card.status==="todo")
        const doings = data.filter((card)=>card.status==="doing")
        const dones = data.filter((card)=>card.status==="done")
        res.render('index.ejs', {todos: todos, doings: doings, dones: dones, error:" "})
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 

// POST REQUEST - WRITE ON THE BROWSER BY EJS (addtask.ejs)
router.post('/', async (req, res)=>{
    try {
        await new todoCard({
            task: req.body.task
        }).save()

        res.redirect('/')
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
})

// GET(EDIT) REQUEST - EDIT DATA FROM EDIT PAGE:ID
router.get('/edit/:id', async (req, res)=>{
    try{
        const editData = await todoCard.findOne({_id: req.params.id})
        res.render('edit.ejs', {editData: editData})
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 

// POST(EDIT) REQUEST - SAVE THE EDIT PAGE:ID TO REDIRECT BACK TO THE /
router.post('/edit/:id', async (req, res)=>{
    try {
        await todoCard.updateOne({_id: req.params.id}, {
            $set: {
                task: req.body.task
            }
        })
        res.redirect('/')
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 

// GET(DELETE) REQUEST - DELETE DATA FROM DELETE PAGE:ID AND REDIRECT BACK TO THE /
router.get('/delete/:id', async (req, res)=>{
    try{
        await todoCard.deleteOne({_id: req.params.id})
        res.redirect('/')
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}) 

// Status 
// GET REQUEST - CLINK ON Todo STATUS LINK
router.get('/todo/:id', async (req, res)=>{
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

// GET REQUEST - CLINK ON Doing STATUS LINK
router.get('/doing/:id', async (req, res)=>{
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

// GET REQUEST - CLINK ON Done STATUS LINK
router.get('/done/:id', async (req, res)=>{
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