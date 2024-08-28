"use client";
import React from "react";

function MainComponent() {
  // TODOリストの状態を管理するための useState フック
  const [todos, setTodos] = React.useState([]);
  // 新しいTODOの入力状態を管理するための useState フック
  const [newTodo, setNewTodo] = React.useState({
    title: "",
    details: "",
    status: "未着手",
  });
  // フィルタリング状態を管理するための useState フック
  const [filter, setFilter] = React.useState("全て");
  // ソート基準を管理するための useState フック
  const [sortBy, setSortBy] = React.useState("登録日");

  // 新しいTODOを追加する関数
  const addTodo = () => {
    if (newTodo.title) {
      const currentDate = new Date().toISOString();
      setTodos([
        ...todos,
        {
          ...newTodo,
          id: Date.now(),
          createdAt: currentDate,
          updatedAt: currentDate,
        },
      ]);
      setNewTodo({ title: "", details: "", status: "未着手" });
    }
  };

  // TODOを削除する関数
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TODOを編集する関数
  const editTodo = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedTodo, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  // TODOをソートする処理
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "登録日") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  });

  // TODOをフィルタリングする処理
  const filteredTodos = sortedTodos.filter(
    (todo) => filter === "全て" || todo.status === filter
  );

  // ステータスに応じたタグの色を定義する関数
  const getStatusColor = (status) => {
    switch (status) {
      case "未着手":
        return "bg-red-100 text-red-800";
      case "進行中":
        return "bg-yellow-100 text-yellow-800";
      case "完了":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">TODOリスト</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="TODOのタイトル"
          className="border p-2 mr-2 rounded"
          name="title"
        />
        <input
          type="text"
          value={newTodo.details}
          onChange={(e) => setNewTodo({ ...newTodo, details: e.target.value })}
          placeholder="TODOの詳細"
          className="border p-2 mr-2 rounded"
          name="details"
        />
        <select
          value={newTodo.status}
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
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

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 mr-2 rounded"
          name="filter"
        >
          <option value="全て">全て</option>
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
          name="sortBy"
        >
          <option value="登録日">登録日</option>
          <option value="更新日">更新日</option>
        </select>
      </div>

      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onEdit={editTodo}
        getStatusColor={getStatusColor}
      />
    </div>
  );
}

function TodoList({ todos, onDelete, onEdit, getStatusColor }) {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="border p-4 rounded shadow">
          <h3 className="font-bold text-lg">{todo.title}</h3>
          <p className="text-gray-600">{todo.details}</p>
          <p className="text-sm mt-2">
            ステータス:
            <span
              className={`${getStatusColor(
                todo.status
              )} px-2 py-1 rounded-full text-xs font-semibold ml-2`}
            >
              {todo.status}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            登録日: {new Date(todo.createdAt).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            更新日: {new Date(todo.updatedAt).toLocaleString()}
          </p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            >
              削除
            </button>
            <button
              onClick={() => {
                const newTitle = prompt("新しいタイトル", todo.title);
                const newDetails = prompt("新しい詳細", todo.details);
                if (newTitle && newDetails) {
                  onEdit(todo.id, { title: newTitle, details: newDetails });
                }
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
            >
              編集
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MainComponent;