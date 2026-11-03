import { List, HabitItem, HabitDetails, HabitName, HabitMeta, HabitCheckbox } from "./HabitListStyles";
import { MutedText } from "@/components/UI/UI";
import { isHabitDoneOn } from "@/lib/dates";

const FREQUENCY_LABELS = { daily: "Daily", weekly: "Weekly", monthly: "Monthly" };

export default function HabitList({ habits, date, onToggleHabit, onEditHabit, canCheck = true, emptyMessage = "No habits due on this day." }) {
  if (habits.length === 0) {
    return <MutedText>{emptyMessage}</MutedText>;
  }

  return (
    <List>
      {habits.map((habit) => {
        const isDone = isHabitDoneOn(habit, date);
        return (
          <HabitItem key={habit._id} $color={habit.color}>
            <HabitCheckbox
              type="checkbox"
              checked={isDone}
              disabled={!canCheck}
              onChange={() => onToggleHabit(habit, date)}
              aria-label={`Mark ${habit.habitName} as done`}
            />
            <HabitDetails type="button" onClick={() => onEditHabit?.(habit)} disabled={!onEditHabit}>
              <HabitName $completed={isDone}>{habit.habitName}</HabitName>
              <HabitMeta>
                {habit.category} · {FREQUENCY_LABELS[habit.frequency] || (habit.days || []).join(", ")}
              </HabitMeta>
            </HabitDetails>
          </HabitItem>
        );
      })}
    </List>
  );
}
