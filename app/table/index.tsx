import Tabs from "@/components/ui/Tabs";
import { Color, Spacing } from "@/design-token";
import Hall from "@/feature/table/components/Hall";
import Orders from "@/feature/table/components/Orders";
import { useOrderStore } from "@/store/order";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const TableLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { tableSections } = useOrderStore();

  const tableMenu = tableSections.map((tableSection) => tableSection.name);
  const menu = [...tableMenu, "포장/배달"];

  const renderView =
    selectedIndex + 1 === menu.length ? (
      <Orders />
    ) : (
      <Hall tables={tableSections[selectedIndex].tables} />
    );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Tabs
          selectedIndex={selectedIndex}
          onSelectHandler={(index) => {
            setSelectedIndex(index);
          }}
          menu={menu}
        />
      </View>
      {renderView}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: Spacing.md,
    backgroundColor: Color.Neutral.WHITE,
  },
});

export default TableLayout;
