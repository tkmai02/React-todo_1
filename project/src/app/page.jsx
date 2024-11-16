"use client";
import React from "react";

function MainComponent() {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState({
    title: "",
    details: "",
    status: "未着手",
    dueDate: "",
  });
  const [filter, setFilter] = React.useState("全て");
  const [sortBy, setSortBy] = React.useState("登録日");
  const [editingTodo, setEditingTodo] = React.useState(null);
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
      setNewTodo({ title: "", details: "", status: "未着手", dueDate: "" });
    }
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTodo = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedTodo, updatedAt: new Date().toISOString() }
          : todo
      )
    );
    setEditingTodo(null);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "登録日") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  });
  const filteredTodos = sortedTodos.filter(
    (todo) => filter === "全て" || todo.status === filter
  );
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
        <input
          type="date"
          value={newTodo.dueDate || ""}
          onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          className="border p-2 mr-2 rounded"
          name="dueDate"
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
        onEdit={(todo) => setEditingTodo(todo)}
        getStatusColor={getStatusColor}
      />

      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={(updatedTodo) => editTodo(editingTodo.id, updatedTodo)}
          onClose={() => setEditingTodo(null)}
        />
      )}
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
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            >
              削除
            </button>
            <button
              onClick={() => onEdit(todo)}
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

function EditModal({ todo, onSave, onClose }) {
  const [editedTodo, setEditedTodo] = React.useState(todo);

  const handleSave = () => {
    onSave(editedTodo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">TODO編集</h2>
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, title: e.target.value })
          }
          className="border p-2 mb-2 w-full rounded"
          placeholder="タイトル"
          name="title"
        />
        <input
          type="date"
          value={editedTodo.dueDate || ""}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, dueDate: e.target.value })
          }
          className="border p-2 mb-2 w-full rounded"
          name="dueDate"
        />
        <textarea
          value={editedTodo.details}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, details: e.target.value })
          }
          className="border p-2 mb-4 w-full rounded"
          placeholder="詳細"
          rows="3"
          name="details"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;