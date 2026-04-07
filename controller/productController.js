const Product = require("../model/Product.js");

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create product
const createProduct = async (req, res) => {
  try {
    const { name, category, size, description, colors } = req.body;

    const formattedColors = colors.map((c) => ({
      name: c.name,
      hex: c.hex,
      image: c.imageUrl, // Cloudinary URL from /upload
    }));

    const product = new Product({
      name,
      category,
      size,
      description,
      colors: formattedColors,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update product
const updateProduct = async (req, res) => {
  try {
    const { name, category, size, description, colors } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.category = category || product.category;
    product.size = size || product.size;
    product.description = description || product.description;

    if (colors) {
      product.colors = colors.map((c) => ({
        name: c.name,
        hex: c.hex,
        image: c.imageUrl, // Cloudinary URL
      }));
    }

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};