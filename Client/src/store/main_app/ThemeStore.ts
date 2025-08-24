import { create } from "zustand";
import { type themeStore } from "../../Helpers/types";

export const ThemeStore = create<themeStore>((set) => ({
    theme: localStorage.getItem("theme") as string ||  'light',
    setTheme: (theme: string) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    }
}))