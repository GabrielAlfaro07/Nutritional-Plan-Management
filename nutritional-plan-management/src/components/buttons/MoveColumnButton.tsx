import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface MoveColumnButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const MoveColumnButton: React.FC<MoveColumnButtonProps> = ({
  direction,
  onClick,
}) => {
  return (
    <button onClick={onClick}>
      {direction === "left" ? (
        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "grey" }} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} style={{ color: "grey" }} />
      )}
    </button>
  );
};

export default MoveColumnButton;
