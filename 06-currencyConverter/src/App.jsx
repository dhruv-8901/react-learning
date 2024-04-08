import { useEffect, useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currency, setCurrency] = useState("usd");
  const [currencyTo, setCurrencyTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(currency);
  const options = Object.keys(currencyInfo);

  const swapCurrency = () => {
    setCurrency(currencyTo);
    setCurrencyTo(currency);
  };
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[currencyTo] || 0);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundColor: "#26436f",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              {" "}
              <InputBox
                label="From"
                amount={amount}
                currency={currency}
                onCurrencyChange={(currency) => setCurrency(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                options={options}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-black text-white px-2 py-0.5"
                onClick={swapCurrency}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currency={currencyTo}
                onCurrencyChange={(currencyTo) => setCurrencyTo(currencyTo)}
                onAmountChange={(convertedAmount) => setAmount(convertedAmount)}
                options={options}
                inputDisable="true"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-3 rounded-lg"
            >
              Convert {currency} to {currencyTo}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
