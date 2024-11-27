//アプリケーションのメインコンポーネント
// MainComponent.tsx
"use client";

import React from "react";
import { TodoProvider } from "../context/TodoContext";
import TodoForm from "./TodoForm";
import FilterSortOptions from "./FilterSortOptions";
import TodoList from "./TodoList";
import EditModal from "./EditModal";

function MainComponent() {
  return (
    // TodoProviderでアプリ全体をラップ
    <TodoProvider>
      <div className="container mx-auto p-4 font-sans">
        {/* タイトル */}
        <h1 className="text-3xl font-bold mb-4">TODOリスト</h1>
        {/* 各コンポーネント */}
        <TodoForm />
        <FilterSortOptions />
        <TodoList />
        <EditModal />
      </div>
    </TodoProvider>
  );
}

export default MainComponent;
