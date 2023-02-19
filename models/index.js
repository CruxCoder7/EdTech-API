const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_URI);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, DataTypes);
db.student = require("./student.model.js")(sequelize, DataTypes);
db.school = require("./school.model.js")(sequelize, DataTypes);

db.user.belongsTo(db.role, {
  foreignKey: "roleId",
});

db.school.hasMany(db.student, {
  foreignKey: "schoolId",
});

db.user.hasMany(db.student, {
  foreignKey: "userId",
});

db.SCOPES = [
  "user-get",
  "role-get",
  "student-create",
  "student-get",
  "school-create",
  "school-get",
  "school-students",
];

module.exports = db;
