import Typo from "@/components/ui/Typo";
import { Typography } from "@/design-token";
import { StyleSheet, View } from "react-native";

const TableScreen = () => {
  return (
    <View style={styles.container}>
      <Typo variant={Typography.heading.xl}>테이블</Typo>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TableScreen;
