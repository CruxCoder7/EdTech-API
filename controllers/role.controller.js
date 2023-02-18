const db = require("../models");
const Role = db.role;
const ROLES = db.ROLES;

const checkRoles = (roles) => {
  for (let i = 0; i < ROLES.length; i++) {
    if (!ROLES.includes(roles)) {
      return 0;
    }
  }
  return 1;
};

exports.create = (req, res) => {
  if (checkRoles(req.body.name) === 0) {
    return res.status(500).json({
      status: false,
      errors: [{ message: "Role not available" }],
    });
  }

  Role.findOne({
    where: {
      name: req.body.name,
    },
  }).then((data) => {
    if (data) {
      res.status(404).json({
        status: false,
        errors: [{ message: "Role already exists." }],
      });
    } else {
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
    }
  });
};

exports.getAll = (req, res) => {
  Role.findAll({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
