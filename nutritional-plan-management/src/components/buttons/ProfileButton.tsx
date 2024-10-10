import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Profile from "../profile/Profile";

const ProfileButton: React.FC = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={handleProfileToggle}
        className="bg-gray-800 text-white px-3 py-2 rounded-full border border-white hover:bg-gray-700 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faUser} size="lg" />
      </button>

      {/* Toggle Profile Info */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-4">
          <Profile />
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
