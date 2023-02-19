const user = require("../controllers/user.controller.js");
const checkUserScope = require("../middleware/checkUserScope.js");
var router = require("express").Router();

router.post("/signup", user.signUp);
router.post("/signin", user.signIn);

router.get("/", checkUserScope("user-get"), user.findAll);
router.get("/:id", checkUserScope("user-get"), user.findOne);

module.exports = router;
