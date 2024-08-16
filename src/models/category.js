const { DataTypes } = require("sequelize");
const sequelize = require("../connectDb");

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    tableName: "categories",
  }
);

Category.belongsTo(Category, { as: "Parent", foreignKey: "parentId" });
Category.hasMany(Category, { as: "Children", foreignKey: "parentId" });

module.exports = Category;
