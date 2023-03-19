import { models } from "../../schema/v1/meta";
import { DataTypes } from "sequelize";
import database from "../../universe/v1/models/database";
import { SchoolColumn } from "../../schema/v1/school";

const SchoolModel = database.define(models.school, {
  [SchoolColumn._id]: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  [SchoolColumn.city]: DataTypes.STRING,
  [SchoolColumn.country]: DataTypes.STRING,
  [SchoolColumn.name]: DataTypes.STRING,
});

export default SchoolModel;
