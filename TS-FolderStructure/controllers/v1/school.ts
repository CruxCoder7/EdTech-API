import SchoolService from "../../services/v1/school";
import express from "express";

export default class SchoolController {
  static async create(req: express.Request, res: express.Response) {
    const result = await SchoolService.create(req, res);
    res.send(result);
  }

  static async getAll(req: express.Request, res: express.Response) {
    const result = await SchoolService.getAll(req, res);
    res.send(result);
  }
  static async getStudents(req: express.Request, res: express.Response) {
    const result = await SchoolService.getStudents(req, res);
    res.send(result);
  }
}
