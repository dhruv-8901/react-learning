import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../../features/todo/todoSlice";

function TodoList(props) {
  const updateTodoText = props.value.updateTodoText;
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      <div>TodoList</div>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          <button
            onClick={() => {
              updateTodoText(todo.id, todo.text);
            }}
          >
            Update
          </button>
        </li>
      ))}
    </>
  );
}

export default TodoList;
