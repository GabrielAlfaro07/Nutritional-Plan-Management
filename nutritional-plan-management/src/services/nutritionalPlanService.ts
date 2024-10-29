import { PatientData } from "./patientService";
import { Patients } from "../components/lists/List";
import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { RowData } from "../test/BodyDiv";

const CATEGORIES_COLLECTION = "categories";

export const getCategories = async () => {
  try {
    const categoriesCollectionRef = collection(db, CATEGORIES_COLLECTION);

    const categoriesSnapshot = await getDocs(categoriesCollectionRef);

    const categoriesList = categoriesSnapshot.docs.map((categoriesDoc) => ({
      data: categoriesDoc.data().Nombre as string,
    }));

    console.log(categoriesList);
    return categoriesList;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw new Error("Failed to fetch categories.");
  }
};

export interface PlanNutritionalData {
  meal: string[];
  categories: categories[];
  Note: string;
}

export interface categories {
  nombre: string;
  total: number;
  cantidades: number[];
}

const PATIENTS_COLLECTION = "patient";

//feach create plan nutritional
export const creatPlanNutritional = async (
  idpatient: string,
  planNutritional: PlanNutritionalData
) => {
  try {
    const docRef = await addDoc(
      collection(db, PATIENTS_COLLECTION, idpatient),
      {
        planNutritional: planNutritional,
      }
    );

    alert(`Plan nutricional creado con éxito`);
  } catch (error) {
    throw new Error("Failed to fetch plan nutritional");
  }
};

//Todas las funciones de la tabla del plan

export const addColumn = (
  columns: string[],
  data: RowData[],
  setColumns: React.Dispatch<React.SetStateAction<string[]>>,
  setData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  const newColumn = `Nueva columna ${columns.length + 1}`;
  const newColumns = [...columns, newColumn];
  setColumns(newColumns);
  const newData = data.map((row) => ({
    ...row,
    values: [...row.values, ""],
  }));
  setData(newData);
};

export const removeColumn = (
  index: number,
  columns: string[],
  data: RowData[],
  setColumns: React.Dispatch<React.SetStateAction<string[]>>,
  setData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  const updatedColumns = columns.filter((_, colIndex) => colIndex !== index);
  setColumns(updatedColumns);
  const newData = data.map((row) => ({
    ...row,
    values: row.values.filter((_, valIndex) => valIndex !== index),
  }));
  setData(newData);
};

export const updateColumnName = (
  index: number,
  newName: string,
  columns: string[],
  setColumns: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const updatedColumns = columns.map((col, colIndex) =>
    colIndex === index ? newName : col
  );
  setColumns(updatedColumns);
};

export const updateCellValue = (
  rowIndex: number,
  colIndex: number,
  newValue: string,
  data: RowData[],
  setData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  const updatedData = data.map((row, rIndex) => {
    if (rIndex === rowIndex) {
      const updatedValues = row.values.map((value, vIndex) =>
        vIndex === colIndex ? newValue : value
      );
      const newTotal = updatedValues.reduce((sum, value) => {
        const number = parseFloat(value);
        return sum + (isNaN(number) ? 0 : number);
      }, 0);
      return { ...row, values: updatedValues, total: newTotal };
    }
    return row;
  });
  setData(updatedData);
};

export const moveColumn = (
  fromIndex: number,
  toIndex: number,
  columns: string[],
  data: RowData[],
  setColumns: React.Dispatch<React.SetStateAction<string[]>>,
  setData: React.Dispatch<React.SetStateAction<RowData[]>>
) => {
  if (toIndex < 0 || toIndex >= columns.length || fromIndex === toIndex) return;

  const updatedColumns = [...columns];
  const [movedColumn] = updatedColumns.splice(fromIndex, 1);
  updatedColumns.splice(toIndex, 0, movedColumn);
  setColumns(updatedColumns);

  const updatedData = data.map((row) => {
    const updatedValues = [...row.values];
    const [movedValue] = updatedValues.splice(fromIndex, 1);
    updatedValues.splice(toIndex, 0, movedValue);
    return { ...row, values: updatedValues };
  });
  setData(updatedData);
};
