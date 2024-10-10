// SidebarLink.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void; // Make onClick optional
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to; // Check if the current path matches the link's path

  return (
    <Link
      to={to}
      onClick={onClick} // Attach the onClick prop to the Link
      className={`text-white text-lg mb-4 px-4 py-2 rounded-full transition duration-100 ease-in-out ${
        isActive ? "bg-gray-700" : ""
      } hover:bg-gray-700`} // Apply bg-gray-700 for active state and on hover
      style={{ fontFamily: "Comfortaa" }}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
