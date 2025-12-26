export type Menu = {
  id: number;
  name: string;
  price: number;
};

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  count: number;
};

type BaseOrderSession = {
  orders: OrderItem[];
};

export type TableSection = {
  id: number;
  name: string;
  tables: Table[];
};

export type Table = {
  id: number;
  name: string;
  x: number;
  y: number;
} & BaseOrderSession;

export type TakeoutOrder = BaseOrderSession & {
  id?: number;
};

export type DeliveryOrder = BaseOrderSession & {
  id?: number;
};
