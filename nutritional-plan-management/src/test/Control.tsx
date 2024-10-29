import React, { useState } from "react";
import AddColumnButton from "./AddColumnButton";
import RemoveColumnControl from "./RemoveColumnControl";

interface TableControlsProps {
  addColumn: () => void;
  removeColumn: (index: number) => void;
  columns: string[];
}

const Controls: React.FC<TableControlsProps> = ({ addColumn, removeColumn, columns }) => {
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const handleRemoveColumn = () => {
    if (selectedColumn !== null) {
      removeColumn(selectedColumn);
      setSelectedColumn(null);
    }
  };

  return (
    <div className="p-2 text-right flex justify-end items-center">
      <AddColumnButton onClick={addColumn} />
      <RemoveColumnControl removeColumn={removeColumn} columns={columns} />   
    </div>
  );
};

export default Controls;
