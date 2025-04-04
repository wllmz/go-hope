import React, { useState } from "react";

// Day component for the calendar
const DayItem = ({ day, active, emoji }) => {
  return (
    <div className="flex flex-col items-center mx-1">
      <div className="text-sm text-gray-500 mb-1">{day}</div>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          active ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        {emoji ? (
          <span>{emoji}</span>
        ) : (
          <span className="text-blue-500">?</span>
        )}
      </div>
    </div>
  );
};

// Calendar component
const WeekCalendar = ({ days }) => {
  return (
    <div className="flex justify-center my-4">
      {days.map((day, index) => (
        <DayItem
          key={index}
          day={day.label}
          active={day.active}
          emoji={day.emoji}
        />
      ))}
    </div>
  );
};

// User profile header component
const ProfileHeader = ({ name, photoUrl }) => {
  return (
    <div className="flex items-center mb-2">
      <div className="w-12 h-12 rounded-full bg-yellow-100 overflow-hidden">
        {photoUrl && (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h1 className="text-xl font-medium text-blue-900 ml-3">{name}</h1>
    </div>
  );
};

// Button component
const ActionButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
    >
      {text}
    </button>
  );
};

// Main tracking card component
const TrackingCard = () => {
  const [days] = useState([
    { label: "11", day: "Jeu", emoji: "🐻", active: false },
    { label: "12", day: "Ven", emoji: "🐻", active: false },
    { label: "13", day: "Sam", emoji: "🐻", active: false },
    { label: "14", day: "Dim", emoji: "❓", active: true },
    { label: "15", day: "Lun", emoji: "", active: false },
    { label: "16", day: "Mar", emoji: "", active: false },
    { label: "17", day: "Mer", emoji: "", active: false },
  ]);

  const handleViewHistory = () => {
    console.log("Viewing history");
    // Add navigation or modal opening logic here
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-yellow-100 -translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100 rounded-tl-3xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <ProfileHeader name="Mon suivi" photoUrl="/api/placeholder/100/100" />

          {/* Subtitle */}
          <p className="text-gray-500 text-sm mb-4">Votre ressenti du jour</p>

          {/* Calendar navigation */}
          <div className="flex items-center justify-between mb-1">
            <button className="text-gray-400 hover:text-gray-600">
              <span className="text-xl">&lt;</span>
            </button>
            <WeekCalendar days={days} />
            <button className="text-gray-400 hover:text-gray-600">
              <span className="text-xl">&gt;</span>
            </button>
          </div>

          {/* Action button */}
          <div className="mt-6">
            <ActionButton
              text="Accéder à mon historique"
              onClick={handleViewHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component
const MoodTrackingApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <TrackingCard />
    </div>
  );
};

export default MoodTrackingApp;
