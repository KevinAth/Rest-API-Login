const express = require("express");
const router = express.Router();
const {
  createOrder,
  deleteOrder,
  showOrder,
  showOrders,
  updateOrder,
} = require("../controllers/controllersOrders");

module.exports = () => {
  router.post("/order", createOrder);
  router.get("/order/:id", showOrder);
  router.get("/orders", showOrders);
  router.put("/order/:id", updateOrder);
  router.delete("/order/:id", deleteOrder);

  return router;
};
