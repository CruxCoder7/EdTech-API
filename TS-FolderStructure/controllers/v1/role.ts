import RoleService from "../../services/v1/role";
import express from "express";

class UserController {
  static async create(req: express.Request, res: express.Response) {
    const result = await RoleService.create(req, res);
    res.status(200).json(result);
  }
  static async getAll(req: express.Request, res: express.Response) {
    const result = await RoleService.getAll(req, res);
    res.status(200).json(result);
  }
}

export default UserController;
