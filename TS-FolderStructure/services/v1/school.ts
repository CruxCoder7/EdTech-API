import express from "express";
import Database from "../../loaders/v1/database";

type schoolProps = {
  name: string;
  city: string;
  state: string;
  country: string;
};

export default class SchoolService {
  static async create(req: express.Request, res: express.Response) {
    const school: schoolProps = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    };
    try {
      const resp = await Database.models.school.create(school);
      return { status: true, content: { data: resp } };
    } catch (error) {
      if (error instanceof Error)
        return {
          status: false,
          errors: [{ message: error.message }],
        };
    }
  }

  static async getAll(req: express.Request, res: express.Response) {
    try {
      const resp = await Database.models.school.findAll({});
      return { status: true, content: { data: resp } };
    } catch (error) {
      if (error instanceof Error)
        return {
          status: false,
          errors: [{ message: error.message }],
        };
    }
  }

  static async getStudents(req: express.Request, res: express.Response) {
    try {
      const resp = await Database.models.school.findAll({
        include: [
          {
            model: Database.models.student,
            as: "students",
          },
        ],
      });
      return { status: true, content: { data: resp } };
    } catch (error) {
      if (error instanceof Error)
        return {
          status: false,
          errors: [{ message: error.message }],
        };
    }
  }
}
