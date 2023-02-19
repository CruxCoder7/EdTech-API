const validator = require("../helpers/validate");

const signUp = async (req, res, next) => {
  const validationRule = {
    email: "required|max:128|email",
    name: "required|max:64|string",
    roleId: "required|string",
    password: "required|string|max:64",
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => {
    res.json({ err });
  });
};

const signIn = async (req, res, next) => {
  const validationRule = {
    email: "required|max:128|email",
    password: "required|string|max:64",
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => {
    res.json({ err });
  });
};

const createRole = async (req, res, next) => {
  const validationRule = {
    name: "required|string|max:32",
    scopes:
      "required|array|min:1|in:user-get,student-get,student-create,role-get,school-get,school-create,school-students",
    "scopes.*": "string|max:32",
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => {
    res.json({ err });
  });
};

const createSchool = async (req, res, next) => {
  const validationRule = {
    name: "required|string|max:128",
    city: "required|string|max:128",
    state: "required|string|max:128",
    country: "required|string|max:2",
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => {
    res.json({ err });
  });
};

const createStudent = async (req, res, next) => {
  const validationRule = {
    name: "required|string|max:64",
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => {
    res.json({ err });
  });
};

module.exports = { signUp, signIn, createRole, createSchool, createStudent };
