import React from "react";

interface ModalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const ModalInput: React.FC<ModalInputProps> = ({
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
      className="w-full mb-4 py-2 px-4 border rounded-full"
      style={{
        fontFamily: "Comfortaa",
      }}
    />
  );
};

export default ModalInput;
