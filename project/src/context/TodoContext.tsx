// TodoContext.tsx
import React, { createContext, useState, useEffect } from "react";
import supabase from "../supabase.js";

// Todoアイテムの型定義
export interface TodoItem {
  id: string;
  title: string;
  details: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

// 新規Todoの型定義
interface NewTodo {
  title: string;
  details: string;
  status: string;
  dueDate: string;
}

// コンテキストの値の型定義
interface TodoContextType {
  todos: TodoItem[];
  filteredTodos: TodoItem[];
  newTodo: NewTodo;
  setNewTodo: React.Dispatch<React.SetStateAction<NewTodo>>;
  addTodo: () => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (id: string, updatedFields: Partial<TodoItem>) => Promise<void>;
  editingTodo: TodoItem | null;
  setEditingTodo: React.Dispatch<React.SetStateAction<TodoItem | null>>;
  handleEdit: (todo: TodoItem) => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

// コンテキストを作成
const TodoContext = createContext<TodoContextType | undefined>(undefined);

function TodoProvider(props: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<NewTodo>({
    title: "",
    details: "",
    status: "未着手",
    dueDate: "",
  });

  const [filter, setFilter] = useState<string>("全て");
  const [sortBy, setSortBy] = useState<string>("登録日");
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  // データをSupabaseから取得
  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todo-pj-table").select("*");
    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data || []);
    }
  };

  // 新しいTODOを追加
  const addTodo = async () => {
    const { data, error } = await supabase.from("todo-pj-table").insert([newTodo]);
    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodos((prev) => [...prev, ...(data || [])]);
      // 入力フィールドをクリア
      setNewTodo({
        title: "",
        details: "",
        status: "未着手",
        dueDate: "",
      });
    }
  };

  // TODOを削除
  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todo-pj-table").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  // TODOを編集
  const editTodo = async (id: string, updatedFields: Partial<TodoItem>) => {
    const { data, error } = await supabase
      .from("todo-pj-table")
      .update(updatedFields)
      .eq("id", id);

    if (error) {
      console.error("Error updating todo:", error);
    } else {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
      );
    }
  };

  // 編集モードに入る
  const handleEdit = (todo: TodoItem) => {
    setEditingTodo(todo);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // フィルタリングされたTODOリスト
  const filteredTodos = todos.filter((todo) => {
    if (filter === "全て") {
      return true;
    } else {
      return todo.status === filter;
    }
  });

  // ソート
  filteredTodos.sort((a, b) => {
    if (sortBy === "登録日") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "更新日") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return 0;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        newTodo,
        setNewTodo,
        addTodo,
        deleteTodo,
        editTodo,
        editingTodo,
        setEditingTodo,
        handleEdit,
        filter,
        setFilter,
        sortBy,
        setSortBy,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
