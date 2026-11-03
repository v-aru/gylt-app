import { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import CalendarBar from "@/components/Calendar/CalendarBar";
import HabitList from "@/components/Habits/HabitList/HabitList";
import HabitForm from "@/components/Habits/HabitForm/HabitForm";
import WeeklyTracker from "@/components/Habits/WeeklyTracker/WeeklyTracker";
import Modal from "@/components/Modal/Modal";
import { CustomColorPicker } from "@/components/ColorPicker/ColorPicker";
import SignInPrompt from "@/components/UI/SignInPrompt";
import { Card, ErrorText, FloatingButton, MutedText, PageTitle, SectionTitle } from "@/components/UI/UI";
import { useHabits } from "@/context/HabitsContext";
import { formatDate, fromDateKey, isHabitDueOn, toDateKey } from "@/lib/dates";

const Sections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: 20px;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

export default function HabitsPage() {
  const { status } = useSession();
  const { habits, isLoading, error, create, update, remove, toggleHabit } = useHabits();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [colorFilter, setColorFilter] = useState(null);
  // null = closed, {} = creating, habit = editing
  const [formHabit, setFormHabit] = useState(null);

  if (status === "loading") return <MutedText>Loading…</MutedText>;
  if (status === "unauthenticated") return <SignInPrompt message="Sign in to create and track your habits." />;

  const visibleHabits = colorFilter ? habits.filter((habit) => habit.color === colorFilter) : habits;
  const dueHabits = visibleHabits.filter((habit) => isHabitDueOn(habit, selectedDate));
  const isFuture = fromDateKey(toDateKey(selectedDate)) > fromDateKey(toDateKey(new Date()));

  const handleSubmit = async (values) => {
    if (formHabit._id) await update(formHabit._id, values);
    else await create(values);
    setFormHabit(null);
  };

  const handleDelete = async () => {
    await remove(formHabit._id);
    setFormHabit(null);
  };

  return (
    <>
      <PageTitle>Habits</PageTitle>

      <CalendarBar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      <FilterRow>
        <strong>Filter by color:</strong>
        <CustomColorPicker selectedColor={colorFilter} onSelectColor={setColorFilter} allowNone />
      </FilterRow>

      {error && <ErrorText>{error}</ErrorText>}

      {isLoading ? (
        <MutedText>Loading your habits…</MutedText>
      ) : (
        <Sections>
          <Card>
            <SectionTitle>{formatDate(selectedDate)}</SectionTitle>
            {isFuture && dueHabits.length > 0 && <MutedText>You can tick these off on the day.</MutedText>}
            <HabitList
              habits={dueHabits}
              date={selectedDate}
              canCheck={!isFuture}
              onToggleHabit={toggleHabit}
              onEditHabit={setFormHabit}
              emptyMessage={habits.length === 0 ? "No habits yet. Add your first one!" : "Nothing due on this day."}
            />
          </Card>

          <Card>
            <SectionTitle>This week</SectionTitle>
            <WeeklyTracker habits={visibleHabits} date={selectedDate} />
          </Card>
        </Sections>
      )}

      <FloatingButton type="button" onClick={() => setFormHabit({})}>
        + Add Habit
      </FloatingButton>

      {formHabit && (
        <Modal title={formHabit._id ? "Edit habit" : "New habit"} onClose={() => setFormHabit(null)}>
          <HabitForm habit={formHabit} onSubmit={handleSubmit} onDelete={handleDelete} />
        </Modal>
      )}
    </>
  );
}
