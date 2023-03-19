import Database from "../../loaders/v1/database";
import express from "express";

const isValidUserId = async (user_id: string) => {
  const res = await Database.models.user.findOne({
    where: {
      _id: user_id,
    },
  });
  if (res) return 1;
  return 0;
};

const isValidSchoolId = async (school_id: string) => {
  const res = await Database.models.school.findOne({
    where: {
      _id: school_id,
    },
  });
  if (res) return 1;
  return 0;
};

type StudentProps = {
  name: string;
  userId: string;
  schoolId: string;
};

class StudentService {
  static async create(req: express.Request, res: express.Response) {
    const student: StudentProps = {
      name: req.body.name,
      userId: req.body.userId,
      schoolId: req.body.schoolId,
    };
    // check if roleId and schoolId exist
    if (
      (isValidUserId(req.body.userId) as unknown as number) == 0 ||
      (isValidSchoolId(req.body.schoolId) as unknown as number) == 0
    ) {
      return {
        status: false,
        errors: [{ message: "invalid userid or schoolid" }],
      };
    }
    try {
      const resp = await Database.models.student.create(student);
      return { status: true, content: { data: resp } };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: false,
          errors: [{ message: error.message }],
        };
      }
    }
  }

  static async getAll(req: express.Request, res: express.Response) {
    try {
      const resp = await Database.models.student.findAll({
        where: { userId: res.locals.id },
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

export default StudentService;
