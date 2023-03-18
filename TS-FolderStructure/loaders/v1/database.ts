import Env from "./env";
import { Sequelize } from "sequelize";
import { IDb } from "../../interfaces/v1/IDb";
import User from "../../schema/v1/user";
import Role from "../../schema/v1/role";
import School from "../../schema/v1/school";
import Student from "../../schema/v1/student";
import Logger from "../../universe/v1/logger";

class Database {
    static db: IDb = {};

    static async Loader() {
        const uri = Env.variable.POSTGRES_URI;
        try {
            this.db.sequelize = new Sequelize(uri);

            this.db.user = User(this.db.sequelize);
            this.db.role = Role(this.db.sequelize);
            this.db.school = School(this.db.sequelize);
            this.db.student = Student(this.db.sequelize);

            this.db.sequelize?.sync({ force: true }).then(() => {
                console.log("db in sync.");
            });
        } catch (error) {
            Logger.instance.error(error);
        }
    }
}

export default Database;