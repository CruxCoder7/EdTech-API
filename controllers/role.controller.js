const db = require("../models");
const Role = db.role;

exports.create = async (req, res) => {
  const role = {
    name: req.body.name,
    scopes: req.body.scopes,
  };
  try {
    const resp = await Role.create(role);
    res.status(200).json({ status: true, content: { data: resp } });
  } catch (error) {
    res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong." }],
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const resp = awaitRole.findAll({});
    res.status(200).json({ status: true, content: { data: resp } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
