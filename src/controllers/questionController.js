let self = {};
const models = require("../models");

self.getAll = async (req, res) => {
  let questions = await models.question.findAll({});
  res.status(200).send(questions);
};

self.createQuestion = async (req, res) => {
  const id = req.body.examId;

  const exam = await models.exam.findOne({ where: { id: id } });

  let data = {
    id: req.body.id,
    examId: exam.id,
    name: req.body.name,
  };

  const question = await models.question.create(data);

  return res.status(200).send(question);
};

self.get = async (req, res) => {
  let id = req.params.id;

  let question = await models.question.findOne({
    include: [
      {
        model: models.answer,
        as: "answers",
      },
    ],

    where: { id: id },
  });
  res.status(200).send(question);
};

self.updateQuestion = async (req, res) => {
  let id = req.params.id;

  const question = await models.question.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(question);
};

self.delete = async (req, res) => {
  let id = req.params.id;

  await models.question.destroy({ where: { id: id } });

  res.status(200).send("Question is deleted !");
};

self.deleteAll = async (req, res) => {};

module.exports = self;
