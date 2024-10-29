import React from 'react';

interface CreatePlanButtonProps {
  onClick: () => void;
}

const CreatePlanButton: React.FC<CreatePlanButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Crear Plan
    </button>
  );
};

export default CreatePlanButton;
