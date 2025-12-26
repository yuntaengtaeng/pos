import { TableSection } from "@/data";
import { useOrderStore } from "@/store/order";
import { useEffect } from "react";

const dummyTableSection: TableSection[] = [
  {
    id: 1,
    name: "홀1",
    tables: [
      { id: 1, orders: [], x: 20, y: 20, name: "테이블1" },
      {
        id: 2,
        orders: [],
        x: 100 + 20,
        y: 120,
        name: "테이블2",
      },
      {
        id: 3,
        orders: [],
        x: 220,
        y: 200 + 20,
        name: "테이블3",
      },
    ],
  },
  {
    id: 2,
    name: "홀2",
    tables: [
      { id: 4, orders: [], x: 20, y: 20, name: "테이블4" },
      {
        id: 5,
        orders: [],
        x: 100 + 20,
        y: 120,
        name: "테이블5",
      },
      {
        id: 6,
        orders: [],
        x: 220,
        y: 200 + 20,
        name: "테이블6",
      },
    ],
  },
];

const useInitSetting = () => {
  const orderStore = useOrderStore();
  useEffect(() => {
    orderStore.setTableSections(dummyTableSection);
  }, []);
};

export default useInitSetting;
