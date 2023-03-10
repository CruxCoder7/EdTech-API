const db = require("../models");
const Student = db.student;
const User = db.user;
const School = db.school;

const isValidUserId = async (user_id) => {
  const res = await User.findOne({
    where: {
      _id: user_id,
    },
  });
  if (res) return 1;
  return 0;
};

const isValidSchoolId = async (school_id) => {
  const res = await School.findOne({
    where: {
      _id: school_id,
    },
  });
  if (res) return 1;
  return 0;
};

exports.create = async (req, res) => {
  // creates a student
  const student = {
    name: req.body.name,
    userId: req.body.userId,
    schoolId: req.body.schoolId,
  };
  // check if roleId and schoolId exist
  if (
    isValidUserId(req.body.userId) == 0 ||
    isValidSchoolId(req.body.schoolId) == 0
  ) {
    return res.json({
      status: false,
      errors: [{ message: "invalid userid or schoolid" }],
    });
  }
  try {
    const resp = await Student.create(student);
    res.json({ status: true, content: { data: resp } });
  } catch (error) {
    return res.json({ status: false, errors: [{ message: error.message }] });
  }
};

exports.getAll = async (req, res) => {
  // returns all students
  if (req.access) {
    console.log(req.id);
    try {
      const resp = await Student.findAll({ where: { userId: req.id } });
      return res.json({ status: true, content: { data: resp } });
    } catch (error) {
      return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
};
