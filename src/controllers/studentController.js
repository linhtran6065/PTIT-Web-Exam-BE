let self = {};
const models = require("../models");

self.getAll = async (req, res) => {
  try {
    let data = await models.student.findAll({});
    res.status(200).json({
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

self.createStudent = async (req, res) => {
  try {
    const { email, firstName, lastName, msv } = req.body;

    const alreadyExistEmailStudent = await models.student.findOne({
      where: { email: email },
    });
    const alreadyExistMSVStudent = await models.student.findOne({
      where: { msv: msv },
    });

    if (alreadyExistEmailStudent || alreadyExistMSVStudent) {
      return res.json({ message: "Student already exists!" });
    }
    let newStudent = {
      msv: msv,
      email: email,
      firstName: firstName,
      lastName: lastName,
      class: req.body.class,
    };
    const student = await models.student.create(newStudent);

    res
      .status(200)
      .json({ message: "Adding student successfully", student: student });
  } catch (error) {
    res.status(500).json({ message: "Error adding student!" });
  }
};

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    const student = await models.student.findOne({ where: { msv: id } });
    res.status(200).json({ student: student });
  } catch (error) {
    res.status(500).json({ message: "Error getting student" });
  }
};

self.updateStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let { msv, ...others } = body;
    let data = await models.student.update(others, {
      where: {
        msv: id,
      },
    });

    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No student updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: `student with id=${id} updated`,
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
    let data = await models.student.destroy({
      where: {
        msv: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Student with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `Student with id=${id} is not exist.`,
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
    let data = await models.student.destroy({
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
