require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const studentRoutes = require("./routes/student.route");
const schoolRoutes = require("./routes/school.route");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync().then(() => console.log("db in sync"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to EdTech" });
});

app.use("/user", userRoutes);
app.use("/role", roleRoutes);
app.use("/student", studentRoutes);
app.use("/school", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
