import { useEffect, useState } from "react";
import { useLocalStorage, useMedia } from "react-use";
import { sendMessage } from "@/lib/utils";

export type Theme = "light" | "dark" | "system";
type ColorMode = "light" | "dark";

export default function useTheme(defaultTheme: Theme = "system") {
  const [value, setValue] = useLocalStorage<Theme>("theme", defaultTheme);
  const [theme, setTheme] = useState<Theme>(value ?? defaultTheme);
  const isMatchDark = useMedia("(prefers-color-scheme: dark)");

  const getColorMode = (theme: Theme): ColorMode => {
    if (theme !== "system") return theme === "dark" ? "dark" : "light";
    return isMatchDark ? "dark" : "light";
  };

  const colorMode = getColorMode(theme);

  // 同步本地存储和状态
  useEffect(() => {
    if (!value || value === theme) return;
    setTheme(value);
  }, [value, theme]);

  // 同步 DOM 主题
  useEffect(() => {
    const root = document.documentElement;
    const isDark = colorMode === "dark";

    root.classList[isDark ? "add" : "remove"]("dark");
    root.style.colorScheme = colorMode;
  }, [colorMode]);

  // 监听 Astro 的页面切换事件
  useEffect(() => {
    const handlePageChange = () => {
      const root = document.documentElement;
      const isDark = colorMode === "dark";
      
      root.classList[isDark ? "add" : "remove"]("dark");
      root.style.colorScheme = colorMode;
    };
    
    document.addEventListener("astro:after-swap", handlePageChange);
    return () => {
      document.removeEventListener("astro:after-swap", handlePageChange);
    };
  }, [colorMode]);

  // 同步配置到外部系统
  useEffect(() => {
    try {
      sendMessage({
        setConfig: {
          theme: colorMode,
          reactionsEnabled: false,
        },
      });
    } catch (error) {
      console.error("Failed to sync theme configuration:", error);
    }
  }, [colorMode]);

  const setThemeAndStorage = (newTheme: Theme) => {
    setValue(newTheme);
    setTheme(newTheme);
  };

  return {
    colorMode,
    theme,
    setTheme: setThemeAndStorage,
    isDarkMode: colorMode === "dark",
  };
}
