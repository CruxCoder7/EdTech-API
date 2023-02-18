const role = require("../controllers/role.controller.js");

var router = require("express").Router();

router.post("/", role.create);
router.get("/", role.getAll);

module.exports = router;
