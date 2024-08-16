const { Category, Vote, sequelize } = require("../models");

async function createCategory(data) {
  const { name, parentId } = data;
  const category = await Category.create({ name, parentId });
  return category;
}

async function getAllCategories() {
  const categories = await Category.findAll({
    include: {
      model: Category,
      as: "Children",
      include: {
        model: Category,
        as: "Children",
      },
    },
  });
  return categories;
}

async function getCategoryById(id) {
  const category = await Category.findByPk(id, {
    include: {
      model: Category,
      as: "Children",
      include: {
        model: Category,
        as: "Children",
      },
    },
  });
  if (!category) throw new Error("Category not found");
  return category;
}

async function updateCategory(id, data) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");
  const updatedCategory = await category.update(data);
  return updatedCategory;
}

async function deleteCategory(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");
  await category.destroy();
}

async function voteForCategory(categoryId) {
  const category = await Category.findByPk(categoryId);
  if (!category) throw new Error("Category not found");
  await Vote.create({ categoryId });
}

async function getTopCategories() {
  const topCategories = await Category.findAll({
    attributes: [
      "id",
      "name",
      [sequelize.fn("COUNT", sequelize.col("Votes.id")), "voteCount"],
    ],
    include: {
      model: Vote,
      attributes: [],
    },
    group: ["Category.id"],
    order: [[sequelize.literal("voteCount"), "DESC"]],
    limit: 3,
  });
  return topCategories;
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  voteForCategory,
  getTopCategories,
};
