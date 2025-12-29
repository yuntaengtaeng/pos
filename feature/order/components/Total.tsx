import Typo from "@/components/ui/Typo";
import { OrderItem } from "@/data";
import { Typography } from "@/design-token";
import { calculateOrderSummary } from "@/utils/func";
import { StyleSheet, View } from "react-native";

type Props = {
  orders: OrderItem[];
};

const Total = ({ orders }: Props) => {
  const { totalAmount, totalCount } = calculateOrderSummary(orders);

  return (
    <View style={styles.container}>
      <Typo variant={Typography.heading.lg}>총합({totalCount})</Typo>
      <Typo variant={Typography.body.lg}>{totalAmount.toLocaleString()}원</Typo>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Total;
