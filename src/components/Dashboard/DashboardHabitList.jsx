import HabitList from "@/components/Habits/HabitList/HabitList";
import { MutedText } from "@/components/UI/UI";
import { useHabits } from "@/context/HabitsContext";
import { isHabitDoneOn, isHabitDueOn } from "@/lib/dates";
import { Progress } from "./DashboardStyles";

const DashboardHabitList = () => {
  const { habits, isLoading, toggleHabit } = useHabits();
  const today = new Date();

  if (isLoading) return <MutedText>Loading…</MutedText>;

  const dueToday = habits.filter((habit) => isHabitDueOn(habit, today));
  const doneCount = dueToday.filter((habit) => isHabitDoneOn(habit, today)).length;

  return (
    <>
      {dueToday.length > 0 && (
        <Progress>
          {doneCount} of {dueToday.length} done{doneCount === dueToday.length && " 🎉"}
        </Progress>
      )}
      <HabitList
        habits={dueToday}
        date={today}
        onToggleHabit={toggleHabit}
        emptyMessage={habits.length === 0 ? "You haven't added any habits yet." : "Nothing due today. Enjoy!"}
      />
    </>
  );
};

export default DashboardHabitList;
