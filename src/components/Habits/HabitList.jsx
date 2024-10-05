import styled from 'styled-components';

const HabitItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HabitName = styled.span`
  font-size: 1.2rem;
`;

const HabitCheckbox = styled.input`
  width: 20px;
  height: 20px;
`;

const HabitDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const HabitFrequency = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const HabitCategory = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

export default function HabitList({ habits, onToggleHabit }) {
  return (
    <div>
      {habits.map((habit) => (
        <HabitItem key={habit.id} style={{ backgroundColor: habit.color }}>
          <HabitDetails>
            <HabitName>{habit.habitName}</HabitName>
            <HabitCategory>Category: {habit.category}</HabitCategory>
            <HabitFrequency>Frequency: {habit.frequency}</HabitFrequency>
          </HabitDetails>
          <HabitCheckbox
            type="checkbox"
            checked={habit.completed || false} // Adjusting to ensure it defaults to false if undefined
            onChange={() => onToggleHabit(habit.id)}
          />
        </HabitItem>
      ))}
    </div>
  );
}
