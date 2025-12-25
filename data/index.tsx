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

export type Table = {
  id: number;
  name: string;
  orders: OrderItem[];
  x: number;
  y: number;
};
