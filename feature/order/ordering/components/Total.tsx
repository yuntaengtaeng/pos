import Typo from "@/components/ui/Typo";
import { OrderItem } from "@/data";
import { Typography } from "@/design-token";
import { StyleSheet, View } from "react-native";

type Props = {
  orders: OrderItem[];
};

const Total = ({ orders }: Props) => {
  // 총합, 총 개수 계산
  const { totalAmount, totalCount } = orders.reduce(
    (acc, cur) => {
      acc.totalAmount += cur.price * cur.count;
      acc.totalCount += cur.count;
      return acc;
    },
    { totalAmount: 0, totalCount: 0 }
  );

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
