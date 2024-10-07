import { HabitItemContainer, HabitName, HabitCheckbox } from "./HabitItemStyles";

export default function HabitItem({ habit }) {
  return (
    <HabitItemContainer>
      <HabitName>{habit.habitName}</HabitName>
      <HabitCheckbox type="checkbox" checked={habit.completed} onChange={onToggle} readOnly />
    </HabitItemContainer>
  );
}
