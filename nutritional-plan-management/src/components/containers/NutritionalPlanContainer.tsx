import React, { useEffect, useState } from "react";
import TableHeader from "../headers/TableHeader";
import TableBody from "../tables/TableBody";
import {
  addColumn,
  removeColumn,
  renameColumn,
  updateCell,
  repositionColumn,
  fetchFoodExchangeCategories,
  createNutritionalPlan,
} from "../../services/nutritionalPlanService";
import { RowData } from "../../services/nutritionalPlanService";
import Controls from "../tables/TableControls";
import CreatePlanButton from "../../test/CreatePlanButton";
import Note from "../notes/Note";
import { NutritionalPlanData } from "../../services/nutritionalPlanService";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import CancelButton from "../buttons/CancelButton";

const NutritionalPlanContainer: React.FC = () => {
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

  // Fetch food exchanges as categories from the authenticated admin's database
  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("No authenticated user found");
          return;
        }

        const adminId = user.uid;
        const categories = await fetchFoodExchangeCategories(adminId);

        const formattedData: RowData[] = categories.map((category) => ({
          exchange: category.name,
          total: 0,
          values: Array(columns.length).fill(""),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error setting categories:", error);
      }
    };

    fetchAndSetCategories();
  }, []); // Run only once on component mount

  // Keep the number of 'values' in each row consistent with 'columns'
  useEffect(() => {
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        values: [
          ...row.values,
          ...Array(Math.max(0, columns.length - row.values.length)).fill(""),
        ].slice(0, columns.length),
      }))
    );
  }, [columns]);

  const handleNoteChange = (content: string) => {
    setNoteContent(content);
  };

  const createPlan = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    if (!patientId) {
      console.error("Patient ID not defined");
      return;
    }

    const adminId = user.uid;
    const planNutritional: NutritionalPlanData = {
      mealCategories: columns,
      exchanges: data.map((row) => ({
        name: row.exchange,
        total: row.total,
        quantities: row.values.map((value) => parseFloat(value) || 0),
      })),
      notes: noteContent,
    };

    console.log("Plan created:", planNutritional);

    await createNutritionalPlan(adminId, patientId, planNutritional);
  };

  return (
    <div>
      {/* Scrollable container for the table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <TableHeader
            columns={columns}
            updateColumnName={(index, newName) =>
              renameColumn(index, newName, columns, setColumns)
            }
            moveColumn={(fromIndex, toIndex) =>
              repositionColumn(
                fromIndex,
                toIndex,
                columns,
                data,
                setColumns,
                setData
              )
            }
          />
          <TableBody
            data={data}
            updateCellValue={(rowIndex, colIndex, newValue) =>
              updateCell(rowIndex, colIndex, newValue, data, setData)
            }
          />
          <Controls
            addColumn={() => addColumn(columns, data, setColumns, setData)}
            // Remove column functionality will be handled in RemoveColumnControl
            removeColumn={(index) =>
              removeColumn(index, columns, data, setColumns, setData)
            }
            columns={columns}
          />
        </div>
      </div>
      {/* Note component */}
      <Note onChange={handleNoteChange} />

      <div className="flex justify-end space-x-2">
        <CreatePlanButton onClick={createPlan} />
        <CancelButton />
      </div>
    </div>
  );
};

export default NutritionalPlanContainer;
