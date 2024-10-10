interface DetailsItemProps {
  label: string;
  value: string | undefined;
}

const DetailsItem = ({ label, value }: DetailsItemProps) => {
  return (
    <div className="flex items-center w-full">
      {/* Label */}
      <label
        className="text-gray-700 text-base font-bold mr-2"
        style={{ fontFamily: "Comfortaa", width: "140px" }} // Matching the width of the label in TextInput
        htmlFor={label}
      >
        {label}:
      </label>
      {/* "Input-like" Display */}
      <div
        className="flex-grow p-2 border border-gray-300 rounded-full bg-gray-100"
        style={{ fontFamily: "Comfortaa" }}
      >
        {value || "N/A"}
      </div>
    </div>
  );
};

export default DetailsItem;
