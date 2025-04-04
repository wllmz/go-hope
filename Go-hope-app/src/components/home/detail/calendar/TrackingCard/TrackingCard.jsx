import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import WeekCalendar from "../WeekCalendar/WeekCalendar";
import ActionButton from "../ActionButton/ActionButton";
import MoodSelector from "../MoodSelector/MoodSelector";

const TrackingCard = () => {
  // Track the current week offset (0 = current week, -1 = last week, etc.)
  const [weekOffset, setWeekOffset] = useState(0);
  const maxWeeks = getMaxWeeks();

  // Track the week dates and mood data
  const [weekDates, setWeekDates] = useState([]);
  const [moodData, setMoodData] = useState({});

  // UI state
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMoodSelectorOpen, setIsMoodSelectorOpen] = useState(false);
  const [userImage, setUserImage] = useState("/api/placeholder/100/100");

  // Initialize week dates when component loads or week offset changes
  useEffect(() => {
    const dates = getWeekDates(weekOffset);

    // Create the data structure for the week
    const weekData = dates.map((date) => {
      const dateString = date.toISOString().split("T")[0];
      return {
        date,
        emoji: moodData[dateString]?.emoji || "",
        note: moodData[dateString]?.note || "",
      };
    });

    setWeekDates(weekData);

    // If current week, set today as selected date
    if (weekOffset === 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      setSelectedDate(today);
    } else {
      setSelectedDate(null);
    }
  }, [weekOffset, moodData]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsMoodSelectorOpen(true);
  };

  const handleMoodSelect = (mood) => {
    if (!selectedDate) return;

    const dateString = selectedDate.toISOString().split("T")[0];

    // Update the mood data
    setMoodData((prev) => ({
      ...prev,
      [dateString]: {
        ...prev[dateString],
        emoji: mood,
        date: selectedDate,
      },
    }));

    setIsMoodSelectorOpen(false);
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

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-yellow-100 -translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100 rounded-tl-3xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <ProfileHeader
            name="Mon suivi"
            photoUrl={userImage}
            onPhotoClick={() =>
              alert("Fonctionnalité: Changer votre photo de profil")
            }
          />

          {/* Subtitle */}
          <p className="text-gray-500 text-sm mb-4">Votre ressenti du jour</p>

          {/* Calendar navigation */}
          <div className="flex items-center justify-between mb-1">
            <button
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full"
              onClick={() => handleWeekChange(-1)}
            >
              <span className="text-xl">&lt;</span>
            </button>
            <WeekCalendar
              days={weekDates}
              onDayClick={handleDayClick}
              activeDate={selectedDate}
            />
            <button
              className={`text-gray-400 w-8 h-8 flex items-center justify-center rounded-full 
                ${
                  weekOffset < 0
                    ? "hover:text-gray-600 hover:bg-gray-100"
                    : "opacity-50 cursor-not-allowed"
                }`}
              onClick={() => handleWeekChange(1)}
              disabled={weekOffset >= 0}
            >
              <span className="text-xl">&gt;</span>
            </button>
          </div>

          {/* Week Slider */}
          <WeekSlider
            currentWeek={maxWeeks + weekOffset}
            totalWeeks={maxWeeks}
            onChange={handleSliderChange}
          />

          {/* Mood selector */}
          <div className="relative my-4">
            <MoodSelector
              isOpen={isMoodSelectorOpen}
              onSelect={handleMoodSelect}
              selectedDate={selectedDate}
            />
          </div>

          {/* Action button */}
          <div className="mt-6">
            <ActionButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingCard;
