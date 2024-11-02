import React from "react";

interface RemoveColumnButtonProps {
  removeColumn: (index: number) => void;
  columns: string[];
}

const RemoveColumnButton: React.FC<RemoveColumnButtonProps> = ({
  removeColumn,
  columns,
}) => {
  const handleRemoveColumn = () => {
    if (columns.length > 0) {
      removeColumn(columns.length - 1); // Remove the rightmost column
    }
  };

  return (
    <button
      onClick={handleRemoveColumn}
      className="bg-mediumBlue hover:bg-lightBlue text-white px-4 py-2 rounded-full transition duration-200"
      style={{ fontFamily: "Comfortaa" }}
      disabled={columns.length === 0}
    >
      Delete column
    </button>
  );
};

export default RemoveColumnButton;
