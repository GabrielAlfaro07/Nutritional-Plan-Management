// services/FoodExchangeService.ts
import {
  collection,
  doc,
  deleteDoc,
  getDoc,
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

export const addMacronutrientCategory = async (
  category: string,
  exchanges: string[]
) => {
  const categoryRef = doc(collection(db, "food exchanges"), category);
  await setDoc(categoryRef, {}); // Create category document

  const exchangesCollection = collection(categoryRef, "exchanges");

  for (const [index, exchange] of exchanges.entries()) {
    await setDoc(doc(exchangesCollection, `exchange${index}`), {
      text: exchange,
    });
  }
};

export const removeMacronutrientCategory = async (category: string) => {
  const categoryRef = doc(db, "food exchanges", category);
  const exchangesCollection = collection(categoryRef, "exchanges");

  // Fetch all documents within the exchanges subcollection
  const exchangesDocs = await getDocs(exchangesCollection);

  // Delete each exchange document in the subcollection
  for (const exchangeDoc of exchangesDocs.docs) {
    await deleteDoc(exchangeDoc.ref);
  }

  // Now delete the main category document
  await deleteDoc(categoryRef);
};

// Fetch a single macronutrient category by ID
export const fetchMacronutrientCategoryById = async (
  categoryId: string
): Promise<MacronutrientCategory | null> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return null;

  const categoryRef = doc(db, FOOD_EXCHANGES_COLLECTION, categoryId);
  const categoryDoc = await getDoc(categoryRef);

  if (!categoryDoc.exists()) return null;

  const exchangesCollection = collection(categoryRef, "exchanges");
  const exchangesDocs = await getDocs(exchangesCollection);
  const exchanges = exchangesDocs.docs
    .filter((doc) => doc.id !== "init")
    .map((doc) => doc.data().text);

  return {
    category: categoryDoc.id,
    exchanges,
  };
};

// Update a macronutrient category and its exchanges
export const updateMacronutrientCategory = async (
  categoryId: string,
  newCategoryName: string,
  exchanges: string[]
) => {
  const categoryRef = doc(db, FOOD_EXCHANGES_COLLECTION, categoryId);
  const isNameChanged = newCategoryName !== categoryId;

  if (isNameChanged) {
    const newCategoryRef = doc(db, FOOD_EXCHANGES_COLLECTION, newCategoryName);

    // Copy exchanges to the new category
    await setDoc(newCategoryRef, {});
    const exchangesCollection = collection(newCategoryRef, "exchanges");
    for (const [index, exchange] of exchanges.entries()) {
      await setDoc(doc(exchangesCollection, `exchange${index}`), {
        text: exchange,
      });
    }

    // Delete the old category after copying
    await deleteDoc(categoryRef);
  } else {
    const exchangesCollection = collection(categoryRef, "exchanges");
    const existingExchanges = await getDocs(exchangesCollection);
    for (const exchangeDoc of existingExchanges.docs) {
      await deleteDoc(exchangeDoc.ref);
    }
    for (const [index, exchange] of exchanges.entries()) {
      await setDoc(doc(exchangesCollection, `exchange${index}`), {
        text: exchange,
      });
    }
  }
};
