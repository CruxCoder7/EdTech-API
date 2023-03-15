import { Sequelize, ModelStatic, Model } from "sequelize";

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
//@ts-ignore
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model").default(sequelize);
db.role = require("./role.model.ts").default(sequelize);
db.student = require("./student.model.ts").default(sequelize);
db.school = require("./school.model.ts").default(sequelize);

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
