// TodoContext.jsx
import React from "react";

// Contextを作成
const TodoContext = React.createContext();

// プロバイダーコンポーネントを定義
function TodoProvider(props) {
  // 状態を定義
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

  // 編集モードを設定する関数
  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  // ソートとフィルタリング
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

  // Contextに提供する値
  const contextValue = {
    todos,
    setTodos,
    newTodo,
    setNewTodo,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    editingTodo,
    setEditingTodo,
    addTodo,
    deleteTodo,
    editTodo,
    handleEdit,
    filteredTodos,
  };

  // 子コンポーネントにContextを提供
  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
