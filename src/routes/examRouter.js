const examController = require("../controllers/examController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get("/", examController.getAll);
router.get("/:id", examController.get);
router.post(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  examController.createExam
);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  examController.updateExam
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  examController.delete
);
router.delete(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  examController.deleteAll
);

module.exports = router;
