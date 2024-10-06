import styled from 'styled-components';

const HabitItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HabitName = styled.span`
  font-size: 1.2rem;
  color: black;
`;

const HabitCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  accent-color: #ACACDE;
`;

const HabitDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function HabitList({ habits, onToggleHabit }) {

  if (habits.length === 0) {
    return <p>No habits for this day!</p>;
  }

  return (
    <div>
      {habits.map((habit) => (
        <HabitItem key={habit.id}>
          <HabitDetails>
            <HabitName>{habit.habitName}</HabitName>
            {/* <HabitCategory>Category: {habit.category}</HabitCategory>
            <HabitFrequency>Frequency: {habit.frequency}</HabitFrequency> */}
          </HabitDetails>
          <HabitCheckbox
            type="checkbox"
            checked={habit.completed || false} 
            onChange={() => onToggleHabit(habit.id)}
          />
        </HabitItem>
      ))}
    </div>
  );
}
