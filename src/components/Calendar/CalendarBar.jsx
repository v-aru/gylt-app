import { CalendarBarContainer, CalendarDaysContainer, NavigationButton, DayLabel, DateLabel, DayContainer, CalendarHeader, MonthLabel, TodayButton } from "./CalendarStyles";
import { ChevronLeft, ChevronRight } from "@/components/Icons";
import { WEEKDAYS, addDays, isSameDay, weekOf } from "@/lib/dates";

const CalendarBar = ({ selectedDate, onSelectDate }) => {
  const today = new Date();
  const weekDates = weekOf(selectedDate);

  return (
    <CalendarBarContainer>
      <MonthLabel>
        {selectedDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        {!isSameDay(selectedDate, today) && (
          <TodayButton type="button" onClick={() => onSelectDate(today)}>
            Today
          </TodayButton>
        )}
      </MonthLabel>
      <CalendarHeader>
        <NavigationButton type="button" aria-label="Previous week" onClick={() => onSelectDate(addDays(selectedDate, -7))}>
          <ChevronLeft />
        </NavigationButton>

        <CalendarDaysContainer>
          {weekDates.map((date, index) => (
            <DayContainer
              key={date.toDateString()}
              type="button"
              aria-label={date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
              aria-pressed={isSameDay(date, selectedDate)}
              $isSelected={isSameDay(date, selectedDate)}
              $isToday={isSameDay(date, today)}
              onClick={() => onSelectDate(date)}
            >
              <DayLabel>{WEEKDAYS[index]}</DayLabel>
              <DateLabel>{date.getDate()}</DateLabel>
            </DayContainer>
          ))}
        </CalendarDaysContainer>

        <NavigationButton type="button" aria-label="Next week" onClick={() => onSelectDate(addDays(selectedDate, 7))}>
          <ChevronRight />
        </NavigationButton>
      </CalendarHeader>
    </CalendarBarContainer>
  );
};

export default CalendarBar;
