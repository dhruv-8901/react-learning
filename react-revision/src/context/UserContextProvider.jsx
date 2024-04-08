import React, { useState } from "react";
import ThemeContext from "./context";

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeContextProvider;
