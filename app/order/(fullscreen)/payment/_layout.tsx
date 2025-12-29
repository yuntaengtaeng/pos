import { Stack } from "expo-router";

export default function PaymentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
