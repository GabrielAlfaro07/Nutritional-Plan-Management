// components/forms/FoodExchangesForm.tsx
import React from "react";
import TextInput from "../inputs/TextInput";
import ExchangeInput from "../inputs/ExchangeInput";

interface FoodExchangesFormProps {
  category: string;
  exchanges: string[];
  onCategoryChange: (value: string) => void;
  onExchangeChange: (index: number, value: string) => void;
}

const FoodExchangesForm: React.FC<FoodExchangesFormProps> = ({
  category,
  exchanges,
  onCategoryChange,
  onExchangeChange,
}) => {
  return (
    <div>
      {/* Category Name Input */}
      <TextInput
        label="Name"
        name="macronutrientName"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        readOnly={false}
      />

      {/* Exchanges Section */}
      <label
        className="text-gray-700 text-base font-bold mr-2"
        style={{ fontFamily: "Comfortaa", width: "140px" }}
      >
        Exchanges:
      </label>
      {exchanges.map((exchange, index) => (
        <ExchangeInput
          key={index}
          value={exchange}
          onChange={(e) => onExchangeChange(index, e.target.value)}
          placeholder="Enter an exchange"
        />
      ))}
    </div>
  );
};

export default FoodExchangesForm;
