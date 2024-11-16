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

      // 新しいTODOアイテムを作成
      const newTodoItem = {
        id: Date.now(),             // 一意のIDを生成
        title: newTodo.title,       // タイトル
        details: newTodo.details,   // 詳細
        status: newTodo.status,     // ステータス
        dueDate: newTodo.dueDate,   // 期限日
        createdAt: currentDate,     // 登録日
        updatedAt: currentDate,     // 更新日
      };

      // 新しいTODOを既存のTODOリストに追加
      const updatedTodos = todos.concat(newTodoItem);
      setTodos(updatedTodos);

      // 入力フォームをリセット
      setNewTodo({
        title: "",
        details: "",
        status: "未着手",
        dueDate: "",
      });
    }
  };

  // 指定したIDのTODOを削除する関数
  const deleteTodo = (id) => {
    // フィルタリングして削除
    const updatedTodos = todos.filter(function(todo) {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  // TODOを編集する関数
  const editTodo = (id, updatedTodo) => {
    // 指定したIDのTODOを更新
    const updatedTodos = todos.map(function(todo) {
      if (todo.id === id) {
        return {
          id: todo.id,
          title: updatedTodo.title,
          details: updatedTodo.details,
          status: updatedTodo.status,
          dueDate: updatedTodo.dueDate,
          createdAt: todo.createdAt,
          updatedAt: new Date().toISOString(),
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);

    // 編集モードを解除
    setEditingTodo(null);
  };

  // ソートされたTODOリストを取得
  const sortedTodos = todos.slice().sort(function(a, b) {
    if (sortBy === "登録日") {
      // 登録日でソート
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      // 更新日でソート
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  });

  // フィルターに基づいてTODOリストを取得
  const filteredTodos = sortedTodos.filter(function(todo) {
    if (filter === "全て") {
      return true;
    } else {
      return todo.status === filter;
    }
  });

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

  // 編集ボタンをクリックしたときの処理
  const handleEdit = (todo) => {
    setEditingTodo(todo);
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
          onChange={function(e) {
            setNewTodo({
              title: e.target.value,
              details: newTodo.details,
              status: newTodo.status,
              dueDate: newTodo.dueDate,
            });
          }}
          placeholder="TODOのタイトル"
          className="border p-2 mr-2 rounded"
          name="title"
        />
        {/* 詳細入力 */}
        <input
          type="text"
          value={newTodo.details}
          onChange={function(e) {
            setNewTodo({
              title: newTodo.title,
              details: e.target.value,
              status: newTodo.status,
              dueDate: newTodo.dueDate,
            });
          }}
          placeholder="TODOの詳細"
          className="border p-2 mr-2 rounded"
          name="details"
        />
        {/* 期限日入力 */}
        <input
          type="date"
          value={newTodo.dueDate || ""}
          onChange={function(e) {
            setNewTodo({
              title: newTodo.title,
              details: newTodo.details,
              status: newTodo.status,
              dueDate: e.target.value,
            });
          }}
          className="border p-2 mr-2 rounded"
          name="dueDate"
        />
        {/* ステータス選択 */}
        <select
          value={newTodo.status}
          onChange={function(e) {
            setNewTodo({
              title: newTodo.title,
              details: newTodo.details,
              status: e.target.value,
              dueDate: newTodo.dueDate,
            });
          }}
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
          onChange={function(e) {
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
          onChange={function(e) {
            setSortBy(e.target.value);
          }}
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
        onEdit={handleEdit}
        getStatusColor={getStatusColor}
      />

      {/* 編集モーダルの表示 */}
      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={editTodo}
          onClose={function() {
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}

// TODOリストを表示するコンポーネント
function TodoList(props) {
  const todos = props.todos;
  const onDelete = props.onDelete;
  const onEdit = props.onEdit;
  const getStatusColor = props.getStatusColor;

  return (
    <ul className="space-y-4">
      {todos.map(function(todo) {
        return (
          <li key={todo.id} className="border p-4 rounded shadow">
            {/* タイトル */}
            <h3 className="font-bold text-lg">{todo.title}</h3>
            {/* 詳細 */}
            <p className="text-gray-600">{todo.details}</p>
            {/* ステータス */}
            <p className="text-sm mt-2">
              ステータス:
              <span
                className={
                  getStatusColor(todo.status) +
                  " px-2 py-1 rounded-full text-xs font-semibold ml-2"
                }
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
                onClick={function() {
                  onDelete(todo.id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
              >
                削除
              </button>
              {/* 編集ボタン */}
              <button
                onClick={function() {
                  onEdit(todo);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
              >
                編集
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// 編集用のモーダルコンポーネント
function EditModal(props) {
  const todo = props.todo;
  const onSave = props.onSave;
  const onClose = props.onClose;

  // 編集中のTODOの状態を管理
  const [editedTodo, setEditedTodo] = React.useState({
    id: todo.id,
    title: todo.title,
    details: todo.details,
    status: todo.status,
    dueDate: todo.dueDate,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
  });

  // 保存ボタンをクリックしたときの処理
  const handleSave = () => {
    onSave(todo.id, editedTodo); // 変更を保存
    onClose();                   // モーダルを閉じる
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
          onChange={function(e) {
            setEditedTodo({
              id: editedTodo.id,
              title: e.target.value,
              details: editedTodo.details,
              status: editedTodo.status,
              dueDate: editedTodo.dueDate,
              createdAt: editedTodo.createdAt,
              updatedAt: editedTodo.updatedAt,
            });
          }}
          className="border p-2 mb-2 w-full rounded"
          placeholder="タイトル"
          name="title"
        />
        {/* 期限日編集 */}
        <input
          type="date"
          value={editedTodo.dueDate || ""}
          onChange={function(e) {
            setEditedTodo({
              id: editedTodo.id,
              title: editedTodo.title,
              details: editedTodo.details,
              status: editedTodo.status,
              dueDate: e.target.value,
              createdAt: editedTodo.createdAt,
              updatedAt: editedTodo.updatedAt,
            });
          }}
          className="border p-2 mb-2 w-full rounded"
          name="dueDate"
        />
        {/* 詳細編集 */}
        <textarea
          value={editedTodo.details}
          onChange={function(e) {
            setEditedTodo({
              id: editedTodo.id,
              title: editedTodo.title,
              details: e.target.value,
              status: editedTodo.status,
              dueDate: editedTodo.dueDate,
              createdAt: editedTodo.createdAt,
              updatedAt: editedTodo.updatedAt,
            });
          }}
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
