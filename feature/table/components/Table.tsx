import Typo from "@/components/ui/Typo";
import { OrderItem } from "@/data";
import { Color, Radius, Spacing, Typography } from "@/design-token";
import { calculateOrderSummary } from "@/utils/func";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type TableProps = {
  tableName: string;
  orders: OrderItem[];
  style?: ViewStyle;
} & Omit<PressableProps, "children" | "style">;

const MAX_DISPLAY_LENGTH = 3;

const Table = ({ orders, tableName, style, ...rest }: TableProps) => {
  const { totalAmount } = calculateOrderSummary(orders);

  const displayedOrders = orders.slice(0, MAX_DISPLAY_LENGTH);
  const remainingCount = orders.length - MAX_DISPLAY_LENGTH;

  return (
    <Pressable style={[styles.container, style]} {...rest}>
      <View style={styles.title}>
        <Typo variant={Typography.heading.sm}>{tableName}</Typo>
      </View>
      <View style={styles.content}>
        <View>
          {displayedOrders.map((order) => (
            <View style={styles.order} key={order.id}>
              <Typo variant={Typography.body.sm}>{order.name}</Typo>
              <Typo variant={Typography.body.sm}>{order.count}</Typo>
            </View>
          ))}
        </View>
        <View style={styles.totalContainer}>
          {remainingCount > 0 && (
            <Typo variant={Typography.body.md}>외 {remainingCount}개</Typo>
          )}
          {!!orders.length && (
            <View style={styles.totalPriceWrapper}>
              <Typo variant={Typography.heading.sm}>
                {totalAmount.toLocaleString()}원
              </Typo>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.md,
    overflow: "hidden",
    minHeight: 140,
  },
  title: {
    padding: Spacing.sm,
    backgroundColor: Color.Neutral.B200,
  },
  content: {
    padding: Spacing.sm,
    backgroundColor: Color.Neutral.WHITE,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  order: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  totalPriceWrapper: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default Table;
