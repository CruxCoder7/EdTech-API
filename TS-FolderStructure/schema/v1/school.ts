import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import ISchoolModel from "../../interfaces/v1/ISchoolModel";

export default function (sequelize: Sequelize) {
    const School: ModelStatic<Model<ISchoolModel>> = sequelize.define<Model<ISchoolModel>>(
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
