//ステータスに応じた色を取得する関数を含むユーティリティファイル
// getStatusColor.js
function getStatusColor(status) {
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
}

export default getStatusColor;
