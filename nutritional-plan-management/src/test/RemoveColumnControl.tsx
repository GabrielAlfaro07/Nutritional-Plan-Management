import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

interface RemoveColumnControlProps {
  removeColumn: (index: number) => void;
  columns: string[];
}

const RemoveColumnControl: React.FC<RemoveColumnControlProps> = ({ removeColumn, columns }) => {
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const handleRemoveColumn = () => {
    if (selectedColumn !== null) {
      removeColumn(selectedColumn); // Llamamos a la función con el índice de la columna seleccionada
      setSelectedColumn(null);
    }
  };

  return (
    <div className="flex items-center justify-end">
      <button onClick={handleRemoveColumn} className="mr-2">
        <FontAwesomeIcon icon={faMinusCircle} style={{ fontSize: '1.5em', color: 'red' }} />
      </button>
      <select
        value={selectedColumn !== null ? selectedColumn : ''}
        onChange={(e) => setSelectedColumn(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        <option value="" disabled>
          Seleccionar
        </option>
        {columns.map((columnName, index) => (
          <option key={index} value={index}>
            {columnName} {/* Muestra el nombre de la columna */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RemoveColumnControl;
