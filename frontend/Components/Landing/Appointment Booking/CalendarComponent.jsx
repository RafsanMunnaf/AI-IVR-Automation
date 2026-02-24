import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const CalendarComponent = ({ onDateSelect, selectedDate }) => {
  const date = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), date.getDate())
  );

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onDateSelect(clickedDate);
  };

  const days = [];
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const prevMonthDays = getDaysInMonth(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  );

  // Previous month days
  for (let i = firstDay; i > 0; i--) {
    days.push({
      day: prevMonthDays - i + 1,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  // Next month days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
    });
  }

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="backdrop-blur-xl border-2 border-blue-400/40 rounded-3xl p-6 shadow-2xl">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Select Date</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 flex items-center justify-center transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 flex items-center justify-center transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Month/Year */}
      <div className="mb-6">
        <p className="text-blue-200 text-sm font-medium">{monthYear}</p>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className="text-center text-blue-200 text-sm w-10 font-semibold"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((dayObj, idx) => {
          const isSelected =
            selectedDate &&
            dayObj.isCurrentMonth &&
            dayObj.day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear();

          return (
            <button
              key={idx}
              onClick={() =>
                dayObj.isCurrentMonth && handleDateClick(dayObj.day)
              }
              className={`
                h-10 w-10 rounded-full font-medium transition-all duration-200 text-sm
                ${
                  !dayObj.isCurrentMonth
                    ? "text-blue-400/40 cursor-default"
                    : isSelected
                    ? "bg-white text-blue-900 font-bold shadow-lg scale-110"
                    : "text-white hover:bg-blue-600/40"
                }
              `}
              disabled={!dayObj.isCurrentMonth}
            >
              {dayObj.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarComponent;
