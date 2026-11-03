import createResourceContext from "./createResourceContext";
import { toDateKey } from "@/lib/dates";

const [HabitsProvider, useHabitsResource] = createResourceContext("/api/habits");

export { HabitsProvider };

export function useHabits() {
  const { items: habits, update, ...rest } = useHabitsResource();

  const toggleHabit = (habit, date) => {
    const key = toDateKey(date);
    const completedDates = habit.completedDates || [];
    const next = completedDates.includes(key)
      ? completedDates.filter((d) => d !== key)
      : [...completedDates, key];
    return update(habit._id, { completedDates: next }).catch(() => {});
  };

  return { habits, update, toggleHabit, ...rest };
}
