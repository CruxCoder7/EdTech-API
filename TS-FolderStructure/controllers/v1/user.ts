import UserService from "../../services/v1/user";
import express from "express";

class UserController {
  static async signUp(req: express.Request, res: express.Response) {
    const result = await UserService.signUp(req, res);
    res.send(result);
  }
  static async signIn(req: express.Request, res: express.Response) {
    const result = await UserService.signIn(req, res);
    console.log(result);
    res.send(result);
  }
  static async findAll(req: express.Request, res: express.Response) {
    const result = await UserService.findAll(req, res);
    res.send(result);
  }
  static async findOne(req: express.Request, res: express.Response) {
    const result = await UserService.findOne(req, res);
    res.send(result);
  }
}

export default UserController;
