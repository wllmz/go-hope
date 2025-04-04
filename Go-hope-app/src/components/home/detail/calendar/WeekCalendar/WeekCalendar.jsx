import React from "react";
import DayItem from "../DayItem/DayItem";

const WeekCalendar = ({ days, onDayClick, activeDate }) => {
  // Current date for comparison to disable future dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex justify-center my-4">
      {days.map((day, index) => {
        // Check if the date is in the future
        const isFuture = day.date > today;

        return (
          <DayItem
            key={index}
            date={day.date}
            active={
              activeDate &&
              day.date.toDateString() === activeDate.toDateString()
            }
            emoji={day.emoji}
            onClick={() => onDayClick(day.date)}
            disabled={isFuture}
          />
        );
      })}
    </div>
  );
};

export default WeekCalendar;
