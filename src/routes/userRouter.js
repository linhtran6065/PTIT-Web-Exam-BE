const userController = require("../controllers/userController");
const router = require("express").Router();

router.get("/", userController.getAll);
router.get("/:id", userController.get);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.delete);
router.delete("/", userController.deleteAll);

module.exports = router;
