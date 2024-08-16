const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  voteForCategory,
  getTopCategories,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/create", createCategory);
router.get("/all", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.post("/vote/:id", voteForCategory);
router.get("/top", getTopCategories);

module.exports = router;
