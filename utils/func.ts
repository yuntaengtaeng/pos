import { OrderItem } from "@/data";

/**
 * 주문 목록을 바탕으로 총 결제 금액과 총 수량 정보를 계산합니다.
 * * @param {Array<{price: number, count: number}>} orders - 계산할 주문 객체 배열
 * @returns {{totalAmount: number, totalCount: number}} 계산된 총 금액과 총 수량이 담긴 요약 객체
 */
export const calculateOrderSummary = (orders: OrderItem[]) => {
  return orders.reduce(
    (acc, cur) => ({
      totalAmount: acc.totalAmount + cur.price * cur.count,
      totalCount: acc.totalCount + cur.count,
    }),
    { totalAmount: 0, totalCount: 0 }
  );
};
