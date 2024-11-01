import React from "react";
import MoveColumnButton from "../buttons/MoveColumnButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faCalculator } from "@fortawesome/free-solid-svg-icons";

interface TableHeaderProps {
  columns: string[];
  updateColumnName: (index: number, newName: string) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  updateColumnName,
  moveColumn,
}) => {
  return (
    <div
      className="grid bg-darkOrange py-2 px-1 mb-1 rounded-full text-white"
      style={{
        gridTemplateColumns: `repeat(${
          columns.length + 2
        }, minmax(100px, 1fr))`,
      }}
    >
      {/* Header for "Intercambio" */}
      <div
        className="text-center font-bold flex items-center justify-center"
        style={{ fontFamily: "Comfortaa" }}
      >
        <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
        Exchange
      </div>

      {/* Header for "Total" with Icon */}
      <div
        className="text-center font-bold flex items-center justify-center"
        style={{ fontFamily: "Comfortaa" }}
      >
        <FontAwesomeIcon icon={faCalculator} className="mr-2" />
        Total
      </div>

      {/* Dynamic Column Headers with Move Buttons inside Input */}
      {columns.map((col, index) => (
        <div key={index} className="text-center font-bold">
          <div className="relative w-full flex items-center justify-center">
            {/* Move Left Button wrapped in a div */}
            <div className="absolute left-2 flex items-center z-10">
              <MoveColumnButton
                direction="left"
                onClick={() => moveColumn(index, index - 1)}
              />
            </div>

            {/* Editable Column Name */}
            <input
              type="text"
              value={col}
              onChange={(e) => updateColumnName(index, e.target.value)}
              className="w-full border rounded-full px-4 py-2 mx-1 text-center text-sm bg-white text-black relative"
              style={{ fontFamily: "Comfortaa" }}
            />

            {/* Move Right Button wrapped in a div */}
            <div className="absolute right-2 flex items-center z-10">
              <MoveColumnButton
                direction="right"
                onClick={() => moveColumn(index, index + 1)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
