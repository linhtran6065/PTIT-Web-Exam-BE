let self = {};
const { where } = require("sequelize");
const models = require("../models");
self.getAll = async (req, res) => {
  try {
    let data = await models.result.findAll({});
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

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await models.result.findOne({ where: { id: id } });
    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ message: "Error getting form" });
  }
};

self.getAllByForm = async (req, res) => {
  try {
    let formId = req.params.id;
    let results = await models.result.findAll({ where: { formId } });
    if (!results) {
      return res.status(404).json({ message: "Result not found" });
    }
    const processedResults = [];
    for (let i = 0; i < results.length; i++) {
      let question = await models.question.findOne({
        where: { id: results[i].questionId },
      });
      let choices = await models.answer.findAll({
        where: { questionId: question.id },
      });
      let correctAnswer;
      let answer;
      choices.forEach((choice) => {
        if (choice.isCorrect) {
          correctAnswer = choice;
        }
        if (choice.id == results[i].answerId) {
          answer = choice;
        }
      });

      processedResults.push({
        question: question,
        answer: answer,
        correctAnswer: correctAnswer,
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: processedResults,
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
    let data = await models.result.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Result with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `Result with id=${id} is not exist.`,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error,
    });
  }
};

self.deleteAll = async (req, res) => {
  try {
    let data = await models.result.destroy({
      where: {},
      truncate: true,
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = self;
