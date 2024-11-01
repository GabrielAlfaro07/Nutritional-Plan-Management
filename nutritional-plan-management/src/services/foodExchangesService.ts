import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

export interface MacronutrientCategory {
  category: string;
  exchanges: string[];
}

// Helper function to get the reference for the current admin’s food exchanges collection
const getAdminFoodExchangesCollectionRef = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return collection(db, `administrators/${user.uid}/food exchanges`);
};

// Fetch all macronutrient categories and their exchanges
export const fetchMacronutrientCategories = async (): Promise<
  MacronutrientCategory[]
> => {
  try {
    const categoriesRef = getAdminFoodExchangesCollectionRef();
    const categoryDocs = await getDocs(categoriesRef);
    const categories: MacronutrientCategory[] = [];

    for (const categoryDoc of categoryDocs.docs) {
      const exchangesCollection = collection(categoryDoc.ref, "exchanges");
      const exchangesDocs = await getDocs(exchangesCollection);
      const exchanges = exchangesDocs.docs
        .filter((doc) => doc.id !== "init")
        .map((doc) => doc.data().text);

      categories.push({
        category: categoryDoc.id,
        exchanges: exchanges.length ? exchanges : [],
      });
    }
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Add a new macronutrient category with exchanges
export const addMacronutrientCategory = async (
  category: string,
  exchanges: string[]
) => {
  const categoryRef = doc(getAdminFoodExchangesCollectionRef(), category);
  await setDoc(categoryRef, {});
  const exchangesCollection = collection(categoryRef, "exchanges");

  for (const [index, exchange] of exchanges.entries()) {
    await setDoc(doc(exchangesCollection, `exchange${index}`), {
      text: exchange,
    });
  }
};

// Remove a macronutrient category
export const removeMacronutrientCategory = async (category: string) => {
  const categoryRef = doc(getAdminFoodExchangesCollectionRef(), category);
  const exchangesCollection = collection(categoryRef, "exchanges");
  const exchangesDocs = await getDocs(exchangesCollection);

  for (const exchangeDoc of exchangesDocs.docs) {
    await deleteDoc(exchangeDoc.ref);
  }
  await deleteDoc(categoryRef);
};

// Fetch a single macronutrient category by ID
export const fetchMacronutrientCategoryById = async (
  categoryId: string
): Promise<MacronutrientCategory | null> => {
  const categoryRef = doc(getAdminFoodExchangesCollectionRef(), categoryId);
  const categoryDoc = await getDoc(categoryRef);

  if (!categoryDoc.exists()) return null;

  const exchangesCollection = collection(categoryRef, "exchanges");
  const exchangesDocs = await getDocs(exchangesCollection);
  const exchanges = exchangesDocs.docs
    .filter((doc) => doc.id !== "init")
    .map((doc) => doc.data().text);

  return { category: categoryDoc.id, exchanges };
};

// Update a macronutrient category and its exchanges
export const updateMacronutrientCategory = async (
  categoryId: string,
  newCategoryName: string,
  exchanges: string[]
) => {
  const categoryRef = doc(getAdminFoodExchangesCollectionRef(), categoryId);
  const isNameChanged = newCategoryName !== categoryId;

  if (isNameChanged) {
    const newCategoryRef = doc(
      getAdminFoodExchangesCollectionRef(),
      newCategoryName
    );
    await setDoc(newCategoryRef, {});
    const exchangesCollection = collection(newCategoryRef, "exchanges");

    for (const [index, exchange] of exchanges.entries()) {
      await setDoc(doc(exchangesCollection, `exchange${index}`), {
        text: exchange,
      });
    }
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
