import { ModelStatic } from "sequelize";
import RoleModel from "../../models/v1/role";
import UserModel from "../../models/v1/user";
import { collections } from "../../schema/v1/meta";
import Logger from "../../universe/v1/libraries/logger";
import database from "../../universe/v1/models/database";
import Env from "./env";

class Database {
  static models: Record<typeof collections[number], ModelStatic<any>>;
  static ListOfModels = [UserModel, RoleModel];

  static async Loader(): Promise<void> {
    try {
      await database.authenticate();
      Logger.instance.info(`Connected to ${Env.variable.POSTGRES_URI}.`);

      const models: Record<string, ModelStatic<any>> = {};
      for (const model of Database.ListOfModels) {
        models[model.name] = model;
        models[model.tableName] = model;
      }
      Database.models = models;

      await database.sync({ force: true });
    } catch (ex) {
      Logger.instance.error(ex);
    }
  }

  static async Close(): Promise<void> {
    try {
      await database.close();
    } catch (ex) {
      Logger.instance.error(ex);
    }
  }
}

export default Database;
