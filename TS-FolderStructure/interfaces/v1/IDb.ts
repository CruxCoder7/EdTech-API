import { Sequelize, ModelStatic, Model } from "sequelize";

export interface IDb {
    Sequelize?: Sequelize;
    sequelize?: Sequelize;
    user?: ModelStatic<Model>;
    role?: ModelStatic<Model>;
    student?: ModelStatic<Model>;
    school?: ModelStatic<Model>;
}