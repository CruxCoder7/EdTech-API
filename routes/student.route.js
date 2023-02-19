const student = require("../controllers/student.controller.js");
const checkUserScope = require("../middleware/checkUserScope.js");
const validation = require("../middleware/validation");

var router = require("express").Router();

router.post(
  "/",
  checkUserScope("student-create"),
  validation.createStudent,
  student.create
);
router.get("/", checkUserScope("student-get"), student.getAll);

module.exports = router;
