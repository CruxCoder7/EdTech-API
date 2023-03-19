import Database from "../../loaders/v1/database";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      } else {
        return { status: false, errors: [{ message: "roleId is wrong" }] };
      }
    } catch (error) {
      return { status: false, errors: [{ message: "Something went wrong." }] };
    }
  }

  static async signIn(req: express.Request, res: express.Response) {
    //check if email exists
    try {
      const resp = await Database.models.user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!resp) {
        return {
          status: false,
          errors: [{ message: "User not found." }],
        };
      }
      // check if passw ord matches
      let passwordIsValid = await bcrypt.compare(
        req.body.password,
        resp.password
      );
      if (!passwordIsValid) {
        return {
          status: false,
          errors: [{ message: "User not found." }],
        };
      }
      // create JWT for the user
      console.log(resp);
      try {
        let token = jwt.sign(
          { _id: resp._id, roleId: resp.roleId },
          process.env.JWT_SECRET_KEY!,
          {
            expiresIn: 86400,
          }
        );
        console.log(token);

        return { status: true, content: { data: resp, token } };
      } catch (error) {
        return {
          status: false,
          errors: [{ message: "Something went wrong." }],
        };
      }
    } catch (error) {
      return {
        status: false,
        errors: [{ message: "Something went wrong." }],
      };
    }
  }

  static async findAll(req: express.Request, res: express.Response) {
    try {
      const resp = await Database.models.user.findAll({});
      return { status: true, content: { data: resp } };
    } catch (error) {
      if (error instanceof Error) return { message: error.message };
    }
  }

  static async findOne(req: express.Request, res: express.Response) {
    const id = req.params.id;
    try {
      const resp = await Database.models.user.findByPk(id);
      return { status: true, content: { data: resp } };
    } catch (err) {
      if (err instanceof Error) return { message: err.message };
    }
  }
}

export default UserService;
