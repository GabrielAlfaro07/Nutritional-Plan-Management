import React from "react";
import MacronutrientDropdown from "../dropdowns/MacronutrientDropdown";

interface MacronutrientContainerProps {
  categories: { category: string; exchanges: string[] }[];
  onDelete: (category: string) => void; // Make onDelete a prop of MacronutrientContainer
}

const MacronutrientContainer: React.FC<MacronutrientContainerProps> = ({
  categories,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <MacronutrientDropdown
          key={category.category}
          category={category.category}
          exchanges={category.exchanges}
          onDelete={onDelete} // Pass onDelete directly here
        />
      ))}
    </div>
  );
};

export default MacronutrientContainer;
