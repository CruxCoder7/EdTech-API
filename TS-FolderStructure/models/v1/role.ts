import { models } from "../../schema/v1/meta";
import { DataTypes } from "sequelize";
import database from "../../universe/v1/models/database";
import { RoleColumn } from "../../schema/v1/role";

const RoleModel = database.define(models.user, {
  [RoleColumn._id]: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  [RoleColumn.name]: DataTypes.STRING,
  [RoleColumn.scopes]: DataTypes.ARRAY(DataTypes.STRING),
});

export default RoleModel;
