// "use client"は、クライアントサイドでのみ実行することを指定
"use client";

// Reactライブラリをインポート
import React from "react";

// メインコンポーネントの定義
function MainComponent() {
  // TODOリストの状態を管理（初期値は空の配列）
  const [todos, setTodos] = React.useState([]);

  // 新しいTODOを追加するための状態管理
  const [newTodo, setNewTodo] = React.useState({
    title: "",        // タイトル
    details: "",      // 詳細
    status: "未着手", // ステータス（未着手、進行中、完了）
    dueDate: "",      // 期限日
  });

  // フィルターの状態を管理（初期値は"全て"）
  const [filter, setFilter] = React.useState("全て");

  // ソートの基準を管理（初期値は"登録日"）
  const [sortBy, setSortBy] = React.useState("登録日");

  // 編集中のTODOを管理（初期値はnull）
  const [editingTodo, setEditingTodo] = React.useState(null);

  // 新しいTODOを追加する関数
  const addTodo = () => {
    // タイトルが入力されている場合のみ追加
    if (newTodo.title) {
      const currentDate = new Date().toISOString();
      // 新しいTODOを既存のTODOリストに追加
      setTodos([
        ...todos,
        {
          ...newTodo,
          id: Date.now(),             // 一意のIDを生成
          createdAt: currentDate,     // 登録日
          updatedAt: currentDate,     // 更新日
        },
      ]);
      // 入力フォームをリセット
      setNewTodo({ title: "", details: "", status: "未着手", dueDate: "" });
    }
  };

  // 指定したIDのTODOを削除する関数
  const deleteTodo = (id) => {
    // フィルタリングして削除
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TODOを編集する関数
  const editTodo = (id, updatedTodo) => {
    // 指定したIDのTODOを更新
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedTodo, updatedAt: new Date().toISOString() }
          : todo
      )
    );
    // 編集モードを解除
    setEditingTodo(null);
  };

  // ソートされたTODOリストを取得
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "登録日") {
      // 登録日でソート
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      // 更新日でソート
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  });

  // フィルターに基づいてTODOリストを取得
  const filteredTodos = sortedTodos.filter(
    (todo) => filter === "全て" || todo.status === filter
  );

  // ステータスに応じて表示色を取得する関数
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

  // 画面のレンダリング
  return (
    <div className="container mx-auto p-4 font-sans">
      {/* タイトル */}
      <h1 className="text-3xl font-bold mb-4">TODOリスト</h1>

      {/* 新しいTODOを追加するフォーム */}
      <div className="mb-4">
        {/* タイトル入力 */}
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="TODOのタイトル"
          className="border p-2 mr-2 rounded"
          name="title"
        />
        {/* 詳細入力 */}
        <input
          type="text"
          value={newTodo.details}
          onChange={(e) => setNewTodo({ ...newTodo, details: e.target.value })}
          placeholder="TODOの詳細"
          className="border p-2 mr-2 rounded"
          name="details"
        />
        {/* 期限日入力 */}
        <input
          type="date"
          value={newTodo.dueDate || ""}
          onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          className="border p-2 mr-2 rounded"
          name="dueDate"
        />
        {/* ステータス選択 */}
        <select
          value={newTodo.status}
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
          className="border p-2 mr-2 rounded"
          name="status"
        >
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
        {/* 追加ボタン */}
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          追加
        </button>
      </div>

      {/* フィルターとソートのオプション */}
      <div className="mb-4">
        {/* フィルター選択 */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
          name="sortBy"
        >
          <option value="登録日">登録日</option>
          <option value="更新日">更新日</option>
        </select>
      </div>

      {/* TODOリストの表示 */}
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onEdit={(todo) => setEditingTodo(todo)}
        getStatusColor={getStatusColor}
      />

      {/* 編集モーダルの表示 */}
      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={(updatedTodo) => editTodo(editingTodo.id, updatedTodo)}
          onClose={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
}

// TODOリストを表示するコンポーネント
function TodoList({ todos, onDelete, onEdit, getStatusColor }) {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="border p-4 rounded shadow">
          {/* タイトル */}
          <h3 className="font-bold text-lg">{todo.title}</h3>
          {/* 詳細 */}
          <p className="text-gray-600">{todo.details}</p>
          {/* ステータス */}
          <p className="text-sm mt-2">
            ステータス:
            <span
              className={`${getStatusColor(
                todo.status
              )} px-2 py-1 rounded-full text-xs font-semibold ml-2`}
            >
              {todo.status}
            </span>
          </p>
          {/* 期限日 */}
          {todo.dueDate && (
            <p className="text-xs text-gray-500 mt-1">
              期限: {new Date(todo.dueDate).toLocaleDateString()}
            </p>
          )}
          {/* 登録日 */}
          <p className="text-xs text-gray-500 mt-1">
            登録日: {new Date(todo.createdAt).toLocaleString()}
          </p>
          {/* 更新日 */}
          <p className="text-xs text-gray-500">
            更新日: {new Date(todo.updatedAt).toLocaleString()}
          </p>
          {/* 操作ボタン */}
          <div className="mt-2 space-x-2">
            {/* 削除ボタン */}
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            >
              削除
            </button>
            {/* 編集ボタン */}
            <button
              onClick={() => onEdit(todo)}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
            >
              編集
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// 編集用のモーダルコンポーネント
function EditModal({ todo, onSave, onClose }) {
  // 編集中のTODOの状態を管理
  const [editedTodo, setEditedTodo] = React.useState(todo);

  // 保存ボタンをクリックしたときの処理
  const handleSave = () => {
    onSave(editedTodo); // 変更を保存
    onClose();          // モーダルを閉じる
  };

  return (
    // モーダルの背景
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* モーダルの内容 */}
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">TODO編集</h2>
        {/* タイトル編集 */}
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, title: e.target.value })
          }
          className="border p-2 mb-2 w-full rounded"
          placeholder="タイトル"
          name="title"
        />
        {/* 期限日編集 */}
        <input
          type="date"
          value={editedTodo.dueDate || ""}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, dueDate: e.target.value })
          }
          className="border p-2 mb-2 w-full rounded"
          name="dueDate"
        />
        {/* 詳細編集 */}
        <textarea
          value={editedTodo.details}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, details: e.target.value })
          }
          className="border p-2 mb-4 w-full rounded"
          placeholder="詳細"
          rows="3"
          name="details"
        ></textarea>
        {/* ボタン群 */}
        <div className="flex justify-end space-x-2">
          {/* キャンセルボタン */}
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            キャンセル
          </button>
          {/* 保存ボタン */}
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

// メインコンポーネントをエクスポート
export default MainComponent;
