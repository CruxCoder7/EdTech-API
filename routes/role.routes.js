const role = require("../controllers/role.controller.js");
const checkUserScope = require("../middleware/checkUserScope.js");
const validation = require("../middleware/validation");

var router = require("express").Router();

router.post("/", validation.createRole, role.create);
router.get("/", checkUserScope("role-get"), role.getAll);

module.exports = router;
