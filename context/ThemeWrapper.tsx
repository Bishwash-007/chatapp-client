import { View } from "react-native";
import { useThemeStore } from "@/hooks/useThemeStore";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();

  return <View className={theme}> {children}</View>;
};