

const examController = require('../controllers/examController')

const examRouter = require('express').Router()



examRouter.post('/addExam', examController.addExam)

examRouter.get('/getAllExams', examController.getAllExams)



// Products router  
examRouter.get('/:id', examController.getOneExam)

examRouter.put('/:id', examController.updateExam)

examRouter.delete('/:id', examController.deleteExam)

module.exports = examRouter