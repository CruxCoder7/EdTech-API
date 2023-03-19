import express from "express";
import cors from "cors";

const FrameworkLoader = (app: express.Application) => {
  app.use(cors());
};

export default FrameworkLoader;
