//フィルターとソートのオプションを提供するコンポーネント
// FilterSortOptions.tsx
import React from "react";
import { TodoContext } from "../context/TodoContext";

const FilterSortOptions = () => {
  // Contextから必要な値と関数を取得
  const context = React.useContext(TodoContext);

  if (!context) {
    throw new Error("FilterSortOptions must be used within a TodoProvider");
  }

  const { filter, setFilter, sortBy, setSortBy } = context;

  return (
    <div className="mb-4">
      {/* フィルター選択 */}
      <select
        value={filter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFilter(e.target.value);
        }}
        className="border p-2 mr-2 rounded"
        name="filter"
      >
        <option value="全て">全て</option>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      {/* ソート基準選択 */}
      <select
        value={sortBy}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSortBy(e.target.value);
        }}
        className="border p-2 rounded"
        name="sortBy"
      >
        <option value="登録日">登録日</option>
        <option value="更新日">更新日</option>
      </select>
    </div>
  );
};

export default FilterSortOptions;
