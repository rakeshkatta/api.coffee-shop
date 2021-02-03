const { ordersData } = require("../mock-data");
const { HTTP_STATUS_CODES, ORDER_STATUS } = require("../constants");
const { OrderModel } = require("../models/order.model");
const { calculateTotalPrice } = require("../services/order.service");
const {
  getProduct,
  getProductsByDiscountId,
} = require("../services/data.service");


const creationOrder = (req, res) => {
  const discountsProducts = [];
  const { productsId } = req.body;

  if (!productsId.length) {
    res
      .status(HTTP_STATUS_CODES.badRequest)
      .send("This order does not have any products");

    return;
  }

  const products = productsId.map((id) => getProduct(id));
  products.forEach((product) => {
    product.discounts.forEach((id) => {
      discountsProducts.push(...getProductsByDiscountId(id));
    });
  });

  const totalPrice = calculateTotalPrice([...discountsProducts, ...products]);

  const order = new OrderModel({
    totalPrice,
    id: Math.floor(1 + (100 - 1) * Math.random()),
    products: [...products],
    discountsProducts: [...discountsProducts]
  });

  ordersData[order.id] = order;

  res.status(HTTP_STATUS_CODES.ok).send(order.getOrder());
};

const confirmationOrder = (req, res) => {
  const orderId = req.params.id;
  const order = ordersData[orderId];

  if (!order) {
    res
      .status(HTTP_STATUS_CODES.badRequest)
      .send(`The order number ${orderId} is incorrect`);

    return;
  }

  order.status = ORDER_STATUS.close;

  res.status(HTTP_STATUS_CODES.ok).send(`The order ${orderId} has been closed`);
};

module.exports = {
  creationOrder,
  confirmationOrder,
};
