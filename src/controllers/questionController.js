let self = {};
const models = require("../models");

self.getAll = async (req, res) => {
  try {
    let data = await models.question.findAll({});
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

self.createQuestion = async (req, res) => {
  try {
    const { examId, name } = req.body;
    const exam = await models.exam.findOne({ where: { id: examId } });

    if (!exam) {
      return res.json({ message: "Exam is not exist!" });
    }
    let newQuestion = {
      examId: examId,
      name: name,
    };

    // const exam = await models.exam.create(newExam);
    const question = await models.question.create(newQuestion);
    res.status(200).json({
      message: "Adding question successfully",
      data: question,
    });
  } catch (error) {
    console.error("Error occurred while getting exam:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  // const id = req.body.examId;

  // const exam = await models.exam.findOne({ where: { id: id } });

  // let data = {
  //   id: req.body.id,
  //   examId: exam.id,
  //   name: req.body.name,
  // };

  // const question = await models.question.create(data);

  // return res.status(200).send(question);
};

self.get = async (req, res) => {
  // let id = req.params.id;

  // let question = await models.question.findOne({
  //   include: [
  //     {
  //       model: models.answer,
  //       as: "answers",
  //     },
  //   ],

  //   where: { id: id },
  // });
  // res.status(200).send(question);

  let questionId = req.params.id;

  let question = await models.question.findOne({
    where: { id: questionId },
  });
  if (question != null) {
    const listDatas = [];
    let answers = await models.answer.findAll({
      where: { questionId: questionId },
    });
    try {
      listDatas.push({ questions: question, answers: answers });
      return res.status(200).json({ count: listDatas.length, data: listDatas });
    } catch (error) {
      console.error("Error occurred while getting question:", error);
      return res.status(500).json({ error: "Internal question error" });
    }
  }
};

self.updateQuestion = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await models.question.update(body, {
      where: {
        id: id,
      },
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No question is updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: `question with id= ${id} updated`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await models.question.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Question with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `Question with id=${id} is not exist.`,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error,
    });
  }
};

self.deleteAll = async (req, res) => {};

module.exports = self;
