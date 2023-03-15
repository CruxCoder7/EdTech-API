import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

interface ModelProps {
  _id: string;
  name: string;
  email: string;
  password: string,
}


export default function (sequelize: Sequelize) {
  const User: ModelStatic<Model<ModelProps>> = sequelize.define<Model<ModelProps>>("user", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });
  return User;
}
