import { View } from "react-native";
import { useThemeStore } from "@/hooks/useThemeStore";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useThemeStore();

  return (
    <View className={resolvedTheme === "dark" ? "dark flex-1" : "flex-1"}>
      {children}
    </View>
  );
};