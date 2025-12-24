import Header from "@/components/ui/Header";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
