const authController = require("../controllers/authController");
const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", middlewareController.verifyToken, authController.logOut);

module.exports = router;
