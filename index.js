const express = require("express");
const categoryRoutes = require("./src/routes/categoryRoutes");

const app = express();

app.use(express.json());
const sequelize = require("./connectDb");
// require("./connectDb");

// app.listen(4000, () => {
//   console.log("App is running");
// });

app.use("/api", categoryRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(4002, () => {
      console.log("Server is running on http://localhost:4002");
    });
  })
  .catch((error) => console.log(error));
