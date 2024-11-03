// MacronutrientContainer.tsx
import React from "react";
import MacronutrientDropdown from "../dropdowns/MacronutrientDropdown";

interface MacronutrientContainerProps {
  categories: { category: string; exchanges: string[] }[];
  onDelete: (category: string) => void;
  onEdit: (categoryId: string) => void; // Add onEdit prop
}

const MacronutrientContainer: React.FC<MacronutrientContainerProps> = ({
  categories,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <MacronutrientDropdown
          key={category.category}
          category={category.category}
          exchanges={category.exchanges}
          onDelete={onDelete}
          onEdit={onEdit} // Pass onEdit directly here
        />
      ))}
    </div>
  );
};

export default MacronutrientContainer;
