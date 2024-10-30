// services/FoodExchangeService.ts
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth"; // Import getAuth for user authentication

export interface MacronutrientCategory {
  category: string;
  exchanges: string[];
}

const FOOD_EXCHANGES_COLLECTION = "food exchanges";

// Fetch all macronutrient categories and their exchanges, skipping "init"
export const fetchMacronutrientCategories = async (): Promise<
  MacronutrientCategory[]
> => {
  const auth = getAuth(); // Get the auth instance
  const user = auth.currentUser; // Check the current user

  // If the user is not authenticated, return an empty array
  if (!user) {
    return [];
  }

  const categoriesRef = collection(db, FOOD_EXCHANGES_COLLECTION);
  const categoryDocs = await getDocs(categoriesRef);
  const categories: MacronutrientCategory[] = [];

  for (const categoryDoc of categoryDocs.docs) {
    const exchangesCollection = collection(categoryDoc.ref, "exchanges");
    const exchangesDocs = await getDocs(exchangesCollection);
    const exchanges = exchangesDocs.docs
      .filter((doc) => doc.id !== "init") // Exclude "init" exchange
      .map((doc) => doc.data().text); // Assumes each exchange doc has a 'text' field

    categories.push({
      category: categoryDoc.id,
      exchanges: exchanges.length ? exchanges : [],
    }); // Ensure exchanges is an array
  }

  return categories;
};

// Add a new macronutrient category with an initial "init" exchange
export const addMacronutrientCategory = async (category: string) => {
  const categoryRef = doc(collection(db, FOOD_EXCHANGES_COLLECTION), category);
  await setDoc(categoryRef, {}); // Ensure the category document is created

  // Add an initial "init" document in the "exchanges" collection
  const exchangesCollection = collection(categoryRef, "exchanges");
  await setDoc(doc(exchangesCollection, "init"), { text: "initial exchange" });
};

// Remove an existing macronutrient category
export const removeMacronutrientCategory = async (category: string) => {
  const categoryRef = doc(db, FOOD_EXCHANGES_COLLECTION, category);
  await deleteDoc(categoryRef);
};
