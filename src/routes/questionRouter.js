const questionController = require("../controllers/questionController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get("/", questionController.getAll);
router.get("/:id", questionController.get);
router.post(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  questionController.createQuestion
);
router.post(
  "/listQuestions",
  middlewareController.verifyTokenAndAdminAuth,
  questionController.createListQuestion
);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  questionController.updateQuestion
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  questionController.delete
);
router.delete(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  questionController.deleteAll
);

module.exports = router;
