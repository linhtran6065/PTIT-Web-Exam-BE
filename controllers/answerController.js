const db = require('../models')



// create main Model
const Exam = db.exams
const Question = db.questions
const Answer = db.answers


// 1. create answers

const addAnswer = async (req, res) => {

    const id = req.params.id

    const question = await Question.findOne({ where: { id: id } })

    let data = {
        id: req.body.id,
        questionId: question.id,
        name: req.body.name,
        isCorrect: req.body.isCorrect,
    }

    const answer = await Answer.create( data )

    res.status(200).send(answer)

}



// 2. get all products

const getAllAnswers = async (req, res) => {

    let answers = await Answer.findAll({})
    res.status(200).send(answers)

}

// 3. get single question

const getOneAnswer = async (req, res) => {

    let id = req.params.id
    let answer = await Answer.findOne({  
        where: { id: id }, })
    res.status(200).send(answer)

}

// 4. update Product

const updateAnswer = async (req, res) => {

    let id = req.params.id

    const answer = await Answer.update(req.body, { where: { id: id }})

    res.status(200).send(answer)
   

}

// 5. delete product by id

const deleteAnswer = async (req, res) => {

    let id = req.params.id
    
    await Answer.destroy({ where: { id: id }} )

    res.status(200).send('Answer is deleted !')

}








module.exports = {
    addAnswer,
    getAllAnswers,
    getOneAnswer,
    updateAnswer,
    deleteAnswer,
}