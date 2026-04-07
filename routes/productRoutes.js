const router = require("express").Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/admin", protect, createProduct); // admin only
router.put("/admin/:id", protect, updateProduct); // admin only
router.delete("/admin/:id", protect, deleteProduct); // admin only

module.exports = router;