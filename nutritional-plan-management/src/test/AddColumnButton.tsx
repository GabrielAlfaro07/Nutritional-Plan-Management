import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface AddColumnButtonProps {
  onClick: () => void;
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mr-2"
    >
      <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: "1.5em", color: "orange"  }} />
    </button>
  );
};

export default AddColumnButton;