const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connectDb");

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
  }
);

Category.belongsTo(Category, { as: "Parent", foreignKey: "parentId" });
Category.hasMany(Category, { as: "Children", foreignKey: "parentId" });

module.exports = Category;
