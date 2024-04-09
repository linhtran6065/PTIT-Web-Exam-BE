const authController = require("../controllers/AuthController");
const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");

router.post("/loginUser", authController.loginUser);
router.post("/loginStudent", authController.loginStudent);
router.post("/register", authController.register);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", middlewareController.verifyToken, authController.logOut);

module.exports = router;
