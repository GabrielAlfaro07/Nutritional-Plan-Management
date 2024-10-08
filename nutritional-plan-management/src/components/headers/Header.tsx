import React from "react";
import SidebarButton from "../buttons/SidebarButton";
import LogoutButton from "../LogoutButton";

const Header: React.FC = () => {
  const handleSidebarToggle = () => {
    console.log("Sidebar toggled");
    // Logic for opening/closing the sidebar will go here in the future
  };

  return (
    <header className="flex items-center justify-between h-16 p-4 bg-gray-800 border-b border-gray-600 relative">
      {/* Sidebar Button (Left-aligned) */}
      <div className="absolute left-4">
        <SidebarButton onClick={handleSidebarToggle} />
      </div>

      {/* App Name (Centered) */}
      <div className="flex-1 text-center absolute inset-x-0">
        <h1 className="text-lg text-white">
          Nutritional Plan Management System
        </h1>
      </div>

      {/* Logout Button (Right-aligned) */}
      <div className="absolute right-4">
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
