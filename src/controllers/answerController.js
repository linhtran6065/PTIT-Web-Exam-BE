let self = {};
const models = require("../models");

self.getAll = async (req, res) => {
  let answers = await models.answer.findAll({});
  res.status(200).send(answers);
};

self.createAnswer = async (req, res) => {
  const id = req.body.questionId;

  const question = await models.question.findOne({ where: { id: id } });

  let data = {
    id: req.body.id,
    questionId: question.id,
    name: req.body.name,
    isCorrect: req.body.isCorrect,
  };

  const answer = await models.answer.create(data);

  res.status(200).send(answer);
};

self.get = async (req, res) => {
  let id = req.params.id;
  let answer = await models.answer.findOne({
    where: { id: id },
  });
  res.status(200).send(answer);
};

self.updateAnswer = async (req, res) => {
  let id = req.params.id;

  const answer = await models.answer.update(req.body, { where: { id: id } });

  res.status(200).send(answer);
};

self.delete = async (req, res) => {
  let id = req.params.id;

  await models.answer.destroy({ where: { id: id } });

  res.status(200).send("Answer is deleted !");
};

self.deleteAll = async (req, res) => {};

module.exports = self;
