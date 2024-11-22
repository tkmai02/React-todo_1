// TodoContext.tsx
import React, { createContext, useState, useEffect } from "react";
import supabase from "../supabase.js";

// Contextを作成
const TodoContext = createContext<any>(null);

interface TodoItem {
  id: string;
  title: string;
  details: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

function TodoProvider(props: any) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    details: "",
    status: "未着手",
    dueDate: "",
  });

  const [filter, setFilter] = useState("全て");
  const [sortBy, setSortBy] = useState("登録日");
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
    // 送信用のデータを準備
    const todoToSubmit = {
      ...newTodo,
      // dueDateが空文字列の場合はnullを設定
      dueDate: newTodo.dueDate === "" ? null : newTodo.dueDate,
      // createdAtに現在の日時を設定
      createdAt: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from("todo-pj-table")
      .insert([todoToSubmit])
      .select('*'); // ここで挿入されたデータを取得

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodos((prev) => [...prev, ...data]);
      // 入力フィールドをクリア
      setNewTodo({
        title: "",
        details: "",
        status: "未着手",
        dueDate: null,
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
