const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const Role = db.role;

const checkUserScope = (scopeVal) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(scopeVal);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.send("no token");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { roleId } = decoded;
    const resp = await Role.findOne({
      where: {
        _id: roleId,
      },
    });
    const scopes = resp.scopes;
    if (scopes.includes(scopeVal)) {
      req.access = true;
      return next();
    }
    return res.json({
      status: false,
      errors: [{ message: "You don't have access" }],
    });
  };
};

module.exports = checkUserScope;
