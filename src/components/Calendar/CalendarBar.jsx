import React, { useState } from "react";
import { CalendarBarContainer, CalendarDaysContainer, NavigationButton, DayLabel, DateLabel, DayContainer, CalendarHeader } from "./CalendarStyles";
import { ChevronLeft, ChevronRight } from "../../../public/assets";

const CalendarBar = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today.getDay());

  
  const getCurrentWeekDates = (date) => {
    const startOfWeek = new Date(date);
    const dayOffset = startOfWeek.getDay() === 0 ? -6 : 1 - startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() + dayOffset);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(startOfWeek);
      nextDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(nextDate);
    }
    return weekDates;
  };

  const handleNavigation = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7); // Move by a week
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const handleDayClick = (index) => {
    setSelectedDay(index);
  }

  const currentWeekDates = getCurrentWeekDates(currentDate);
  
    return (
      <CalendarBarContainer>
        <CalendarHeader>
          <NavigationButton onClick={() => handleNavigation(-1)}>
            <ChevronLeft/>
          </NavigationButton>
          
          <CalendarDaysContainer>
            {days.map((day, index) => (
              <DayContainer
              key={index}
              isSelected={index === selectedDay} // Mark as selected if it’s the selected day
              onClick={() => handleDayClick(index)}
              >
                <DayLabel>{day}</DayLabel>
                <DateLabel>{currentWeekDates[index].getDate()}</DateLabel>
            </DayContainer>
            ))}
          </CalendarDaysContainer>

          <NavigationButton onClick={() => handleNavigation(1)}>
            <ChevronRight/>
          </NavigationButton>

        </CalendarHeader>

      </CalendarBarContainer>
    );
  };

export default CalendarBar;
