import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface HeaderItem {
  title: string;
  icon: IconDefinition;
}

const ListHeader: React.FC<{ headers: HeaderItem[] }> = ({ headers }) => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-gray-200 py-3 px-4 mb-4 rounded-full text-gray-600 font-extrabold">
      {headers.map((header, index) => (
        <div
          key={index}
          className="col-span-1 flex items-center"
          style={{ fontFamily: "Comfortaa" }}
        >
          <FontAwesomeIcon icon={header.icon} className="mr-2" />
          {header.title}
        </div>
      ))}
    </div>
  );
};

export default ListHeader;
