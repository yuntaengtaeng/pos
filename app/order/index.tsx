import Button from "@/components/ui/Button";
import SegmentedControl from "@/components/ui/SegmentedControl";
import Tabs from "@/components/ui/Tabs";
import { Color, Spacing } from "@/design-token";
import Count from "@/feature/order/components/Count";
import MenuItem from "@/feature/order/components/MenuItem";
import OrderItem from "@/feature/order/components/OrderItem";
import OrderWrapper from "@/feature/order/components/OrderWrapper";
import Total from "@/feature/order/components/Total";
import useOrders from "@/feature/order/hooks/useOrders";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

const dummy = [
  {
    id: 1,
    name: "아이템1",
    price: 10000,
  },
  {
    id: 2,
    name: "아이템2",
    price: 10000,
  },
  {
    id: 3,
    name: "아이템3",
    price: 10000,
  },
  {
    id: 4,
    name: "아이템4",
    price: 10000,
  },
  {
    id: 5,
    name: "아이템5",
    price: 10000,
  },
  {
    id: 6,
    name: "아이템6",
    price: 10000,
  },
  {
    id: 7,
    name: "아이템7",
    price: 10000,
  },
  {
    id: 8,
    name: "아이템8",
    price: 10000,
  },
];

const OrderScreen = () => {
  const NUM_COLUMNS = 5;
  const [flatListWidth, setFlatListWidth] = useState(0);
  const gap = Spacing.sm;
  const itemWidth =
    flatListWidth > 0
      ? (flatListWidth - gap * (NUM_COLUMNS - 1)) / NUM_COLUMNS
      : 0;
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [orderTypeIndex, setOrderTypeIndex] = useState(0);
  const [selectedOrderId, setSelectOrderId] = useState(-1);
  const {
    orders,
    handleDeleteOrder,
    handleMenuItemPress,
    handleMinusCount,
    handlePlusCount,
  } = useOrders();

  useEffect(() => {
    if (orders.length === 1 && selectedOrderId === -1) {
      setSelectOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Tabs
          selectedIndex={selectedMenuIndex}
          onSelectHandler={(index) => {
            setSelectedMenuIndex(index);
          }}
          menu={["메뉴1", "메뉴2"]}
        />
        <FlatList
          style={styles.menuContainer}
          data={dummy}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setFlatListWidth(width);
          }}
          renderItem={({ item }) => (
            <View style={{ width: itemWidth }}>
              <MenuItem
                name={item.name}
                price={item.price}
                onPress={() => {
                  handleMenuItemPress(item);
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={itemWidth > 0 ? { gap } : undefined}
          contentContainerStyle={{ gap }}
        />
      </View>
      <View style={styles.right}>
        <View style={styles.rightTop}>
          <SegmentedControl
            selectedIndex={orderTypeIndex}
            onChange={(index) => {
              setOrderTypeIndex(index);
            }}
            labels={["포장", "배달"]}
          />
        </View>

        <ScrollView style={styles.rightOrders}>
          {orders.map((order) => (
            <OrderWrapper
              onPress={() => {
                setSelectOrderId(order.id);
              }}
              key={order.id}
              isSelected={selectedOrderId === order.id}
              controls={
                <>
                  <Count
                    minusHandler={() => {
                      handleMinusCount(order.id);
                    }}
                    count={order.count}
                    pluseHandler={() => {
                      handlePlusCount(order.id);
                    }}
                  />
                  <Button
                    variant="outline"
                    size="medium"
                    onPress={() => {
                      handleDeleteOrder(order.id);
                    }}
                  >
                    삭제
                  </Button>
                </>
              }
            >
              <OrderItem
                name={order.name}
                price={order.price}
                count={order.count}
              />
            </OrderWrapper>
          ))}
        </ScrollView>
        <View style={styles.rightBottom}>
          <Total orders={orders} />
          <View style={styles.rightButtonContainer}>
            <Button variant="primary" style={styles.rightBottomButton}>
              주문
            </Button>
            <Button variant="secondary" style={styles.rightBottomButton}>
              결제
            </Button>
          </View>
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
  menuContainer: {
    margin: Spacing.md,
  },
  left: {
    flex: 0.8,
    backgroundColor: Color.Neutral.GRAY,
  },
  right: {
    backgroundColor: Color.Neutral.WHITE,
    flex: 0.2,
    borderLeftColor: Color.Neutral.GRAY,
    borderLeftWidth: 1,
  },
  rightTop: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  rightOrders: {
    flex: 1,
  },
  rightButtonContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  rightBottom: {
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  rightBottomButton: {
    flex: 1,
    height: 60,
  },
});

export default OrderScreen;
