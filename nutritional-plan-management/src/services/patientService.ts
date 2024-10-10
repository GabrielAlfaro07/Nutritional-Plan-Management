import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // To get the current user

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

// Generate password without lastname2
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

    const auth = getAuth();
    const user = auth.currentUser; // Get the currently logged-in user
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const patientsCollectionRef = collection(
      db,
      "administrators",
      userId,
      "patients"
    );

    const docRef = await addDoc(patientsCollectionRef, {
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
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const patientRef = doc(db, "administrators", userId, "patients", patientId);
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
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const patientRef = doc(db, "administrators", userId, "patients", patientId);
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
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const patientRef = doc(db, "administrators", userId, "patients", patientId);
    await deleteDoc(patientRef);
  } catch (error) {
    console.error("Error deleting patient: ", error);
    throw new Error("Failed to delete patient.");
  }
};

// Fetch all patients (excluding the "init" document)
export const getPatients = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const patientsCollectionRef = collection(
      db,
      "administrators",
      userId,
      "patients"
    );
    const patientsSnapshot = await getDocs(patientsCollectionRef);

    // Filter out the "init" document
    const patientsList = patientsSnapshot.docs
      .filter((doc) => doc.id !== "init") // Skip "init" document
      .map((patientDoc) => ({
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
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;
    const patientRef = doc(db, "administrators", userId, "patients", patientId);
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
    console.error("Error updating patient: ", error);
    throw new Error("Failed to update patient.");
  }
};

// Fetch total number of patients for the current user (excluding "init")
export const getTotalPatients = async (): Promise<number | string> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return "-"; // Return "-" if not authenticated
    }

    const userId = user.uid;
    const patientsCollectionRef = collection(
      db,
      "administrators",
      userId,
      "patients"
    );
    const patientsSnapshot = await getDocs(patientsCollectionRef);

    // Exclude the "init" document from the count
    const totalPatients = patientsSnapshot.docs.filter(
      (doc) => doc.id !== "init"
    ).length;

    return totalPatients; // Return the total count of patients
  } catch (error) {
    console.error("Error getting total number of patients: ", error);
    throw new Error("Failed to get total patients.");
  }
};

// Fetch the number of patients with appointments within the next week (excluding "init")
export const getPatientsWithUpcomingAppointments = async (): Promise<
  number | string
> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return "-"; // Return "-" if not authenticated
    }

    const userId = user.uid;
    const patientsCollectionRef = collection(
      db,
      "administrators",
      userId,
      "patients"
    );

    // Get the current date and one week later in "yyyy/mm/dd" format
    const currentDate = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(currentDate.getDate() + 7);

    // Format dates as "yyyy/mm/dd"
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedCurrentDate = formatDate(currentDate);
    const formattedOneWeekLater = formatDate(oneWeekLater);

    // Query patients with nextAppointment between current date and one week later
    const appointmentQuery = query(
      patientsCollectionRef,
      where("nextAppointment", ">=", formattedCurrentDate),
      where("nextAppointment", "<=", formattedOneWeekLater)
    );

    const appointmentsSnapshot = await getDocs(appointmentQuery);

    // Exclude the "init" document from the count
    const totalAppointments = appointmentsSnapshot.docs.filter(
      (doc) => doc.id !== "init"
    ).length;

    return totalAppointments; // Return the number of patients with upcoming appointments
  } catch (error) {
    console.error("Error getting patients with upcoming appointments: ", error);
    throw new Error("Failed to get patients with upcoming appointments.");
  }
};
