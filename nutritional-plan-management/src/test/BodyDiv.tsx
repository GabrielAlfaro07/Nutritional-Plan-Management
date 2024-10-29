import React from "react";

export interface RowData {
  intercambio: string;
  total: number;
  values: string[];
}

interface TableBodyProps {
  data: RowData[];
  updateCellValue: (rowIndex: number, colIndex: number, newValue: string) => void;
}

const Body: React.FC<TableBodyProps> = ({ data, updateCellValue }) => {
  return (
    <div className="grid border border-orange-400">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid"
          style={{ gridTemplateColumns: `repeat(${row.values.length + 2}, minmax(100px, 1fr))` }}
        >
          <div className="bg-yellow-500 py-2 border border-orange-400"  style={{ fontFamily: "Comfortaa", fontSize: '12px' }}>{row.intercambio}</div>
          <div className="border border-orange-400 px-4 py-2 text-center"  style={{ fontFamily: "Comfortaa"}}>{row.total}</div>
          {row.values.map((value, colIndex) => (
            <div key={colIndex} className="border border-orange-400 px-1 py-2 text-center">
              <input
                type="text"
                value={value}
                onChange={(e) => updateCellValue(rowIndex, colIndex, e.target.value)}
                className="w-full text-center"
                style={{ fontFamily: "Comfortaa" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Body;
