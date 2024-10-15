import { HabitCheckbox, HabitDetails, HabitName, HabitItem } from "./HabitListStyles";


export default function HabitList({ habits, onToggleHabit, onEditHabit }) {

  return (
    <div>
      {habits.length === 0 ? (
        <p>No habits for selected day or filter!</p>
      ) : (
      habits.map((habit) => (
        <HabitItem key={habit._id} onClick={() => onEditHabit(habit)}>
          <HabitDetails>
            <HabitName completed={habit.completed}>{habit.habitName}</HabitName>
          </HabitDetails>
          <HabitCheckbox
            type="checkbox"
            checked={habit.completed || false} 
            onClick={(e) => e.stopPropagation()} 
            onChange={() => onToggleHabit(habit._id)}
          />
        </HabitItem>
      ))
    )}
    </div>
  );
}
