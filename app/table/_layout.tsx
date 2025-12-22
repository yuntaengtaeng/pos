import { CustomTopTabBar } from "@/components/shared/CustomTopTabBar";
import { Tabs } from "expo-router";

const TableLayout = () => {
  return (
    <Tabs
      tabBar={(props) => {
        return <CustomTopTabBar {...props} />;
      }}
      screenOptions={{ headerShown: false, tabBarPosition: "top" }}
    >
      <Tabs.Screen name="Hall" options={{ title: "기본홀" }} />
      <Tabs.Screen name="Orders" options={{ title: "포장/배달" }} />
    </Tabs>
  );
};

export default TableLayout;
