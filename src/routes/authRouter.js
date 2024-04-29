const authController = require("../controllers/AuthController");
const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");

router.post("/login", authController.login);
router.post("/registerUser", authController.registerUser);
router.post("/registerStudent", authController.registerStudent);
router.post("/refreshToken", authController.refreshToken);
router.post("/checkTokenExpired", authController.checkTokenExpired);
router.post("/logout", middlewareController.verifyToken, authController.logOut);

module.exports = router;
