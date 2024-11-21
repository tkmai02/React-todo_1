//TODOリストを表示するコンポーネント
// TodoList.jsx
import React from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

function TodoList() {
  // ContextからフィルタリングされたTODOリストを取得
  const { filteredTodos } = React.useContext(TodoContext);

  return (
    <ul className="space-y-4">
      {filteredTodos.map(function (todo) {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
