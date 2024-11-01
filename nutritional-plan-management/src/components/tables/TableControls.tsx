import React from "react";
import AddColumnButton from "../../test/AddColumnButton";
import RemoveColumnButton from "../../test/RemoveColumnButton";

interface TableControlsProps {
  addColumn: () => void;
  removeColumn: (index: number) => void;
  columns: string[];
}

const Controls: React.FC<TableControlsProps> = ({
  addColumn,
  removeColumn,
  columns,
}) => {
  return (
    <div className="py-2 space-x-2 text-right flex justify-end items-center ">
      <RemoveColumnButton removeColumn={removeColumn} columns={columns} />
      <AddColumnButton onClick={addColumn} />
    </div>
  );
};

export default Controls;
