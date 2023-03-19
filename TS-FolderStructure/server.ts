import express from "express";
import RoleRouter from "./api/v1/role";
import SchoolRouter from "./api/v1/school";
import StudentRouter from "./api/v1/student";
import UserRouter from "./api/v1/user";
import Database from "./loaders/v1/database";
import Env from "./loaders/v1/env";
import FrameworkLoader from "./loaders/v1/framework";
import Logger from "./universe/v1/libraries/logger";

const server = async (): Promise<express.Application> => {
  const app = express();
  //Loaders
  Env.Loader();
  Logger.Loader();
  await Database.Loader();
  FrameworkLoader(app);

  //Routes
  app.use("/user", UserRouter);
  app.use("/role", RoleRouter);
  app.use("/student", StudentRouter);
  app.use("/school", SchoolRouter);

  return app;
};

export default server;
