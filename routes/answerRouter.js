
const answerController = require('../controllers/answerController')


const answerRouter = require('express').Router()



answerRouter.post('/addAnswer/:id', answerController.addAnswer)

answerRouter.get('/getAllAnswers', answerController.getAllAnswers)



answerRouter.get('/:id', answerController.getOneAnswer)

answerRouter.put('/:id', answerController.updateAnswer)

answerRouter.delete('/:id', answerController.deleteAnswer)

module.exports = answerRouter