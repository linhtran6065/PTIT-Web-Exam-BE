let self = {};
const models = require("../models");

self.getAll = async (req, res) => {
  try {
    let data = await models.answer.findAll({});
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

self.createAnswer = async (req, res) => {
  try {
    const { questionId, isCorrect, name } = req.body;
    const question = await models.question.findOne({
      where: { id: questionId },
    });

    if (!question) {
      return res.json({ message: "question is not exist!" });
    }
    let newAnswer = {
      questionId: questionId,
      isCorrect: isCorrect,
      name: name,
    };

    const answer = await models.answer.create(newAnswer);
    res
      .status(200)
      .json({ message: "Adding answers successfully", data: answer });
  } catch (error) {
    console.error("Error occurred while getting answer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    const answer = await models.answer.findOne({ where: { id: id } });
    res.status(200).json({ answer: answer });
  } catch (error) {
    res.status(500).json({ message: "Error getting answer" });
  }
};

self.updateAnswer = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await models.answer.update(body, {
      where: {
        id: id,
      },
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No answer is updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: `answer with id=${id} updated`,
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
    let data = await models.answer.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `answer with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `answer with id=${id} is not exist.`,
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
