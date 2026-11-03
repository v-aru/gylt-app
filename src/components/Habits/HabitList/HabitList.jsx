import { List, HabitItem, HabitDetails, HabitName, HabitMeta, HabitCheckbox, Streak } from "./HabitListStyles";
import EmptyState from "@/components/UI/EmptyState";
import { habitStreak, isHabitDoneOn } from "@/lib/dates";

const FREQUENCY_LABELS = { daily: "Daily", weekly: "Weekly", monthly: "Monthly" };

export default function HabitList({ habits, date, onToggleHabit, onEditHabit, canCheck = true, emptyMessage = "No habits due on this day.", emptyEmoji = "🌤️", emptyAction }) {
  if (habits.length === 0) {
    return <EmptyState emoji={emptyEmoji} message={emptyMessage} actionLabel={emptyAction?.label} onAction={emptyAction?.onClick} />;
  }

  return (
    <List>
      {habits.map((habit, index) => {
        const isDone = isHabitDoneOn(habit, date);
        const streak = habitStreak(habit);
        return (
          <HabitItem key={habit._id} $color={habit.color} $done={isDone} $index={index}>
            <HabitCheckbox
              type="checkbox"
              $color={habit.color}
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
            {streak >= 2 && (
              <Streak title={`${streak} scheduled days in a row`} aria-label={`${streak} day streak`}>
                🔥 {streak}
              </Streak>
            )}
          </HabitItem>
        );
      })}
    </List>
  );
}
