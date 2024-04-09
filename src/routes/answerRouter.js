const answerController = require("../controllers/answerController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get("/", answerController.getAll);
router.get("/:id", answerController.get);
router.post(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  answerController.createAnswer
);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  answerController.updateAnswer
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  answerController.delete
);
router.delete(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  answerController.deleteAll
);

module.exports = router;
