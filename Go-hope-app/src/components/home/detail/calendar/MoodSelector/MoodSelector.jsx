import React from "react";

const MoodSelector = ({ onSelect, isOpen, selectedDate }) => {
  const moods = ["😊", "😍", "🙂", "😐", "😕", "😢", "😡", "🐻"];

  if (!isOpen) return null;

  // Format date to display
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = selectedDate.toLocaleDateString("fr-FR", options);

  return (
    <div className="absolute left-0 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-20">
      <h3 className="text-sm font-medium mb-2">
        Comment vous sentez-vous le {formattedDate} ?
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {moods.map((mood, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 transition-colors duration-200"
            onClick={() => onSelect(mood)}
          >
            <span className="text-xl">{mood}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
