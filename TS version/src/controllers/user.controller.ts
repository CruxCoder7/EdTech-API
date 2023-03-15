import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const User = db.user;
const Role = db.role;

export async function signUp(req: Request, res: Response) {
  if (User) {
    // check if email already exists
    try {
      const resp = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (resp) {
        return res.status(500).json({
          status: false,
          errors: [{ message: "Email address already exists." }],
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong." }],
      });
    }
  }
  if (Role && User) {
    // check if the roleId exists
    try {
      const resp = await Role.findOne({ where: { _id: req.body.roleId } });
      if (resp) {
        const user = {
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          roleId: req.body.roleId,
        };
        try {
          const data = await User.create(user);
          return res.json({ status: true, content: { data } });
        } catch (error) {
          res.status(500).json({
            status: false,
            errors: [{ message: "Something went wrong." }],
          });
        }
      }
    } catch (error) {
      return res
        .status(404)
        .json({ status: false, errors: [{ message: "roleId is wrong" }] });
    }
  }
}

type respProps = {
  password: string;
  _id: string;
  roleId: string;
};

export async function signIn(req: Request, res: Response) {
  if (User) {
    //check if email exists
    try {
      const resp = await User.findOne({
        where: {
          email: req.body.email,
        },
      }) as | respProps | null;
      if (!resp) {
        return res.status(404).json({
          status: false,
          errors: [{ message: "User not found." }],
        });
      }
      // check if passw ord matches
      let passwordIsValid = await bcrypt.compare(
        req.body.password,
        resp.password
      );
      if (!passwordIsValid) {
        return res.status(404).json({
          status: false,
          errors: [{ message: "User not found." }],
        });
      }
      // create JWT for the user
      try {
        let token = jwt.sign(
          { _id: resp._id, roleId: resp.roleId },
          process.env.JWT_SECRET_KEY!,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).json({ status: true, content: { data: resp, token } });
      } catch (error) {
        res.status(500).json({
          status: false,
          errors: [{ message: "Something went wrong." }],
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong." }],
      });
    }
  }
}

export async function findAll(req: Request, res: Response) {
  if (User) {
    try {
      const resp = await User.findAll({});
      return res.status(200).json({ status: true, content: { data: resp } });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ message: error.message });
    }
  }
}

export async function findOne(req: Request, res: Response) {
  if (User) {
    const id = req.params.id;
    try {
      const resp = await User.findByPk(id);
      return res.json({ status: true, content: { data: resp } });
    } catch (err) {
      if (err instanceof Error)
        return res.json({ message: err.message });
    }
  }
}