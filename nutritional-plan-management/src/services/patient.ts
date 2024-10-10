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
const generatePassword = (lastname1: string, birthdate: string): string => {
  const lastname1Part = lastname1.substring(0, 4).toLowerCase();
  const fechaNacimiento = new Date(birthdate);
  const mes = (fechaNacimiento.getMonth() + 1).toString().padStart(2, "0");
  return lastname1Part + mes;
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
    const Gpassword = generatePassword(lastname, birthdate);

    const docRef = await addDoc(collection(db, "patients"), {
      name,
      lastname,
      birthdate,
      startDate,
      goal,
      email,
      phoneNumber,
      password: Gpassword,
      nextAppointment,
    });

    const patientId = docRef.id;
    return patientId;
  } catch (error) {
    console.error("Error creating patient: ", error);
    throw new Error("Failed to create patient.");
  }
};

//Info patient
export const GetPatientDetails = async (patientId: string) => {
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

//Change Password
export const ChangePassword = async (
  patientId: string,
  newPassword: string
) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await updateDoc(patientRef, {
      password: newPassword, // Actualizar solo la contraseña
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

    console.log("Patients list:", patientsList); // Verificar la lista antes de devolver
    return patientsList;
  } catch (error) {
    console.error("Error fetching patients: ", error);
    throw new Error("Failed to fetch patients.");
  }
};

//Update age, telefono, email, objetivo

export const UpdatePatient = async (
  patientId: string,
  newcellphonenumber: string,
  newmail: string,
  newgoal: string
) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await updateDoc(patientRef, {
      phoneNumber: newcellphonenumber,
      goal: newgoal,
      email: newmail,
    });
    console.log("Info successfully updated");
  } catch (error) {
    console.error("Error updating info: ", error);
    throw new Error("Failed to update info.");
  }
};
