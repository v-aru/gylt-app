import { HabitCheckbox, HabitDetails, HabitName, HabitItem } from "./HabitListStyles";


export default function HabitList({ habits, onToggleHabit, onEditHabit, renderItem }) {

  // const handleCheckboxChange = (habit) => {
  //   const updatedHabit = { ...habit, completed: !habit.completed }; // Toggle completed status
  //   onToggleHabit(updatedHabit); // Use the parent function to update the habit status
  // };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      {habits.length === 0 ? (
        <p>No habits for selected day or filter!</p>
      ) : (
      habits.map((habit) => (
        <HabitItem key={habit._id} onClick={() => onEditHabit && onEditHabit(habit)}>
          {renderItem ? (
              renderItem(habit)
            ) : (
              <>
          <HabitDetails>
            <HabitName completed={habit.completedDates?.includes(today)}>
              {habit.habitName}
            </HabitName>

          </HabitDetails>
          <HabitCheckbox
            type="checkbox"
            checked={habit.completedDates?.includes(today)} 
            onClick={(e) => e.stopPropagation()} 
            onChange={() => onToggleHabit(habit._id)}
          />
          </>
        )}
        </HabitItem>
      ))
    )}
    </div>
  );
}
