import React from "react";

interface ExchangeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const ExchangeInput: React.FC<ExchangeInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full my-2 py-2 px-4 border rounded-full"
      style={{
        fontFamily: "Comfortaa",
      }}
    />
  );
};

export default ExchangeInput;
