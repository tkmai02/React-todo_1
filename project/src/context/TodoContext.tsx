// TodoContext.tsx
import React, { createContext, useState } from "react";

// Contextを作成
const TodoContext = createContext<any>(null);

// Todoアイテムの型定義
interface TodoItem {
  id: number;
  title: string;
  details: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

// プロバイダーコンポーネントを定義
function TodoProvider(props: any) {
  // 状態を定義
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<any>({
    title: "",
    details: "",
    status: "未着手",
    dueDate: "",
  });
  const [filter, setFilter] = useState<string>("全て");
  const [sortBy, setSortBy] = useState<string>("登録日");
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  // 新しいTODOを追加する関数
  const addTodo = () => {
    if (newTodo.title) {
      const currentDate = new Date().toISOString();
      const newTodoItem: TodoItem = {
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
  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  // TODOを編集する関数
  const editTodo = (id: number, updatedTodo: any) => {
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
  const handleEdit = (todo: TodoItem) => {
    setEditingTodo(todo);
  };

  // ソートとフィルタリング
  const sortedTodos = todos.slice().sort(function (a, b) {
    if (sortBy === "登録日") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
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
