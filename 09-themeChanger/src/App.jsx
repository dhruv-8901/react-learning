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

  // In the context api you can pass the variable and function to the one to another components directly without using nested props passing
  // And in this if you create context and only pass varible with default value so in that you can set the state with the help of useState in where you can define and declare the context provider and in that is you pass the default fuction in create context so in that you can also chnage the method os that and pass it in the context provider

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
