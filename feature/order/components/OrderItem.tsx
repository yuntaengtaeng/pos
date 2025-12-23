import Typo from "@/components/ui/Typo";
import { Typography } from "@/design-token";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

type OrderItemProps = {
  name: string;
  price: number;
  count: number;
  style?: ViewStyle;
} & Omit<ViewProps, "children" | "style">;

const OrderItem = ({ name, price, count, style, ...rest }: OrderItemProps) => {
  return (
    <View {...rest} style={[styles.container, style]}>
      <Typo variant={Typography.body.lg}>
        {name} X {count}
      </Typo>
      <Typo variant={Typography.body.md}>
        {(price * count).toLocaleString()}원
      </Typo>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
});

export default OrderItem;
