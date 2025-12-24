import Typo from "@/components/ui/Typo";
import { Typography } from "@/design-token";
import { StyleSheet, View } from "react-native";

const Orders = () => {
  return (
    <View style={styles.container}>
      <Typo variant={Typography.heading.xl}>포장/배달</Typo>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Orders;
