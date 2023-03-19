import UserService from "../../services/v1/user";
import express from "express";

class UserController {
  static async signUp(req: express.Request, res: express.Response) {
    const result = await UserService.signUp(req, res);
    res.send(result);
  }
}

export default UserController;
