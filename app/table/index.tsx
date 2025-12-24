import Tabs from "@/components/ui/Tabs";
import { Color, Spacing } from "@/design-token";
import Hall from "@/feature/table/components/Hall";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const dummyTables = [
  {
    id: 1,
    tableName: "테이블1",
  },
  {
    id: 2,
    tableName: "테이블2",
  },
];

const TableLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Tabs
          selectedIndex={selectedIndex}
          onSelectHandler={(index) => {
            setSelectedIndex(index);
          }}
          menu={["홀1", "홀2", "포장/배달"]}
        />
      </View>
      <Hall />
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
