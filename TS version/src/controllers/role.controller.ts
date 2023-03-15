import db from "../models";
import { Request, Response } from "express";

const Role = db.role;

type RoleProp = {
  name: string;
  scopes: string[];
};

export async function create(req: Request, res: Response) {
  const role: RoleProp = {
    name: req.body.name,
    scopes: req.body.scopes,
  };
  try {
    if (Role) {
      const resp = await Role.create(role);
      res.status(200).json({ status: true, content: { data: resp } });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong." }],
    });
  }
}

export async function getAll(req: Request, res: Response) {
  if (Role) {
    try {
      const resp = await Role.findAll({});
      res.status(200).json({ status: true, content: { data: resp } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
