//TODOを編集するためのモーダルコンポーネント
// EditModal.tsx
import React, { useEffect } from "react";
import { TodoContext, TodoItem } from "../context/TodoContext";

const EditModal = () => {
  const context = React.useContext(TodoContext);

  if (!context) {
    throw new Error("EditModal must be used within a TodoProvider");
  }

  const { editingTodo, editTodo, setEditingTodo } = context;

  // 編集中のTODOの状態を管理
  const [editedTodo, setEditedTodo] = React.useState<TodoItem | null>(
    editingTodo ? { ...editingTodo } : null
  );

  useEffect(() => {
    setEditedTodo(editingTodo ? { ...editingTodo } : null);
  }, [editingTodo]);

  // 保存ボタンをクリックしたときの処理
  const handleSave = () => {
    if (editingTodo && editedTodo) {
      editTodo(editingTodo.id, editedTodo); // 変更を保存
      setEditingTodo(null); // モーダルを閉じる
    }
  };

  // モーダルを閉じる処理
  const handleClose = () => {
    setEditingTodo(null);
  };

  // 編集中のTODOがない場合は何も表示しない
  if (!editingTodo || !editedTodo) {
    return null;
  }

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEditedTodo({
              ...editedTodo,
              title: e.target.value,
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEditedTodo({
              ...editedTodo,
              dueDate: e.target.value,
            });
          }}
          className="border p-2 mb-2 w-full rounded"
          name="dueDate"
        />
        {/* 詳細編集 */}
        <textarea
          value={editedTodo.details}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setEditedTodo({
              ...editedTodo,
              details: e.target.value,
            });
          }}
          className="border p-2 mb-4 w-full rounded"
          placeholder="詳細"
          rows={3}
          name="details"
        ></textarea>
        {/* ステータス編集 */}
        <select
          value={editedTodo.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setEditedTodo({
              ...editedTodo,
              status: e.target.value,
            });
          }}
          className="border p-2 mb-4 w-full rounded"
          name="status"
        >
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
        {/* ボタン群 */}
        <div className="flex justify-end space-x-2">
          {/* キャンセルボタン */}
          <button
            onClick={handleClose}
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
};

export default EditModal;
