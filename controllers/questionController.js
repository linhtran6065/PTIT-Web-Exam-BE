const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Exam = db.exams
const Question = db.questions
const Answer = db.answers


// main work

// 1. create exams

const addQuestion = async (req, res) => {

    const id = req.params.id

    const exam = await Exam.findOne({ where: { id: id } })

    let data = {
        id: req.body.id,
        examId: exam.id,
        name: req.body.name,
    }

    const question = await Question.create( data )

    res.status(200).send(question)

}



// 2. get all products

const getAllQuestions = async (req, res) => {

    let questions = await Question.findAll({})
    res.status(200).send(questions)

}

// 3. get single question


const getOneQuestion = async (req, res) => {

    let id = req.params.id
    
    let question = await Question.findOne({ include: [{

        model: Answer,
        as: 'answers'
    }],
    
    where: 
        
    { id: id }})
    res.status(200).send(question)

}



// 4. update Product

const updateQuestion = async (req, res) => {

    let id = req.params.id

    const question = await Question.update(req.body, { where: { id: id }})

    res.status(200).send(question)
   

}

// 5. delete product by id

const deleteQuestion = async (req, res) => {

    let id = req.params.id
    
    await Question.destroy({ where: { id: id }} )

    res.status(200).send('Question is deleted !')

}











module.exports = {
    addQuestion,
    getAllQuestions,
    getOneQuestion,
    updateQuestion,
    deleteQuestion,
}