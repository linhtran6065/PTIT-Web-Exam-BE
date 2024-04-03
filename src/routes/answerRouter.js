const answerController = require("../controllers/answerController");

const router = require("express").Router();

router.get("/", answerController.getAll);
router.get("/:id", answerController.get);
router.post("/", answerController.createAnswer);
router.put("/:id", answerController.updateAnswer);
router.delete("/:id", answerController.delete);
router.delete("/", answerController.deleteAll);

module.exports = router;
