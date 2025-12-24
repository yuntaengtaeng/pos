import { useState } from "react";
import { OrderItem } from "../../types";

const useOrders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const handleMenuItemPress = (item: {
    id: number;
    name: string;
    price: number;
  }) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.id === item.id
      );

      if (existingOrderIndex !== -1) {
        // 같은 id가 있으면 개수 추가
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = {
          ...updatedOrders[existingOrderIndex],
          count: updatedOrders[existingOrderIndex].count + 1,
        };
        return updatedOrders;
      } else {
        // 같은 id가 없으면 새로 추가
        return [
          ...prevOrders,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            count: 1,
          },
        ];
      }
    });
  };

  // 개수 빼기 (0이 되면 orders에서 삭제)
  const handleMinusCount = (orderId: number) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.id === orderId
      );

      if (existingOrderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        const currentCount = updatedOrders[existingOrderIndex].count;

        if (currentCount > 1) {
          // 개수가 1보다 크면 개수만 감소
          updatedOrders[existingOrderIndex] = {
            ...updatedOrders[existingOrderIndex],
            count: currentCount - 1,
          };
          return updatedOrders;
        } else {
          // 개수가 1이면 orders에서 삭제
          return updatedOrders.filter((order) => order.id !== orderId);
        }
      }
      return prevOrders;
    });
  };

  // 개수 추가
  const handlePlusCount = (orderId: number) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.id === orderId
      );

      if (existingOrderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = {
          ...updatedOrders[existingOrderIndex],
          count: updatedOrders[existingOrderIndex].count + 1,
        };
        return updatedOrders;
      }
      return prevOrders;
    });
  };

  // 주문 삭제
  const handleDeleteOrder = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return {
    orders,
    handleMenuItemPress,
    handleMinusCount,
    handlePlusCount,
    handleDeleteOrder,
  };
};

export default useOrders;
