const Todo = require('../models/todoModels')
const mongoose = require('mongoose')

// getlist
const getLists = async (req, res) => {
    const user_id = req.user._id

    const todos = await Todo.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(todos)
}

//get a single list
const getList = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list'})
    }

    const todo = await Todo.findById(id)

    if(!todo) {
        return res.status(404).json({error: "No such task"})
    }
    res.status(200).json(todo)
}

//create a list
const createList = async (req, res) => {
    const { task } = req.body

    let emptyFields = []

    if (!task) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
      }

    try {
        const user_id = req.user._id
        const todo = await Todo.create({ task, user_id })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
//delete a list
const deleteList = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list'})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    if(!todo) {
        return res.status(404).json({error: "No such task"})
    }
    res.status(200).json(todo)
}


//update a list
const updateList = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list'})
    }

    const todo = await Todo.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!todo) {
        return res.status(404).json({error: "No such task"})
    }
    res.status(200).json(todo)
}


module.exports = {
    getList, 
    getLists,
    createList,
    deleteList,
    updateList
}