import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_URI!);

interface DbProps {
  Sequelize?: Sequelize;
  sequelize?: Sequelize;
  user?: ModelStatic<Model>;
  role?: ModelStatic<Model>;
  student?: ModelStatic<Model>;
  school?: ModelStatic<Model>;
}

const db: DbProps = {};
db.Sequelize = new Sequelize();
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize);
db.role = require("./role.model.js")(sequelize);
db.student = require("./student.model.js")(sequelize);
db.school = require("./school.model.js")(sequelize);

// Relationships between tables
if (db.user && db.role)
  db.user.belongsTo(db.role, {
    foreignKey: "roleId",
  });

if (db.school && db.student)
  db.school.hasMany(db.student, {
    foreignKey: "schoolId",
  });

if (db.user && db.student)
  db.user.hasMany(db.student, {
    foreignKey: "userId",
  });

export default db;
