const express = require("express");
const ProductController = require("./../Controller/ProductHandaller");
const router = express.Router();

// ROUTES for product
router
  .route("/")
  .get(ProductController.getAllProduct)
  .post(ProductController.createNewProduct);
router
  .route("/:id")
  .get(ProductController.getOneProduct)
  .patch(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

module.exports = router;
