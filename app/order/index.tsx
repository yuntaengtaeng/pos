import Tabs from "@/components/ui/Tabs";
import { Color, Spacing } from "@/design-token";
import MenuItem from "@/feature/order/components/MenuItem";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const dummy = [
  {
    name: "아이템1",
    price: 10000,
  },
  {
    name: "아이템2",
    price: 10000,
  },
  {
    name: "아이템3",
    price: 10000,
  },
  {
    name: "아이템4",
    price: 10000,
  },
  {
    name: "아이템5",
    price: 10000,
  },
  {
    name: "아이템6",
    price: 10000,
  },
  {
    name: "아이템7",
    price: 10000,
  },
  {
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Tabs
          selectedIndex={selectedIndex}
          onSelectHandler={(index) => {
            setSelectedIndex(index);
          }}
          menu={["메뉴1", "메뉴2"]}
        />
        <FlatList
          data={dummy}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setFlatListWidth(width);
          }}
          renderItem={({ item }) => (
            <View style={{ width: itemWidth }}>
              <MenuItem name={item.name} price={item.price} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={itemWidth > 0 ? { gap } : undefined}
          contentContainerStyle={{ gap }}
        />
      </View>
      <View style={styles.right}>
        <View style={styles.rightTop}></View>
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
    backgroundColor: Color.Neutral.GRAY,
  },
  right: {
    backgroundColor: Color.Neutral.WHITE,
    flex: 0.2,
    borderLeftColor: Color.Neutral.GRAY,
    borderLeftWidth: 1,
  },
  rightTop: {
    flex: 1,
  },
});

export default OrderScreen;
