import { useState, useEffect } from "react";
import {
  Buttons,
  CalendarApp,
  Days,
  NavigateDate,
  Weekdays,
  Wrapper,
} from "./styles";

export default function Calendar() {
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const monthsOfYear = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const [recycledDays, setRecycledDays] = useState([]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const isToday = (day) => {
    return (
      day === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    );
  };

  useEffect(() => {
    async function fetchRecycles() {
      try {
        const response = await fetch(
          "/../../../../../api/src/modules/auth/AuthController.ts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: "mockID", // to be added
              month: currentMonth,
              year: currentYear,
            }),
          }
        );
        const data = await response.json();

        setRecycledDays(data.days || []);
      } catch (error) {
        console.error("Failed to fetch calendar data", error);
      }
    }

    fetchRecycles();
  }, [currentMonth, currentYear]);

  return (
    <CalendarApp>
      <Wrapper>
        <h3 className="heading">Calendário</h3>
        <NavigateDate>
          <h4 className="month">{monthsOfYear[currentMonth]}</h4>
          <h4 className="year">{currentYear}</h4>
          <Buttons>
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </Buttons>
        </NavigateDate>
        <Weekdays>
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </Weekdays>
        <Days>
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}

          {[...Array(daysInMonth).keys()].map((day) => {
            const dayNumber = day + 1;

            // 4. Logic to determine classes
            const isRecycled = recycledDays.includes(dayNumber);
            const isCurrentDay = isToday(dayNumber);

            const className = `
                ${isCurrentDay ? "current-day" : ""} 
                ${isRecycled ? "recycled-day" : ""}
            `.trim();

            return (
              <span key={dayNumber} className={className}>
                {dayNumber}
              </span>
            );
          })}
        </Days>
      </Wrapper>
    </CalendarApp>
  );
}
