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
      className="text-white p-2 rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out"
    >
      <FontAwesomeIcon icon={faBars} size="lg" />
    </button>
  );
};

export default SidebarButton;
