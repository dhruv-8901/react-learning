import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todo/todoSlice";

function AddTodo(props) {
  const { updateInput, showUpdate, updateTodoById, setUpdateInput } =
    props.value;

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (showUpdate) {
            updateTodoById(updateInput);
          } else {
            dispatch(addTodo(input));
            setInput("");
          }
        }}
      >
        <input
          type="text"
          name="todo"
          value={showUpdate ? updateInput : input}
          onChange={(e) =>
            showUpdate
              ? setUpdateInput(e.target.value)
              : setInput(e.target.value)
          }
        />
        {showUpdate ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Add</button>
        )}
      </form>
    </>
  );
}

export default AddTodo;
