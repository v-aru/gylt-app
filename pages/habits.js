import { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import CalendarBar from "@/components/Calendar/CalendarBar";
import HabitList from "@/components/Habits/HabitList/HabitList";
import HabitForm from "@/components/Habits/HabitForm/HabitForm";
import WeeklyTracker from "@/components/Habits/WeeklyTracker/WeeklyTracker";
import Modal from "@/components/Modal/Modal";
import { CustomColorPicker } from "@/components/ColorPicker/ColorPicker";
import DayProgress from "@/components/UI/DayProgress";
import SignInPrompt from "@/components/UI/SignInPrompt";
import SkeletonList from "@/components/UI/Skeleton";
import { Card, ErrorText, FloatingButton, MutedText, PageTitle, SectionTitle } from "@/components/UI/UI";
import { useHabits } from "@/context/HabitsContext";
import { useToast } from "@/context/ToastContext";
import { formatDate, fromDateKey, isHabitDoneOn, isHabitDueOn, toDateKey } from "@/lib/dates";

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
  const showToast = useToast();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [colorFilter, setColorFilter] = useState(null);
  // null = closed, {} = creating, habit = editing
  const [formHabit, setFormHabit] = useState(null);

  if (status === "unauthenticated") return <SignInPrompt message="Sign in to create and track your habits." />;

  const visibleHabits = colorFilter ? habits.filter((habit) => habit.color === colorFilter) : habits;
  const dueHabits = visibleHabits.filter((habit) => isHabitDueOn(habit, selectedDate));
  const isFuture = fromDateKey(toDateKey(selectedDate)) > fromDateKey(toDateKey(new Date()));

  const handleSubmit = async (values) => {
    if (formHabit._id) {
      await update(formHabit._id, values);
      showToast("Changes saved");
    } else {
      await create(values);
      showToast(`\u201c${values.habitName}\u201d added`);
    }
    setFormHabit(null);
  };

  const handleDelete = async () => {
    const { _id, __v, userId, ...deleted } = formHabit;
    await remove(_id);
    setFormHabit(null);
    showToast(`\u201c${deleted.habitName}\u201d deleted`, {
      // Re-creates the habit with its history; it gets a new id.
      action: {
        label: "Undo",
        onClick: () => create(deleted).catch(() => showToast("Couldn't restore it", { tone: "error" })),
      },
    });
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

      {isLoading || status === "loading" ? (
        <Sections>
          <Card>
            <SkeletonList rows={3} />
          </Card>
          <Card>
            <SkeletonList rows={3} height={36} />
          </Card>
        </Sections>
      ) : (
        <Sections>
          <Card>
            <SectionTitle>{formatDate(selectedDate)}</SectionTitle>
            {isFuture ? (
              dueHabits.length > 0 && <MutedText>You can tick these off on the day.</MutedText>
            ) : (
              <DayProgress done={dueHabits.filter((habit) => isHabitDoneOn(habit, selectedDate)).length} total={dueHabits.length} />
            )}
            <HabitList
              habits={dueHabits}
              date={selectedDate}
              canCheck={!isFuture}
              onToggleHabit={toggleHabit}
              onEditHabit={setFormHabit}
              emptyMessage={habits.length === 0 ? "No habits yet. Small steps add up!" : "Nothing due on this day."}
              emptyEmoji={habits.length === 0 ? "🌱" : "🌤️"}
              emptyAction={habits.length === 0 ? { label: "Add your first habit", onClick: () => setFormHabit({}) } : undefined}
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
