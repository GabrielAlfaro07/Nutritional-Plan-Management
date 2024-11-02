// containers/AddFoodExchangeContainer.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addMacronutrientCategory } from "../../services/foodExchangesService";
import AddExchangeButton from "../buttons/AddExchangeButton";
import RemoveExchangeButton from "../buttons/RemoveExchangeButton";
import AddMacronutrientButton from "../buttons/AddMacronutrientButton";
import CancelButton from "../buttons/CancelButton";
import FoodExchangesForm from "../forms/FoodExchangesForm";

const AddFoodExchangeContainer: React.FC = () => {
  const [category, setCategory] = useState("");
  const [exchanges, setExchanges] = useState<string[]>([""]);
  const navigate = useNavigate();

  // Handlers
  const handleAddExchange = () => setExchanges([...exchanges, ""]);
  const handleRemoveExchange = () => {
    if (exchanges.length > 1) setExchanges(exchanges.slice(0, -1));
  };
  const handleExchangeChange = (index: number, value: string) => {
    setExchanges(exchanges.map((ex, i) => (i === index ? value : ex)));
  };
  const handleAddCategory = async () => {
    if (!category) {
      toast.error("Please enter a category name.");
      return;
    }
    try {
      await addMacronutrientCategory(category, exchanges);
      toast.success("Macronutrient category and exchanges added!");
      navigate("/foodExchanges");
    } catch (error) {
      toast.error("Error adding category.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start lg:px-0">
      <div className="w-full max-w-5xl mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-5xl font-semibold text-darkBlue"
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase",
            }}
          >
            Add New Food Exchange
          </h1>
        </div>

        {/* Food Exchanges Form */}
        <FoodExchangesForm
          category={category}
          exchanges={exchanges}
          onCategoryChange={setCategory}
          onExchangeChange={handleExchangeChange}
        />

        {/* Buttons for Cancel and Add Category */}
        <div className="flex justify-between items-center mt-2">
          {/* Left side buttons */}
          <div className="flex space-x-2">
            <AddExchangeButton onClick={handleAddExchange} />
            <RemoveExchangeButton
              onClick={handleRemoveExchange}
              disabled={exchanges.length <= 1}
            />
          </div>

          {/* Right side buttons */}
          <div className="flex space-x-2">
            <CancelButton />
            <AddMacronutrientButton onClick={handleAddCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFoodExchangeContainer;
