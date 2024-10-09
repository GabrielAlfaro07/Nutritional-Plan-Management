// Sidebar.tsx
import React from "react";
import SidebarLink from "./SidebarLink"; // Import the SidebarLink component

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Add onClose prop to handle closing the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-16 left-0 w-64 bg-gray-800 h-full z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav className="flex flex-col p-4">
        <SidebarLink to="/" onClick={onClose}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/PatientsList" onClick={onClose}>
          Patients
        </SidebarLink>
        <SidebarLink to="/FoodExchanges" onClick={onClose}>
          Food Exchanges
        </SidebarLink>
      </nav>
    </div>
  );
};

export default Sidebar;
