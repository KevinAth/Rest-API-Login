const Products = require("../models/products");
const multer = require("multer");

const confMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-product-" + Date.now());
    },
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Error: Formato invalido."));
    }
  },
};

const upload = multer(confMulter).single("image");

exports.uploadArchive = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).send({ Error: error.Mensaje });
    }
    next();
  });
};

exports.createProduct = async (req, res, next) => {
  const product = new Products(req.body);
  try {
    if (req.file) {
      product.img = req.file.filename;
    }
    await product.save();
    res.json({ Mensaje: "Producto agregado." });
  } catch (error) {
    console.error("Error al añadir producto", error);
    next();
  }
};

exports.showProducts = async (req, res, next) => {
  try {
    const productos = await Products.find({});
    res.send(productos);
  } catch (error) {
    console.log("Error al mostrar productos :", error);
    next();
  }
};

exports.showProduct = async (req, res, next) => {
  try {
    const producto = await Products.findById({ _id: req.params.id });
    if (!producto) {
      res.json({ mensaje: "Producto no encontrado" });
    }
    res.send(producto);
  } catch (error) {
    console.log("Error al buscar producto especifico :", error);
    next();
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const delprod = await Products.findByIdAndDelete(req.params.id);
    if (!delprod) {
      res.json({ mensaje: "Producto no encontrado para remover." });
      next();
    }
    res.send("Producto removido.");
  } catch (error) {
    console.log("Error al eliminar producto :", error);
    next();
  }
};

exports.updateProduct = async (req, res, next) => {
  const toUpdate = req.body;

  try {
    const productToUpdate = await Products.findByIdAndUpdate(
      { _id: req.params.id },
      toUpdate,
      { new: true }
    );

    if (!productToUpdate) {
      res.json({ mensaje: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto Actualizado", producto: productToUpdate });
  } catch (error) {
    console.log("Error al actualizar Producto :", error);
  }
};
