// 주문 처리 시스템 예제
export class Order {
  constructor(customer) {
    this.customer = customer;
    this.items = [];
    // 필드 옮기기 대상: discountRate는 Customer 클래스로 이동 가능
    this.discountRate = 0;
  }

  addItem(item, quantity) {
    this.items.push({
      item: item,
      quantity: quantity,
    });
  }

  calculateTotal() {
    this.items.forEach((item) => {
      // 인라인 코드를 함수 호출로 바꾸기 대상: 재고 확인 로직을 함수로 추출 가능
      if (item.item.stock < item.quantity) {
        throw new Error("재고가 부족합니다.");
      }
    });

    let total = this.items.reduce(
      (total, item) => (total += item.item.calculateBasePrice(item.quantity)),
      0
    );

    if (this.customer.isPremium) {
      this.discountRate = 0.1;
    } else {
      this.discountRate = 0.05;
    }

    const shippingCost = this.calculateShippingCost(total);

    // 문장을 호출한 곳으로 옮기기 대상: 할인 적용 로직을 호출하는 쪽으로 이동 가능
    total = total * (1 - this.discountRate);

    return total + shippingCost;
  }

  calculateShippingCost(total) {
    if (total > 50000) return 0;
    return 5000;
  }
}

export class Customer {
  constructor(name, isPremium) {
    this.name = name;
    this.isPremium = isPremium;
  }
}

export class OrderItem {
  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  // 함수 옮기기 대상: calculateBasePrice는 OrderItem 클래스로 이동 가능
  calculateBasePrice(quantity) {
    return quantity * this.price;
  }
}
