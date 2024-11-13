// 주문 처리 시스템 예제
export class Order {
  constructor(customer) {
    this.customer = customer;
    this.items = [];
  }

  addItem(item, quantity) {
    this.items.push({ item, quantity });
  }

  calculateTotal() {
    this.#validateStock();

    const total = this.#calculateBaseTotalPrice();
    const shippingCost = this.calculateShippingCost(total);

    return this.customer.discount(total) + shippingCost;
  }

  calculateShippingCost(total) {
    if (total > 50000) return 0;
    return 5000;
  }

  #calculateBaseTotalPrice() {
    return this.items.reduce(
      (total, { item, quantity }) =>
        (total += item.calculateBasePrice(quantity)),
      0
    );
  }

  #validateStock() {
    this.items.forEach((item) => {
      if (item.item.stock < item.quantity) {
        throw new Error("재고가 부족합니다.");
      }
    });
  }
}

export class Customer {
  constructor(name, isPremium) {
    this.name = name;
    this.isPremium = isPremium;
    this.discountRate = this.calculateDiscountRate();
  }

  calculateDiscountRate() {
    if (this.isPremium) return 0.1;
    return 0.05;
  }

  discount(price) {
    return price * (1 - this.calculateDiscountRate());
  }
}

export class OrderItem {
  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  calculateBasePrice(quantity) {
    return quantity * this.price;
  }
}
