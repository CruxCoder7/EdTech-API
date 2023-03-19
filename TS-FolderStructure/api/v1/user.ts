import express from "express";
import UserController from "../../controllers/v1/user";
import { checkUserScope } from "../../middlewares/checkUserScope";
import * as validation from "../../middlewares/validation";
const UserRouter = express.Router();

UserRouter.post("/signup", validation.signUp, UserController.signUp);
UserRouter.post("/signin", validation.signIn, UserController.signIn);
UserRouter.get("/", checkUserScope("user-get"), UserController.findAll);
UserRouter.get("/:id", checkUserScope("user-get"), UserController.findOne);

export default UserRouter;
