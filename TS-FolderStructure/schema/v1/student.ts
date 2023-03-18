import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import IStudentModel from "../../interfaces/v1/IStudentModel";

export default function (sequelize: Sequelize) {
    const Student: ModelStatic<Model<IStudentModel>> = sequelize.define<Model<IStudentModel>>(
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
