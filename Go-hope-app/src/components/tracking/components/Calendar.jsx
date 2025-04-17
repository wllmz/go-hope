import React from "react";
import { Box, styled } from "@mui/material";
import { format, startOfWeek, addDays, isAfter, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CalendarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "16px",
});

const Header = styled(Box)({
  padding: "0 8px",
});

const MonthText = styled(Box)({
  fontSize: "20px",
  fontWeight: 500,
  color: "#333",
  textAlign: "center",
});

const DaysWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const NavigationButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  cursor: "pointer",
  color: "#666",
  "&:hover": {
    opacity: 0.7,
  },
});

const DaysContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  overflowX: "hidden",
  padding: "4px 0",
});

const DayButton = styled(Box)(({ isSelected, isFuture }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "40px",
  height: "70px",
  borderRadius: "20px",
  cursor: isFuture ? "not-allowed" : "pointer",
  backgroundColor: isSelected ? "#FFA726" : "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
  padding: "8px 0",
  opacity: isFuture ? 0.5 : 1,
}));

const DayNumber = styled(Box)(({ isSelected, isFuture }) => ({
  fontSize: "16px",
  fontWeight: 500,
  color: isFuture ? "#999" : isSelected ? "#fff" : "#333",
  marginBottom: "2px",
}));

const DayName = styled(Box)(({ isSelected, isFuture }) => ({
  fontSize: "12px",
  color: isFuture ? "#999" : isSelected ? "#fff" : "#666",
  marginBottom: "auto",
}));

const DataIndicator = styled(Box)({
  fontSize: "20px",
  marginTop: "4px",
});

const Calendar = ({ selectedDate, onDateSelect, datesWithData = [] }) => {
  const [currentWeekStart, setCurrentWeekStart] = React.useState(
    startOfWeek(selectedDate || new Date(), { weekStartsOn: 1 })
  );

  const dates = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const handlePrevious = () => {
    setCurrentWeekStart((prevDate) => addDays(prevDate, -7));
  };

  const handleNext = () => {
    setCurrentWeekStart((prevDate) => addDays(prevDate, 7));
  };

  return (
    <CalendarContainer>
      <Header>
        <MonthText>
          {format(currentWeekStart, "MMMM yyyy", { locale: fr })}
        </MonthText>
      </Header>

      <DaysWrapper>
        <NavigationButton onClick={handlePrevious}>
          <ChevronLeft />
        </NavigationButton>

        <DaysContainer>
          {dates.map((date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const isSelected =
              selectedDate &&
              format(selectedDate, "yyyy-MM-dd") === formattedDate;
            const hasData = datesWithData.includes(formattedDate);
            const isFuture = isAfter(startOfDay(date), startOfDay(new Date()));

            return (
              <DayButton
                key={formattedDate}
                isSelected={isSelected}
                isFuture={isFuture}
                onClick={() => !isFuture && onDateSelect(date)}
              >
                <DayNumber isSelected={isSelected} isFuture={isFuture}>
                  {format(date, "d")}
                </DayNumber>
                <DayName isSelected={isSelected} isFuture={isFuture}>
                  {format(date, "EEE", { locale: fr })}
                </DayName>
                {hasData && !isFuture && <DataIndicator>🤔</DataIndicator>}
              </DayButton>
            );
          })}
        </DaysContainer>

        <NavigationButton onClick={handleNext}>
          <ChevronRight />
        </NavigationButton>
      </DaysWrapper>
    </CalendarContainer>
  );
};

export default Calendar;
