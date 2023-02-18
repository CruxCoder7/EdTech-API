const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(async (data) => {
    if (data) {
      res.status(500).json({
        status: false,
        errors: [{ message: "Email address already exists." }],
      });
    } else {
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

      var token = jwt.sign({ _id: data._id }, "SECRET_KEY", {
        expiresIn: 86400,
      });
      res.status(200).json({ status: true, content: { data, token } });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong." }],
      });
    });
};

exports.findAll = (req, res) => {};
exports.findOne = (req, res) => {};
