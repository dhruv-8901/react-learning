import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import ThemeContextProvider from "./context/UserContextProvider.jsx";
import { UserContextProvider } from "./context/UserContext.js";
import { Provider } from "react-redux";
import store from "./app/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "", element: <App /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <UserContextProvider value={{ user: "test" }}>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>
);
