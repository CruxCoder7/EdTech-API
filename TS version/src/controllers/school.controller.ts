import { Request, Response } from "express";
import db from "../models";
const Student = db.student;
const School = db.school;


type schoolProps = {
  name: string,
  city: string,
  state: string,
  country: string
}

export async function create(req: Request, res: Response) {
  if (School) {

    const school: schoolProps = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    };
    try {
      const resp = await School.create(school);
      return res.json({ status: true, content: { data: resp } });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
}

export async function getAll(req: Request, res: Response) {
  if (School) {
    try {
      const resp = await School.findAll({});
      return res.json({ status: true, content: { data: resp } });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
}

export async function getStudents(req: Request, res: Response) {
  if (School && Student) {
    try {
      const resp = await School.findAll({
        include: [
          {
            model: Student,
            as: "students",
          },
        ],
      });
      return res.json({ status: true, content: { data: resp } });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
}