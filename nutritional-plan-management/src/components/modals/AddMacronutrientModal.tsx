import React, { useState } from "react";
import ModalCancelButton from "../buttons/ModalCancelButton";
import AddMacronutrientButton from "../buttons/AddMacronutrientButton";
import ModalInput from "../inputs/ModalInput"; // Import the new ModalInput component

interface AddMacronutrientModalProps {
  onCancel: () => void;
  onAdd: (category: string) => void;
}

const AddMacronutrientModal: React.FC<AddMacronutrientModalProps> = ({
  onCancel,
  onAdd,
}) => {
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    onAdd(category);
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-3xl shadow-md w-80">
        <h3
          className="text-2xl font-semibold mb-4"
          style={{
            fontFamily: "Designer, Comfortaa",
            textTransform: "uppercase",
          }}
        >
          Add new exchange
        </h3>
        <ModalInput // Use ModalInput here
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Macronutrient Name"
        />
        <div className="flex justify-end space-x-2">
          <ModalCancelButton onClick={onCancel} />
          <AddMacronutrientButton onClick={handleAdd} />
        </div>
      </div>
    </div>
  );
};

export default AddMacronutrientModal;
