import React from "react";
import { useTheme } from "../contexts/themeContext";

function Test() {
  const { theme, lightTheme, darkTheme } = useTheme();
  return <div>Test - {theme}</div>;
}

export default Test;
