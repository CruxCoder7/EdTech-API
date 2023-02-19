const db = require("../models");
const Role = db.role;
const SCOPES = db.SCOPES;

const isValidScope = (scopes) => {
  for (let i = 0; i < scopes.length; i++) {
    if (!SCOPES.includes(scopes[i])) return false;
  }
  return true;
};

exports.create = (req, res) => {
  if (!isValidScope(req.body.scopes)) {
    return res.json({ status: false, errors: [{ message: "invalid scope" }] });
  }
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
