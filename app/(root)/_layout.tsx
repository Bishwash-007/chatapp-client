import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)/home" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}