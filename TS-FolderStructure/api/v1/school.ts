import express from "express";
import SchoolController from "../../controllers/v1/school";
import { checkUserScope } from "../../middlewares/checkUserScope";
import * as validation from "../../middlewares/validation";
const SchoolRouter = express.Router();

SchoolRouter.post(
  "/",
  checkUserScope("school-create"),
  validation.createSchool,
  SchoolController.create
);
SchoolRouter.get("/", checkUserScope("school-get"), SchoolController.getAll);
SchoolRouter.get(
  "/students",
  checkUserScope("school-students"),
  SchoolController.getStudents
);

export default SchoolRouter;
