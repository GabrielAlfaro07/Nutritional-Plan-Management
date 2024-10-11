import { useEffect, useState } from "react";
import Panel from "../components/panels/Panel";
import {
  getTotalPatients,
  getPatientsWithUpcomingAppointments,
} from "../services/patientService";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase auth for login detection

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState<string | number>("-");
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    string | number
  >("-");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, set login status to true
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchDashboardData = async () => {
        try {
          // Fetch total patients count
          const totalPatientsCount = await getTotalPatients();
          setTotalPatients(totalPatientsCount);

          // Fetch patients with upcoming appointments
          const patientsWithAppointments =
            await getPatientsWithUpcomingAppointments();
          setUpcomingAppointments(patientsWithAppointments);
        } catch (error) {
          console.error("Error fetching dashboard data: ", error);
        }
      };

      fetchDashboardData(); // Fetch data after login
    }
  }, [isLoggedIn]); // Re-fetch data when login status changes

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-4/5 opacity-50 -z-10"
        style={{
          backgroundImage:
            "url(https://hospitalcruzrojacordoba.es/wp-content/uploads/2019/05/Alimentacion-saludable-contra-la-obesidad.jpg.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
        {/* Content Container */}
        <div className="w-full max-w-4xl mt-40">
          {/* Titles */}
          <h1
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase",
            }}
            className="text-6xl font-semibold text-darkBlue mb-6 text-left"
          >
            Welcome to the Admin Panel
          </h1>
          <p
            style={{ fontFamily: "Comfortaa" }}
            className="text-2xl text-mediumBlue mb-10 text-left"
          >
            From here you can manage clients and the company's database.
          </p>

          {/* Responsive Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Panel title={totalPatients} content="Total patients" />{" "}
            <Panel title="-" content="Active plans" />
            <Panel
              title={upcomingAppointments}
              content="Upcoming appointments"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
