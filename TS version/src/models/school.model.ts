import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

interface ModelProps {
  _id: string;
  name: string;
  city: string;
  country: string;
}

export default function (sequelize: Sequelize) {
  const School: ModelStatic<Model<ModelProps, ModelProps>> = sequelize.define<Model<ModelProps>>(
    "school",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
    }
  );
  return School;
}
