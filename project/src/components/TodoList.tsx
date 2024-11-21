//TODOリストを表示するコンポーネント
// TodoList.tsx
import React from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

function TodoList() {
  // ContextからフィルタリングされたTODOリストを取得
  const { filteredTodos } = React.useContext<any>(TodoContext);

  return (
    <ul className="space-y-4">
      {filteredTodos.map(function (todo: any) {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;

