import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

interface ModelProps {
  _id: string;
  name: string;
}

export default function (sequelize: Sequelize) {
  const Student: ModelStatic<Model<ModelProps, ModelProps>> = sequelize.define<Model<ModelProps>>(
    "student",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
    }
  );
  return Student;
}
