require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ force: true });
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to EdTech" });
});

app.use("/user", userRoutes);
app.use("/role", roleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
