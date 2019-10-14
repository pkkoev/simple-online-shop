const Order = require("./model.js");

const getOrders = async (req, res)  => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
}

const createOrder = async (req, res) => {
  try {
    let order = new Order(req.body);
    order = await order.save();

    res
      .status(201)
      .location(`/api/orders/${order._id}`)
      .send();
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).send({message: "Order not found!"});
    }

    res.status(200).send(order);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};


module.exports = {
  getOrders,
  createOrder,
  getOrder,
};