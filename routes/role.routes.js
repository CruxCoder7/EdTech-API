const role = require("../controllers/role.controller.js");
const checkUserScope = require("../middleware/checkUserScope.js");

var router = require("express").Router();

router.post("/", role.create);
router.get("/", checkUserScope("role-get"), role.getAll);

module.exports = router;
