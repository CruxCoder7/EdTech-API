import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

type RoleModel = {
    _id: string;
    name: string;
    scopes: string[]
}

export default function (sequelize: Sequelize) {
    const Role: ModelStatic<Model<RoleModel>> = sequelize.define<Model<RoleModel>>("role", {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        scopes: DataTypes.ARRAY(DataTypes.STRING),
    });
    return Role;
}
