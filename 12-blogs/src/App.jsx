import { useDispatch } from "react-redux";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import {Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import authServices from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>null</div>;
  } else {
    return (
      <>
        <div className="text-3xl font-bold underline">
          Blog Website
          <div>
            <Header />
            <main>{/* Todo : <Outlet /> */}</main>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default App;
