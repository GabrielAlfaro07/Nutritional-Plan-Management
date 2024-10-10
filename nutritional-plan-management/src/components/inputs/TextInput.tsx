import React from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
  type?: string;
}

const TextInput: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  readOnly,
  type = "text",
}) => (
  <div className="flex items-center mb-4 w-full">
    {" "}
    {/* Ensure full width */}
    <label
      className="text-gray-700 text-base font-bold mr-2"
      style={{ fontFamily: "Comfortaa", width: "140px" }} // Set a fixed width
      htmlFor={name}
    >
      {label}:
    </label>
    <input
      className="flex-grow p-2 border border-gray-300 rounded-full"
      style={{ fontFamily: "Comfortaa" }}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      id={name} // Associate label with input
    />
  </div>
);

export default TextInput;
