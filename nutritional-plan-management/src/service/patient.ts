import { PatientData } from "../components/PatientForm";
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

// Función para generar una contraseña basada en apellido y mes de nacimiento
const generatePassword = (
  lastname1: string,
  lastname2: string,
  birthdate: string
): string => {
  // Asegurarse de que el apellido tenga al menos 2 letras
  const lastname1Part = lastname1.substring(0, 2).toLowerCase(); // Tomar las primeras dos letras del apellido
  const lastname2Part = lastname2.substring(0, 2).toLowerCase();

  const fechaNacimiento = new Date(birthdate);
  const mes = (fechaNacimiento.getMonth() + 1).toString().padStart(2, "0"); // Obtener el mes (añadir 1 porque getMonth() devuelve 0-11)

  // Concatenar la parte del apellido con el mes
  const password = lastname1Part + lastname2Part + mes;

  return password;
};

// Create a new patient
export const addPatient = async (
  name: string,
  lastname1: string,
  lastname2: string,
  age: number,
  birthdate: string,
  startdate: string,
  goal: string,
  mail: string,
  phoneNumber: string
) => {
  try {
    const Gpassword = generatePassword(lastname1, lastname2, birthdate);

    const docRef = await addDoc(collection(db, "patients"), {
      name,
      lastname1,
      lastname2,
      age,
      birthdate,
      startdate,
      goal,
      mail,
      phoneNumber,
      password: Gpassword,
    });

    const patientId = docRef.id;

    alert(`Patient successfully created your password is: ${patientId}`);
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
  newage: number,
  newmail: string,
  newgoal: string
) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await updateDoc(patientRef, {
      phoneNumber: newcellphonenumber,
      goal: newgoal,
      mail: newmail,
      age: newage,
    });
    console.log("Info successfully updated");
  } catch (error) {
    console.error("Error updating info: ", error);
    throw new Error("Failed to update info.");
  }
};
