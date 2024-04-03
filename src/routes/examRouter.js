const examController = require("../controllers/examController");

const router = require("express").Router();

router.get("/", examController.getAll);
router.get("/:id", examController.get);
router.post("/", examController.createExam);
router.put("/:id", examController.updateExam);
router.delete("/:id", examController.delete);
router.delete("/", examController.deleteAll);

module.exports = router;
