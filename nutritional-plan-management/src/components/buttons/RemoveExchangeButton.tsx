// components/buttons/RemoveExchangeButton.tsx
import React from "react";

interface RemoveExchangeButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const RemoveExchangeButton: React.FC<RemoveExchangeButtonProps> = ({
  onClick,
  disabled,
}) => (
  <button
    className={`text-base py-2 px-4 rounded-full transition duration-300 ease-in-out ${
      disabled
        ? "bg-gray-400 text-white cursor-not-allowed" // Gray background and disabled cursor when disabled
        : "bg-mediumBlue hover:bg-lightBlue text-white" // Original styles when not disabled
    }`}
    style={{ fontFamily: "Comfortaa" }}
    onClick={onClick}
    disabled={disabled}
  >
    Remove Last Exchange
  </button>
);

export default RemoveExchangeButton;
