// screens/FoodExchangesScreen.tsx
import React, { useEffect, useState } from "react";
import MacronutrientContainer from "../components/containers/MacronutrientContainer";
import AddNewMacronutrientButton from "../components/buttons/AddNewMacronutrientButton";
import AddMacronutrientModal from "../components/modals/AddMacronutrientModal";
import {
  fetchMacronutrientCategories,
  addMacronutrientCategory,
  removeMacronutrientCategory,
} from "../services/foodExchangesService";
import { MacronutrientCategory } from "../services/foodExchangesService";
import { getAuth } from "firebase/auth"; // Import getAuth

const FoodExchangesScreen: React.FC = () => {
  const [categories, setCategories] = useState<MacronutrientCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State to track authentication

  // Fetch data on mount
  useEffect(() => {
    const loadCategories = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setIsAuthenticated(false);
        setIsLoading(false); // Set loading to false since we don't need to load categories
        return; // Exit if not authenticated
      }

      const fetchedCategories = await fetchMacronutrientCategories();
      setCategories(fetchedCategories);
      setIsLoading(false);
    };

    loadCategories();
  }, []);

  // Open modal for adding a new macronutrient
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Add a new macronutrient category
  const handleAddCategory = async (category: string) => {
    await addMacronutrientCategory(category);
    const updatedCategories = await fetchMacronutrientCategories();
    setCategories(updatedCategories);
    setIsModalOpen(false);
  };

  const handleDeleteCategory = async (category: string) => {
    await removeMacronutrientCategory(category);
    const updatedCategories = await fetchMacronutrientCategories();
    setCategories(updatedCategories);
  };

  return (
    <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
      {/* Content Container */}
      <div className="w-full max-w-4xl mt-20">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-5xl font-semibold text-darkBlue"
            style={{
              fontFamily: "Designer, Comfortaa",
              textTransform: "uppercase",
            }}
          >
            Food Exchanges
          </h1>
        </div>

        {/* Categories List or Loading/Error Message */}
        {isLoading ? (
          <p>Loading...</p>
        ) : !isAuthenticated ? (
          <p
            className="text-gray-500 text-center"
            style={{
              fontFamily: "Comfortaa",
            }}
          >
            Please log in to view food exchanges.
          </p>
        ) : categories.length === 0 ? (
          <p
            className="text-gray-500 text-center"
            style={{
              fontFamily: "Comfortaa",
            }}
          >
            No food exchanges created
          </p>
        ) : (
          <MacronutrientContainer
            categories={categories}
            onDelete={handleDeleteCategory} // Pass onDelete function directly
          />
        )}
        <div className="flex justify-end mt-4">
          <AddNewMacronutrientButton onClick={handleOpenModal} />
        </div>
        {/* Add Macronutrient Modal */}
        {isModalOpen && (
          <AddMacronutrientModal
            onCancel={handleCloseModal}
            onAdd={handleAddCategory}
          />
        )}
      </div>
    </div>
  );
};

export default FoodExchangesScreen;
