// authService.ts
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

/**
 * Function to log in a user using Google Auth and create a document
 * in the 'administrators' collection with an initial 'patients' document.
 */
export const loginUserWithGoogle = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      // Check if user document exists and create it if it doesn't
      await createAdminDocument(user.uid);
      return user;
    }

    return null;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

/**
 * Function to create the user document in the 'administrators' collection.
 * Includes a subcollection 'patients' with an initialization document.
 */
const createAdminDocument = async (userId: string) => {
  try {
    const userDocRef = doc(db, "administrators", userId);
    const initDocRef = doc(userDocRef, "patients", "init");

    // Create initialization document to avoid accidental deletion of the 'patients' collection
    await setDoc(initDocRef, {
      initialized: true,
      timestamp: new Date(),
    });

    console.log("Initialization document created for user:", userId);
  } catch (error) {
    console.error("Error creating admin document:", error);
  }
};
