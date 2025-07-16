import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",

      setTheme: (theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        const current = get().theme;
        const newTheme = current === "dark" ? "light" : "dark";
        set({ theme: newTheme });
      },
    }),
    {
      name: "theme-preference",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
