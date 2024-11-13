import { Customer } from "./after";

describe("Customer 클래스 테스트", () => {
  test("Customer 생성자: 이름과 프리미엄 여부가 설정되는지 확인", () => {
    const customer = new Customer("Jane Doe", true);
    expect(customer.name).toBe("Jane Doe");
    expect(customer.isPremium).toBe(true);
  });

  test("Customer 생성자: 기본 설정이 정확한지 확인", () => {
    const customer = new Customer("John Smith", false);
    expect(customer.name).toBe("John Smith");
    expect(customer.isPremium).toBe(false);
  });
});
