import Database from "../../loaders/v1/database";
import express from "express";

type RoleProp = {
  name: string;
  scopes: string[];
};

class RoleService {
  static async create(req: express.Request, res: express.Response) {
    const role: RoleProp = {
      name: req.body.name,
      scopes: req.body.scopes,
    };
    try {
      const resp = await Database.models.role.create(role);
      return { status: true, content: { data: resp } };
    } catch (error) {
      return {
        status: false,
        errors: [{ message: "Something went wrong." }],
      };
    }
  }

  static async getAll(req: express.Request, res: express.Response) {
    try {
      const resp = await Database.models.role.findAll({});
      return { status: true, content: { data: resp } };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { message: error.message };
      }
    }
  }
}

export default RoleService;
