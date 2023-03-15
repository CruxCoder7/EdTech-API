
import { Router } from 'express';
import * as school from "../controllers/school.controller"
import { checkUserScope } from '../middleware/checkUserScope';
import * as validation from '../middleware/validation';


const router = Router();

router.post('/', checkUserScope('school-create'), validation.createSchool, school.create)
router.get('/', checkUserScope("school-get"), school.getAll);
router.get("/students", checkUserScope("school-students"), school.getStudents);

export = router;

