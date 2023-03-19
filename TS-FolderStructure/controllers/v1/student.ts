import StudentService from "../../services/v1/student";
import express from "express";

class StudentController {
  static async create(req: express.Request, res: express.Response) {
    const result = await StudentService.create(req, res);
    res.send(result);
  }
  static async getAll(req: express.Request, res: express.Response) {
    const result = await StudentService.getAll(req, res);
    res.send(result);
  }
}

export default StudentController;
