import { HabitItemContainer, HabitName, HabitCheckbox } from "./HabitItemStyles";

export default function HabitItem({ habit, onToggle }) {

  const handleCheckboxChange = (e) => {
    e.stopPropagation();  
    onToggle(habit._id);  
  };

  return (
    <HabitItemContainer>
      <HabitName>{habit.habitName}</HabitName>
      <HabitCheckbox 
        type="checkbox" 
        checked={habit.completed} 
        onChange={handleCheckboxChange} 
        readOnly={false}
      />
    </HabitItemContainer>
  );
}
