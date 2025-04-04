import React, { useState, useEffect } from "react";
import ActionButton from "../ActionButton/ActionButton";

// Helper function to get dates for a week
const getWeekDates = (weekOffset = 0) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get the current day of the week (0-6, 0 is Sunday)
  const currentDay = today.getDay();

  // Calculate the date of the first day of the week (Monday)
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - currentDay + 1 + weekOffset * 7); // Start from Monday

  // Generate array of dates for the week
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    weekDates.push(date);
  }

  return weekDates;
};

// Helper function to get max number of weeks to display
const getMaxWeeks = () => {
  // For now, allow tracking mood for the last 12 weeks
  return 12;
};

// Simple week slider component
const WeekSlider = ({ currentWeek, totalWeeks, onChange }) => {
  return (
    <div className="flex items-center space-x-2 my-2">
      <input
        type="range"
        min="0"
        max={totalWeeks - 1}
        value={currentWeek - 1}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

// Composant pour l'interface de suivi détaillé
const DetailPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Mobilité");
  const [items, setItems] = useState([
    { id: 1, name: "Les mains", status: "Normal", emoji: "😊", progress: 100 },
    {
      id: 2,
      name: "Le bras gauche",
      status: "Pas so",
      emoji: "😐",
      progress: 50,
    },
    { id: 3, name: "La jambe gauche", status: "", emoji: "⚪", progress: 0 },
  ]);

  const tabs = ["Mobilité", "Sensorialité", "Humeurs", "Outils"];

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="flex mb-4 space-x-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === tab
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 text-sm">{item.name}</span>
              <span className="text-lg">{item.emoji}</span>
            </div>

            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-orange-500">{item.status}</span>
              <span className="text-xs text-gray-400">Normal</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-300 to-orange-400"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="flex justify-center mt-4">
        <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
          <span className="text-xl">+</span>
        </button>
      </div>
    </div>
  );
};

const TrackingCard = () => {
  // Track the current week offset (0 = current week, -1 = last week, etc.)
  const [weekOffset, setWeekOffset] = useState(0);
  const maxWeeks = getMaxWeeks();

  // Track the week dates and mood data
  const [weekDates, setWeekDates] = useState([]);
  const [moodData, setMoodData] = useState({
    // Initial dummy data to match the image
    "2023-04-11": { emoji: "🐻" },
    "2023-04-12": { emoji: "🐻" },
    "2023-04-13": { emoji: "🐻" },
    "2023-04-14": { emoji: "🐻" },
    "2023-04-15": { emoji: "❓" },
  });

  // UI state
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [userImage, setUserImage] = useState("/images/profile.jpg"); // Default image

  // Initialize week dates when component loads or week offset changes
  useEffect(() => {
    const dates = getWeekDates(weekOffset);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create the data structure for the week
    const weekData = dates.map((date) => {
      const dateString = date.toISOString().split("T")[0];
      const isFuture = date > today;
      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      // Si le jour est sélectionné et que le panneau est ouvert, afficher une croix au lieu du point d'interrogation
      let displayEmoji = isFuture ? "" : moodData[dateString]?.emoji || "❓";
      if (isSelected && showDetailPanel && displayEmoji === "❓") {
        displayEmoji = "✖️";
      }

      return {
        date,
        emoji: displayEmoji,
        originalEmoji: isFuture ? "" : moodData[dateString]?.emoji || "❓",
        isFuture,
        isToday,
        isSelected,
      };
    });

    setWeekDates(weekData);
  }, [weekOffset, moodData, selectedDate, showDetailPanel]);

  const handleDayClick = (day) => {
    if (day.isFuture) return; // Ne rien faire pour les jours futurs

    // Si c'est déjà le jour sélectionné et qu'il a une croix (le panneau est ouvert), fermer le panneau
    if (
      selectedDate &&
      day.date.toDateString() === selectedDate.toDateString() &&
      day.emoji === "✖️"
    ) {
      setShowDetailPanel(false);
      setSelectedDate(null);
      return;
    }

    setSelectedDate(day.date);

    // Si l'emoji est un point d'interrogation, ouvrir le panneau de détail
    if (day.originalEmoji === "❓") {
      setShowDetailPanel(true);
    }
  };

  const handleShowHistory = () => {
    // Trouver le jour d'aujourd'hui dans les données
    const today = weekDates.find((day) => day.isToday);
    if (today) {
      setSelectedDate(today.date);
      setShowDetailPanel(true);
    }
  };

  const handleWeekChange = (direction) => {
    // Can't go forward beyond current week
    if (direction > 0 && weekOffset >= 0) return;

    // Can't go back more than maxWeeks
    if (direction < 0 && weekOffset <= -maxWeeks + 1) return;

    setWeekOffset((prev) => prev + direction);
  };

  const handleSliderChange = (value) => {
    // Convert slider value (0 to maxWeeks-1) to week offset (0 to -maxWeeks+1)
    setWeekOffset(-(maxWeeks - 1) + value);
  };

  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedDate(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-blue-50 rounded-xl shadow-sm p-4 relative overflow-hidden">
        <div className="relative z-10">
          {/* Header with title */}
          <div className="flex items-center mb-2">
            <div className="ml-2">
              <h1 className="text-lg font-medium text-blue-800">Mon suivi</h1>
              <p className="text-blue-600 text-xs">Votre ressenti du jour</p>
            </div>
          </div>

          {/* Calendar navigation */}
          <div className="flex items-center justify-between mb-4 px-2">
            <button
              className="text-blue-500 w-8 h-8 flex items-center justify-center"
              onClick={() => handleWeekChange(-1)}
            >
              <span className="text-xl">&lt;</span>
            </button>

            <div className="flex justify-center space-x-4">
              {weekDates.map((day, index) => {
                const dayNumber = day.date.getDate();
                const shortDay = [
                  "Dim",
                  "Lun",
                  "Mar",
                  "Mer",
                  "Jeu",
                  "Ven",
                  "Sam",
                ][day.date.getDay()];

                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-blue-700 font-medium text-sm">
                      {dayNumber}
                    </div>
                    <div className="text-xs text-blue-500 mb-1">{shortDay}</div>
                    <div
                      className={`w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm 
                        ${
                          !day.isFuture
                            ? "cursor-pointer hover:bg-blue-100"
                            : ""
                        }
                        ${
                          day.isSelected && showDetailPanel ? "bg-gray-200" : ""
                        }`}
                      onClick={() => handleDayClick(day)}
                    >
                      <span
                        className={`text-sm ${
                          day.emoji === "✖️" ? "text-red-500" : ""
                        }`}
                      >
                        {day.emoji}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="text-blue-500 w-8 h-8 flex items-center justify-center"
              onClick={() => handleWeekChange(1)}
            >
              <span className="text-xl">&gt;</span>
            </button>
          </div>

          {/* Detail panel */}
          {showDetailPanel && <DetailPanel onClose={handleCloseDetailPanel} />}

          {/* Action button */}
          {!showDetailPanel && (
            <div className="mt-2">
              <ActionButton
                text="Accéder à mon historique"
                onClick={handleShowHistory}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingCard;
