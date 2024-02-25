import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  lightTheme: () => {},
  darkTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
