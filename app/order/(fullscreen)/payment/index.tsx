import Typo from "@/components/ui/Typo";
import { Color, Spacing, Typography } from "@/design-token";
import OrderItem from "@/feature/order/components/OrderItem";
import OrderWrapper from "@/feature/order/components/OrderWrapper";
import Total from "@/feature/order/components/Total";
import PaymentOption from "@/feature/order/payment/components/PaymentOption";
import useItemWidth from "@/hooks/useItemWidth";
import { useOrderStore } from "@/store/order";
import { calculateOrderSummary } from "@/utils/func";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { PaymentType } from "../../../../feature/order/payment/types/index";

const PaymentScreen = () => {
  const { currentOrders } = useOrderStore();

  const { totalAmount, totalCount } = calculateOrderSummary(currentOrders);
  const { itemWidth, onLayout } = useItemWidth({ columns: 3, gap: Spacing.md });

  const onPressPaymentOption = (type: PaymentType) => {
    switch (type) {
      case "CARD":
        break;
      case "CASH":
        break;
      case "TRANSFER":
        break;
    }
  };

  const paymentOptions: Record<string, PaymentType> = useMemo(() => {
    return {
      신용카드: "CARD",
      현금: "CASH",
      계좌이체: "TRANSFER",
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View>
          <Typo variant={Typography.body.md}>총 결제 금액</Typo>
          <Typo variant={Typography.heading.xl}>
            {totalAmount.toLocaleString()}원
          </Typo>
        </View>
        <View onLayout={onLayout} style={styles.paymentContainer}>
          {Object.keys(paymentOptions).map((key) => (
            <PaymentOption
              onPress={() => {
                onPressPaymentOption(paymentOptions[key]);
              }}
              name={key}
              key={key}
              style={{ width: itemWidth, height: 120 }}
            />
          ))}
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.rightOrders}>
          {currentOrders.map((order) => (
            <OrderWrapper key={order.id}>
              <OrderItem
                name={order.name}
                price={order.price}
                count={order.count}
              />
            </OrderWrapper>
          ))}
        </View>
        <View style={styles.totalContainer}>
          <Total orders={currentOrders} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  left: {
    flex: 0.8,
    backgroundColor: Color.Neutral.WHITE,
    padding: Spacing.xl,
    gap: Spacing["3xl"],
  },
  right: {
    backgroundColor: Color.Neutral.GRAY,
    flex: 0.2,
    borderLeftColor: Color.Neutral.GRAY,
    borderLeftWidth: 1,
  },
  rightOrders: {
    flex: 1,
  },
  totalContainer: {
    padding: Spacing.md,
  },
  paymentContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: Spacing.md,
  },
});

export default PaymentScreen;
