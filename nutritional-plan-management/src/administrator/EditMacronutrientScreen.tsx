// screens/EditMacronutrientScreen.tsx
import React from "react";
import { useParams } from "react-router-dom";
import EditFoodExchangeContainer from "../components/containers/EditFoodExchangeContainer";

const EditMacronutrientScreen: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  console.log(categoryId);

  return <EditFoodExchangeContainer categoryId={categoryId || ""} />;
};

export default EditMacronutrientScreen;
