import express from "express";
import UserController from "../../controllers/v1/user";
const UserRouter = express.Router();

UserRouter.post("/signup", UserController.signUp);

export default UserRouter;
