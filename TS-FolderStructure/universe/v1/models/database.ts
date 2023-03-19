import { Sequelize } from "sequelize";
import Env from "../../../loaders/v1/env";

Env.Loader();
const database: Sequelize = new Sequelize(Env.variable.POSTGRES_URI);

export default database;
