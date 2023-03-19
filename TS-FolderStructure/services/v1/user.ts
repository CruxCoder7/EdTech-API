import Database from "../../loaders/v1/database";
import express from "express";
import bcrypt from "bcrypt";

class UserService {
  static async signUp(req: express.Request, res: express.Response) {
    // check if email already exists
    try {
      const resp = await Database.models.user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (resp) {
        return {
          status: false,
          errors: [{ message: "Email address already exists." }],
        };
      }
    } catch (error) {
      if (error instanceof Error)
        return {
          status: false,
          errors: [{ message: error.message }],
        };
    }
    // check if the roleId exists
    try {
      const resp = await Database.models.role.findOne({
        where: { _id: req.body.roleId },
      });
      if (resp) {
        const user = {
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          roleId: req.body.roleId,
        };
        try {
          const data = await Database.models.user.create(user);
          return { status: true, content: { data } };
        } catch (error) {
          return {
            status: false,
            errors: [{ message: "Something went wrong." }],
          };
        }
      }
    } catch (error) {
      return { status: false, errors: [{ message: "roleId is wrong" }] };
    }
  }
}

export default UserService;
