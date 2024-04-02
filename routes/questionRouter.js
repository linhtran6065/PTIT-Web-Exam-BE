
const questionController = require('../controllers/questionController')


const questionRouter = require('express').Router()



questionRouter.post('/addQuestion/:id', questionController.addQuestion)

questionRouter.get('/getAllQuestions', questionController.getAllQuestions)



questionRouter.get('/:id', questionController.getOneQuestion)

questionRouter.put('/:id', questionController.updateQuestion)

questionRouter.delete('/:id', questionController.deleteQuestion)

module.exports = questionRouter