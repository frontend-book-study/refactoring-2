// 주문 처리 시스템 예제
export class Order {
  constructor(customer) {
    this.customer = customer;
    this.items = [];
  }

  addItem(item, quantity) {
    this.items.push({
      item: item,
      quantity: quantity,
    });
  }

  calculateTotal() {
    this.#validateStock();
    let total = this.items.reduce(
      (total, item) => (total += item.item.calculateBasePrice(item.quantity)),
      0
    );

    const shippingCost = this.calculateShippingCost(total);

    // 문장을 호출한 곳으로 옮기기 대상: 할인 적용 로직을 호출하는 쪽으로 이동 가능
    total = total * (1 - this.customer.calculateDiscountRate());

    return total + shippingCost;
  }

  calculateShippingCost(total) {
    if (total > 50000) return 0;
    return 5000;
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
