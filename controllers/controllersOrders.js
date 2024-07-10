const Orders = require("../models/orders");

exports.createOrder = async (req, res, next) => {
  try {
    const order = new Orders(req.body);
    await order.save();
    res.json({ mensaje: "Orden creada." });
  } catch (error) {
    console.log("Error al añadir :", error);
    next();
  }
};

exports.showOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({});
    res.send(orders);
  } catch (error) {
    console.log("Error al mostrar pedidos:", error);
    next();
  }
};

exports.showOrder = async (req, res, next) => {
  try {
    const order = await Orders.findById({ _id: req.params.id });
    if (!order) {
      res.json({ Mensaje: "Pedido no encontrado" });
      next();
    }
    res.send(order);
  } catch (error) {
    console.log("Error al mostrar pendiente :", error);
    next();
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const delOrder = await Orders.findByIdAndDelete({ _id: req.params.id });
    if (!delOrder) {
      res.json({ Error: "Orden no encontrada." });
      next();
    }
    res.json({ mensaje: "Orden borrado." });
  } catch (error) {
    console.log("Error al borrar Producto", error);
    next();
  }
};

exports.updateOrder = async (req, res, next) => {
  const data = req.body;

  try {
    const orderToUpdate = await Orders.findByIdAndUpdate(
      { _id: req.params.id },
      data,
      { new: true }
    );

    if (!orderToUpdate) {
      res.json({ mensaje: "Pendiente no encontrada para actualizar." });
    }
    console.log(data)
    res.json({ mensaje: "Pendiente actualizada." });
  } catch (error) {
    console.log("Error al actualizar pendiente :");
    next();
  }
};
