import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface SidebarButtonProps {
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white px-3 py-2 rounded-full hover:bg-gray-700 transition duration-300 ease-in-out"
    >
      <FontAwesomeIcon icon={faBars} size="lg" />
    </button>
  );
};

export default SidebarButton;
