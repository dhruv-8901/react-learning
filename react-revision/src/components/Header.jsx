import React, { useContext } from "react";
import ThemeContextProvider from "../context/UserContextProvider";
import ThemeContext from "../context/context";

function Header() {
  const test = useContext(ThemeContext);
  return <div>Header</div>;
}

export default Header;
