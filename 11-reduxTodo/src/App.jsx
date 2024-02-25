import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddTodo from "./components/todo/AddTodo";
import TodoList from "./components/todo/TodoList";
import { useDispatch } from "react-redux";
import { updateTodo } from "./features/todo/todoSlice";

function App() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const [updateTodoId, setUpdateTodoId] = useState("");
  const dispatch = useDispatch();

  const updateTodoText = (id, text) => {
    setUpdateInput(text);
    setShowUpdate(true);
    setUpdateTodoId(id);
  };

  const updateTodoById = (text) => {
    dispatch(updateTodo({ id: updateTodoId, text }));
    setShowUpdate(false);
    setUpdateInput("");
    setUpdateTodoId("");
  };

  return (
    <>
      <h1>Learn about redux toolkit</h1>
      <AddTodo
        value={{ updateInput, showUpdate, updateTodoById, setUpdateInput }}
      />
      <TodoList value={{ updateTodoText }} />
    </>
  );
}

export default App;
