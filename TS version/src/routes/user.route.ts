import { Router } from 'express'
import * as user from '../controllers/user.controller'
import { checkUserScope } from "../middleware/checkUserScope"
import * as validation from '../middleware/validation'

const router = Router()

router.post("/signup", validation.signUp, user.signUp);
router.post("/signin", validation.signIn, user.signIn);
router.get("/", checkUserScope("user-get"), user.findAll);
router.get("/:id", checkUserScope("user-get"), user.findOne);

export = router;
