import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV  } from '@fortawesome/free-solid-svg-icons';



interface MoveButtonProps {
    direction: "left" | "right";
    onClick: () => void;
  }
  
  const MoveButton: React.FC<MoveButtonProps> = ({ direction, onClick }) => {
    return (
      <button
        onClick={onClick}
       
      >
        {direction === "left" ? <FontAwesomeIcon icon={faEllipsisV} style={{  color: 'grey' }}  /> : <FontAwesomeIcon icon={faEllipsisV} style={{  color: 'grey' }}  />}
      </button>
    );
  };
  
  export default MoveButton;