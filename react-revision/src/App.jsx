import { useContext, useEffect, useState } from "react";
import Button from "./components/Button";
import { useParams } from "react-router-dom";
import ThemeContextProvider from "./context/UserContextProvider";
import ThemeContext from "./context/context";
import { useUser } from "./context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./features/UserSlice";

function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const user = useUser();
  const countTest = useSelector((state) => state.users);
  const dispatch = useDispatch();

  console.log(countTest);
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(30);
  const [isCharInclude, setIsCharInclude] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!count) {
      return;
    }
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (isCharInclude) characters += "!@#$%^&*()_+{}|:<>?";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(result);
  }, [count, length, isCharInclude]);

  return (
    <>
      <div className={`${theme} bg-white dark:bg-black`}>
        <span className="mr-4 bg-black text-white p-2 rounded-md">
          {password}
        </span>
        <div className="flex justify-center items-center h-screen">
          <span className="mr-4 bg-black text-white p-2 rounded-md">
            {length}
          </span>

          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="range"
              min="10"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Length
            </label>
          </div>
          <div className="flex items-center mb-4 ml-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={isCharInclude}
              onChange={(e) => setIsCharInclude(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Special Char inclue
            </label>
          </div>
          <Button
            label="Generate Password"
            type="button"
            className="bg-gray-600 rounded-md p-2 text-white mr-4 ml-4"
            onClick={() => setCount(count + 1)}
          />
          <Button
            label="Change Theme"
            type="button"
            className="bg-gray-600 rounded-md p-2 text-white mr-4 ml-4"
            onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
          />
          <div className="flex items-center mb-4 ml-4">
            <input
              type="text"
              className="border-2 border-black"
              onChange={(e) => setName(e.target.value)}
            />

            <Button
              label="Add User"
              type="button"
              className="bg-gray-600 rounded-md p-2 text-white mr-4 ml-4"
              onClick={() => dispatch(add({ id: 2, name }))}
            />
            <ol>
              {countTest.map((user) => {
                return <li id={user.id}>{user.name}</li>;
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
