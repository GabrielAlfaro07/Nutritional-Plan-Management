import React from "react";
import LogoutButton from "../buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";

const Profile: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return null; // If the user is not authenticated, return nothing
  }

  return (
    <div className="bg-darkBlue text-white p-6 rounded-3xl shadow-lg">
      <div className="flex flex-col items-center space-y-1">
        {/* User Picture or Fallback Icon */}
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-400 w-20 h-20 rounded-full"
            size="2x"
          />
        )}

        {/* User Name */}
        <h2
          className="pt-4 text-2xl font-semibold"
          style={{ fontFamily: "Comfortaa" }}
        >
          {user.displayName || "Username"}
        </h2>

        {/* User Email */}
        <p
          className="pb-4 text-lg text-gray-400"
          style={{ fontFamily: "Comfortaa" }}
        >
          {user.email || "user@example.com"}
        </p>

        {/* Logout Button */}
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
