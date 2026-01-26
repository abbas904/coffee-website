import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModal.js";

// مؤقتًا: تجاهل أي أخطاء فردية لكل فئة
const listCategoryWithTopProduct = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    const data = await Promise.all(
      categories.map(async (cat) => {
        try {
          const product = await Product.findOne({ category: cat._id })
            .sort({ createdAt: 1 })
            .limit(1);

          return { category: cat.name, product: product || null };
        } catch (err) {
          console.error(`Error fetching product for category ${cat.name}:`, err);
          return { category: cat.name, product: null };
        }
      })
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { listCategoryWithTopProduct };
