import { Menu } from "@/data";
import { Spacing } from "@/design-token";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MenuItem from "./MenuItem";

type Props = {
  menus: Menu[];
  handleMenuItemPress: (menu: Menu) => void;
};

const MenuItemContainer = ({ menus, handleMenuItemPress }: Props) => {
  const NUM_COLUMNS = 5;
  const [flatListWidth, setFlatListWidth] = useState(0);
  const gap = Spacing.sm;
  const itemWidth =
    flatListWidth > 0
      ? (flatListWidth - gap * (NUM_COLUMNS - 1)) / NUM_COLUMNS
      : 0;

  return (
    <FlatList
      style={styles.container}
      data={menus}
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
  );
};

const styles = StyleSheet.create({
  container: {
    margin: Spacing.md,
  },
});

export default MenuItemContainer;
