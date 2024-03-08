import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster richColors />
    </>
  );
}

export default App;
