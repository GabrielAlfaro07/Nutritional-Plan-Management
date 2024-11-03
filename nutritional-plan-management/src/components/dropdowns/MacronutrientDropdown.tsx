// MacronutrientDropdown.tsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ExchangesList from "../lists/ExchangesList";
import RemoveCurrentMacronutrientButton from "../buttons/RemoveCurrentMacronutrientButton";
import EditCurrentMacronutrientButton from "../buttons/EditCurrentMacronutrientButton"; // Import the edit button

interface MacronutrientDropdownProps {
  category: string;
  exchanges: string[];
  onDelete: (category: string) => void;
  onEdit: (categoryId: string) => void; // Add onEdit prop
}

const MacronutrientDropdown: React.FC<MacronutrientDropdownProps> = ({
  category,
  exchanges,
  onDelete,
  onEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <div
        onClick={toggleOpen}
        className="flex items-center cursor-pointer bg-darkOrange py-3 px-4 rounded-full text-white font-extrabold"
        style={{ fontFamily: "Comfortaa" }}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`mr-3 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
        <h3 className="text-lg font-semibold">{category}</h3>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ExchangesList exchanges={exchanges} />
        <div className="mt-2 flex justify-end space-x-2">
          <EditCurrentMacronutrientButton
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onEdit(category); // Use category as the ID
            }}
          />
          <RemoveCurrentMacronutrientButton
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete(category);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MacronutrientDropdown;
