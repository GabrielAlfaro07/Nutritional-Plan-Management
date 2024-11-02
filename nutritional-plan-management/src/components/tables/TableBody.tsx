import React from "react";
import { RowData } from "../../services/nutritionalPlanService";

interface TableBodyProps {
  data: RowData[];
  updateCellValue: (
    rowIndex: number,
    colIndex: number,
    newValue: string
  ) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ data, updateCellValue }) => {
  return (
    <div className="grid">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid border-b border-x rounded-full border-gray-200"
          style={{
            gridTemplateColumns: `repeat(${
              row.values.length + 2
            }, minmax(100px, 1fr))`,
            fontFamily: "Comfortaa",
          }}
        >
          {/* Exchange Cell */}
          <div className="bg-lightOrange flex items-center justify-center py-2 text-center text-white rounded-full">
            {row.exchange}
          </div>

          {/* Total Cell */}
          <div className="flex items-center justify-center px-4 py-2 text-center">
            {row.total}
          </div>

          {/* Dynamic Value Cells */}
          {row.values.map((value, colIndex) => (
            <div
              key={colIndex}
              className="flex items-center justify-center text-center border-gray-200 border-l"
            >
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  updateCellValue(rowIndex, colIndex, e.target.value)
                }
                className="w-32 py-1 px-2 text-center rounded-full"
                style={{ fontFamily: "Comfortaa" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;
