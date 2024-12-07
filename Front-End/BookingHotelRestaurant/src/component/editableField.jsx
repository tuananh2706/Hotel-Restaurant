import { useEffect, useState } from "react";

const EditableField = ({
  fieldName, // Tên trường trong payload
  fieldValue, // Giá trị hiện tại
  label, // Label hiển thị
  onSave, // Callback khi lưu
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (fieldValue) {
      setValue(fieldValue);
    }
  }, [fieldValue]);

  const handleSave = () => {
    onSave(fieldName, value);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
      <span className="min-w-24 font-medium text-gray-700">{label}:</span>
      {isEditing ? (
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary text-secondary"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-secondary"
          >
            Lưu
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setValue(fieldValue);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Hủy
          </button>
        </div>
      ) : (
        <div className="flex flex-1 items-center gap-2">
          <span className="flex-1 text-secondary">{value}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sửa
          </button>
        </div>
      )}
    </div>
  );
};
export default EditableField;
