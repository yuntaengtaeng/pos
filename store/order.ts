import {
  DeliveryOrder,
  OrderItem,
  Table,
  TableSection,
  TakeoutOrder,
} from "@/data";
import { create } from "zustand";

export type OrderType = "table" | "takeout" | "delivery";

type OrderStoreState = {
  // 데이터 저장소
  tableSections: TableSection[];
  takeoutOrders: TakeoutOrder[];
  deliveryOrders: DeliveryOrder[];

  // 현재 활성화된 주문 세션
  selectedTable: Table | null;
  selectedTakeoutOrder: TakeoutOrder | null;
  selectedDeliveryOrder: DeliveryOrder | null;
  orderType: OrderType | null;

  // 현재 orderItem
  currentOrders: OrderItem[];
};

type OrderStoreHandler = {
  // 테이블 섹션 관리
  setTableSections: (sections: TableSection[]) => void;

  // 테이블 선택
  selectTable: (table: Table) => void;

  // 포장 선택
  selectTakeout: () => void;
  // 배달 선택
  selectDelivery: () => void;

  // 현재 Order 업데이트
  setCurrentOrders: (orders: OrderItem[]) => void;

  // 현재 주문 저장
  saveCurrentOrders: () => void;
};

type OrderStore = OrderStoreState & OrderStoreHandler;

export const useOrderStore = create<OrderStore>((set, get) => ({
  // 초기 상태
  tableSections: [],
  takeoutOrders: [],
  deliveryOrders: [],

  selectedTable: null,
  selectedTakeoutOrder: null,
  selectedDeliveryOrder: null,
  orderType: "takeout",

  currentOrders: [],

  // 테이블 섹션 설정
  setTableSections: (sections) => set({ tableSections: sections }),

  // 테이블 선택
  selectTable: (table) =>
    set({
      selectedTable: table,
      selectedTakeoutOrder: null,
      selectedDeliveryOrder: null,
      orderType: "table",
    }),

  // 포장 선택
  selectTakeout: () => {
    const { takeoutOrders } = get();
    // 기존 포장 주문이 있으면 첫 번째를 선택, 없으면 새로 생성
    const takeoutOrder = takeoutOrders[0] || { orders: [] };

    set({
      selectedTable: null,
      selectedTakeoutOrder: takeoutOrder,
      selectedDeliveryOrder: null,
      orderType: "takeout",
    });
  },

  // 배달 선택
  selectDelivery: () => {
    const { deliveryOrders } = get();
    // 기존 배달 주문이 있으면 첫 번째를 선택, 없으면 새로 생성
    const deliveryOrder = deliveryOrders[0] || { orders: [] };

    set({
      selectedTable: null,
      selectedTakeoutOrder: null,
      selectedDeliveryOrder: deliveryOrder,
      orderType: "delivery",
    });
  },

  // 주문 세션 초기화
  clearOrder: () =>
    set({
      selectedTable: null,
      selectedTakeoutOrder: null,
      selectedDeliveryOrder: null,
      orderType: null,
    }),

  // 초기 orders 가져오기
  getInitialOrders: () => {
    const {
      selectedTable,
      selectedTakeoutOrder,
      selectedDeliveryOrder,
      orderType,
    } = get();

    if (orderType === "table" && selectedTable) {
      return selectedTable.orders;
    } else if (orderType === "takeout" && selectedTakeoutOrder) {
      return selectedTakeoutOrder.orders;
    } else if (orderType === "delivery" && selectedDeliveryOrder) {
      return selectedDeliveryOrder.orders;
    }
    return [];
  },

  setCurrentOrders: (orders) => set({ currentOrders: orders }),

  // 현재 주문 저장
  saveCurrentOrders: () => {
    const {
      selectedTable,
      selectedTakeoutOrder,
      selectedDeliveryOrder,
      orderType,
      currentOrders,
      tableSections,
      takeoutOrders,
      deliveryOrders,
    } = get();

    if (orderType === "table" && selectedTable) {
      // 테이블 주문 저장
      const updatedSections = tableSections.map((section) => ({
        ...section,
        tables: section.tables.map((table) =>
          table.id === selectedTable.id
            ? { ...table, orders: currentOrders }
            : table
        ),
      }));

      set({
        tableSections: updatedSections,
        selectedTable: { ...selectedTable, orders: currentOrders },
      });
    } else if (orderType === "takeout" && selectedTakeoutOrder) {
      // 포장 주문 저장
      const updatedTakeoutOrder = {
        ...selectedTakeoutOrder,
        orders: currentOrders,
      };

      // 기존 주문이 있으면 업데이트, 없으면 추가
      const existingIndex = takeoutOrders.findIndex(
        (order) => order.id === selectedTakeoutOrder.id
      );

      const updatedTakeoutOrders =
        existingIndex >= 0
          ? takeoutOrders.map((order, idx) =>
              idx === existingIndex ? updatedTakeoutOrder : order
            )
          : [...takeoutOrders, updatedTakeoutOrder];

      set({
        takeoutOrders: updatedTakeoutOrders,
        selectedTakeoutOrder: updatedTakeoutOrder,
      });
    } else if (orderType === "delivery" && selectedDeliveryOrder) {
      // 배달 주문 저장
      const updatedDeliveryOrder = {
        ...selectedDeliveryOrder,
        orders: currentOrders,
      };

      // 기존 주문이 있으면 업데이트, 없으면 추가
      const existingIndex = deliveryOrders.findIndex(
        (order) => order.id === selectedDeliveryOrder.id
      );

      const updatedDeliveryOrders =
        existingIndex >= 0
          ? deliveryOrders.map((order, idx) =>
              idx === existingIndex ? updatedDeliveryOrder : order
            )
          : [...deliveryOrders, updatedDeliveryOrder];

      set({
        deliveryOrders: updatedDeliveryOrders,
        selectedDeliveryOrder: updatedDeliveryOrder,
      });
    }
  },
}));

// type OrderStoreState = {
//   // 데이터 저장소
//   tableSections: TableSection[];
//   takeoutOrders: TakeoutOrder[];
//   deliveryOrders: DeliveryOrder[];

//   // 현재 활성화된 주문 세션
//   selectedTable: Table | null;
//   selectedTakeoutOrder: TakeoutOrder | null;
//   selectedDeliveryOrder: DeliveryOrder | null;
//   orderType: OrderType | null;

//   // 현재 편집 중인 주문
//   currentOrders: OrderItem[];
// };

// type OrderStoreHandler = {
//   // 테이블 섹션 관리
//   setTableSections: (sections: TableSection[]) => void;

//   // 테이블 선택
//   selectTable: (table: Table) => void;

//   // 포장/배달 선택
//   selectTakeout: () => void;
//   selectDelivery: () => void;

//   // 현재 주문 업데이트
//   setCurrentOrders: (orders: OrderItem[]) => void;

//   // 현재 주문 저장
//   saveCurrentOrders: () => void;

//   // 주문 세션 초기화
//   clearOrder: () => void;

//   // 헬퍼: 현재 세션의 초기 orders 가져오기
//   getInitialOrders: () => OrderItem[];
// };

// type OrderStore = OrderStoreState & OrderStoreHandler;

// export const useOrderStore = create<OrderStore>((set, get) => ({
//   // 초기 상태
//   tableSections: [],
//   takeoutOrders: [],
//   deliveryOrders: [],
//   selectedTable: null,
//   selectedTakeoutOrder: null,
//   selectedDeliveryOrder: null,
//   orderType: "takeout",
//   currentOrders: [],

//   // 테이블 섹션 설정
//   setTableSections: (sections) => set({ tableSections: sections }),

//   // 테이블 선택
//   selectTable: (table) =>
//     set({
//       selectedTable: table,
//       selectedTakeoutOrder: null,
//       selectedDeliveryOrder: null,
//       orderType: "table",
//       currentOrders: table.orders,
//     }),

//   // 포장 선택
//   selectTakeout: () => {
//     const { takeoutOrders } = get();
//     // 기존 포장 주문이 있으면 첫 번째를 선택, 없으면 새로 생성
//     const takeoutOrder = takeoutOrders[0] || { orders: [] };

//     set({
//       selectedTable: null,
//       selectedTakeoutOrder: takeoutOrder,
//       selectedDeliveryOrder: null,
//       orderType: "takeout",
//       currentOrders: takeoutOrder.orders,
//     });
//   },

//   // 배달 선택
//   selectDelivery: () => {
//     const { deliveryOrders } = get();
//     // 기존 배달 주문이 있으면 첫 번째를 선택, 없으면 새로 생성
//     const deliveryOrder = deliveryOrders[0] || { orders: [] };

//     set({
//       selectedTable: null,
//       selectedTakeoutOrder: null,
//       selectedDeliveryOrder: deliveryOrder,
//       orderType: "delivery",
//       currentOrders: deliveryOrder.orders,
//     });
//   },

//   // 현재 주문 업데이트
//   setCurrentOrders: (orders) => set({ currentOrders: orders }),

//   // 현재 주문 저장
//   saveCurrentOrders: () => {
//     const {
//       selectedTable,
//       selectedTakeoutOrder,
//       selectedDeliveryOrder,
//       orderType,
//       currentOrders,
//       tableSections,
//       takeoutOrders,
//       deliveryOrders,
//     } = get();

//     if (orderType === "table" && selectedTable) {
//       // 테이블 주문 저장
//       const updatedSections = tableSections.map((section) => ({
//         ...section,
//         tables: section.tables.map((table) =>
//           table.id === selectedTable.id
//             ? { ...table, orders: currentOrders }
//             : table
//         ),
//       }));

//       set({
//         tableSections: updatedSections,
//         selectedTable: { ...selectedTable, orders: currentOrders },
//       });
//     } else if (orderType === "takeout" && selectedTakeoutOrder) {
//       // 포장 주문 저장
//       const updatedTakeoutOrder = {
//         ...selectedTakeoutOrder,
//         orders: currentOrders,
//       };

//       // 기존 주문이 있으면 업데이트, 없으면 추가
//       const existingIndex = takeoutOrders.findIndex(
//         (order) => order.id === selectedTakeoutOrder.id
//       );

//       const updatedTakeoutOrders =
//         existingIndex >= 0
//           ? takeoutOrders.map((order, idx) =>
//               idx === existingIndex ? updatedTakeoutOrder : order
//             )
//           : [...takeoutOrders, updatedTakeoutOrder];

//       set({
//         takeoutOrders: updatedTakeoutOrders,
//         selectedTakeoutOrder: updatedTakeoutOrder,
//       });
//     } else if (orderType === "delivery" && selectedDeliveryOrder) {
//       // 배달 주문 저장
//       const updatedDeliveryOrder = {
//         ...selectedDeliveryOrder,
//         orders: currentOrders,
//       };

//       // 기존 주문이 있으면 업데이트, 없으면 추가
//       const existingIndex = deliveryOrders.findIndex(
//         (order) => order.id === selectedDeliveryOrder.id
//       );

//       const updatedDeliveryOrders =
//         existingIndex >= 0
//           ? deliveryOrders.map((order, idx) =>
//               idx === existingIndex ? updatedDeliveryOrder : order
//             )
//           : [...deliveryOrders, updatedDeliveryOrder];

//       set({
//         deliveryOrders: updatedDeliveryOrders,
//         selectedDeliveryOrder: updatedDeliveryOrder,
//       });
//     }
//   },

//   // 주문 세션 초기화
//   clearOrder: () =>
//     set({
//       selectedTable: null,
//       selectedTakeoutOrder: null,
//       selectedDeliveryOrder: null,
//       orderType: "takeout",
//       currentOrders: [],
//     }),

//   // 초기 orders 가져오기
//   getInitialOrders: () => {
//     const {
//       selectedTable,
//       selectedTakeoutOrder,
//       selectedDeliveryOrder,
//       orderType,
//     } = get();

//     if (orderType === "table" && selectedTable) {
//       return selectedTable.orders;
//     } else if (orderType === "takeout" && selectedTakeoutOrder) {
//       return selectedTakeoutOrder.orders;
//     } else if (orderType === "delivery" && selectedDeliveryOrder) {
//       return selectedDeliveryOrder.orders;
//     }
//     return [];
//   },
// }));
