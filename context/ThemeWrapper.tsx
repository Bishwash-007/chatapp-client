import React from "react";
import { View } from "react-native";
import { useThemeStore } from "@/hooks/useThemeStore";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useThemeStore();

  return (
    <View className={`flex-1 ${resolvedTheme === "dark" ? "dark" : ""}`}>
      {children}
    </View>
  );
};
