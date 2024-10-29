
import React, { useState } from 'react';

interface NoteProps {
  initialTitle: string;
  initialContent: string;
  onChange: (title: string, content: string) => void;
}

const Note: React.FC<NoteProps> = ({ initialTitle, initialContent, onChange }) => {
  const [content, setContent] = useState(initialContent);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onChange(initialTitle, newContent); // title is fixed, so we use initialTitle
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg">
      {/* El título es fijo, así que solo mostramos el valor sin permitir edición */}
      <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "Comfortaa" }}>
        {initialTitle}
      </h2>
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="w-full h-32 p-2 border border-gray-300 rounded focus:outline-none"
        style={{ fontFamily: "Comfortaa" }}
      />
    </div>
  );
};

export default Note;

