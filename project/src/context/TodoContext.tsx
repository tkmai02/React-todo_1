import React, { createContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabaseの設定
const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

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
  const [newTodo, setNewTodo] = useState({ title: "", details: "" });

  // データをSupabaseから取得
  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todo-pj").select("*");
    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data || []);
    }
  };

  // 新しいTODOを追加
  const addTodo = async () => {
    const { data, error } = await supabase.from("todo-pj").insert([newTodo]);
    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodos((prev) => [...prev, ...data]);
    }
  };

  // TODOを削除
  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todo-pj").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, newTodo, setNewTodo, addTodo, deleteTodo }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
