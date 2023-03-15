import { Request, Response } from "express";
import db from "../models";
const Student = db.student;
const User = db.user;
const School = db.school;

const isValidUserId = async (user_id: string) => {
  if (User) {
    const res = await User.findOne({
      where: {
        _id: user_id,
      },
    });
    if (res) return 1;
    return 0;
  }
};

const isValidSchoolId = async (school_id: string) => {
  if (School) {
    const res = await School.findOne({
      where: {
        _id: school_id,
      },
    });
    if (res) return 1;
    return 0;
  }
};

type StudentProps = {
  name: string;
  userId: string;
  schoolId: string;
};

export async function getAll(req: Request, res: Response) {
  if (Student) {
    try {
      const resp = await Student.findAll({ where: { userId: res.locals.id } });
      return res.json({ status: true, content: { data: resp } });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
}


export async function create(req: Request, res: Response) {
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
    return res.json({
      status: false,
      errors: [{ message: "invalid userid or schoolid" }],
    });
  }
  if (Student) {
    try {
      const resp = await Student.create(student);
      res.json({ status: true, content: { data: resp } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.json({
          status: false,
          errors: [{ message: error.message }],
        });
      }
    }
  }
}

