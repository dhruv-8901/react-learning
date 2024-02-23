import React, { createElement } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

function test1() {
  return <h1>helloooooooooo</h1>;
}

const dhru = createElement("a", { href: "https://google.com" }, "click me");

ReactDOM.createRoot(document.getElementById("root")).render(test1());
