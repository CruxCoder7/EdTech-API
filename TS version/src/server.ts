import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import db from "./models";
import * as userRoutes from './routes/user.route';
import * as roleRoutes from './routes/role.route';
import * as studentRoutes from './routes/student.route';
import * as schoolRoutes from './routes/school.route';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.sequelize?.sync().then(() => {
  console.log("db in sync.");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "EdTech Management" });
});

// API routes
app.use("/user", userRoutes.default);
app.use("/role", roleRoutes.default);
app.use("/student", studentRoutes.default);
app.use("/school", schoolRoutes.default);

const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
