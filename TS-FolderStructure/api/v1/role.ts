import express from "express";
import RoleController from "../../controllers/v1/role";
import { checkUserScope } from "../../middlewares/checkUserScope";
import * as validation from "../../middlewares/validation";
const RoleRouter = express.Router();

RoleRouter.post("/", validation.createRole, RoleController.create);
RoleRouter.get("/", checkUserScope("role-get"), RoleController.getAll);

export default RoleRouter;
