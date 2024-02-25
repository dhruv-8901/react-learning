import "./App.css";
import UserContextProvider from "./context/UserContextProvider";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <UserContextProvider>
        <Login />
        <UserProfile />
      </UserContextProvider>
    </>
  );
}

export default App;
