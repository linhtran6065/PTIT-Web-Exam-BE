let self = {};
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
  let info = {
    id: req.body.id,
    name: req.body.name,
    type: req.body.type,
    date: req.body.date,
    description: req.body.description,
    length: req.body.length,
  };

  const exam = await models.exam.create(info);
  res.status(200).send(exam);
};

self.get = async (req, res) => {
  let id = req.params.id;
  let exam = await models.exam.findOne({
    include: [
      {
        model: Question,
        as: "questions",
      },
    ],

    where: { id: id },
  });
  res.status(200).send(exam);
};

self.updateExam = async (req, res) => {
  let id = req.params.id;

  const exam = await models.exam.update(req.body, { where: { id: id } });

  res.status(200).send(exam);
};

self.delete = async (req, res) => {
  let id = req.params.id;

  await models.exam.destroy({ where: { id: id } });

  res.status(200).send("Exam is deleted !");
};

self.deleteAll = async (req, res) => {};

module.exports = self;
