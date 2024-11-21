//フィルターとソートのオプションを提供するコンポーネント
// FilterSortOptions.jsx
import React from "react";

function FilterSortOptions(props) {
  const filter = props.filter;
  const setFilter = props.setFilter;
  const sortBy = props.sortBy;
  const setSortBy = props.setSortBy;

  return (
    <div className="mb-4">
      <select
        value={filter}
        onChange={function (e) {
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
      <select
        value={sortBy}
        onChange={function (e) {
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
}

export default FilterSortOptions;
