import React, { useState } from "react";
import styled from "styled-components";
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from "../../../public/assets";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;

  h2 {
    font-size: 1.2rem; 
    color: #1d267d;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #1d267d;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-align: center;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
`;

const Day = styled.div`
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  background-color: ${({ isToday, isSelected }) => (isToday ? "#1d267d" : isSelected ? "#b6d4f5" : "transparent")};
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? 'black' : '#ccc')}; 
  &:hover {
    background-color: #f0f0f0;
  }
`;

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DashboardCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
  
    const getFirstDayOfMonth = () => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  
    const handlePrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
  
    const handleNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
  
    const handlePrevYear = () => {
        setCurrentDate((prevDate) => {
          const newDate = new Date(prevDate);
          newDate.setFullYear(prevDate.getFullYear() - 1);
          return newDate;
        });
      };
    
    const handleNextYear = () => {
        setCurrentDate((prevDate) => {
          const newDate = new Date(prevDate);
          newDate.setFullYear(prevDate.getFullYear() + 1);
          return newDate;
        });
    };

    const handleDateClick = (date, isCurrentMonth) => {
        const newSelectedDate = (new Date(currentDate.getFullYear(), currentDate.getMonth(), date));
        setSelectedDate(newSelectedDate);

        if (!isCurrentMonth) {
            // If date is in the previous month
            if (date > 20) {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, date));
            }
            // If date is in the next month
            else if (date < 15) {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, date));
            }
        }
    };

    const renderDays = () => {
        const daysInCurrentMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        const firstDayOfMonth = getFirstDayOfMonth();
        const days = [];
      
        // Get days from the previous month to fill the empty spaces before the first day
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
      
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(
                <Day key={`prev-${i}`} isCurrentMonth={false} onClick={() => handleDateClick(daysInPrevMonth - i, false)}>
                    {daysInPrevMonth - i}
                </Day>
            );
        }
      
        // Get days in the current month
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const isToday = day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();
    
            const isSelected = selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentDate.getMonth() &&
                selectedDate?.getFullYear() === currentDate.getFullYear();
    
            days.push(
                <Day
                    key={`current-${day}`}
                    isToday={isToday}
                    isSelected={isSelected}
                    isCurrentMonth={true}
                    onClick={() => handleDateClick(day, true)}
                >
                    {day}
                </Day>
            );
        }
      
        // Fill remaining grid cells with next month's days
        const totalGridCells = 42; // 6 rows of 7 days
        const remainingCells = totalGridCells - days.length;
    
        for (let j = 1; j <= remainingCells; j++) {
            days.push(
                <Day key={`next-${j}`} isCurrentMonth={false} onClick={() => handleDateClick(j, false)}>
                    {j}
                </Day>
            );
        }
      
        return days;
    };    
  
    return (
      <CalendarContainer>
        <Header>
          <ArrowButton onClick={handlePrevYear}>
            <ChevronDoubleLeft/>
          </ArrowButton>

          <ArrowButton onClick={handlePrevMonth}>
            <ChevronLeft />
          </ArrowButton>

          <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>

          <ArrowButton onClick={handleNextMonth}>
            <ChevronRight />
          </ArrowButton>

          <ArrowButton onClick={handleNextYear}>
            <ChevronDoubleRight/>
          </ArrowButton>
          
        </Header>
        <DaysOfWeek>
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </DaysOfWeek>
        <DaysGrid>{renderDays()}</DaysGrid>
      </CalendarContainer>
    );
  };
  
  export default DashboardCalendar;