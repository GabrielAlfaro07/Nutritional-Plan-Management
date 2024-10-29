import React from "react";
import MoveButton from "./MoveButton";
import AddColumnButton from "./AddColumnButton";

interface TableHeaderProps {
    columns: string[];
    updateColumnName: (index: number, newName: string) => void;
    moveColumn: (fromIndex: number, toIndex: number) => void;
}


const Header: React.FC<TableHeaderProps> = ({ columns, updateColumnName, moveColumn }) => {
    return (
      <div
        className="grid  bg-yellow-500 py-3 px-1 text-black font-extrabold"
        style={{ gridTemplateColumns: `repeat(${columns.length + 2}, minmax(100px, 1fr))` }}
      >
        <div className="p-2 text-center font-bold" style={{ fontFamily: "Comfortaa" ,  fontSize: '12px'}}>
          Intercambio
        </div>
        <div className="p-2 text-center font-bold" style={{ fontFamily: "Comfortaa", fontSize: '12px' }}>
          Total
        </div>
        {columns.map((col, index) => (
          <div key={index} className="p-2 text-center font-bold ">
            <div className="flex items-center justify-between">
              <MoveButton direction="left" onClick={() => moveColumn(index, index - 1)} />
              <input
                type="text"
                value={col}
                onChange={(e) => updateColumnName(index, e.target.value)}
                className="w-full border rounded px-2 py-1 text-center"
                style={{ fontFamily: "Comfortaa", fontSize: '12px' }}
              />
              <MoveButton direction="right" onClick={() => moveColumn(index, index + 1)} />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Header;
  