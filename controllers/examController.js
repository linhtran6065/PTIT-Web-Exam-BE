const db = require('../models')



// create main Model
const Exam = db.exams
const Question = db.questions

// main work

// 1. create exam


const addExam = async (req, res) => {

    let info = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
        length: req.body.length
    }


    const exam = await Exam.create(info)
    res.status(200).send(exam)
    console.log(exam)

}

  
// 2. get all exams

const getAllExams = async (req, res) => {
    let exams = await Exam.findAll({})
    res.status(200).send(exams)

}




// 3. get single exam

const getOneExam = async (req, res) => {

    let id = req.params.id
    let exam = await Exam.findOne({ include: [{

        model: Question,
        as: 'questions'
    }],
    
    where: 
        
    { id: id }})
    res.status(200).send(exam)

}

// 4. update Product

const updateExam = async (req, res) => {

    let id = req.params.id

    const exam = await Exam.update(req.body, { where: { id: id }})

    res.status(200).send(exam)
   

}

// 5. delete product by id

const deleteExam = async (req, res) => {

    let id = req.params.id
    
    await Exam.destroy({ where: { id: id }} )

    res.status(200).send('Exam is deleted !')

}











module.exports = {
    addExam,
    getAllExams,
    getOneExam,
    updateExam, 
    deleteExam
}