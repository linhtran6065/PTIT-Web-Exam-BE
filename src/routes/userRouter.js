const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.get(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  userController.getAll
);
router.get(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.get
);
router.post(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  userController.createUser
);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.updateUser
);
router.put(
  "/resetPassword/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.resetPassword
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.delete
);
router.delete(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteAll
);

module.exports = router;
