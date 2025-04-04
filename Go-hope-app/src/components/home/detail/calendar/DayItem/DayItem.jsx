import React from "react";

const DayItem = ({ date, active, emoji, onClick, disabled }) => {
  // Format date to get day number
  const dayNumber = date.getDate();

  // Get day name in French (short version)
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const dayName = days[date.getDay()];

  // Check if the date is today
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className="flex flex-col items-center mx-1">
      <div className="text-sm text-gray-500 mb-1">{dayNumber}</div>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full
          ${active ? "bg-blue-100" : "bg-gray-100"} 
          ${isToday ? "ring-2 ring-blue-400" : ""}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-blue-200"
          }
          transition-colors duration-200`}
        onClick={disabled ? undefined : onClick}
      >
        {emoji ? (
          <span>{emoji}</span>
        ) : (
          <span className="text-blue-500">?</span>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1">{dayName}</div>
    </div>
  );
};

export default DayItem;
