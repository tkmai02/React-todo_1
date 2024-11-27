//TODOリストを表示するコンポーネント
// TodoList.tsx
import React from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";

function TodoList() {
  const context = React.useContext(TodoContext);

  if (!context) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const { filteredTodos } = context;

  return (
    <ul className="space-y-4">
      {Array.isArray(filteredTodos) &&
        filteredTodos.map(function (todo) {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
    </ul>
  );
}

export default TodoList;
