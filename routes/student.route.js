const student = require("../controllers/student.controller.js");
const checkUserScope = require("../middleware/checkUserScope.js");

var router = require("express").Router();

router.post("/", checkUserScope("student-create"), student.create);
router.get("/", checkUserScope("student-get"), student.getAll);

module.exports = router;
