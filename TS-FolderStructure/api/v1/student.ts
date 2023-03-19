import express from "express";
import StudentController from "../../controllers/v1/student";
import { checkUserScope } from "../../middlewares/checkUserScope";
import * as validation from "../../middlewares/validation";

const StudentRouter = express.Router();

StudentRouter.post(
  "/",
  checkUserScope("student-create"),
  validation.createStudent,
  StudentController.create
);
StudentRouter.get("/", checkUserScope("student-get"), StudentController.getAll);

export default StudentRouter;
