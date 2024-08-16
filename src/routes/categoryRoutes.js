// src/routes/categoryRoutes.js
const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);
router.post("/categories/:id/vote", categoryController.voteForCategory);
router.get("/categories/top", categoryController.getTopCategories);

module.exports = router;
