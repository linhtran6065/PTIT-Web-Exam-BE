const formController = require("../controllers/formController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  formController.getAll
);
router.post("/", formController.createForm);
router.get(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  formController.get
);
router.get(
  "/student/:id",
  middlewareController.verifyTokenAndAdminAuth,
  formController.getAllByStudent
);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  formController.updateForm
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  formController.delete
);
router.delete(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  formController.deleteAll
);

module.exports = router;
