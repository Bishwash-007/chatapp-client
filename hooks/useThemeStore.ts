import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Appearance, ColorSchemeName } from "react-native";

type Theme = "light" | "dark" | "system";

interface ThemeStore {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => {
      const resolveSystemTheme = (): "light" | "dark" => {
        const systemColorScheme = Appearance.getColorScheme();
        return systemColorScheme === "dark" ? "dark" : "light";
      };

      return {
        theme: "system",
        resolvedTheme: resolveSystemTheme(),

        setTheme: (theme) => {
          const resolved = theme === "system" ? resolveSystemTheme() : theme;
          set({ theme, resolvedTheme: resolved });
        },

        toggleTheme: () => {
          const current = get().theme;
          const nextTheme =
            current === "light"
              ? "dark"
              : current === "dark"
              ? "system"
              : "light";
          const resolved = nextTheme === "system" ? resolveSystemTheme() : nextTheme;
          set({ theme: nextTheme, resolvedTheme: resolved });
        },
      };
    },
    {
      name: "theme-preference",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);