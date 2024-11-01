import React, { useState } from "react";

interface NoteProps {
  onChange: (content: string) => void;
}

const Note: React.FC<NoteProps> = ({ onChange }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent); // Pass only content
  };

  return (
    <div className="mt-2">
      <h2
        className="text-lg font-bold mb-2"
        style={{ fontFamily: "Comfortaa" }}
      >
        Notes:
      </h2>
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full h-32 p-2 border border-gray-200 rounded-xl focus:outline-none bg-white"
        style={{ fontFamily: "Comfortaa" }}
      />
    </div>
  );
};

export default Note;
