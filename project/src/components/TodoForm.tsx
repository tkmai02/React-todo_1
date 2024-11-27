//新しいTODOを追加するためのフォームコンポーネント
// TodoForm.tsx
import React from "react";
import { TodoContext } from "../context/TodoContext";

function TodoForm() {
  // Contextから必要な値と関数を取得
  const context = React.useContext(TodoContext);

  if (!context) {
    throw new Error("TodoForm must be used within a TodoProvider");
  }

  const { newTodo, setNewTodo, addTodo } = context;

  return (
    <div className="mb-4">
      {/* タイトル入力 */}
      <input
        type="text"
        value={newTodo.title}
        onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
          setNewTodo({
            ...newTodo,
            title: e.target.value,
          });
        }}
        placeholder="TODOのタイトル"
        className="border p-2 mr-2 rounded"
        name="title"
      />
      {/* 詳細入力 */}
      <input
        type="text"
        value={newTodo.details}
        onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
          setNewTodo({
            ...newTodo,
            details: e.target.value,
          });
        }}
        placeholder="TODOの詳細"
        className="border p-2 mr-2 rounded"
        name="details"
      />
      {/* 期限日入力 */}
      <input
        type="date"
        value={newTodo.dueDate || ""}
        onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
          setNewTodo({
            ...newTodo,
            dueDate: e.target.value,
          });
        }}
        className="border p-2 mr-2 rounded"
        name="dueDate"
      />
      {/* ステータス選択 */}
      <select
        value={newTodo.status}
        onChange={function (e: React.ChangeEvent<HTMLSelectElement>) {
          setNewTodo({
            ...newTodo,
            status: e.target.value,
          });
        }}
        className="border p-2 mr-2 rounded"
        name="status"
      >
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      {/* 追加ボタン */}
      <button
        onClick={addTodo}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        追加
      </button>
    </div>
  );
}

export default TodoForm;
