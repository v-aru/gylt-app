import { HabitCheckbox, HabitDetails, HabitName, HabitItem } from "./HabitListStyles";

export default function HabitList({ habits, onToggleHabit, onEditHabit }) {

  if (habits.length === 0) {
    return <p>No habits for this day!</p>;
  }

  return (
    <div>
      {habits.map((habit) => (
        <HabitItem key={habit.id} onClick={() => onEditHabit(habit)}>
          <HabitDetails>
            <HabitName>{habit.habitName}</HabitName>
          </HabitDetails>
          <HabitCheckbox
            type="checkbox"
            checked={habit.completed || false} 
            onChange={(e) => {
              e.stopPropagation();
              onToggleHabit(habit.id);
            }}
          />
        </HabitItem>
      ))}
    </div>
  );
}
