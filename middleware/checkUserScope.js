const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const Role = db.role;

const checkUserScope = (scopeVal) => {
  // checks if the signed in user has the required scope to access endpoints
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.send("no token");
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // receive the userId and roleId of the user
      const { _id, roleId } = decoded;
      const resp = await Role.findOne({
        where: {
          _id: roleId,
        },
      });
      const scopes = resp.scopes;
      if (scopes.includes(scopeVal)) {
        // append the access to be true and id to be the userId
        req.access = true;
        req.id = _id;
        return next();
      }
      return res.json({
        status: false,
        errors: [{ message: "You don't have access" }],
      });
    } catch (error) {
      return res.json({
        status: false,
        errors: [{ message: "fake token" }],
      });
    }
  };
};

module.exports = checkUserScope;
