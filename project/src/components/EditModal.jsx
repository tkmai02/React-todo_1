//TODOを編集するためのモーダルコンポーネント
// EditModal.jsx
import React from "react";

function EditModal(props) {
  const todo = props.todo;
  const onSave = props.onSave;
  const onClose = props.onClose;

  const [editedTodo, setEditedTodo] = React.useState({ ...todo });

  const handleSave = () => {
    onSave(todo.id, editedTodo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">TODO編集</h2>
        <input
          type="text"
          value={editedTodo.title}
          onChange={function (e) {
            setEditedTodo({
              ...editedTodo,
              title: e.target.value,
            });
          }}
          className="border p-2 mb-2 w-full rounded"
          placeholder="タイトル"
          name="title"
        />
        <input
          type="date"
          value={editedTodo.dueDate || ""}
          onChange={function (e) {
            setEditedTodo({
              ...editedTodo,
              dueDate: e.target.value,
            });
          }}
          className="border p-2 mb-2 w-full rounded"
          name="dueDate"
        />
        <textarea
          value={editedTodo.details}
          onChange={function (e) {
            setEditedTodo({
              ...editedTodo,
              details: e.target.value,
            });
          }}
          className="border p-2 mb-4 w-full rounded"
          placeholder="詳細"
          rows="3"
          name="details"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            キャンセル
          </button>
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

export default EditModal;
