let self = {};
const { where } = require("sequelize");
const models = require("../models");
self.getAll = async (req, res) => {
  try {
    let forms = await models.form.findAll({});
    const processedForms = [];
    for (let i = 0; i < forms.length; i++) {
      let exam = await models.exam.findOne({ where: { id: forms[i].examId } });
      let student = await models.student.findOne({
        where: { msv: forms[i].studentMsv },
      });
      processedForms.push({
        student,
        exam,
        startTime: forms[i].startTime,
        endTime: forms[i].startTime,
        score: forms[i].score,
        isFinish: forms[i].isFinish,
      });
    }
    //searchByDate
    const searchForms = [];
    if (
      req.query.startTime != null ||
      req.query.endTime != null ||
      req.query.examName != null
    ) {
      try {
        var startTime = new Date(req.query.startTime);
        var endTime = new Date(req.query.endTime);
        var examName = req.query.examName;
        //return res.json({ examName });
        processedForms.forEach((form) => {
          var formStartTime = new Date(form.startTime);
          var formEndTime = new Date(form.endTime);
          var meetsStartTime =
            !req.query.startTime || formStartTime >= startTime;
          var meetsEndTime = !req.query.endTime || formEndTime <= endTime;
          var meetsExamName =
            !examName || form.exam.name == decodeURIComponent(examName);

          if (meetsStartTime && meetsEndTime && meetsExamName) {
            searchForms.push(form);
          }
        });

        return res.status(200).json({
          success: true,
          count: searchForms.length,
          data: searchForms,
        });
      } catch {
        return res.json({ message: "Error searching" });
      }
    }
    res.status(200).json({
      success: true,
      count: processedForms.length,
      data: processedForms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

self.createForm = async (req, res) => {
  try {
    const { examId, studentMsv, choiceSelections, startTime, endTime } =
      req.body;

    const existExam = await models.exam.findOne({ where: { id: examId } });
    const existStudent = await models.student.findOne({
      where: { msv: studentMsv },
    });

    if (!existExam) {
      return res.json({ message: "Exam is not exist!" });
    }
    if (!existStudent) {
      return res.json({ message: "Student is not exist!" });
    }

    const existForm = await models.form.findOne({
      where: { examId, studentMsv },
    });
    if (existForm) {
      return res
        .status(500)
        .json({ message: "Form has already been created!" });
    }

    //calc score
    let score = 0;
    let questions = await models.question.findAll({
      where: { examId: examId },
    });
    try {
      for (let q = 0; q < questions.length; q++) {
        let choices = await models.answer.findAll({
          where: { questionId: questions[q].id },
        });
        choices.forEach((choice) => {
          if (choice.id == choiceSelections[q]) {
            if (choice.isCorrect) score++;
          }
        });
      }
    } catch (error) {
      console.error("Error occurred while calculating scores:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    //checkFinish
    let isFinish = true;
    choiceSelections.forEach((choiceSelection) => {
      if (choiceSelection == 0) {
        isFinish = false;
      }
    });
    //create form
    let newForm = {
      examId: examId,
      studentMsv: studentMsv,
      score: score,
      isFinish: isFinish,
      startTime: startTime,
      endTime: endTime,
    };
    const form = await models.form.create(newForm);

    saveResult(questions, choiceSelections, form.id);

    res
      .status(200)
      .json({ message: "Create new form successfully", data: form });
  } catch (error) {
    res.status(500).json({ message: "Error creating form!" });
  }
};

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    const form = await models.form.findOne({ where: { id: id } });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error getting form" });
  }
};

self.getAllByStudent = async (req, res) => {
  try {
    let msv = req.params.id;
    const forms = await models.form.findAll({ where: { studentMsv: msv } });
    if (!forms) {
      return res.status(404).json({ message: "Form not found" });
    }
    const processedForms = [];
    const student = await models.student.findOne({
      where: { msv: forms[0].studentMsv },
    });
    for (let i = 0; i < forms.length; i++) {
      let exam = await models.exam.findOne({ where: { id: forms[i].examId } });

      processedForms.push({
        id: forms[i].id,
        exam,
        startTime: forms[i].startTime,
        endTime: forms[i].endTime,
        score: forms[i].score,
        isFinish: forms[i].isFinish,
      });
    }

    res
      .status(200)
      .json({ count: forms.length, student: student, data: processedForms });
  } catch (error) {
    res.status(500).json({ message: "Error getting form" });
  }
};

self.updateForm = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await models.form.update(body, {
      where: {
        id: id,
      },
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No form updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: `form with id=${id} updated`,
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
    let data = await models.form.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Form with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `Form with id=${id} is not exist.`,
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
    let data = await models.form.destroy({
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

async function saveResult(questions, choiceSelections, formId) {
  try {
    for (let q = 0; q < questions.length; q++) {
      let newResult = {
        formId: formId,
        questionId: questions[q].id,
        answerId: choiceSelections[q],
      };
      const result = await models.result.create(newResult);
    }
  } catch (error) {
    console.error("Error occurred while saving results:", error);
    throw error;
  }
}
module.exports = self;
