const db = require("../models");
const School = db.school;
const Student = db.student;

exports.create = async (req, res) => {
  const school = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  };
  if (req.access) {
    try {
      const resp = await School.create(school);
      return res.json({ status: true, content: { data: resp } });
    } catch (error) {
      return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
};

exports.getAll = async (req, res) => {
  if (req.access) {
    try {
      const resp = await School.findAll({});
      return res.json({ status: true, content: { data: resp } });
    } catch (error) {
      return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
};

exports.getStudents = async (req, res) => {
  if (req.access) {
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
      return res.json({ status: false, errors: [{ message: error.message }] });
    }
  }
};
