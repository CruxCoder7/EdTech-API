import { Router } from 'express'
import * as student from "../controllers/student.controller"
import { checkUserScope } from '../middleware/checkUserScope'
import * as validation from '../middleware/validation'

const router = Router();

router.post(
    "/",
    checkUserScope("student-create"),
    validation.createStudent,
    student.create
);
router.get("/", checkUserScope("student-get"), student.getAll);

export = router;

