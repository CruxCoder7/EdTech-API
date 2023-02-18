const user = require("../controllers/user.controller.js");

var router = require("express").Router();

router.post("/signup", user.signUp);
router.post("/signin", user.signIn);

router.get("/", user.findAll);
router.get("/:id", user.findOne);

module.exports = router;
