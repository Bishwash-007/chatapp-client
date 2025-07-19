import { Stack } from "expo-router";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";

import "../global.css";
import { ThemeWrapper } from "@/context/ThemeWrapper";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useCustomFonts();

  const hideSplash = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    hideSplash();
  }, [hideSplash]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeWrapper>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(root)" />
      </Stack>
    </ThemeWrapper>
  );
}
