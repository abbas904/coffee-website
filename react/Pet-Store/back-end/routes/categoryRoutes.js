import express from "express";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
import { listCategoryWithTopProduct } from "../controllers/categoryCountController.js"; // الكنترولر المعدل
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// جديد: أعلى منتج لكل فئة (ضعه قبل أي راوت ديناميكي)
router.route("/count").get(listCategoryWithTopProduct); // مؤقتًا بدون حماية

// CRUD Categories
router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router.route("/:categoryId").delete(authenticate, authorizeAdmin, removeCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
