const express = require('express')
const todoCard = require('../models/cardSchema.js')


const todoShow = async (req, res)=>{
    const view = +req.query.view || 1 //Pagination
    const page = +req.query.page || 1 //Sort

    const successText = req.query.success // receiving the success params query from post

    try{
        const totalTask = await todoCard.find().countDocuments()
        const nrTaskShowPerTime = 3 
        const viewCount = Math.ceil(totalTask / nrTaskShowPerTime) 
        const taskToShow = nrTaskShowPerTime * view
        
        const allTodo = await todoCard.find( {status: "todo"} ).sort( {date: page} ).limit(taskToShow)
        const allDoing = await todoCard.find( {status: "doing"} ).sort( {date: page} )
        const allDone = await todoCard.find( {status: "done"} ).sort( {date: page} )

        const todos = allTodo.filter((card)=>card.status==="todo")
        const doings = allDoing.filter((card)=>card.status==="doing")
        const dones = allDone.filter((card)=>card.status==="done")

        res.render('index.ejs', {successText, view, page, allTodo, allDoing, allDone,totalTask, nrTaskShowPerTime, viewCount, taskToShow, error:" ", todos: todos, doings: doings, dones: dones, error:" "})
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
} 

const todoAdd = async (req, res)=>{
    try {
        await new todoCard({
            task: req.body.task
        }).save()
        
        res.redirect('/?success=text') // sending this info with param query in the same / url
    }
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}

const todoEditGet = async (req, res)=>{
    try{
        const editData = await todoCard.findOne({_id: req.params.id})

        const view = +req.query.view || 1 //Pagination
        const page = +req.query.page || 1 //Sort

        const totalTask = await todoCard.find().countDocuments()
        const nrTaskShowPerTime = 3 
        const viewCount = Math.ceil(totalTask / nrTaskShowPerTime) 
        const taskToShow = nrTaskShowPerTime * view
        
        const allTodo = await todoCard.find( {status: "todo"} ).sort( {date: page} ).limit(taskToShow)
        const allDoing = await todoCard.find( {status: "doing"} ).sort( {date: page} )
        const allDone = await todoCard.find( {status: "done"} ).sort( {date: page} )

        const todos = allTodo.filter((card)=>card.status==="todo")
        const doings = allDoing.filter((card)=>card.status==="doing")
        const dones = allDone.filter((card)=>card.status==="done")

        res.render('edit.ejs', {view, page, allTodo, allDoing, allDone,totalTask, nrTaskShowPerTime, viewCount, taskToShow, error:" ", todos: todos, doings: doings, dones: dones, error:" ", editData: editData})
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}

const todoEditPost = async (req, res)=>{
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
}

const todoDelete = async (req, res)=>{
    try{
        await todoCard.deleteOne({_id: req.params.id})
        res.redirect('/')
    }  
    catch(err){
        const error = err
        res.render('error.ejs', {error: error})
    }
}

module.exports = {
    todoShow,
    todoAdd,
    todoEditGet,
    todoEditPost,
    todoDelete
}