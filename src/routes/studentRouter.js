const studentController = require("../controllers/studentController");
const router = require("express").Router();

router.get("/", studentController.getAll);
router.get("/:id", studentController.get);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.delete);
router.delete("/", studentController.deleteAll);

module.exports = router;
