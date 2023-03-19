import { Sequelize } from "sequelize";

const database: Sequelize = new Sequelize(process.env.POSTGRES_URI!);

export default database;
