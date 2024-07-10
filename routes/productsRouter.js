const express = require("express");
const router = express.Router();
const {
  uploadArchive,
  createProduct,
  showProducts,
  showProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/controllersProducts");

module.exports = () => {
  router.post("/product", uploadArchive, createProduct);
  router.get("/products", showProducts);
  router.get("/product/:id", showProduct);
  router.delete("/product/:id", deleteProduct);
  router.put("/product/:id", updateProduct);

  return router;
};
