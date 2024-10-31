import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MacronutrientContainer from "../components/containers/MacronutrientContainer";
import AddNewMacronutrientButton from "../components/buttons/AddNewMacronutrientButton";
import {
  fetchMacronutrientCategories,
  removeMacronutrientCategory,
} from "../services/foodExchangesService";
import { MacronutrientCategory } from "../services/foodExchangesService";
import { getAuth } from "firebase/auth";

const FoodExchangesScreen: React.FC = () => {
  const [categories, setCategories] = useState<MacronutrientCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const fetchedCategories = await fetchMacronutrientCategories();
      setCategories(fetchedCategories);
      setIsLoading(false);
    };

    loadCategories();
  }, []);

  const handleDeleteCategory = async (category: string) => {
    await removeMacronutrientCategory(category);
    const updatedCategories = await fetchMacronutrientCategories();
    setCategories(updatedCategories);
    toast.success("Exchange deleted.");
  };

  const handleEditCategory = (categoryId: string) => {
    navigate(`/editMacronutrient/${categoryId}`); // Navigate to the edit screen with categoryId
  };

  return (
    <div className="relative flex flex-col items-center justify-start px-4 lg:px-0">
      <div className="w-full max-w-4xl mt-20">
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
            onDelete={handleDeleteCategory}
            onEdit={handleEditCategory} // Pass handleEditCategory to MacronutrientContainer
          />
        )}
        <div className="flex justify-end mt-4">
          {/* Redirect to the new AddMacronutrientScreen when clicked */}
          <AddNewMacronutrientButton
            onClick={() => navigate("/addMacronutrient")}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodExchangesScreen;
