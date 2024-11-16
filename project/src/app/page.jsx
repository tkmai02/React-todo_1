"use client";
import React from "react";

function MainComponent() {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState({
    title: "",
    details: "",
    status: "未着手",
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
      setNewTodo({ title: "", details: "", status: "未着手" });
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

  function TodoList({ todos, onDelete, onEdit, getStatusColor }) {
    return (
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">{todo.title}</h3>
                <p className="text-gray-600">{todo.details}</p>
                <div className="flex gap-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                      todo.status
                    )}`}
                  >
                    {todo.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    作成: {new Date(todo.createdAt).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    更新: {new Date(todo.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(todo)}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200 shadow-sm"
                >
                  編集
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 shadow-sm"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
          <h2 className="text-2xl font-bold mb-4">TODOを編集</h2>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, title: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            placeholder="タイトル"
            name="title"
          />
          <textarea
            value={editedTodo.details}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, details: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            placeholder="詳細"
            rows="3"
            name="details"
          ></textarea>
          <select
            value={editedTodo.status}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, status: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
          >
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">TODOリスト</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              placeholder="TODOのタイトル"
              className="flex-1 p-2 border rounded"
              name="title"
            />
            <input
              type="text"
              value={newTodo.details}
              onChange={(e) =>
                setNewTodo({ ...newTodo, details: e.target.value })
              }
              placeholder="TODOの詳細"
              className="flex-1 p-2 border rounded"
              name="details"
            />
            <select
              value={newTodo.status}
              onChange={(e) =>
                setNewTodo({ ...newTodo, status: e.target.value })
              }
              className="p-2 border rounded"
              name="status"
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              追加
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
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
              className="p-2 border rounded"
              name="sortBy"
            >
              <option value="登録日">登録日</option>
              <option value="更新日">更新日</option>
            </select>
          </div>
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
    </div>
  );
}

export default MainComponent;