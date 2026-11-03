import HabitList from "@/components/Habits/HabitList/HabitList";
import DayProgress from "@/components/UI/DayProgress";
import SkeletonList from "@/components/UI/Skeleton";
import { useHabits } from "@/context/HabitsContext";
import { isHabitDoneOn, isHabitDueOn } from "@/lib/dates";

const DashboardHabitList = () => {
  const { habits, isLoading, toggleHabit } = useHabits();
  const today = new Date();

  if (isLoading) return <SkeletonList rows={2} />;

  const dueToday = habits.filter((habit) => isHabitDueOn(habit, today));
  const doneCount = dueToday.filter((habit) => isHabitDoneOn(habit, today)).length;

  return (
    <>
      <DayProgress done={doneCount} total={dueToday.length} />
      <HabitList
        habits={dueToday}
        date={today}
        onToggleHabit={toggleHabit}
        emptyMessage={habits.length === 0 ? "You haven't added any habits yet." : "Nothing due today. Enjoy!"}
        emptyEmoji={habits.length === 0 ? "🌱" : "🌴"}
      />
    </>
  );
};

export default DashboardHabitList;
