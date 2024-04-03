const questionController = require("../controllers/questionController");

const router = require("express").Router();

router.get("/", questionController.getAll);
router.get("/:id", questionController.get);
router.post("/", questionController.createQuestion);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.delete);
router.delete("/", questionController.deleteAll);

module.exports = router;
