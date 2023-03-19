import { models } from "../../schema/v1/meta";
import { DataTypes } from "sequelize";
import database from "../../universe/v1/models/database";
import { UserColumn } from "../../schema/v1/user";

const UserModel = database.define("user", {
  [UserColumn._id]: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  [UserColumn.email]: {
    type: DataTypes.STRING,
    unique: true,
  },
  [UserColumn.name]: DataTypes.STRING,
  [UserColumn.password]: DataTypes.STRING,
});

export default UserModel;
