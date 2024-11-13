import { Order, OrderItem, Customer } from "./after";

describe("Order 클래스 테스트", () => {
  let customer;
  let order;
  let item1;
  let item2;

  beforeEach(() => {
    customer = new Customer("John Doe", false); // 일반 고객 생성
    order = new Order(customer);
    item1 = new OrderItem("Laptop", 1000, 100); // 테스트용 상품 1 생성
    item2 = new OrderItem("Phone", 500, 5); // 테스트용 상품 2 생성
  });

  test("Order 생성자: 초기 값 설정", () => {
    expect(order.customer).toBe(customer);
    expect(order.items).toEqual([]);
  });

  test("addItem: 아이템을 추가하면 items 배열에 저장되는지 확인", () => {
    order.addItem(item1, 2);
    expect(order.items.length).toBe(1);
    expect(order.items[0].item).toBe(item1);
    expect(order.items[0].quantity).toBe(2);
  });

  test("calculateTotal: 총 금액 계산 (일반 고객)", () => {
    order.addItem(item1, 1); // 1000 * 1 = 1000
    order.addItem(item2, 1); // 500 * 1 = 500, 총 1500

    const total = order.calculateTotal();
    expect(total).toBe(1500 * 0.95 + 5000); // 할인율: 5%, 배송비: 5000
  });

  test("calculateTotal: 총 금액 계산 (프리미엄 고객)", () => {
    customer.isPremium = true;
    customer.calculateDiscountRate();
    order.addItem(item1, 1); // 1000 * 1 = 1000
    order.addItem(item2, 1); // 500 * 1 = 500, 총 1500

    const total = order.calculateTotal();
    expect(total).toBe(1500 * 0.9 + 5000); // 할인율: 10%, 배송비: 5000
  });

  test("calculateTotal: 총 금액이 50000원 초과 시 무료 배송 적용", () => {
    order.addItem(item1, 51); // 1000 * 51 = 51000
    const total = order.calculateTotal();
    expect(total).toBe(51000 * 0.95); // 할인율: 5%, 무료 배송
  });

  test("calculateTotal: 재고 부족 시 에러 발생", () => {
    order.addItem(item2, 6); // item2의 재고는 5개, 6개 요청 시 에러 발생
    expect(() => order.calculateTotal()).toThrow("재고가 부족합니다.");
  });
});
