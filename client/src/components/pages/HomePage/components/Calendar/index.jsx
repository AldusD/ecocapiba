import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import {
  Buttons,
  CalendarApp,
  Days,
  NavigateDate,
  Weekdays,
  Wrapper,
} from "./styles";

const API = import.meta.env.VITE_API_URL;

const Calendar = forwardRef((props, ref) => {
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

  const fetchRecycles = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("Token não encontrado para buscar calendário");
        return;
      }

      const response = await fetch(
        `${API}/recycle/calendar`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month: currentMonth,
            year: currentYear,
          }),
        }
      );

      if (!response.ok) {
        console.error("Erro ao buscar calendário:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      // A API retorna um array de números (dias do mês)
      if (data.days && Array.isArray(data.days)) {
        setRecycledDays(data.days);
      } else {
        setRecycledDays([]);
      }
    } catch (error) {
      console.error("Falha ao buscar data do calendário", error);
      setRecycledDays([]);
    }
  };

  // Expor função para atualizar o calendário
  useImperativeHandle(ref, () => ({
    refresh: fetchRecycles
  }));

  useEffect(() => {
    fetchRecycles();
  }, [currentMonth, currentYear, API]);

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
});

Calendar.displayName = 'Calendar';

export default Calendar;
