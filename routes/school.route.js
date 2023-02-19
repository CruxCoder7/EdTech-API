const school = require("../controllers/school.controller.js");
const checkUserScope = require("../middleware/checkUserScope.js");

var router = require("express").Router();

router.post("/", checkUserScope("school-create"), school.create);
router.get("/", checkUserScope("school-get"), school.getAll);
router.get("/students", checkUserScope("school-students"), school.getStudents);

module.exports = router;
