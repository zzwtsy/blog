import { useEffect, useState } from "react";
import { useLocalStorage, useMedia } from "react-use";

export type Theme = "light" | "dark" | "system";

export default function useTheme(defaultTheme: Theme = "system") {
  const isMatchDark = useMedia("(prefers-color-scheme: dark)");
  const [value, setValue] = useLocalStorage<Theme>(
    "theme",
    defaultTheme
  );
  const [theme, setTheme] = useState<Theme>(value ?? defaultTheme);

  const colorMode =
    theme === "system"
      ? value === "system"
        ? isMatchDark
          ? "dark"
          : "light"
        : value
      : theme;
  useEffect(() => {
    if (value && value !== theme) {
      setTheme(value);
    }
  }, []);

  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
    if (colorMode === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [colorMode]);

  const setThemeAndStorage = (theme: Theme) => {
    setValue(theme);
    setTheme(theme);
  };

  return {
    colorMode: colorMode, // light or dark
    theme: theme, // auto or light or dark
    setTheme: setThemeAndStorage, // set theme and save to localStorage
  };
}
