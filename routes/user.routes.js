const user = require("../controllers/user.controller.js");
const checkUserScope = require("../middleware/checkUserScope.js");
const validation = require("../middleware/validation");
var router = require("express").Router();

router.post("/signup", validation.signUp, user.signUp);
router.post("/signin", validation.signIn, user.signIn);

router.get("/", checkUserScope("user-get"), user.findAll);
router.get("/:id", checkUserScope("user-get"), user.findOne);

module.exports = router;
