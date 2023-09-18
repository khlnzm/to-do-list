require ('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')

//express app
const app = express()

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/todoList', todoRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () =>{
        console.log("Connected to DB & Listening to port", process.env.PORT)
    })
})
.catch ((error) => {
    console.log(error)
})


