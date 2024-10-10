import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export interface PatientData {
  name: string;
  lastname: string; // Only one last name
  birthdate: string;
  startDate: string;
  goal: string;
  email: string;
  phoneNumber: string;
  password: string;
  nextAppointment: string;
}

// Updated password generation without lastname2
const generatePassword = (lastname: string, birthdate: string): string => {
  const lastnamePart = lastname.substring(0, 4).toLowerCase();
  const birthdateObj = new Date(birthdate);
  const month = (birthdateObj.getMonth() + 1).toString().padStart(2, "0");
  return lastnamePart + month;
};

// Create a new patient (with one last name)
export const addPatient = async (
  name: string,
  lastname: string,
  birthdate: string,
  startDate: string,
  goal: string,
  email: string,
  phoneNumber: string,
  nextAppointment: string
) => {
  try {
    const generatedPassword = generatePassword(lastname, birthdate);

    const docRef = await addDoc(collection(db, "patients"), {
      name,
      lastname,
      birthdate,
      startDate,
      goal,
      email,
      phoneNumber,
      password: generatedPassword,
      nextAppointment,
    });

    const patientId = docRef.id;
    return patientId;
  } catch (error) {
    console.error("Error creating patient: ", error);
    throw new Error("Failed to create patient.");
  }
};

// Fetch patient details
export const getPatientDetails = async (patientId: string) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    const patientSnapshot = await getDoc(patientRef);

    if (patientSnapshot.exists()) {
      const patientData = patientSnapshot.data();

      return patientData;
    } else {
      console.log("No patient found with the given ID.");
    }
  } catch (error) {
    console.error("Error fetching patient details: ", error);
    throw new Error("Failed to fetch patient details.");
  }
};

// Change Password
export const changePassword = async (
  patientId: string,
  newPassword: string
) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await updateDoc(patientRef, {
      password: newPassword,
    });
    console.log("Password successfully updated");
  } catch (error) {
    console.error("Error updating password: ", error);
    throw new Error("Failed to update password.");
  }
};

// Delete a patient
export const deletePatient = async (patientId: string) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await deleteDoc(patientRef);
  } catch (error) {
    console.error("Error deleting patient: ", error);
    throw new Error("Failed to delete patient.");
  }
};

// Fetch all patients
export const getPatients = async () => {
  try {
    const patientsCollectionRef = collection(db, "patients");
    const patientsSnapshot = await getDocs(patientsCollectionRef);

    const patientsList = patientsSnapshot.docs.map((patientDoc) => ({
      id: patientDoc.id,
      data: patientDoc.data() as PatientData,
    }));

    console.log("Patients list:", patientsList);
    return patientsList;
  } catch (error) {
    console.error("Error fetching patients: ", error);
    throw new Error("Failed to fetch patients.");
  }
};

// Edit patient data (all fields)
export const editPatient = async (
  patientId: string,
  name: string,
  lastname: string,
  birthdate: string,
  startDate: string,
  goal: string,
  email: string,
  phoneNumber: string,
  nextAppointment: string
) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await updateDoc(patientRef, {
      name,
      lastname,
      birthdate,
      startDate,
      goal,
      email,
      phoneNumber,
      nextAppointment,
    });
    console.log("Patient successfully updated");
  } catch (error) {
    console.error("Error updating patient:", error);
    throw new Error("Failed to update patient.");
  }
};
