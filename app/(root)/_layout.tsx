import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="modals" />
    </Stack>
  );
}
