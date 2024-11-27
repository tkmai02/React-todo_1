//個々のTODOアイテムを表示するコンポーネント
// TodoItem.tsx
import React from "react";
import { TodoContext, TodoItem as TodoItemType } from "../context/TodoContext";
import getStatusColor from "../utils/getStatusColor";

interface TodoItemProps {
  todo: TodoItemType;
}

function TodoItem(props: TodoItemProps) {
  const context = React.useContext(TodoContext);

  if (!context) {
    throw new Error("TodoItem must be used within a TodoProvider");
  }

  const { deleteTodo, handleEdit } = context;
  const { todo } = props;

  return (
    <li className="border p-4 rounded shadow">
      {/* タイトル */}
      <h3 className="font-bold text-lg">{todo.title}</h3>
      {/* 詳細 */}
      <p className="text-gray-600">{todo.details}</p>
      {/* ステータス */}
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
      {/* 期限日 */}
      {todo.dueDate && (
        <p className="text-xs text-gray-500 mt-1">
          期限: {new Date(todo.dueDate).toLocaleDateString()}
        </p>
      )}
      {/* 登録日 */}
      <p className="text-xs text-gray-500 mt-1">
        登録日: {new Date(todo.createdAt).toLocaleString()}
      </p>
      {/* 更新日 */}
      <p className="text-xs text-gray-500">
        更新日: {new Date(todo.updatedAt).toLocaleString()}
      </p>
      {/* 操作ボタン */}
      <div className="mt-2 space-x-2">
        {/* 削除ボタン */}
        <button
          onClick={function () {
            deleteTodo(todo.id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
        >
          削除
        </button>
        {/* 編集ボタン */}
        <button
          onClick={function () {
            handleEdit(todo);
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
