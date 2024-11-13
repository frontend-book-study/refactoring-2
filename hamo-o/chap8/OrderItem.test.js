import { OrderItem } from "./after";

describe("OrderItem 클래스 테스트", () => {
  test("OrderItem 생성자: 이름, 가격, 재고가 설정되는지 확인", () => {
    const item = new OrderItem("Tablet", 200, 15);
    expect(item.name).toBe("Tablet");
    expect(item.price).toBe(200);
    expect(item.stock).toBe(15);
  });

  test("OrderItem 생성자: 값이 잘못 설정된 경우 초기 값이 올바른지 확인", () => {
    const item = new OrderItem("Headphones", 150, 0);
    expect(item.name).toBe("Headphones");
    expect(item.price).toBe(150);
    expect(item.stock).toBe(0);
  });
});
