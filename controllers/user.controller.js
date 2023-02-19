const db = require("../models");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const resp = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (resp) {
      return res.status(500).json({
        status: false,
        errors: [{ message: "Email address already exists." }],
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong." }],
    });
  }

  try {
    const resp = await Role.findOne({ where: { _id: req.body.roleId } });
    if (resp) {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        roleId: req.body.roleId,
      };
      try {
        const data = await User.create(user);
        return res.json({ status: true, content: { data } });
      } catch (error) {
        res.status(500).json({
          status: false,
          errors: [{ message: "Something went wrong." }],
        });
      }
    } else {
      return res
        .status(404)
        .json({ status: false, errors: [{ message: "roleId is wrong" }] });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong." }],
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const resp = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!resp) {
      return res.status(404).json({
        status: false,
        errors: [{ message: "User not found." }],
      });
    }
    let passwordIsValid = await bcrypt.compare(
      req.body.password,
      resp.password
    );

    if (!passwordIsValid) {
      return res.status(404).json({
        status: false,
        errors: [{ message: "User not found." }],
      });
    }

    try {
      let token = jwt.sign(
        { _id: resp._id, roleId: resp.roleId },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({ status: true, content: { data: resp, token } });
    } catch (error) {
      res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong." }],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong." }],
    });
  }
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
