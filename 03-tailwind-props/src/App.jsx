import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  let [mainCartValue, setMainCartValue] = useState(0);

  return (
    <>
      <h1 className="font-bold bg-white rounded-xl mb-4 text-black">
        King Maker
      </h1>
      <div className="text-white text-2xl mt-4">
        Total Cart Item - {mainCartValue}
      </div>
      <Card
        mainCartValue={mainCartValue}
        setMainCartValue={setMainCartValue}
        brandName="Raymond"
        description="Raymond classic Suit"
      />
      <Card
        mainCartValue={mainCartValue}
        setMainCartValue={setMainCartValue}
        brandName="Zara"
        description="Zara winter Suit"
      />
      <Card
        mainCartValue={mainCartValue}
        setMainCartValue={setMainCartValue}
        brandName="Linen Club"
        description="Casual Blazer"
      />
    </>
  );
}

export default App;
