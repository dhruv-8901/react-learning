import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/themeContext";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";
import Test from "./components/Test";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  const lightTheme = () => {
    setTheme("light");
  };

  const darkTheme = () => {
    setTheme("dark");
  };

  return (
    <ThemeProvider value={{ theme, lightTheme, darkTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Test />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
