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

const ProgressTracker = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  padding-left: 10px;
`;

export default function HabitList({ habits }) {
  return (
    <div>
      {habits.map((habit) => (
        <HabitItem key={habit.id}>
          <HabitName>{habit.name}</HabitName>
          <ProgressTracker>
            <HabitCheckbox
              type="checkbox"
              checked={habit.completed}
              onChange={() => {}}
            />
          </ProgressTracker>
        </HabitItem>
      ))}
    </div>
  );
}
