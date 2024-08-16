const categoryService = require("../services/categoryService");

async function createCategory(req, res) {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateCategory(req, res) {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function voteForCategory(req, res) {
  try {
    await categoryService.voteForCategory(req.params.id);
    res.status(200).json({ message: "Vote registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTopCategories(req, res) {
  try {
    const topCategories = await categoryService.getTopCategories();
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
