import React, { useState } from "react";
import SidebarButton from "../buttons/SidebarButton";
import Sidebar from "../sidebars/Sidebar";
import AuthButtons from "../buttons/AuthButtons";

const Header: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between h-16 p-4 bg-gray-800 border-b border-gray-600 fixed top-0 left-0 right-0 z-50">
        {/* Sidebar Button (Left-aligned) */}
        <div className="absolute left-4 z-10">
          <SidebarButton onClick={handleSidebarToggle} />
        </div>

        {/* App Name (Centered) */}
        <div className="flex-1 text-center">
          <h1
            className="text-2xl text-white"
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase", // Ensure the title is all caps
            }}
          >
            Nutritional Plan Management System
          </h1>
        </div>

        {/* Logout Button (Right-aligned) */}
        <div className="absolute right-4 z-10">
          <AuthButtons />
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </>
  );
};

export default Header;
