import React from "react";
import { Box, styled } from "@mui/material";
import { format, startOfWeek, addDays, isAfter, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CalendarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",

  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  "& @font-face": {
    fontFamily: "Confiteria",
    src: "url('/fonts/Confiteria-Script.ttf') format('truetype')",
  },
});

const DaysWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0px",
  width: "100%",
  justifyContent: "center",
});

const NavigationButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  cursor: "pointer",
  color: "#FFA726",
  padding: "",
  marginLeft: "-4px",
  marginRight: "-4px",
  "&:hover": {
    opacity: 0.8,
  },
  "& svg": {
    width: "24px",
    height: "24px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "48px",
    height: "48px",
    marginLeft: "-8px",
    marginRight: "-8px",
    "& svg": {
      width: "40px",
      height: "40px",
    },
  },
}));

const DaysContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "6px",
  overflowX: "hidden",
  padding: "4px 0",
  width: "100%",
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    gap: "12px",
    maxWidth: "calc(100% - 64px)",
    justifyContent: "center",
  },
}));

const DayButton = styled(Box)(({ theme, isSelected, isFuture }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "calc(14% - 2px)",
  height: "85px",
  borderRadius: "50px",
  cursor: isFuture ? "not-allowed" : "pointer",
  backgroundColor: "#FFF6ED",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  padding: "8px 0",
  opacity: isFuture ? 0.5 : 1,
  "&:hover": {
    transform: !isFuture ? "translateY(-2px)" : "none",
    boxShadow: !isFuture
      ? "0 4px 12px rgba(0,0,0,0.15)"
      : "0 2px 8px rgba(0,0,0,0.1)",
  },
  [theme.breakpoints.up("sm")]: {
    width: "65px",
    height: "140px",
    padding: "16px 0",
    justifyContent: "flex-start",
  },
}));

const DayNumber = styled(Box)(({ theme, isSelected, isFuture }) => ({
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "'Confiteria', cursive",
  color: isFuture ? "#999" : "#87BBDF",
  marginBottom: "2px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "26px",
    marginBottom: "8px",
  },
}));

const MonthName = styled(Box)(({ theme, isSelected, isFuture }) => ({
  fontSize: "12px",
  fontFamily: "'Confiteria', cursive",
  color: isFuture ? "#999" : "#87BBDF",
  textTransform: "lowercase",
  opacity: 0.9,
  [theme.breakpoints.up("sm")]: {
    fontSize: "20px",
  },
}));

const DataIndicator = styled(Box)(({ theme, hasData }) => ({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  marginTop: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#B3D7EC",
  color: "#FFF",
  fontSize: "12px",
  fontWeight: "bold",
  fontFamily: "'Confiteria', cursive",
  cursor: "pointer",
  aspectRatio: "1/1",
  [theme.breakpoints.up("sm")]: {
    width: "36px",
    height: "36px",
    marginTop: "10px",
    fontSize: "18px",
  },
}));

const Calendar = ({
  selectedDate,
  onDateSelect,
  datesWithData = [],
  currentWeekStart,
  onNextWeek,
  onPrevWeek,
  isLoading,
}) => {
  const dates = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const handlePrevious = () => {
    if (!isLoading) onPrevWeek?.();
  };

  const handleNext = () => {
    if (!isLoading) onNextWeek?.();
  };

  return (
    <CalendarContainer>
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
                onClick={() => !isFuture && !isLoading && onDateSelect(date)}
              >
                <DayNumber isSelected={isSelected} isFuture={isFuture}>
                  {format(date, "d")}
                </DayNumber>
                <MonthName isSelected={isSelected} isFuture={isFuture}>
                  {format(date, "MMM", { locale: fr }).replace(".", "")}
                </MonthName>
                <DataIndicator
                  hasData={hasData}
                  style={{ visibility: isFuture ? "hidden" : "visible" }}
                  onClick={(e) => {
                    if (isSelected && !isLoading) {
                      e.stopPropagation();
                      onDateSelect(null);
                    }
                  }}
                >
                  {isSelected ? "×" : hasData ? "✓" : "?"}
                </DataIndicator>
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
