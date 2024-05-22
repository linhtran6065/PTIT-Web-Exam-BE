const resultController = require("../controllers/resultController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.get("/", resultController.getAll);
router.get("/:id", resultController.get);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  resultController.delete
);
router.delete(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  resultController.deleteAll
);
router.get("/form/:id", resultController.getAllByForm);
module.exports = router;
