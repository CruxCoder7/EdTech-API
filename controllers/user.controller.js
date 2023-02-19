const db = require("../models");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (data) {
      res.status(500).json({
        status: false,
        errors: [{ message: "Email address already exists." }],
      });
    } else {
      Role.findOne({ _id: req.body.roleId }).then(async (data) => {
        if (data) {
          const user = {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            roleId: req.body.roleId,
          };
          User.create(user)
            .then((data) => {
              res.json({ status: true, content: { data } });
            })
            .catch((err) => {
              res.status(500).json({
                status: false,
                errors: [{ message: "Something went wrong." }],
              });
            });
        } else {
          res
            .status(404)
            .json({ status: false, errors: [{ message: "roleId is wrong" }] });
        }
      });
    }
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).json({
          status: false,
          errors: [{ message: "User not found." }],
        });
      }
      var passwordIsValid = await bcrypt.compare(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(404).json({
          status: false,
          errors: [{ message: "User not found." }],
        });
      }

      var token = jwt.sign(
        { _id: data._id, roleId: data.roleId },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({ status: true, content: { data, token } });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong." }],
      });
    });
};

exports.findAll = async (req, res) => {
  if (req.access) {
    try {
      const resp = await User.findAll({});
      return res.status(200).json({ status: true, content: { data: resp } });
    } catch (error) {
      return res.json({ message: err.message });
    }
  }
};

exports.findOne = async (req, res) => {
  if (req.access) {
    const id = req.params.id;
    try {
      const resp = await User.findByPk(id);
      return res.json({ resp });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
};
