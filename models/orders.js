const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  nombreCliente: {
    type: String,
    require: true,
  },
  correoCliente: {
    type: String,
    require: true,
    lowercase: true,
  },
  items: [
    {
      type:Schema.ObjectId,
      ref: "products",
      require: true,
    },
  ],
  total: {
    type: Number,
    require: true,
  },
  status: {
    lowercase: true,
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("orders", OrdersSchema);
