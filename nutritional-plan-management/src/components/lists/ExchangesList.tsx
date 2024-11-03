import React from "react";

interface ExchangesListProps {
  exchanges: string[];
}

const ExchangesList: React.FC<ExchangesListProps> = ({ exchanges }) => {
  return (
    <div className="border-b border-x border-gray-200 rounded-3xl p-4 mt-2">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {exchanges.map((exchange, index) => (
          <li
            key={index}
            className="text-base text-gray-700"
            style={{ fontFamily: "Comfortaa" }}
          >
            • {exchange}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangesList;
