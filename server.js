const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))




const examRouter = require('./routes/examRouter.js')
const questionRouter = require('./routes/questionRouter.js')
const answerRouter = require('./routes/answerRouter.js')


app.use('/api/exams', examRouter)
app.use('/api/questions', questionRouter)
app.use('/api/answers', answerRouter)


//static Images Folder

// app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})