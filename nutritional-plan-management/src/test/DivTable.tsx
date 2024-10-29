import React, { useEffect, useState } from "react";
import Header from "./HeaderDiv";
import Body from "./BodyDiv";
import {
  addColumn,
  removeColumn,
  updateColumnName,
  updateCellValue,
  moveColumn,
} from "../services/nutritionalPlanService";
import { RowData } from "./BodyDiv";
import { getCategories } from "../services/nutritionalPlanService";
import Controls from "./Control";
import CreatePlanButton from "./CreatePlanButton";
import Note from "./Notas";
import { PlanNutritionalData } from "../services/nutritionalPlanService";
import { useParams } from "react-router-dom";
import { creatPlanNutritional } from "../services/nutritionalPlanService";

const TableDiv: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [columns, setColumns] = useState<string[]>([
    "Desayuno",
    "Merienda AM",
    "Almuerzo",
    "Merienda PM",
    "Cena",
  ]);
  const [data, setData] = useState<RowData[]>([]);

  const [noteContent, setNoteContent] = useState("Contenido de la Nota");

  // Obtener las categorías desde Firebase y transformar el resultado
  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const categories = await getCategories();
        // Mapeamos las categorías para que sigan el formato de RowData
        const formattedData: RowData[] = categories.map((category) => ({
          intercambio: category.data, // El string devuelto por getCategories
          total: 0, // Inicializamos total en 0 (puedes cambiarlo si es dinámico)
          values: Array(columns.length).fill(""), // Array de strings vacíos, uno por cada columna
        }));
        setData(formattedData); // Actualizamos el estado
      } catch (error) {
        console.error("Error setting categories:", error);
      }
    };
    fetchAndSetCategories();
  }, []);

  const handleNoteChange = (title: string, content: string) => {
    setNoteContent(content);
  };

  const createPlan = async () => {
    if (!patientId) {
      console.error("ID del paciente no definido");
      return;
    }

    const planNutritional: PlanNutritionalData = {
      meal: columns,
      categories: data.map((row) => ({
        nombre: row.intercambio,
        total: row.total,
        cantidades: row.values.map((value) => parseFloat(value) || 0),
      })),
      Note: noteContent,
    };

    console.log("Plan creado:", planNutritional);

    const idPlan = await creatPlanNutritional(patientId, planNutritional);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Contenedor desplazable para la tabla */}
      <div className="overflow-x-auto">
        <div className="min-w-full ">
          <Controls
            addColumn={() => addColumn(columns, data, setColumns, setData)}
            removeColumn={(index) =>
              removeColumn(index, columns, data, setColumns, setData)
            }
            columns={columns}
          />
          <Header
            columns={columns}
            updateColumnName={(index, newName) =>
              updateColumnName(index, newName, columns, setColumns)
            }
            moveColumn={(fromIndex, toIndex) =>
              moveColumn(fromIndex, toIndex, columns, data, setColumns, setData)
            }
          />
          <Body
            data={data}
            updateCellValue={(rowIndex, colIndex, newValue) =>
              updateCellValue(rowIndex, colIndex, newValue, data, setData)
            }
          />
        </div>
      </div>

      {/* Componente para notas */}
      <Note
        initialTitle="Notas"
        initialContent={noteContent}
        onChange={handleNoteChange}
      />

      {/* Botón para crear el plan */}
      <CreatePlanButton onClick={createPlan} />
    </div>
  );
};

export default TableDiv;
