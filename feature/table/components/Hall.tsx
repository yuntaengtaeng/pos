import { Table as ITable } from "@/data";
import { Spacing } from "@/design-token";
import useItemWidth from "@/hooks/useItemWidth";
import { useOrderStore } from "@/store/order";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Table from "./Table";

type Props = {
  tables: ITable[];
};

const Hall = ({ tables }: Props) => {
  const router = useRouter();
  const orderStore = useOrderStore();

  const NUM_COLUMNS = 5;
  const gap = Spacing.sm;
  const { itemWidth, onLayout } = useItemWidth({
    columns: NUM_COLUMNS,
    gap,
  });

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.canvas}>
        {tables.map((table) => (
          <View
            key={table.id}
            style={[
              styles.tableWrapper,
              { width: itemWidth, left: table.x, top: table.y },
            ]}
          >
            <Table
              tableName={table.name}
              orders={table.orders}
              onPress={() => {
                orderStore.selectTable(table);
                router.push("/order");
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    position: "relative",
  },
  tableWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Hall;
