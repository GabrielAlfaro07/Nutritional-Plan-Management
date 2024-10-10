import React from "react";

interface PanelProps {
  title: string;
  content: string;
}

const Panel: React.FC<PanelProps> = ({ title, content }) => {
  return (
    <div className="bg-gray-800 rounded-3xl shadow-lg p-8 h-40 md:h-48">
      <h2
        style={{
          fontFamily: "Designer, Comfortaa",
          textTransform: "uppercase", // Ensure the title is all caps
        }}
        className="text-6xl font-bold text-white mb-4"
      >
        {title}
      </h2>
      <p style={{ fontFamily: "Comfortaa" }} className="text-2xl text-gray-300">
        {content}
      </p>
    </div>
  );
};

export default Panel;
