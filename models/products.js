const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    lowercase: true,
  },
  descripcion: {
    type: String,
    lowercase: true,
  },
  precio: {
    type: Number,
    require: true,
  },
  cantidad: {
    type: Number,
    default: 1,
  },
  img: {
    type: String,
    default: "https://via.placeholder.com/300x400",
  },
});

module.exports = mongoose.model("products", productSchema);
