let self = {};
const { where } = require("sequelize");
const models = require("../models");

self.getAll = async (req, res) => {
  try {
    let data = await models.exam.findAll({});
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

self.createExam = async (req, res) => {
  try {
    const { userId, name, type, startTime, endTime, description } = req.body;
    const user = await models.user.findOne({ where: { id: userId } });

    if (!user) {
      return res.json({ message: "User is not exist!" });
    }
    let newExam = {
      name: name,
      userId: userId,
      type: type,
      startTime: startTime,
      endTime: endTime,
      description: description,
    };

    const exam = await models.exam.create(newExam);
    res.status(200).json({ message: "Adding exam successfully", data: exam });
  } catch (error) {
    console.error("Error occurred while getting exam:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  // const id = req.body.userId;

  // const user = await models.user.findOne({ where: { id: id } });

  // let info = {
  //   id: req.body.id,
  //   name: req.body.name,
  //   userId: user.id,
  //   type: req.body.type,
  //   date: req.body.date,
  //   description: req.body.description,
  //   length: req.body.length,
  // };

  // const exam = await models.exam.create(info);
  // res.status(200).send(exam);
};

self.get = async (req, res) => {
  let examId = req.params.id;

  let exam = await models.exam.findOne({
    where: { id: examId },
  });
  if (exam != null) {
    const listDatas = [];
    let questions = await models.question.findAll({
      where: { examId: examId },
    });
    try {
      for (let q = 0; q < questions.length; q++) {
        let choices = await models.answer.findAll({
          where: { questionId: questions[q].id },
        });
        listDatas.push({ questions: questions[q], choices: choices });
      }
      return res
        .status(200)
        .json({ count: listDatas.length, exam: exam, data: listDatas });
    } catch (error) {
      console.error("Error occurred while getting exam:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

self.updateExam = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await models.exam.update(body, {
      where: {
        id: id,
      },
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No exam is updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: `exam with id= ${id} updated`,
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
    let data = await models.exam.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Exam with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `Exam with id=${id} is not exist.`,
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
