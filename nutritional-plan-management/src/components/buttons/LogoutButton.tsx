import React from "react";
import { getAuth, signOut } from "firebase/auth";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Redirect to home or another page after logout if necessary
        window.location.href = window.location.origin;
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-700 text-lg text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
