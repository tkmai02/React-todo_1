//個々のTODOアイテムを表示するコンポーネント
// TodoItem.jsx
import React from "react";

function TodoItem(props) {
  const todo = props.todo;
  const onDelete = props.onDelete;
  const onEdit = props.onEdit;
  const getStatusColor = props.getStatusColor;

  return (
    <li className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">{todo.title}</h3>
      <p className="text-gray-600">{todo.details}</p>
      <p className="text-sm mt-2">
        ステータス:
        <span
          className={
            getStatusColor(todo.status) +
            " px-2 py-1 rounded-full text-xs font-semibold ml-2"
          }
        >
          {todo.status}
        </span>
      </p>
      {todo.dueDate && (
        <p className="text-xs text-gray-500 mt-1">
          期限: {new Date(todo.dueDate).toLocaleDateString()}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-1">
        登録日: {new Date(todo.createdAt).toLocaleString()}
      </p>
      <p className="text-xs text-gray-500">
        更新日: {new Date(todo.updatedAt).toLocaleString()}
      </p>
      <div className="mt-2 space-x-2">
        <button
          onClick={function () {
            onDelete(todo.id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
        >
          削除
        </button>
        <button
          onClick={function () {
            onEdit(todo);
          }}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
        >
          編集
        </button>
      </div>
    </li>
  );
}

export default TodoItem;

