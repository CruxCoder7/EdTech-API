import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

interface ModelProps {
  _id: string;
  name: string;
  scopes: string[];
}

export default function (sequelize: Sequelize) {
  const Role: ModelStatic<Model<ModelProps>> = sequelize.define<Model<ModelProps>>("role", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    scopes: DataTypes.ARRAY(DataTypes.STRING),
  });
  return Role;
}
