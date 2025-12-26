import { Menu } from "@/data";
import { useOrderStore } from "@/store/order";

const useOrders = () => {
  const currentOrders = useOrderStore((state) => state.currentOrders);
  const setCurrentOrders = useOrderStore((state) => state.setCurrentOrders);

  const handleMenuItemPress = (item: Menu) => {
    const existingOrderIndex = currentOrders.findIndex(
      (order) => order.id === item.id
    );

    if (existingOrderIndex !== -1) {
      // 같은 id가 있으면 개수 추가
      const updatedOrders = [...currentOrders];
      updatedOrders[existingOrderIndex] = {
        ...updatedOrders[existingOrderIndex],
        count: updatedOrders[existingOrderIndex].count + 1,
      };
      setCurrentOrders(updatedOrders);
    } else {
      // 같은 id가 없으면 새로 추가
      setCurrentOrders([
        ...currentOrders,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          count: 1,
        },
      ]);
    }
  };

  // 개수 빼기 (0이 되면 orders에서 삭제)
  const handleMinusCount = (orderId: number) => {
    const existingOrderIndex = currentOrders.findIndex(
      (order) => order.id === orderId
    );

    if (existingOrderIndex !== -1) {
      const updatedOrders = [...currentOrders];
      const currentCount = updatedOrders[existingOrderIndex].count;

      if (currentCount > 1) {
        // 개수가 1보다 크면 개수만 감소
        updatedOrders[existingOrderIndex] = {
          ...updatedOrders[existingOrderIndex],
          count: currentCount - 1,
        };
        setCurrentOrders(updatedOrders);
      } else {
        // 개수가 1이면 orders에서 삭제
        setCurrentOrders(updatedOrders.filter((order) => order.id !== orderId));
      }
    }
  };

  // 개수 추가
  const handlePlusCount = (orderId: number) => {
    const existingOrderIndex = currentOrders.findIndex(
      (order) => order.id === orderId
    );

    if (existingOrderIndex !== -1) {
      const updatedOrders = [...currentOrders];
      updatedOrders[existingOrderIndex] = {
        ...updatedOrders[existingOrderIndex],
        count: updatedOrders[existingOrderIndex].count + 1,
      };
      setCurrentOrders(updatedOrders);
    }
  };

  // 주문 삭제
  const handleDeleteOrder = (orderId: number) => {
    setCurrentOrders(currentOrders.filter((order) => order.id !== orderId));
  };

  return {
    orders: currentOrders,
    handleMenuItemPress,
    handleMinusCount,
    handlePlusCount,
    handleDeleteOrder,
  };
};

export default useOrders;
