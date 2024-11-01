import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Constants for collections
const COLLECTION_PATIENTS = "patients";
const COLLECTION_NUTRITIONAL_PLANS = "nutritionalPlan";
const COLLECTION_FOOD_EXCHANGES = "food exchanges";

// Fetch categories for each authenticated admin
export const fetchFoodExchangeCategories = async (adminId: string) => {
  try {
    const foodExchangesCollectionRef = collection(
      db,
      `administrators/${adminId}/${COLLECTION_FOOD_EXCHANGES}`
    );
    const foodExchangesSnapshot = await getDocs(foodExchangesCollectionRef);

    const foodExchangesList = foodExchangesSnapshot.docs.map((doc) => ({
      name: doc.id, // Uses the doc ID, which is the name of each food exchange
    }));

    console.log(foodExchangesList);
    return foodExchangesList;
  } catch (error) {
    console.error("Error fetching food exchange categories: ", error);
    throw new Error("Failed to fetch food exchange categories.");
  }
};

// Interface definitions for nutritional plans

export interface RowData {
  exchange: string;
  total: number;
  values: string[];
}
export interface NutritionalPlanData {
  mealCategories: string[];
  exchanges: FoodExchange[];
  notes: string;
}

export interface FoodExchange {
  name: string;
  total: number;
  quantities: number[];
}

// Create a nutritional plan for a specific patient
export const createNutritionalPlan = async (
  adminId: string,
  patientId: string,
  planData: NutritionalPlanData
) => {
  try {
    const nutritionalPlanRef = collection(
      db,
      `administrators/${adminId}/${COLLECTION_PATIENTS}/${patientId}/${COLLECTION_NUTRITIONAL_PLANS}`
    );
    await addDoc(nutritionalPlanRef, { planData });
    alert(`Nutritional plan created successfully`);
  } catch (error) {
    throw new Error("Failed to create nutritional plan");
  }
};

// Column management functions for table display
export const addColumn = (
  columnNames: string[],
  rowData: RowData[],
  setColumnNames: React.Dispatch<React.SetStateAction<string[]>>,
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  const newColumnName = `Column ${columnNames.length + 1}`;
  setColumnNames([...columnNames, newColumnName]);
  const updatedRowData = rowData.map((row) => ({
    ...row,
    values: [...row.values, ""],
  }));
  setRowData(updatedRowData);
};

export const removeColumn = (
  index: number,
  columnNames: string[],
  rowData: RowData[],
  setColumnNames: React.Dispatch<React.SetStateAction<string[]>>,
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  const updatedColumnNames = columnNames.filter((_, i) => i !== index);
  setColumnNames(updatedColumnNames);
  const updatedRowData = rowData.map((row) => ({
    ...row,
    values: row.values.filter((_, i) => i !== index),
  }));
  setRowData(updatedRowData);
};

export const renameColumn = (
  index: number,
  newColumnName: string,
  columnNames: string[],
  setColumnNames: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const updatedColumnNames = columnNames.map((name, i) =>
    i === index ? newColumnName : name
  );
  setColumnNames(updatedColumnNames);
};

export const repositionColumn = (
  fromIndex: number,
  toIndex: number,
  columnNames: string[],
  rowData: RowData[],
  setColumnNames: React.Dispatch<React.SetStateAction<string[]>>,
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  if (toIndex < 0 || toIndex >= columnNames.length || fromIndex === toIndex) {
    return;
  }

  // 1. Reorder columns by creating a new array
  const updatedColumnNames = [...columnNames];
  const [movedColumn] = updatedColumnNames.splice(fromIndex, 1);
  updatedColumnNames.splice(toIndex, 0, movedColumn);
  setColumnNames(updatedColumnNames);

  // 2. Reorder values in each row without mutating the original data
  const updatedRowData = rowData.map((row) => {
    const updatedValues = [...row.values];
    const [movedValue] = updatedValues.splice(fromIndex, 1);
    updatedValues.splice(toIndex, 0, movedValue);

    return { ...row, values: updatedValues };
  });
  setRowData([...updatedRowData]); // Set as new array reference
};

export const updateCell = (
  rowIndex: number,
  colIndex: number,
  newValue: string,
  rowData: RowData[],
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  const updatedRowData = rowData.map((row, rIndex) => {
    if (rIndex === rowIndex) {
      const updatedValues = row.values.map((value, vIndex) =>
        vIndex === colIndex ? newValue : value
      );
      const total = updatedValues.reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );
      return { ...row, values: updatedValues, total };
    }
    return row;
  });
  setRowData([...updatedRowData]); // Ensure a new array reference for state change
};
