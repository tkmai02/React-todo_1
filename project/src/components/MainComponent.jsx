//アプリケーションのメインコンポーネント
// MainComponent.jsx
"use client";

import React from "react";
import TodoForm from "./TodoForm";
import FilterSortOptions from "./FilterSortOptions";
import TodoList from "./TodoList";
import EditModal from "./EditModal";
import getStatusColor from "./getStatusColor";

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

  // 新しいTODOを追加する関数
  const addTodo = () => {
    if (newTodo.title) {
      const currentDate = new Date().toISOString();
      const newTodoItem = {
        id: Date.now(),
        title: newTodo.title,
        details: newTodo.details,
        status: newTodo.status,
        dueDate: newTodo.dueDate,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      setTodos(todos.concat(newTodoItem));
      setNewTodo({
        title: "",
        details: "",
        status: "未着手",
        dueDate: "",
      });
    }
  };

  // TODOを削除する関数
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  // TODOを編集する関数
  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(function (todo) {
      if (todo.id === id) {
        return {
          ...todo,
          ...updatedTodo,
          updatedAt: new Date().toISOString(),
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  // TODOリストをソート・フィルターする
  const sortedTodos = todos.slice().sort(function (a, b) {
    if (sortBy === "登録日") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  });

  const filteredTodos = sortedTodos.filter(function (todo) {
    if (filter === "全て") {
      return true;
    } else {
      return todo.status === filter;
    }
  });

  // 編集モーダルを開く
  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">TODOリスト</h1>
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
      />
      <FilterSortOptions
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onEdit={handleEdit}
        getStatusColor={getStatusColor}
      />
      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={editTodo}
          onClose={function () {
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}

export default MainComponent;
