import Header from "@/components/ui/Header";
import useInitSetting from "@/hooks/useInitSetting";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  useInitSetting();

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <StatusBar style="auto" />
      <View
        style={[
          styles.container,
          Platform.OS === "android" && { paddingTop: insets.top },
        ]}
      >
        <Header />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            animationDuration: 300,
          }}
        >
          <Stack.Screen
            name="table/index"
            options={{
              animation: "fade",
              animationDuration: 300,
            }}
          />
          <Stack.Screen
            name="status/index"
            options={{
              animation: "fade",
              animationDuration: 300,
            }}
          />
          <Stack.Screen
            name="order/index"
            options={{
              animation: "fade",
              animationDuration: 300,
            }}
          />
        </Stack>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
