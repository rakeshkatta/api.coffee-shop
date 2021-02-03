const { ORDER_STATUS } = require('../constants');

class OrderModel {
  constructor(properties) {
    const {
      id,
      products,
      totalPrice,
      discountsProducts,
    } = properties;

    this.id = id;
    this.totalPrice = totalPrice;
    this.status = ORDER_STATUS.open;
    this.products = products;
    this.discountsProducts = discountsProducts;
  }

  // is used for getting the certain data
  getOrder() {
    return {
      id: this.id,
      totalPrice: this.totalPrice,
      products: this.products.map(item => ({
        name: item.name,
        price: item.price,
      })),
      discountsProducts: this.discountsProducts.map(item => ({
        name: item.name,
        discount: item.discount,
      })),
    };
  }
}

module.exports = {
  OrderModel,
};
