import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getAuth } from "firebase/auth";
import TableHeader from "../headers/TableHeader";
import TableBody from "../tables/TableBody";
import Controls from "../tables/TableControls";
import Note from "../notes/Note";
import AddNewNutritionalPlanButton from "../../test/AddNewNutritionalPlanButton";
import CancelButton from "../buttons/CancelButton";
import {
  addColumn,
  removeColumn,
  renameColumn,
  updateCell,
  repositionColumn,
  fetchFoodExchangeCategories,
  createNutritionalPlan,
} from "../../services/nutritionalPlanService";
import {
  RowData,
  NutritionalPlanData,
} from "../../services/nutritionalPlanService";

const AddNutritionalPlanContainer: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate(); // Initialize navigate
  const [columns, setColumns] = useState<string[]>([
    "Desayuno",
    "Merienda AM",
    "Almuerzo",
    "Merienda PM",
    "Cena",
  ]);
  const [data, setData] = useState<RowData[]>([]);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const fetchAndSetCategories = async () => {
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
    };

    fetchAndSetCategories();
  }, []);

  const handleNoteChange = (content: string) => {
    setNoteContent(content);
  };

  const createAndNavigateBack = async () => {
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

    await createNutritionalPlan(adminId, patientId, planNutritional);

    // Navigate back to the previous route (patient details)
    navigate(-1);
  };

  return (
    <div>
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
            removeColumn={(index) =>
              removeColumn(index, columns, data, setColumns, setData)
            }
            columns={columns}
          />
        </div>
      </div>
      <Note defaultValue={noteContent} onChange={handleNoteChange} />

      <div className="flex justify-end space-x-2">
        <CancelButton />
        <AddNewNutritionalPlanButton onClick={createAndNavigateBack} />
      </div>
    </div>
  );
};

export default AddNutritionalPlanContainer;
