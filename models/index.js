const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_URI);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, DataTypes);

db.user.belongsTo(db.role, {
  foreignKey: "roleId",
});

db.ROLES = ["Admin", "Student", "Principal"];
module.exports = db;
