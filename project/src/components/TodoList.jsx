//TODOリストを表示するコンポーネント
//TodoList.jsx
import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
  const todos = props.todos;
  const onDelete = props.onDelete;
  const onEdit = props.onEdit;
  const getStatusColor = props.getStatusColor;

  return (
    <ul className="space-y-4">
      {todos.map(function (todo) {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={onEdit}
            getStatusColor={getStatusColor}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
