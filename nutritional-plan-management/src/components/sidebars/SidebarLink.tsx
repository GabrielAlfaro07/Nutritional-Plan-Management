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
      onClick={onClick}
      className={`text-white text-lg mb-4 px-4 py-2 rounded-full transition duration-300 ease-in-out ${
        isActive ? "bg-darkOrange hover:bg-lightOrange" : ""
      } hover:bg-mediumBlue`}
      style={{ fontFamily: "Comfortaa" }}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
