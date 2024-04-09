const studentController = require("../controllers/studentController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.get(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  studentController.getAll
);
router.get("/:id", studentController.get);
router.post(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  studentController.createStudent
);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  studentController.updateStudent
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  studentController.delete
);
router.delete(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  studentController.deleteAll
);

module.exports = router;
