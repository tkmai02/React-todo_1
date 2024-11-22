//TODOリストを表示するコンポーネント
// TodoList.tsx
import React from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";

function TodoList() {
  const { filteredTodos } = React.useContext<any>(TodoContext);

  return (
    <ul className="space-y-4">
      {Array.isArray(filteredTodos) &&
        filteredTodos.map(function (todo: any) {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
    </ul>
  );
}

export default TodoList;
