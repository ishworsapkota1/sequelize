const { Category, Vote, sequelize } = require("../models");

async function createCategory(req, res) {
  try {
    const { name, parentId } = req.body;
    const category = await Category.create({ name, parentId });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllCategories(req, res) {
  try {
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
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Category,
        as: "Children",
        include: {
          model: Category,
          as: "Children",
        },
      },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateCategory(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const updatedCategory = await category.update(req.body);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function voteForCategory(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await Vote.create({ categoryId: req.params.id });
    res.status(200).json({ message: "Vote registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTopCategories(req, res) {
  try {
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
    res.status(200).json(topCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
