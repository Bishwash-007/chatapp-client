import { Stack } from "expo-router";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "../global.css";

export default function RootLayout() {
  const [loaded, error] = useCustomFonts();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(root)" />
    </Stack>
  );
}
