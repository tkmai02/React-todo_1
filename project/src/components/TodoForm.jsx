//新しいTODOを追加するためのフォームコンポーネント
// TodoForm.jsx
import React from "react";

function TodoForm(props) {
  const newTodo = props.newTodo;
  const setNewTodo = props.setNewTodo;
  const addTodo = props.addTodo;

  return (
    <div className="mb-4">
      <input
        type="text"
        value={newTodo.title}
        onChange={function (e) {
          setNewTodo({
            ...newTodo,
            title: e.target.value,
          });
        }}
        placeholder="TODOのタイトル"
        className="border p-2 mr-2 rounded"
        name="title"
      />
      <input
        type="text"
        value={newTodo.details}
        onChange={function (e) {
          setNewTodo({
            ...newTodo,
            details: e.target.value,
          });
        }}
        placeholder="TODOの詳細"
        className="border p-2 mr-2 rounded"
        name="details"
      />
      <input
        type="date"
        value={newTodo.dueDate || ""}
        onChange={function (e) {
          setNewTodo({
            ...newTodo,
            dueDate: e.target.value,
          });
        }}
        className="border p-2 mr-2 rounded"
        name="dueDate"
      />
      <select
        value={newTodo.status}
        onChange={function (e) {
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