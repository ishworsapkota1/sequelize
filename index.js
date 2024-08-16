const express = require("express");
const categoryRoutes = require("./src/routes/categoryRoutes");
const sequelize = require("./connectDb");

const app = express();

app.use(express.json());
app.use("/api", categoryRoutes);

const PORT = process.env.DB_PORT || 3002;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database or start server:", error);
  });
