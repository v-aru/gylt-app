import styled from 'styled-components';

const HabitItemContainer = styled.div`
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

export default function HabitItem({ habit }) {
  return (
    <HabitItemContainer>
      <HabitName>{habit.name}</HabitName>
      <HabitCheckbox type="checkbox" checked={habit.completed} onChange={onToggle} readOnly />
    </HabitItemContainer>
  );
}
