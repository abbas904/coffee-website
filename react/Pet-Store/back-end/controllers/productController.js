import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModal.js";


/* =========================
   Add Product
========================= */
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

/* =========================
   Update Product
========================= */
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

/* =========================
   Delete Product
========================= */
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   Search / Limited Products (Store)
========================= */
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: "i" },
        }
      : {};

    const count = await Product.countDocuments(keyword);

    const products = await Product.find(keyword).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

/* =========================
   Get Product By ID
========================= */
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

/* =========================
   ✅ FETCH ALL PRODUCTS (ADMIN)
   ❌ NO LIMIT
========================= */
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({
      products,
      totalProducts: products.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

/* =========================
   Add Review
========================= */
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

/* =========================
   Top Products
========================= */
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ rating: -1 })
      .limit(4);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

/* =========================
   New Products
========================= */
const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ _id: -1 })
      .limit(5);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});


//special products 
const fetchSpecialProducts = asyncHandler(async (req, res) => {
  try {
  
    const specialProductIds = [
      "6959c7015777781ec55f03bf", 
      "6959c5545777781ec55f03b3", 
      "6959c5ed5777781ec55f03b9", 
      "6959c7e75777781ec55f03c5"  
    ];

   
    const specialProducts = await Product.find({
      _id: { $in: specialProductIds }
    });
    
   
    const orderedProducts = specialProductIds
      .map(id => specialProducts.find(p => p._id.toString() === id))
      .filter(Boolean); 

    res.json(orderedProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "حدث خطأ أثناء جلب المنتجات المميزة" });
  }
});

/* =========================
   Filter Products
========================= */
const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  fetchSpecialProducts,
};
