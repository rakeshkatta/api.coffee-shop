class ProductModel {
  constructor(properties) {
    const { id, name, price, tax, discounts } = properties;

    this.id = id;
    this.name = name;
    this.priceWithoutTax = Number(price);
    this.tax = Number(tax);
    this.price = this.priceWithoutTax + this.priceWithoutTax * this.tax;
    this.discounts = discounts;
  }

  // is used for getting the certain data
  getProduct() {
    return {
      id: this.id,
      name: this.name,
      priceWithoutTax: this.priceWithoutTax,
      tax: this.tax,
      price: this.price,
      discounts: this.discounts,
    };
  }
}

module.exports = {
  ProductModel,
};
