import { models } from "../../schema/v1/meta";
import { DataTypes } from "sequelize";
import database from "../../universe/v1/models/database";
import { StudentColumn } from "../../schema/v1/student";
import UserModel from "./user";
import SchoolModel from "./school";

const StudentModel = database.define(models.student, {
  [StudentColumn._id]: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  [StudentColumn.name]: DataTypes.STRING,
});

UserModel.hasMany(StudentModel, {
  foreignKey: "userId",
});

SchoolModel.hasMany(StudentModel, {
  foreignKey: "schoolId",
});

export default StudentModel;
