import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import IUserModel from "../../interfaces/v1/IUserModel";

export default function (sequelize: Sequelize) {
    const User: ModelStatic<Model<IUserModel>> = sequelize.define<Model<IUserModel>>("user", {
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