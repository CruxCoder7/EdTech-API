const db = require("../models");
const Role = db.role;

exports.create = (req, res) => {
  const role = {
    name: req.body.name,
    scopes: req.body.scopes,
  };

  Role.create(role)
    .then((data) => {
      res.status(200).json({ status: true, content: { data } });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong." }],
      });
    });
};

exports.getAll = (req, res) => {
  Role.findAll({})
    .then((data) => {
      res.status(200).json({ status: true, content: { data } });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
